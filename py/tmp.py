import re

characters = '''
诺艾尔
凝光
钟离
阿贝多
荒泷一斗
五郎
云堇
迪卢克
胡桃
可莉
香菱
班尼特
烟绯
安柏
辛焱
宵宫
托马
达达利亚
行秋
莫娜
芭芭拉
珊瑚宫心海
甘雨
七七
神里绫华
重云
罗莎莉亚
凯亚
优菈
迪奥娜
埃洛伊
申鹤
温迪
琴
砂糖
万叶
魈
早柚
刻晴
雷泽
北斗
丽莎
菲谢尔
雷电将军
九条裟罗
八重神子
旅行者(风)
旅行者(岩)
旅行者(雷)
'''

content = '''
防御力、元素充能效率、暴击率、暴击伤害
攻击力、暴击率、暴击伤害
生命值、攻击力、元素充能效率、暴击率、暴击伤害
防御力、暴击率、暴击伤害
防御力、元素充能效率、攻击力、暴击率、暴击伤害
元素精通、防御力、元素充能效率
元素精通、防御力、元素充能效率
攻击力、精通、暴击率、暴击伤害
生命值、攻击力、精通、暴击率、暴击伤害
攻击力、精通、暴击率、暴击伤害
元素充能效率、元素精通、攻击力、暴击率、暴击伤害
元素充能效率、生命值
攻击力、精通、暴击率、暴击伤害
攻击力、精通、暴击率、暴击伤害
防御力、元素充能效率、攻击力、暴击率、暴击伤害
攻击力、精通、暴击率、暴击伤害
元素充能效率、生命值
攻击力、精通、暴击率、暴击伤害
元素充能效率、精通、攻击力、暴击率、暴击伤害
元素充能效率、攻击力、精通、暴击率、暴击伤害
元素充能效率、生命值
生命值、元素充能效率、攻击力、精通
攻击力、精通、暴击率、暴击伤害
元素充能效率、攻击力
元素充能效率、攻击力、暴击率、暴击伤害
攻击力、精通、暴击率、暴击伤害
元素充能效率、攻击力、暴击率、暴击伤害
攻击力、暴击率、暴击伤害
元素充能效率、攻击力、暴击率、暴击伤害
元素充能效率、生命值
攻击力、精通、暴击率、暴击伤害
元素充能效率、攻击力
元素充能效率、攻击力、精通、暴击率、暴击伤害
元素充能效率、攻击力、元素精通、暴击率、暴击伤害
元素充能效率、精通
精通、元素充能效率
攻击力、暴击率、暴击伤害
元素充能效率、精通、攻击力
攻击力、暴击率、暴击伤害
攻击力、暴击率、暴击伤害
元素充能效率、攻击力、暴击率、暴击伤害
元素充能效率、攻击力、精通、暴击率、暴击伤害
攻击力、暴击率、暴击伤害
元素充能效率、攻击力、暴击率、暴击伤害
元素充能效率、攻击力、暴击率、暴击伤害
元素充能效率、元素精通、攻击力、暴击率、暴击伤害
精通、元素充能效率
攻击力、暴击率、暴击伤害
元素充能效率、精通、攻击力、暴击率、暴击伤害
'''

keymap = {
    "minor": {
        "生命值": "hpp",
        "攻击力": "atkp",
        "防御力": "defp",
        "精通": "em",
        "元素精通": "em",  # alias
        "元素充能效率": "er",
        "暴击率": "cr",
        "暴击伤害": "cd",
    }
}

affix_strs = set()

for line, char in zip(content.split(), characters.split()):
    affixes = set()
    for name in line.strip().split('、'):
        if name in keymap['minor']:
            affixes.add(keymap['minor'][name])
        else:
            print(name)
    affixes = list(affixes)
    affixes.sort()
    affix_str = ','.join(affixes)
    print(char, affix_str)
    affix_strs.add(','.join(affixes))

affix_strs = list(affix_strs)
affix_strs.sort()
print(affix_strs)
