char_configs = [
    {
        "id": "ayaka_002",
        "key": "KamisatoAyaka"
    },
    {
        "id": "qin_003",
        "key": "Jean"
    },
    {
        "id": "playerboy_005",
        "key": "Traveler"
    },
    {
        "id": "lisa_006",
        "key": "Lisa"
    },
    {
        "id": "playergirl_007",
        "key": "Traveler"
    },
    {
        "id": "barbara_014",
        "key": "Barbara"
    },
    {
        "id": "kaeya_015",
        "key": "Kaeya"
    },
    {
        "id": "diluc_016",
        "key": "Diluc"
    },
    {
        "id": "razor_020",
        "key": "Razor"
    },
    {
        "id": "ambor_021",
        "key": "Amber"
    },
    {
        "id": "venti_022",
        "key": "Venti"
    },
    {
        "id": "xiangling_023",
        "key": "Xiangling"
    },
    {
        "id": "beidou_024",
        "key": "Beidou"
    },
    {
        "id": "xingqiu_025",
        "key": "Xingqiu"
    },
    {
        "id": "xiao_026",
        "key": "Xiao"
    },
    {
        "id": "ningguang_027",
        "key": "Ningguang"
    },
    {
        "id": "klee_029",
        "key": "Klee"
    },
    {
        "id": "zhongli_030",
        "key": "Zhongli"
    },
    {
        "id": "fischl_031",
        "key": "Fischl"
    },
    {
        "id": "bennett_032",
        "key": "Bennett"
    },
    {
        "id": "tartaglia_033",
        "key": "Tartaglia"
    },
    {
        "id": "noel_034",
        "key": "Noelle"
    },
    {
        "id": "qiqi_035",
        "key": "Qiqi"
    },
    {
        "id": "chongyun_036",
        "key": "Chongyun"
    },
    {
        "id": "ganyu_037",
        "key": "Ganyu"
    },
    {
        "id": "albedo_038",
        "key": "Albedo"
    },
    {
        "id": "diona_039",
        "key": "Diona"
    },
    {
        "id": "mona_041",
        "key": "Mona"
    },
    {
        "id": "keqing_042",
        "key": "Keqing"
    },
    {
        "id": "sucrose_043",
        "key": "Sucrose"
    },
    {
        "id": "xinyan_044",
        "key": "Xinyan"
    },
    {
        "id": "rosaria_045",
        "key": "Rosaria"
    },
    {
        "id": "hutao_046",
        "key": "HuTao"
    },
    {
        "id": "kazuha_047",
        "key": "KaedeharaKazuha"
    },
    {
        "id": "feiyan_048",
        "key": "Yanfei"
    },
    {
        "id": "yoimiya_049",
        "key": "Yoimiya"
    },
    {
        "id": "tohma_050",
        "key": "Thoma"
    },
    {
        "id": "eula_051",
        "key": "Eula"
    },
    {
        "id": "shougun_052",
        "key": "RaidenShogun"
    },
    {
        "id": "sayu_053",
        "key": "Sayu"
    },
    {
        "id": "kokomi_054",
        "key": "SangonomiyaKokomi"
    },
    {
        "id": "gorou_055",
        "key": "Gorou"
    },
    {
        "id": "sara_056",
        "key": "KujouSara"
    },
    {
        "id": "itto_057",
        "key": "AratakiItto"
    },
    {
        "id": "yae_058",
        "key": "YaeMiko"
    },
    {
        "id": "heizo_059",
        "key": "ShikanoinHeizou"
    },
    {
        "id": "yelan_060",
        "key": "Yelan"
    },
    {
        "id": "momoka_061",
        "key": "Kirara"
    },
    {
        "id": "aloy_062",
        "key": "Aloy"
    },
    {
        "id": "shenhe_063",
        "key": "Shenhe"
    },
    {
        "id": "yunjin_064",
        "key": "YunJin"
    },
    {
        "id": "shinobu_065",
        "key": "KukiShinobu"
    },
    {
        "id": "ayato_066",
        "key": "KamisatoAyato"
    },
    {
        "id": "collei_067",
        "key": "Collei"
    },
    {
        "id": "dori_068",
        "key": "Dori"
    },
    {
        "id": "tighnari_069",
        "key": "Tighnari"
    },
    {
        "id": "nilou_070",
        "key": "Nilou"
    },
    {
        "id": "cyno_071",
        "key": "Cyno"
    },
    {
        "id": "candace_072",
        "key": "Candace"
    },
    {
        "id": "nahida_073",
        "key": "Nahida"
    },
    {
        "id": "layla_074",
        "key": "Layla"
    },
    {
        "id": "wanderer_075",
        "key": "Wanderer"
    },
    {
        "id": "faruzan_076",
        "key": "Faruzan"
    },
    {
        "id": "yaoyao_077",
        "key": "Yaoyao"
    },
    {
        "id": "alhatham_078",
        "key": "Alhaitham"
    },
    {
        "id": "dehya_079",
        "key": "Dehya"
    },
    {
        "id": "mika_080",
        "key": "Mika"
    },
    {
        "id": "kaveh_081",
        "key": "Kaveh"
    },
    {
        "id": "baizhuer_082",
        "key": "Baizhu"
    }
]

# https://genshin.honeyhunterworld.com/img/mika_080_icon_70.webp?x40228
# https://genshin.honeyhunterworld.com/img/dehya_079_side_icon_70.webp?x40228

with open("icon_urls.txt", "w") as f:
    for c in char_configs:
        f.write(
            f'https://genshin.honeyhunterworld.com/img/{c["id"]}_icon_70.webp?x40228 {c["key"]}.webp\n')

with open("side_icon_urls.txt", "w") as f:
    for c in char_configs:
        f.write(
            f'https://genshin.honeyhunterworld.com/img/{c["id"]}_side_icon_70.webp?x40228 {c["key"]}.webp\n')
