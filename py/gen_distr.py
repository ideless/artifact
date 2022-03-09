import json
from matplotlib import transforms
import matplotlib.pyplot as plt
import numpy as np
from itertools import product
from rich.progress import track
from time import time
import ray
import random


DATA = {
    'types': ['flower', 'plume', 'sands', 'goblet', 'circlet'],
    'minor': {
        'keys': ['hp', 'atk', 'def', 'hpp', 'atkp', 'defp', 'em', 'er', 'cr', 'cd'],
        'distr': [6/44, 6/44, 6/44, 4/44, 4/44, 4/44, 4/44, 4/44, 3/44, 3/44]
    },
    'main': {
        'flower': {'hp': {'p': 1, 'v': 4780}},
        'plume': {'atk': {'p': 1, 'v': 311}},
        'sands': {
            'hpp': {'p': 8 / 30, 'v': 0.466},
            'atkp': {'p': 8 / 30, 'v': 0.466},
            'defp': {'p': 8 / 30, 'v': 0.583},
            'em': {'p': 3 / 30, 'v': 186.5},
            'er': {'p': 3 / 30, 'v': 0.518}
        },
        'goblet': {
            'hpp': {'p': 17 / 80, 'v': 0.466},
            'atkp': {'p': 17 / 80, 'v': 0.466},
            'defp': {'p': 16 / 80, 'v': 0.583},
            'pyroDB': {'p': 4 / 80, 'v': 0.466},
            'hydroDB': {'p': 4 / 80, 'v': 0.466},
            'electroDB': {'p': 4 / 80, 'v': 0.466},
            'anemoDB': {'p': 4 / 80, 'v': 0.466},
            'cryoDB': {'p': 4 / 80, 'v': 0.466},
            'geoDB': {'p': 4 / 80, 'v': 0.466},
            'physicalDB': {'p': 4 / 80, 'v': 0.583},
            'em': {'p': 2 / 80, 'v': 186.5}
        },
        'circlet': {
            'hpp': {'p': 11 / 50, 'v': 0.466},
            'atkp': {'p': 11 / 50, 'v': 0.466},
            'defp': {'p': 11 / 50, 'v': 0.583},
            'cr': {'p': 5 / 50, 'v': 0.311},
            'cd': {'p': 5 / 50, 'v': 0.622},
            'hb': {'p': 5 / 50, 'v': 0.359},
            'em': {'p': 2 / 50, 'v': 186.5}
        }
    }
}

mains = {
    'flower': 'hp',
    'plume': 'atk',
    'sands': 'atkp',
    'goblet': 'pyroDB',
    'circlet': 'cr'
}


def swap(arr, i, j):
    t = arr[i]
    arr[i] = arr[j]
    arr[j] = t


def choice(arr, n=None, p=None):
    if type(arr) == int:
        return random.randint(0, arr-1)
    elif type(arr) == list and n and p:
        a = [*arr]
        d = [*p]
        s = np.sum(p)
        for i in range(n):
            r = random.random() * s
            acc = 0
            for j in range(i, len(a)):
                acc += d[j]
                if r <= acc:
                    s -= d[j]
                    swap(a, i, j)
                    swap(d, i, j)
                    break
        return a[:n]
    else:
        return random.choice(arr)


class MinorAffix:
    def __init__(self, key, value):
        self.key = key
        self.value = value  # no. affixes


def count(minors):
    ret = {
        'hpp': 0,
        'atk': 0,
        'atkp': 0,
        'em': 0,
        'er': 0,
        'cr': 0,
        'cd': 0
    }
    for m in minors:
        if m.key in ret:
            ret[m.key] += m.value
    return ret


atk2atkp = 0.33  # 0.47 for baseATK=700, 0.33 for baseATK=1000


def score(minors):
    cnt = count(minors)
    # cnt['atkp'] += cnt['atk'] * atk2atkp
    # return min([cnt['atkp']/6, (cnt['cr']+cnt['cd'])/18]) * 24 / 0.85
    # return min([cnt['atkp']/4, cnt['cr']/8, cnt['cd']/12]) * 24 / 0.85
    return (cnt['atkp']+cnt['cr']+cnt['cd']+cnt['em']+cnt['er']+cnt['hpp'])/0.85


def rand_full_minors(main_key):
    draw = list(filter(lambda x: x != main_key, choice(
        DATA['minor']['keys'], 5, DATA['minor']['distr'])))[:4]
    #draw = list(filter(lambda x: x != main_key, np.random.choice(DATA['minor']['keys'], 5, replace=False, p=DATA['minor']['distr'])))[:4]
    ret = []
    for key in draw:
        ret.append(MinorAffix(key, 7+choice(4)))
    N = 5 if random.random() < 0.2 else 4
    for _ in range(N):
        i = choice(4)
        ret[i].value += 7+choice(4)
    return ret


def pareto(c1, c2):
    s = 0
    cnt = 0
    for key in c1:
        cnt += 1
        s += 1 if c1[key] > c2[key] else -1
    if s == cnt:
        return 1
    elif s == -cnt:
        return -1
    else:
        return 0


