#!/usr/bin/env python
# coding: utf-8

# In[4]:


# %load GenshinWeight.py
from pkgutil import get_data
import formulas
import os
import re
import json

# https://bbs.nga.cn/read.php?tid=25843014
filename = '参考面板2.6.xlsx'

# elemental recharge weight. As it usually not effect final number, need a special
# weight to evaluate its value. details for function `calc_er_weight`
er_weight = 0.5


# In[76]:


# consts
sub_attrs = ['hp', 'atk', 'def', 'hpp', 'atkp', 'defp', 'em', 'er', 'cr', 'cd']
sub_attr_names = [
    ['生命值', '生命'], 
    ['攻击力', '攻击', '实际攻击'], 
    ['防御力', '防御'], 
    ['生命值', '生命'], 
    ['攻击力', '攻击', '实际攻击'], 
    ['防御力', '防御'], 
    ['元素精通', '精通'], 
    ['充能', '充能效率', '元素充能', '元素充能效率'], 
    ['暴率', '暴击率'], 
    ['暴伤', '暴击伤害']
]

# characters use Q, but Q is not shown in action
Q_characters = ['诺艾尔', '魈', '雷泽', '神里绫华', '七七', '枫原万叶','砂糖','空/荧（风）']

# characters that value is any, which attr is important
any_characters = [
    ['空/荧（雷）','atk'],
    ['申鹤', 'atk'],
    ['云堇', 'def'],
    ['五郎', 'def'],
]

# https://bbs.nga.cn/read.php?tid=24270728 https://bbs.nga.cn/read.php?tid=27497061
sub_attr_base_one = 0.0389
sub_attr_base = [7680, 500, 595, 1.5, 1.5, 1.875, 600, 1.66666667, 1, 2]
sub_attr_base = [x * sub_attr_base_one for x in sub_attr_base]


# In[81]:


# functions

def get_data_indices_from_labels(label_line):
    # from label line, get indices of different sub_attrs, following with two atk columns
    indices = []
    for sub_attr_name in sub_attr_names:
        for name in sub_attr_name:
            i = -1
            if name in label_line:
                i = label_line.index(name)
                break
        indices.append(i)
    for nn in [['数值预估', '伤害预估'], ['角色白值'], ['武器白值']]:
        for n in nn:
            if n in label_line:
                indices.append(label_line.index(n))
                break
    return indices

def get_exact_number(label_indices, data_line, solution_line):
    # get exact number for one sub_attr
    cbase = {}
    cbase['atk'] = solution_line[label_indices[-1]] + solution_line[label_indices[-2]]
    cbase['hp'] = 0
    cbase['def'] = 0
    for attr in ['hp', 'def']:
        if label_indices[sub_attrs.index(attr)] != -1:
            # have hp or def, try to get base
            data = data_line[label_indices[sub_attrs.index(attr)]]
            if data == '':
                continue
            assert data[0] == '='  # must start with =
            while data[0] < '0' or data[0] > '9':
                data = data[1:]
            cbase[attr] = int(data.split('*')[0].split('+')[0].split('(')[0])
    #print(data_line[:4], cbase)
    values = []
    for base, name in zip(sub_attr_base, sub_attrs):
        if name in ['atkp', 'defp', 'hpp']:
            values.append(base * cbase[name[:-1]])
        else:
            values.append(base)
    return values

def get_improve_percent(excel, label_indices, name, data, solution, up_values):
    result_index = label_indices[-3]
    def enhance_cr(value, cr = None):
        # when critical damage is used in result formula, enhance the result with critical rate
        cd_index = label_indices[sub_attrs.index('cd')]
        if name[cd_index] in data[result_index]:
            #print('use critical damage, start enhance')
            cd = solution[cd_index]
            value /= 1 + cd
            cr_index = label_indices[sub_attrs.index('cr')]
            if cr is None:
                cr = solution[cr_index]
            return value * (1 + cr * cd)
        return value

    current_baseline = enhance_cr(solution[result_index])
    if current_baseline == 'any' or current_baseline<1:
        # characters value is any
        current_baseline = 0
        for cname, aname in any_characters:
            if data[0] == cname:
                result_index = label_indices[sub_attrs.index(aname)]
                current_baseline = solution[result_index]
                break
        #print('character with any', current_baseline, result_index)
    
    if current_baseline == 0:
        current_baseline = 1e-10

    base_dict = dict(zip(name, data))
    improve = []
    for sub, index, value in zip(sub_attrs, label_indices, up_values):
        if index == -1:
            improve.append(0)
            continue
        # now_dict = base_dict.copy()
        # now_dict[name[index]] = solution[index] + value
        s_data = solution[index]
        if s_data in ['/', 'any', '']:  # if any or / or empty, assume is zero
            s_data = 0
        res = excel.calculate(
            inputs = {
                name[index]: s_data + value
            },
            outputs = [ name[result_index] ]
        ).get(name[result_index])
        try:
            res = res.value[0][0]
        except:
            pass
        if sub == 'cr':
            res = enhance_cr(res, s_data + value)
        else:
            res = enhance_cr(res)
        imp = (res - current_baseline) / current_baseline
        improve.append(imp)
    er_index = sub_attrs.index('er')
    improve[er_index] = max(improve[er_index], calc_er_weight(label_indices, up_values, solution, improve))
    norm = max(improve)
    if norm != 0:
        improve = [x / norm for x in improve]
    # for name, imp in zip(sub_attr_names, improve):
    #     print(name[0], imp)
    return improve

