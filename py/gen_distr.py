import json
import random
import numpy as np


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
        self.value = value  # 整数化词条数，单次提升7/8/9/10


minors = ['atkp,cd,cr', 'atkp,cd,cr,defp,er', 'atkp,cd,cr,em', 'atkp,cd,cr,em,er', 'atkp,cd,cr,em,hpp', 'atkp,cd,cr,er',
          'atkp,cd,cr,er,hpp', 'atkp,em,er', 'atkp,em,er,hpp', 'atkp,er', 'cd,cr,defp', 'cd,cr,defp,er', 'defp,em,er', 'em,er', 'er,hpp']
mains = ['hp', 'atk', 'hpp', 'atkp', 'defp', 'em', 'er', 'cr', 'cd', '']
N = 10000

distr = dict()
for minor in minors:
    print(minor)
    minorKeys = minor.split(',')
    distr[minor] = dict()
    for main in mains:
        print(main)
        d = distr[minor][main] = {
            0: [0 for _ in range(41)],
            1: [0 for _ in range(51)],
            2: [0 for _ in range(61)],
            3: [0 for _ in range(71)],
            4: [0 for _ in range(81)],
            5: [0 for _ in range(91)],
        }
        '''d[i][j]表示有等级为i，有j个整数化词条的样本数目'''
        for _ in range(N):
            draw = list(filter(lambda x: x != main, choice(
                DATA['minor']['keys'], 5, DATA['minor']['distr'])))[:4]
            init_4 = random.random() < 0.2
            cnt = 0
            for m in draw[:-1]:
                cnt += 7+choice(4) if m in minorKeys else 0
            if init_4:
                m = draw[-1]
                cnt += 7+choice(4) if m in minorKeys else 0
            d[0][cnt] += 1
            for i in range(1, 6):
                if i == 1 and not init_4:
                    m = draw[-1]
                else:
                    m = draw[choice(4)]
                cnt += 7+choice(4) if m in minorKeys else 0
                d[i][cnt] += 1
        '''以下重构d[i][:]为累积分布，d[i][j]表示整数化词条数小于j的概率'''
        for i in range(6):
            S = d[i][0]  # S为有0,1,...,j-1个整数化词条的样本数总和
            d[i][0] = 0  # 整数化词条数小于0的概率为0
            for j in range(1, 41+i*10):
                n_sample_j = d[i][j]
                if n_sample_j == 0:  # 如果没有整数化词条数为j个的样本，判断为该词条数不可能存在，不改变累积概率
                    d[i][j] = d[i][j-1]
                else:  # 否则按定义更新
                    d[i][j] = S / N
                S += n_sample_j


with open('distr.json', 'w') as f:
    json.dump(distr, f)