def simulate(N):
    bag = {
        'flower': [],
        'plume': [],
        'sands': [],
        'goblet': [],
        'circlet': []
    }
    best = 0
    sim = [best]
    for _ in track(range(N)):
        # type and mainkey
        type = choice(DATA['types'])
        main_key = mains[type]
        pr = DATA['main'][type][main_key]['p']
        if random.random() > pr:
            sim.append(best)
            continue
        # random minors
        ms = rand_full_minors(main_key)
        # if len(bag[type]) and score(bag[type][0]) >= score(ms):
        #     sim.append(best)
        #     continue
        # bag[type] = [ms]
        cnt = count(ms)
        dom = False
        tmp = []
        for a in bag[type]:
            ca = count(a)
            p = pareto(cnt, ca)
            if p == -1:
                dom = True
                break
            elif p == 0:
                tmp.append(a)
        if dom:
            sim.append(best)
            continue
        bag[type] = tmp + [ms]
        pool = []
        for t in bag:
            if t != type and len(bag[t]):
                pool.append(bag[t])
        if len(pool):
            for an in product(*pool):
                minors = [] + ms
                for a in an:
                    minors += a
                s = score(minors)
                best = max(best, s)
        else:
            s = score(ms)
            best = max(best, s)
        sim.append(best)
    print(best)
    return sim


minors = ['atkp,cd,cr', 'atkp,cd,cr,defp,er', 'atkp,cd,cr,em', 'atkp,cd,cr,em,er', 'atkp,cd,cr,em,hpp', 'atkp,cd,cr,er', 'atkp,cd,cr,er,hpp',
          'atkp,cr,er', 'atkp,em,er', 'atkp,em,er,hpp', 'atkp,er', 'cd,cr,defp', 'cd,cr,defp,er', 'cr,defp,em,em,er', 'cr,defp,em,er', 'cr,er,hpp', 'er,hpp']
mains = ['hp', 'atk', 'hpp', 'atkp', 'defp', 'em', 'er', 'cr', 'cd', '']
N = 100000

distr = dict()
for minor in minors:
    print(minor)
    minorKeys = minor.split(',')
    distr[minor] = dict()
    for main in mains:
        print(main)
        d = distr[minor][main] = [0 for _ in range(91)]
        for i in range(N):
            ms = rand_full_minors(main)
            cnt = 0
            for m in ms:
                if m.key in minorKeys:
                    cnt += m.value
            d[cnt] += 1  # d[i]表示有i个整数化词条的样本数目
        # 以下重构d[]为累积分布，d[i]表示整数化词条数小于i+1的概率
        d[90] = 1  # 整数化词条数小于91的概率为1
        S = 0
        for i in range(90):
            S += d[i]  # S为有0,1,...,i个整数化词条的样本数总和
            if d[i+1] == 0:  # 如果没有整数化词条数为i+1个的样本，判断为该词条数不可能存在，不改变累积概率
                d[i] = 0 if i == 0 else d[i-1]
            else:  # 否则按定义更新
                d[i] = S / N


with open('distr.json', 'w') as f:
    json.dump(distr, f)

# simulate_remote = ray.remote(simulate)
#
#
# start = time()
#
# N = 1000
# T = 300
# aim = 24
# multi = True
#
# if multi:
#     ray.init()
#     sim_ids = []
#     for _ in range(T):
#         sim_id = simulate_remote.remote(N)
#         sim_ids.append(sim_id)
#     sims = ray.get(sim_ids)
# else:
#     sims = []
#     for _ in range(T):
#         sim = simulate(N)
#         sims.append(sim)
#
# x = []
# avg = []
# clb = []
# cub = []
# avg_first = None
# clb_first = None
# cub_first = None
# for i in range(N):
#     arr = [sims[j][i] for j in range(T)]
#     mu = np.mean(arr)
#     d = np.std(arr, ddof=1)
#     avg.append(mu)
#     clb.append(mu-d)
#     cub.append(mu+d)
#     x.append(i)
#     if avg_first is None and mu >= aim:
#         avg_first = i
#     if clb_first is None and mu-d >= aim:
#         clb_first = i
#     if cub_first is None and mu+d >= aim:
#         cub_first = i
#
# print('Avg:', avg[-1])
#
# fig = plt.figure()
# ax = fig.add_subplot(111)
# ax.plot(x, avg)
# ax.fill_between(x, clb, cub, alpha=0.1)
# ax.axhline(y=aim, linestyle='-', alpha=0.3, color="r")
# ax.text(1.05, aim, aim, ha='right', va='center',
#         color="r", transform=ax.get_yaxis_transform())
# ax.axvline(x=avg_first, linestyle='-', alpha=0.3, color="r")
# ax.text(avg_first, 1.02, avg_first, ha='center', va='center',
#         color="r", transform=ax.get_xaxis_transform())
# ax.axvline(x=clb_first, linestyle='--', alpha=0.3, color="r")
# ax.text(clb_first, 1.02, clb_first, ha='center', va='center',
#         color="r", transform=ax.get_xaxis_transform())
# ax.axvline(x=cub_first, linestyle='--', alpha=0.3, color="r")
# ax.text(cub_first, 1.02, cub_first, ha='center', va='center',
#         color="r", transform=ax.get_xaxis_transform())
# plt.savefig(f'grad_{N}.png')
#
# end = time()
# print('Time:', end-start)
#