# Based on er_need_action and main_attr and sub_attr, select characters that 
# need elemental recharge. If appear in sub_attr, use number in sub_attr as target,
# else use biggest weight in [hpp, atkp, defp]. Finally, multiply predifined weight.
def calc_er_weight(label_indices, up_values, solution, improvements):
    imp = 0
    er_index = label_indices[sub_attrs.index('er')]
    if er_index != -1:
        imp = up_values[er_index] / solution[er_index]
    else:
        best = 0
        if 'Q' in ''.join([str(x) for x in solution]) or solution[0] in Q_characters:  # if use Q or in whitelist
            #print('character use Q')
            for attr in ['atkp', 'defp', 'hpp','em']:
                i = improvements[sub_attrs.index(attr)]
                best = max(best, i)
        imp = best
    return imp * er_weight


# In[78]:


# read xls

xl_model = formulas.ExcelModel().loads(filename).finish()
# %%
# extract data to arrays

names = [[''] * 26 for _ in range(1000)]
datas = [[''] * 26 for _ in range(1000)]
solutions = [[''] * 26 for _ in range(1000)]

calc_res = dict(xl_model.calculate())

d = xl_model.to_dict()
for key in d:
    if '正表' in key:  # only consider main table
        columnnum = ord(key.split('!')[-1][0]) - 65
        linenum = int(key.split('!')[-1][1:])
        if linenum > 10:  # is data
            datas[linenum][columnnum] = d[key]
            names[linenum][columnnum] = key
            solutions[linenum][columnnum] = calc_res[key].value[0][0]


# In[79]:


def s_align(s, length):
    res = s
    minus = 0
    for i in s:
        if ord(i) > 128:
            minus += 1
    res += ' ' * (length - len(s) - minus)
    return res


# In[82]:


results = []
for i in range(len(names[:])):
    if datas[i][0] == '角色':
        label_line = datas[i]
        label_indices = get_data_indices_from_labels(label_line)
        continue
    if datas[i][0] != '':
        # real data here
        up_values = get_exact_number(label_indices, datas[i], solutions[i])
        # print(label, up_values)
        up_percent = get_improve_percent(xl_model, label_indices, names[i], datas[i], solutions[i], up_values)
        results.append(datas[i][:4]+up_percent)
        
import pandas as pd
df=pd.DataFrame(results)
column=['角色','武器','套装','主词条']
for i in sub_attr_names:
    column.append(s_align(i[0], 10))
df.columns=column
df=df.round(4)
df


# In[83]:


name = []
data = []
for i in range(len(names[:])):
    if datas[i][0] == '角色':
        label_line = datas[i]
        label_indices = get_data_indices_from_labels(label_line)
        continue
    if datas[i][0] != '':
        # real data here
        name.append(datas[i][:4])
        up_values = get_exact_number(label_indices, datas[i], solutions[i])
        # print(label, up_values)
        up_percent = get_improve_percent(xl_model, label_indices, names[i], datas[i], solutions[i], up_values)
        data.append([' | '.join(datas[i][:4])]+up_percent)
        
import pandas as pd
df=pd.DataFrame(data)
column=['name','hp','atk','def','hpp','atkp','defp','em','er','cr','cd']
df.columns=column
df=df.round(4)
data =df.to_dict(orient='records')
df.name.to_list()


# In[84]:


weight={}
for i in data:
    weight[i.pop('name')]=i
weight


# In[ ]:


with open('preset.json', 'w') as f:
    json.dump(weight, f)


