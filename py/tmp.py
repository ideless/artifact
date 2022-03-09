import re

content = '''
山脊守望(别称：苍白本/千岩本)

苍白之火套装：以下简称“苍白套”
千岩牢固套装：以下简称“千岩套”
华池岩岫(别称：宗室本)

昔日的宗室之仪套装：以下简称“宗室套”
染血的骑士道套装：以下简称“骑士套”
孤云凌霄之处(别称：岩本)

悠古的磐岩套装：以下简称“岩套”
逆飞的流星套装：以下简称“流星套”(其他代称：逆飞套)
无妄引咎密宫(别称：火本/魔女本/渡火本)

炽热的炎之魔女套装：以下简称“魔女套”(其他代称：火套)
渡火者的醒悟：以下简称“渡火套”

芬德尼尔之顶(别称：冰本/水本)

冰封迷途的勇士套装：以下简称“冰套”
沉沦之心套装：以下简称“水套”

仲夏庭园(别称：雷本)

平息鸣雷的尊者套装：以下简称“平雷套”
如雷的盛怒：以下简称“如雷套”(其他代称：雷套)

铭记之谷(别称：风本/少女本)

翠绿之影套装：以下简称“风套”
少女飘摇的思念套装：以下简称“少女套”

椛染之庭(别称：充能本/绝缘本)

追忆之注连套装：以下简称“吸能套”(其他代称：追忆套)
绝缘之旗印套装：以下简称“充能套”(其他代称：绝缘套)

沉眠之庭(别称：防御本/蚌埠本/新圣遗物本)

华馆梦醒形骸记：以下简称“华馆套”(其他代称：防御套)
海染砗磲(qu2)：以下简称“海染套”(其他代称：新奶套、毒奶套)

以下两种圣遗物可以从深境螺旋奖励、世界BOSS等途径获得。
流浪大地的乐团套装：以下简称“乐团套”(其他代称：乐园套/流浪套)
角斗士的终幕礼套装：以下简称“角斗士套”(其他代称：角/决斗套/角斗套)
'''

for line in content.split():
    if m := re.match(r".*“(.*?)”.*", line):
        set_name = m.groups()[0][:-1]
        print(f'"{set_name}": "",')
