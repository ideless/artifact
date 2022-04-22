import json
import numpy as np
from itertools import product, permutations

P_MINOR = {
    'hp': 6/44,
    'atk': 6/44,
    'def': 6/44,
    'hpp': 4/44,
    'atkp': 4/44,
    'defp': 4/44,
    'em': 4/44,
    'er': 4/44,
    'cr': 3/44,
    'cd': 3/44,
}

'''
Refer to ./README.pdf for symbols and formulas
'''

P_n_m = np.zeros((91, 10))
P_n_m[0][0] = 1
for m in range(1, 10):
    for n in range(0, 91):
        for l in range(7, 1+min(10, n)):
            P_n_m[n][m] += P_n_m[n-l][m-1]
for m in range(1, 10):
    for n in range(0, 91):
        P_n_m[n][m] /= 4**m


P_m_tk = np.zeros((10, 10, 5))
for k in range(4):
    P_m_tk[k][3][k] = 1
for k in range(5):
    P_m_tk[k][4][k] = 1
for t in range(5, 10):
    for k in range(5):
        P_m_tk[0][t][k] = (4-k)*P_m_tk[0][t-1][k]
        for m in range(1, 10):
            P_m_tk[m][t][k] = k*P_m_tk[m-1][t-1][k]+(4-k)*P_m_tk[m][t-1][k]
for t in range(5, 10):
    for k in range(5):
        for m in range(10):
            P_m_tk[m][t][k] /= 4**(t-4)

P_s = np.array([0.8, 0.2])

'''P_k_s actually implements P_{k|t}, where s = 0 if initial minor affix
number is 3 and s = 1 otherwise.
'''


def calc_P_k_s(minor, main):
    P_k_s = np.zeros((5, 2))
    effective_minors = minor.split(',')
    weight = {m: (1 if m in effective_minors else 0) for m in P_MINOR}
    all_minors = [m for m in P_MINOR if m != main]
    S = 1-P_MINOR[main] if main in P_MINOR else 1
    for a1, a2, a3 in permutations(all_minors, 3):
        pr = P_MINOR[a1]*P_MINOR[a2]*P_MINOR[a3]/S / \
            (S-P_MINOR[a1])/(S-P_MINOR[a1]-P_MINOR[a2])
        k = weight[a1]+weight[a2]+weight[a3]
        P_k_s[k][0] += pr
    for a1, a2, a3, a4 in permutations(all_minors, 4):
        pr = P_MINOR[a1]*P_MINOR[a2]*P_MINOR[a3]*P_MINOR[a4]/S/(S-P_MINOR[a1])/(
            S-P_MINOR[a1]-P_MINOR[a2])/(S-P_MINOR[a1]-P_MINOR[a2]-P_MINOR[a3])
        k = weight[a1]+weight[a2]+weight[a3]+weight[a4]
        P_k_s[k][1] += pr
    return P_k_s


minors = ['atkp,cd,cr', 'atkp,cd,cr,defp,er', 'atkp,cd,cr,em', 'atkp,cd,cr,em,er', 'atkp,cd,cr,em,hpp', 'atkp,cd,cr,er',
          'atkp,cd,cr,er,hpp', 'atkp,em,er', 'atkp,em,er,hpp', 'atkp,er', 'cd,cr,defp', 'cd,cr,defp,er', 'defp,em,er', 'em,er', 'er,hpp']
mains = ['hp', 'atk', 'hpp', 'atkp', 'defp', 'em', 'er', 'cr', 'cd', '']

distr = dict()
for minor in minors:
    print(minor)
    distr[minor] = dict()
    for main in mains:
        print(main)
        distr[minor][main] = dict()
        P_k_s = calc_P_k_s(minor, main)
        for level in range(6):
            length = 41 + level * 10
            '''Main'''
            p = np.zeros(length)
            for s, k, m, n in product(range(2), range(5), range(10), range(length)):
                t = 3 + level + s
                p[n] += P_n_m[n][m]*P_m_tk[m][t][k]*P_k_s[k][s]*P_s[s]
            d = distr[minor][main][level] = []
            S = 0
            for n in range(length):
                S += p[n]
                if n % 10 == 0:
                    d.append(round(S, 4))
            # print(d)
            # exit()

with open('exact_distr.json', 'w') as f:
    json.dump(distr, f)
