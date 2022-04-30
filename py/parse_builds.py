from cmath import phase
from curses.ascii import isdigit
import re

keymap = {
    "char": {
        "阿贝多": "Albedo",
        "埃洛伊": "Aloy",
        "安柏": "Amber",
        "荒泷一斗": "AratakiItto",
        "芭芭拉": "Barbara",
        "北斗": "Beidou",
        "班尼特": "Bennett",
        "重云": "Chongyun",
        "迪卢克": "Diluc",
        "迪奥娜": "Diona",
        "优菈": "Eula",
        "菲谢尔": "Fischl",
        "甘雨": "Ganyu",
        "五郎": "Gorou",
        "胡桃": "HuTao",
        "琴": "Jean",
        "万叶": "KaedeharaKazuha",
        "凯亚": "Kaeya",
        "神里绫华": "KamisatoAyaka",
        "神里绫人": "KamisatoAyato",
        "刻晴": "Keqing",
        "可莉": "Klee",
        "九条裟罗": "KujouSara",
        "丽莎": "Lisa",
        "莫娜": "Mona",
        "凝光": "Ningguang",
        "诺艾尔": "Noelle",
        "七七": "Qiqi",
        "雷电将军": "RaidenShogun",
        "雷泽": "Razor",
        "罗莎莉亚": "Rosaria",
        "珊瑚宫心海": "SangonomiyaKokomi",
        "早柚": "Sayu",
        "申鹤": "Shenhe",
        "砂糖": "Sucrose",
        "达达利亚": "Tartaglia",
        "托马": "Thoma",
        "旅行者": "Traveler",
        "旅行者(风)": "TravelerAnemo",
        "旅行者(岩)": "TravelerGeo",
        "旅行者(雷)": "TravelerElectro",
        "温迪": "Venti",
        "香菱": "Xiangling",
        "魈": "Xiao",
        "行秋": "Xingqiu",
        "辛焱": "Xinyan",
        "八重神子": "YaeMiko",
        "烟绯": "Yanfei",
        "宵宫": "Yoimiya",
        "云堇": "YunJin",
        "钟离": "Zhongli",
    },
    "set": {
        "苍白": "PaleFlame",
        "千岩": "TenacityOfTheMillelith",
        "宗室": "NoblesseOblige",
        "骑士": "BloodstainedChivalry",
        "岩": "ArchaicPetra",
        "磐岩": "ArchaicPetra",  # alias
        "流星": "RetracingBolide",
        "魔女": "CrimsonWitchOfFlames",
        "渡火": "Lavawalker",
        "冰": "BlizzardStrayer",
        "水": "HeartOfDepth",
        "平雷": "Thundersoother",
        "如雷": "ThunderingFury",
        "风": "ViridescentVenerer",
        "少女": "MaidenBeloved",
        "吸能": "ShimenawasReminiscence",
        "充能": "EmblemOfSeveredFate",
        "华馆": "HuskOfOpulentDreams",
        "防御": "HuskOfOpulentDreams",  # alias
        "海染": "OceanHuedClam",
        "乐团": "WanderersTroupe",
        "角斗士": "GladiatorsFinale",
        "角斗": "GladiatorsFinale",  # alias
    },
    "main": {
        "生命": "hpp",
        "攻击": "atkp",
        "防御": "defp",
        "精通": "em",
        "充能": "er",
        "治疗": "hb",
        "暴击": "cr",
        "暴伤": "cd",
        "火伤": "pyroDB",
        "水伤": "hydroDB",
        "雷伤": "electroDB",
        "风伤": "anemoDB",
        "冰伤": "cryoDB",
        "岩伤": "geoDB",
        "物伤": "physicalDB",
    },
    "minor": {
        "生命值": "hpp",
        "攻击力": "atkp",
        "防御力": "defp",
        "精通": "em",
        "元素充能效率": "er",
        "暴击率": "cr",
        "暴击伤害": "cd",
    }
}


def whatis(word, dictionary):
    for key in dictionary:
        if dictionary[key] == word:
            return key
    return word


def parse_set(tape):
    # print(tape)
    result = {'2': set(), '4': set()}

    def parse_set_phrase(phrase: str, result):
        for word in re.split(r"[+/]", phrase):
            if isdigit(word[0]):
                count = word[0]
                name = word[1:]
            else:
                if not isdigit(word[-1]):
                    continue  # 三散件
                count = word[-1]
                name = word[:-1]
            if count == '3':
                continue  # 3散件/散件3
            if name in ('教官', '流放者', '战狂'):
                continue  # 忽略四星圣遗物
            assert count in ('2', '4')
            if name in keymap['set']:
                result[count].add(keymap['set'][name])
            else:
                print('unrecogonized set', name, phrase)
    if re.search(r"\d", tape[0]):
        parse_set_phrase(tape[0][6:-1], result)
    else:
        for line in tape:
            if m := re.match("\d+\.(.*?)[。：]", line):
                parse_set_phrase(m.groups()[0], result)
    return {
        '2': list(result["2"] - result["4"]),
        '4': list(result['4'])
    }


state = 0
temp_tape = []

with open('index.txt') as f:
    for line in f.readlines():
        line = line.strip()
        if not line:
            continue
        if state == 0:
            if m := re.match(r"− (\D*?) \.\.\.$", line):
                name = m.groups()[0]
                print(name)
                state = 1
        elif state == 1:
            if m := re.match(r"圣遗物套装", line):
                temp_tape = [line]
                state = 2
        elif state == 2:
            if m := re.match(r"圣遗物对应属性", line):
                # print(temp_tape)
                print(parse_set(temp_tape))
                temp_tape = [line]
                state = 3
            else:
                temp_tape.append(line)
        elif state == 3:
            if m := re.match(r"圣遗物有效词条", line):
                # print(temp_tape)
                temp_tape = [line]
                '''只取一行，不看备注'''
                # print(temp_tape)
                state = 0
            else:
                temp_tape.append(line)
