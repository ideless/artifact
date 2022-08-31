export interface IBuild {
    set: {
        2: string[]
        4: string[]
    }
    main: {
        [slotKey: string]: string[]
    }
}
interface ICharacterData {
    [key: string]: {
        element: string
        rarity: number
        presets: string[]
        build: IBuild
    }
}

export default <ICharacterData>{
    Albedo: {
        element: "geo",
        rarity: 5,
        presets: ['阿贝多 | 辰砂之纺锤 | 华馆4 | 防岩暴',
            '阿贝多 | 辰砂之纺锤 | 磐岩4 | 防岩暴',
            '阿贝多 | 辰砂之纺锤 | 千岩4 | 防岩暴',],
        build: {
            set: {
                2: [],
                4: ['ArchaicPetra', 'HuskOfOpulentDreams', 'TenacityOfTheMillelith']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['defp'],
                goblet: ['geoDB'],
                circlet: ['cr', 'cd', 'defp']
            },
        },
    },
    Aloy: {
        element: "cryo",
        rarity: 5,
        presets: ['埃洛伊 | 西风猎弓 | 2冰风2角斗 | 攻冰暴',],
        build: {
            set: {
                2: ['GladiatorsFinale', 'ShimenawasReminiscence'],
                4: ['EmblemOfSeveredFate', 'NoblesseOblige', 'BlizzardStrayer']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp', 'er', 'em'],
                goblet: ['cryoDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Amber: {
        element: "pyro",
        rarity: 4,
        presets: ['安柏 | 终末嗟叹之诗 | 宗室4 | 攻火暴',
            '安柏 | 阿莫斯之弓 | 乐团4 | 攻火暴',],
        build: {
            set: {
                2: ['CrimsonWitchOfFlames'],
                4: ['NoblesseOblige', 'WanderersTroupe']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp'],
                goblet: ['pyroDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    AratakiItto: {
        element: "geo",
        rarity: 5,
        presets: ['荒泷一斗 | 赤角石溃杵 | 华馆4 | 防岩暴',
            '荒泷一斗 | 螭骨剑 | 华馆4 | 防岩暴',
            '荒泷一斗 | 白影剑 | 华馆4 | 防岩暴',],
        build: {
            set: {
                2: ['ArchaicPetra'],
                4: ['HuskOfOpulentDreams']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['defp'],
                goblet: ['geoDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Barbara: {
        element: "hydro",
        rarity: 4,
        presets: ['芭芭拉 | 不灭月华 | 少女4 | 生生治',
            '芭芭拉 | 讨龙英杰谭 | 少女4 | 生生治',
            '芭芭拉 | 试做金珀 | 少女4 | 生生治',],
        build: {
            set: {
                2: ['TenacityOfTheMillelith'],
                4: ['MaidenBeloved', 'NoblesseOblige', 'OceanHuedClam']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['er', 'hpp'],
                goblet: ['hpp'],
                circlet: ['hb', 'hpp']
            },
        },
    },
    Beidou: {
        element: "electro",
        rarity: 4,
        presets: ['北斗 | 狼的末路 | 旗印4 | 充雷暴',
            '北斗 | 螭骨剑 | 旗印4 | 充攻暴',],
        build: {
            set: {
                2: ['GladiatorsFinale', 'ShimenawasReminiscence'],
                4: ['EmblemOfSeveredFate', 'NoblesseOblige', 'ThunderingFury']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp', 'er'],
                goblet: ['electroDB', 'atkp'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Bennett: {
        element: "pyro",
        rarity: 4,
        presets: ['班尼特 | 风鹰剑 | 宗室4 | 充火暴',
            '班尼特 | 天空之刃 | 宗室4 | 充火暴',
            '班尼特 | 风鹰剑 | 少女4 | 充生治',
            '班尼特 | 天空之刃 | 少女4 | 充生治',],
        build: {
            set: {
                2: ['OceanHuedClam'],
                4: ['MaidenBeloved', 'NoblesseOblige']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['er', 'hpp'],
                goblet: ['hpp'],
                circlet: ['hb', 'hpp']
            },
        },
    },
    Chongyun: {
        element: "cryo",
        rarity: 4,
        presets: ['重云 | 狼的末路 | 2冰风2宗室 | 攻冰暴',
            '重云 | 螭骨剑 | 2冰风2宗室 | 攻冰暴',],
        build: {
            set: {
                2: ['BlizzardStrayer'],
                4: ['EmblemOfSeveredFate', 'Lavawalker', 'NoblesseOblige']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp'],
                goblet: ['cryoDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Collei:{
        element: "dendro",
        rarity: 4,
        presets: [],
        build: {
            set: {
                2: [''],
                4: ['DeepwoodMemories', 'EmblemOfSeveredFate', 'GildedDreams', 'NoblesseOblige']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp','er'],
                goblet: ['dendroDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Diluc: {
        element: "pyro",
        rarity: 5,
        presets: ['迪卢克 | 狼的末路 | 魔女4 | 精火暴',
            '迪卢克 | 螭骨剑 | 魔女4 | 攻火暴',],
        build: {
            set: {
                2: ['GladiatorsFinale', 'WanderersTroupe', 'ShimenawasReminiscence'],
                4: ['CrimsonWitchOfFlames']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp', 'em'],
                goblet: ['pyroDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Diona: {
        element: "cryo",
        rarity: 4,
        presets: ['迪奥娜 | 祭礼弓 | 2少女2千岩 | 生生生',],
        build: {
            set: {
                2: ['OceanHuedClam', 'TenacityOfTheMillelith'],
                4: ['MaidenBeloved', 'NoblesseOblige']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['hpp', 'er'],
                goblet: ['hpp'],
                circlet: ['hpp', 'hb']
            },
        },
    },
    Eula: {
        element: "cryo",
        rarity: 5,
        presets: ['优菈 | 松籁响起之时 | 苍白4 | 攻物暴',
            '优菈 | 狼的末路 | 苍白4 | 攻物暴',
            '优菈 | 螭骨剑 | 苍白4 | 攻物暴',],
        build: {
            set: {
                2: ['GladiatorsFinale', 'BloodstainedChivalry', 'ShimenawasReminiscence'],
                4: ['PaleFlame']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp'],
                goblet: ['physicalDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Fischl: {
        element: "electro",
        rarity: 4,
        presets: ['菲谢尔 | 绝弦 | 2如雷2角斗 | 攻雷暴',
            '菲谢尔 | 天空之翼 | 2如雷2角斗 | 攻雷暴',],
        build: {
            set: {
                2: ['PaleFlame', 'ThunderingFury', 'GladiatorsFinale', 'BloodstainedChivalry', 'ShimenawasReminiscence'],
                4: ['Thundersoother', 'TenacityOfTheMillelith']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp'],
                goblet: ['electroDB', 'physicalDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Ganyu: {
        element: "cryo",
        rarity: 5,
        presets: ['甘雨 | 阿莫斯之弓 | 冰风4 | 攻冰暴',
            '甘雨 | 破魔之弓 | 冰风4 | 攻冰暴',
            '甘雨 | 试做澹月 | 冰风4 | 攻冰暴',
            '甘雨 | 阿莫斯之弓 | 乐团4 | 攻冰暴',
            '甘雨 | 破魔之弓 | 乐团4 | 攻冰暴',
            '甘雨 | 试做澹月 | 乐团4 | 攻冰暴',],
        build: {
            set: {
                2: ['NoblesseOblige', 'GladiatorsFinale', 'ShimenawasReminiscence'],
                4: ['EmblemOfSeveredFate', 'BlizzardStrayer', 'WanderersTroupe']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp', 'er'],
                goblet: ['cryoDB', 'atkp'],
                circlet: ['cr', 'cd', 'atkp']
            },
        },
    },
    Gorou: {
        element: "geo",
        rarity: 4,
        presets: ['五郎 | 西风猎弓 | 流放4 | 充岩暴',],
        build: {
            set: {
                2: ['HuskOfOpulentDreams', 'EmblemOfSeveredFate', 'MaidenBeloved', 'OceanHuedClam', 'ArchaicPetra'],
                4: ['NoblesseOblige']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['er'],
                goblet: ['defp'],
                circlet: ['defp', 'hb']
            },
        },
    },
    HuTao: {
        element: "pyro",
        rarity: 5,
        presets: ['胡桃 | 护摩之杖 | 追忆4 | 生火暴',
            '胡桃 | 护摩之杖 | 追忆4 | 精火暴',
            '胡桃 | 匣里灭辰 | 追忆4 | 生火暴',
            '胡桃 | 匣里灭辰 | 追忆4 | 精火暴',
            '胡桃 | 护摩之杖 | 魔女4 | 生火暴',
            '胡桃 | 护摩之杖 | 魔女4 | 精火暴',
            '胡桃 | 匣里灭辰 | 魔女4 | 生火暴',
            '胡桃 | 匣里灭辰 | 魔女4 | 精火暴',],
        build: {
            set: {
                2: ['TenacityOfTheMillelith', 'WanderersTroupe'],
                4: ['RetracingBolide', 'ShimenawasReminiscence', 'CrimsonWitchOfFlames']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['hpp', 'em'],
                goblet: ['pyroDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Jean: {
        element: "anemo",
        rarity: 5,
        presets: ['琴 | 腐殖之剑 | 2翠绿2角斗 | 攻攻治',
            '琴 | 西风剑 | 2翠绿2角斗 | 攻攻治',
            '琴 | 风鹰剑 | 2翠绿2角斗 | 充攻治',],
        build: {
            set: {
                2: ['ShimenawasReminiscence', 'OceanHuedClam', 'GladiatorsFinale'],
                4: ['ViridescentVenerer', 'NoblesseOblige', 'MaidenBeloved']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp', 'er'],
                goblet: ['anemoDB', 'atkp'],
                circlet: ['cr', 'cd', 'atkp', 'hb']
            },
        },
    },
    KaedeharaKazuha: {
        element: "anemo",
        rarity: 5,
        presets: ['枫原万叶 | 苍古自由之誓 | 翠绿4 | 精精精',
            '枫原万叶 | 铁蜂刺 | 翠绿4 | 精精精',],
        build: {
            set: {
                2: [],
                4: ['ViridescentVenerer']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['em', 'atkp'],
                goblet: ['anemoDB', 'em', 'atkp'],
                circlet: ['cr', 'cd', 'em', 'atkp']
            },
        },
    },
    Kaeya: {
        element: "cryo",
        rarity: 4,
        presets: ['凯亚 | 西风剑 | 旗印4 | 攻冰暴',
            '凯亚 | 磐岩结绿 | 旗印4 | 充冰暴',],
        build: {
            set: {
                2: ['NoblesseOblige', 'BloodstainedChivalry'],
                4: ['EmblemOfSeveredFate', 'PaleFlame', 'GladiatorsFinale', 'BlizzardStrayer']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp', 'er'],
                goblet: ['cryoDB', 'physicalDB', 'atkp'],
                circlet: ['cr', 'cd']
            },
        },
    },
    KamisatoAyaka: {
        element: "cryo",
        rarity: 5,
        presets: ['神里绫华 | 雾切之回光 | 冰风4 | 攻冰暴',
            '神里绫华 | 天目影打刀 | 冰风4 | 攻冰暴',],
        build: {
            set: {
                2: ['GladiatorsFinale', 'NoblesseOblige', 'ShimenawasReminiscence'],
                4: ['EmblemOfSeveredFate', 'BlizzardStrayer']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp', 'er'],
                goblet: ['cryoDB', 'atkp'],
                circlet: ['cr', 'cd', 'atkp']
            },
        },
    },
    KamisatoAyato: {
        element: "hydro",
        rarity: 5,
        presets: ['神里绫人 | 波乱月白经津 | 余响4 | 攻水暴',
            '神里绫人 | 磐岩结绿 | 沉沦4 | 攻水暴',
            '神里绫人 | 黑剑 | 余响4 | 攻水暴',],
        build: {
            set: {
                2: [],
                4: ["EchoesOfAnOffering", "GladiatorsFinale", "HeartOfDepth"]
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp'],
                goblet: ['hydroDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Keqing: {
        element: "electro",
        rarity: 5,
        presets: ['刻晴 | 雾切之回光 | 2如雷2角斗 | 攻雷暴',
            '刻晴 | 磐岩结绿 | 2如雷2角斗 | 攻雷暴',
            '刻晴 | 匣里龙吟 | 2如雷2角斗 | 攻雷暴',],
        build: {
            set: {
                2: ['GladiatorsFinale', 'NoblesseOblige', 'BloodstainedChivalry'],
                4: ['PaleFlame', 'Thundersoother', 'ShimenawasReminiscence', 'ThunderingFury']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp'],
                goblet: ['electroDB', 'physicalDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Klee: {
        element: "pyro",
        rarity: 5,
        presets: ['可莉 | 四风原典 | 魔女4 | 攻火暴',
            '可莉 | 流浪乐章 | 魔女4 | 攻火暴',],
        build: {
            set: {
                2: ['GladiatorsFinale', 'WanderersTroupe'],
                4: ['RetracingBolide', 'Lavawalker', 'ShimenawasReminiscence', 'CrimsonWitchOfFlames']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp'],
                goblet: ['pyroDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    KujouSara: {
        element: "electro",
        rarity: 4,
        presets: ['九条裟罗 | 天空之翼 | 旗印4 | 充雷暴',
            '九条裟罗 | 祭礼弓 | 旗印4 | 充雷暴',],
        build: {
            set: {
                2: ['GladiatorsFinale', 'ThunderingFury', 'ShimenawasReminiscence'],
                4: ['EmblemOfSeveredFate', 'NoblesseOblige']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['er', 'atkp'],
                goblet: ['electroDB', 'atkp'],
                circlet: ['cr', 'cd']
            },
        },
    },
    KukiShinobu: {
        element: "electro",
        rarity: 4,
        presets: ['久岐忍 | 苍古自由之誓 | 千岩4 | 生生治',
            '久岐忍 | 铁蜂刺 | 千岩4 | 生生治',
            '久岐忍 | 西风剑 | 千岩4 | 生生治',],
        build: {
            set: {
                2: ["MaidenBeloved"],
                4: ["TenacityOfTheMillelith", "OceanHuedClam"],
            },
            main: {
                flower: ["hp"],
                plume: ["atk"],
                sands: ["em", "hpp"],
                goblet: ["em", "hpp"],
                circlet: ["hb", "em"]
            },
        },
    },
    Lisa: {
        element: "electro",
        rarity: 4,
        presets: ['丽莎 | 四风原典 | 2雷2角斗 | 攻雷暴',
            '丽莎 | 流浪乐章 | 宗室4 | 攻雷暴',],
        build: {
            set: {
                2: ['WanderersTroupe'],
                4: ['EmblemOfSeveredFate', 'ThunderingFury']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp', 'em', 'er'],
                goblet: ['electroDB', 'atkp', 'em'],
                circlet: ['cr', 'cd', 'em']
            },
        },
    },
    Mona: {
        element: "hydro",
        rarity: 5,
        presets: ['莫娜 | 流浪乐章 | 旗印4 | 攻水暴',
            '莫娜 | 讨龙英杰谭 | 宗室4 | 充水暴',
            '莫娜 | 试做金珀 | 宗室4 | 充水暴',],
        build: {
            set: {
                2: ['HeartOfDepth', 'WanderersTroupe'],
                4: ['EmblemOfSeveredFate', 'NoblesseOblige', 'TenacityOfTheMillelith']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['er'],
                goblet: ['atkp'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Ningguang: {
        element: "geo",
        rarity: 4,
        presets: ['凝光 | 四风原典 | 2磐岩2角斗 | 攻岩暴',
            '凝光 | 尘世之锁 | 2磐岩2角斗 | 攻岩暴',
            '凝光 | 流浪乐章 | 2磐岩2角斗 | 攻岩暴',],
        build: {
            set: {
                2: ['ArchaicPetra', 'GladiatorsFinale', 'NoblesseOblige', 'ShimenawasReminiscence'],
                4: []
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp'],
                goblet: ['geoDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Noelle: {
        element: "geo",
        rarity: 4,
        presets: ['诺艾尔 | 赤角石溃杵 | 华馆4 | 防岩暴',
            '诺艾尔 | 螭骨剑 | 华馆4 | 防岩暴',
            '诺艾尔 | 白影剑 | 华馆4 | 防岩暴',],
        build: {
            set: {
                2: [],
                4: ['RetracingBolide', 'GladiatorsFinale', 'HuskOfOpulentDreams']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['defp'],
                goblet: ['geoDB', 'defp'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Qiqi: {
        element: "cryo",
        rarity: 5,
        presets: ['七七 | 祭礼剑 | 海染4 | 攻攻治',
            '七七 | 风鹰剑 | 海染4 | 攻攻治',
            '七七 | 笛剑 | 海染4 | 攻攻治',],
        build: {
            set: {
                2: ['EmblemOfSeveredFate'],
                4: ['MaidenBeloved', 'NoblesseOblige', 'OceanHuedClam', 'TenacityOfTheMillelith']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['er', 'atkp'],
                goblet: ['atkp'],
                circlet: ['hb', 'atkp']
            },
        },
    },
    RaidenShogun: {
        element: "electro",
        rarity: 5,
        presets: ['雷电将军 | 薙草之稻光 | 旗印4 | 充雷暴',
            '雷电将军 | 渔获 | 旗印4 | 充攻暴',],
        build: {
            set: {
                2: [],
                4: ['EmblemOfSeveredFate']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['er', 'atkp'],
                goblet: ['electroDB', 'atkp'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Razor: {
        element: "electro",
        rarity: 4,
        presets: ['雷泽 | 螭骨剑 | 角斗4 | 攻物暴',
            '雷泽 | 狼的末路 | 角斗4 | 攻物暴',],
        build: {
            set: {
                2: ['ShimenawasReminiscence', 'BloodstainedChivalry'],
                4: ['PaleFlame', 'GladiatorsFinale']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp'],
                goblet: ['physicalDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Rosaria: {
        element: "cryo",
        rarity: 4,
        presets: ['罗莎莉亚 | 西风长枪 | 宗室4 | 攻冰暴',],
        build: {
            set: {
                2: ['GladiatorsFinale', 'ShimenawasReminiscence', 'BlizzardStrayer', 'BloodstainedChivalry'],
                4: ['EmblemOfSeveredFate', 'PaleFlame', 'NoblesseOblige']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp', 'er'],
                goblet: ['cryoDB', 'physicalDB'],
                circlet: ['cr']
            },
        },
    },
    SangonomiyaKokomi: {
        element: "hydro",
        rarity: 5,
        presets: ['珊瑚宫心海 | 不灭月华 | 海染4 | 生水治',
            '珊瑚宫心海 | 试做金珀 | 海染4 | 生水治',
            '珊瑚宫心海 | 讨龙英杰谭 | 千岩4 | 生生治',
            '珊瑚宫心海 | 试做金珀 | 千岩4 | 生生治',],
        build: {
            set: {
                2: ['MaidenBeloved'],
                4: ['OceanHuedClam', 'TenacityOfTheMillelith', 'HeartOfDepth']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['hpp', 'er'],
                goblet: ['hydroDB', 'hpp'],
                circlet: ['hb']
            },
        },
    },
    Sayu: {
        element: "anemo",
        rarity: 4,
        presets: ['早柚 | 狼的末路 | 翠绿4 | 精攻治',
            '早柚 | 西风大剑 | 翠绿4 | 精攻治',],
        build: {
            set: {
                2: ['ShimenawasReminiscence', 'OceanHuedClam'],
                4: ['ViridescentVenerer', 'MaidenBeloved']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['em', 'er', 'atkp'],
                goblet: ['em', 'anemoDB'],
                circlet: ['em', 'hb', 'atkp']
            },
        },
    },
    Shenhe: {
        element: "cryo",
        rarity: 5,
        presets: ['申鹤 | 息灾 | 2角斗2追忆 | 攻攻攻',
            '申鹤 | 薙草之稻光 | 2角斗2追忆 | 攻攻攻',
            '申鹤 | 天空之脊 | 2角斗2追忆 | 攻攻攻',
            '申鹤 | 西风长枪 | 2角斗2追忆 | 攻攻攻',],
        build: {
            set: {
                2: ['ShimenawasReminiscence', 'GladiatorsFinale'],
                4: ['NoblesseOblige']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp', 'er'],
                goblet: ['atkp'],
                circlet: ['atkp']
            },
        },
    },
    ShikanoinHeizou: {
        element: "anemo",
        rarity: 4,
        presets: ['鹿野院平藏 | 天空之卷 | 翠绿4 | 攻风暴',
            '鹿野院平藏 | 四风原典 | 翠绿4 | 攻风暴',
            '鹿野院平藏 | 匣里日月 | 翠绿4 | 攻风暴',],
        build: {
            set: {
                2: ["GladiatorsFinale", "ShimenawasReminiscence"],
                4: ["ViridescentVenerer", "EchoesOfAnOffering", "WanderersTroupe"]
            },
            main: {
                flower: ["hp"],
                plume: ["atk"],
                sands: ["atkp"],
                goblet: ["anemoDB"],
                circlet: ["cr", "cd"]
            },
        }
    },
    Sucrose: {
        element: "anemo",
        rarity: 4,
        presets: ['砂糖 | 祭礼残章 | 翠绿4 | 充精精',
            '砂糖 | 试做金珀 | 翠绿4 | 充精精',
            '砂糖 | 讨龙英杰谭 | 翠绿4 | 充精精',],
        build: {
            set: {
                2: ['GladiatorsFinale', 'NoblesseOblige', 'ShimenawasReminiscence'],
                4: ['ViridescentVenerer']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['em', 'er', 'atkp'],
                goblet: ['em', 'anemoDB'],
                circlet: ['cr', 'cd', 'em']
            },
        },
    },
    Tartaglia: {
        element: "hydro",
        rarity: 5,
        presets: ['达达利亚 | 冬极百星 | 2沉沦2乐团 | 攻水暴',
            '达达利亚 | 冬极百星 | 2沉沦2角斗 | 攻水暴',
            '达达利亚 | 天空之翼 | 2沉沦2角斗 | 攻水暴',
            '达达利亚 | 弓藏 | 2沉沦2角斗 | 攻水暴',
            '达达利亚 | 苍翠猎弓 | 2沉沦2角斗 | 攻水暴',],
        build: {
            set: {
                2: ['ShimenawasReminiscence', 'NoblesseOblige', 'GladiatorsFinale', 'WanderersTroupe'],
                4: ['HeartOfDepth']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp', 'er', 'em'],
                goblet: ['hydroDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Thoma: {
        element: "pyro",
        rarity: 4,
        presets: ['托马 | 西风长枪 | 2旗印2千岩 | 充生暴',
            '托马 | 黑缨枪 | 2旗印2千岩 | 充生生',],
        build: {
            set: {
                2: ['TenacityOfTheMillelith'],
                4: ['EmblemOfSeveredFate']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['er', 'hpp'],
                goblet: ['hpp'],
                circlet: ['hpp']
            },
        },
    },
    Tighnari:{
        element: "dendro",
        rarity: 5,
        presets: [],
        build: {
            set: {
                2: [''],
                4: ['DeepwoodMemories', 'WanderersTroupe', 'GildedDreams']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['em'],
                goblet: ['dendroDB'],
                circlet: ['cr', 'cd']
            },
        }
    },
    Traveler: {
        element: "",
        rarity: 5,
        presets: ['默认权重'],
        build: {
            set: {
                2: [''],
                4: ['']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['hpp', 'atkp', 'defp', 'em', 'er'],
                goblet: ['hpp', 'atkp', 'defp', 'em', 'pyroDB', 'hydroDB', 'electroDB', 'anemoDB', 'cryoDB', 'geoDB', 'physicalDB'],
                circlet: ['hpp', 'atkp', 'defp', 'em', 'hb', 'cr', 'cd']
            },
        }
    },
    TravelerAnemo: {
        element: "anemo",
        rarity: 5,
        presets: ['空/荧（风） | 西风剑 | 翠绿4 | 精精精',],
        build: {
            set: {
                2: [],
                4: ['ViridescentVenerer']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp', 'em'],
                goblet: ['anemoDB', 'em'],
                circlet: ['cr', 'cd', 'em']
            },
        },
    },
    TravelerGeo: {
        element: "geo",
        rarity: 5,
        presets: ['空/荧（岩） | 雾切之回光 | 2磐岩2角斗 | 攻岩暴',
            '空/荧（岩） | 磐岩结绿 | 2磐岩2角斗 | 攻岩暴',
            '空/荧（岩） | 黑剑 | 2磐岩2角斗 | 攻岩暴',],
        build: {
            set: {
                2: ['GladiatorsFinale', 'ShimenawasReminiscence'],
                4: ['ArchaicPetra', 'NoblesseOblige']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp'],
                goblet: ['geoDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    TravelerElectro: {
        element: "electro",
        rarity: 5,
        presets: ['空/荧（雷） | 西风剑 | 旗印4 | 充雷暴',],
        build: {
            set: {
                2: ['ShimenawasReminiscence', 'GladiatorsFinale', 'WanderersTroupe'],
                4: ['EmblemOfSeveredFate', 'NoblesseOblige']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['er'],
                goblet: ['atkp', 'em'],
                circlet: ['cr', 'cd', 'em']
            },
        }
    },
    TravelerDendro:{
        element: "dendro",
        rarity: 5,
        presets: [],
        build: {
            set: {
                2: ['WanderersTroupe', 'GildedDreams'],
                4: ['DeepwoodMemories', 'EmblemOfSeveredFate', 'NoblesseOblige']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['em'],
                goblet: ['dendroDB'],
                circlet: ['cr', 'cd']
            },
        }
    },
    Venti: {
        element: "anemo",
        rarity: 5,
        presets: ['温迪 | 终末嗟叹之诗 | 翠绿4 | 精精精',
            '温迪 | 西风猎弓 | 翠绿4 | 精精精',
            '温迪 | 绝弦 | 翠绿4 | 充精精',],
        build: {
            set: {
                2: [],
                4: ['ViridescentVenerer']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp', 'er', 'em'],
                goblet: ['anemoDB', 'em'],
                circlet: ['cr', 'cd', 'em']
            },
        },
    },
    Xiangling: {
        element: "pyro",
        rarity: 4,
        presets: ['香菱 | 薙草之稻光 | 旗印4 | 充火暴',
            '香菱 | 薙草之稻光 | 旗印4 | 精火暴',
            '香菱 | 天空之脊 | 旗印4 | 充火暴',
            '香菱 | 天空之脊 | 旗印4 | 精火暴',
            '香菱 | 渔获 | 旗印4 | 充火暴',
            '香菱 | 渔获 | 旗印4 | 精火暴',],
        build: {
            set: {
                2: ['NoblesseOblige', 'ShimenawasReminiscence', 'GladiatorsFinale', 'WanderersTroupe'],
                4: ['EmblemOfSeveredFate', 'CrimsonWitchOfFlames']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['em', 'er', 'atkp'],
                goblet: ['pyroDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Xiao: {
        element: "anemo",
        rarity: 5,
        presets: ['魈 | 和璞鸢 | 辰砂4 | 攻风暴',
            '魈 | 护摩之杖 | 辰砂4 | 攻风暴',
            '魈 | 决斗之枪 | 辰砂4 | 攻风暴',],
        build: {
            set: {
                2: ['ViridescentVenerer', 'GladiatorsFinale', 'ShimenawasReminiscence'],
                4: []
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp'],
                goblet: ['anemoDB', 'atkp'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Xingqiu: {
        element: "hydro",
        rarity: 4,
        presets: ['行秋 | 祭礼剑 | 2沉沦2宗室 | 攻水暴',
            '行秋 | 磐岩结绿 | 旗印4 | 充水暴',],
        build: {
            set: {
                2: ['GladiatorsFinale', 'NoblesseOblige', 'HeartOfDepth', 'ShimenawasReminiscence'],
                4: ['EmblemOfSeveredFate']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp', 'er'],
                goblet: ['hydroDB'],
                circlet: ['cr', 'cd', 'atkp']
            },
        },
    },
    Xinyan: {
        element: "pyro",
        rarity: 4,
        presets: ['辛焱 | 无工之剑 | 2苍白2骑士 | 攻物暴',
            '辛焱 | 白影剑 | 2苍白2骑士 | 攻物暴',
            '辛焱 | 祭礼大剑 | 千岩4 | 防防防',
            '辛焱 | 白影剑 | 千岩4 | 防防防',],
        build: {
            set: {
                2: ['PaleFlame', 'GladiatorsFinale', 'ShimenawasReminiscence'],
                4: ['RetracingBolide', 'HuskOfOpulentDreams', 'TenacityOfTheMillelith', 'BloodstainedChivalry']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['defp', 'atkp'],
                goblet: ['defp', 'physicalDB'],
                circlet: ['cr', 'cd', 'defp']
            },
        },
    },
    YaeMiko: {
        element: "electro",
        rarity: 5,
        presets: ['八重神子 | 神乐之真意 | 2如雷2角斗 | 攻雷暴',
            '八重神子 | 天空之卷 | 2如雷2角斗 | 攻雷暴',
            '八重神子 | 匣里日月 | 2如雷2角斗 | 攻雷暴',
            '八重神子 | 流浪乐章 | 2如雷2角斗 | 攻雷暴',],
        build: {
            "set": {
                2: ["ShimenawasReminiscence", "GladiatorsFinale"],
                4: ["ThunderingFury", "Thundersoother", "TenacityOfTheMillelith"],
            },
            "main": {
                "flower": ["hp"],
                "plume": ["atk"],
                "sands": ["atkp"],
                "goblet": ["electroDB"],
                "circlet": ["cr", "cd"]
            },
        },
    },
    Yanfei: {
        element: "pyro",
        rarity: 4,
        presets: ['烟绯 | 四风原典 | 乐团4 | 攻火暴',
            '烟绯 | 流浪乐章 | 乐团4 | 攻火暴',],
        build: {
            set: {
                2: [],
                4: ['RetracingBolide', 'CrimsonWitchOfFlames', 'WanderersTroupe']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp'],
                goblet: ['pyroDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Yelan: {
        element: "hydro",
        rarity: 5,
        presets: ['夜兰 | 若水 | 绝缘4 | 充水暴',
            '夜兰 | 若水 | 绝缘4 | 生水暴',
            '夜兰 | 终末嗟叹之诗 | 绝缘4 | 生水暴',
            '夜兰 | 西风猎弓 | 绝缘4 | 生水暴',],
        build: {
            set: {
                2: ["HeartOfDepth", "NoblesseOblige", "TenacityOfTheMillelith"],
                4: ["EmblemOfSeveredFate"]
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['hpp', 'er'],
                goblet: ['hydroDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    Yoimiya: {
        element: "pyro",
        rarity: 5,
        presets: ['宵宫 | 飞雷之弦振 | 追忆4 | 攻火暴',
            '宵宫 | 弓藏 | 追忆4 | 攻火暴',],
        build: {
            set: {
                2: ['GladiatorsFinale', 'CrimsonWitchOfFlames'],
                4: ['RetracingBolide', 'Lavawalker', 'ShimenawasReminiscence']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['atkp'],
                goblet: ['pyroDB'],
                circlet: ['cr', 'cd']
            },
        },
    },
    YunJin: {
        element: "geo",
        rarity: 4,
        presets: ['云堇 | 薙草之稻光 | 华馆4 | 防防防',
            '云堇 | 天空之脊 | 华馆4 | 防防防',
            '云堇 | 西风长枪 | 华馆4 | 防防暴'],
        build: {
            set: {
                2: ['EmblemOfSeveredFate'],
                4: ['NoblesseOblige', 'HuskOfOpulentDreams']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['defp', 'er'],
                goblet: ['defp'],
                circlet: ['defp']
            },
        },
    },
    Zhongli: {
        element: "geo",
        rarity: 5,
        presets: ['钟离 | 黑缨枪 | 千岩4 | 生生生',
            '钟离 | 护摩之杖 | 千岩4 | 生生生',
            '钟离 | 护摩之杖 | 2磐岩2宗室 | 生岩暴',],
        build: {
            set: {
                2: ['ArchaicPetra', 'ShimenawasReminiscence', 'GladiatorsFinale'],
                4: ['NoblesseOblige', 'TenacityOfTheMillelith']
            },
            main: {
                flower: ['hp'],
                plume: ['atk'],
                sands: ['hpp', 'atkp', 'er'],
                goblet: ['geoDB', 'hpp'],
                circlet: ['cr', 'cd', 'hpp']
            },
        },
    },
}