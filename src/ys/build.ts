/**
 * Data parsed from https://ngabbs.com/read.php?tid=27859119
 * 权重经过了我的手动修改
 */

export interface IBuild {
    set: string[]
    main: {
        [slotKey: string]: string[]
    }
    weight: {
        [affixKey: string]: number
    }
}

interface IBuildExt extends IBuild {
    element: string
}

export default <{ [charKey: string]: IBuildExt }>{
    Noelle: {
        element: 'geo',
        set: ['RetracingBolide', 'GladiatorsFinale', 'HuskOfOpulentDreams'],
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['defp'],
            goblet: ['geoDB', 'defp'],
            circlet: ['cr', 'cd'],
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.25, defp: 0.5, em: 0, er: 0.5, cr: 1, cd: 1 },
    },
    Ningguang: {
        element: 'geo',
        set: ['ArchaicPetra', 'GladiatorsFinale', 'NoblesseOblige', 'ShimenawasReminiscence'],
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['atkp'],
            goblet: ['geoDB'],
            circlet: ['cr', 'cd'],
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0, er: 0.25, cr: 1, cd: 1 },
    },
    Zhongli: {
        element: 'geo',
        set: ['ArchaicPetra', 'ShimenawasReminiscence', 'GladiatorsFinale', 'NoblesseOblige', 'TenacityOfTheMillelith'],
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['hpp', 'atkp', 'er'],
            goblet: ['geoDB', 'hpp'],
            circlet: ['cr', 'cd', 'hpp'],
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0.5, atkp: 0.5, defp: 0, em: 0, er: 0.25, cr: 1, cd: 1 },
    },
    Albedo: {
        element: 'geo',
        set: ['ArchaicPetra', 'HuskOfOpulentDreams', 'TenacityOfTheMillelith'],
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['defp'],
            goblet: ['geoDB'],
            circlet: ['cr', 'cd', 'defp'],
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.25, defp: 0.5, em: 0, er: 0.25, cr: 1, cd: 1 },
    },
    AratakiItto: {
        element: 'geo',
        set: ['ArchaicPetra', 'HuskOfOpulentDreams'],
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['defp'],
            goblet: ['geoDB'],
            circlet: ['cr', 'cd'],
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0.5, em: 0, er: 0.5, cr: 1, cd: 1 },
    },
    Gorou: {
        element: 'geo',
        set: ['HuskOfOpulentDreams', 'EmblemOfSeveredFate', 'MaidenBeloved', 'OceanHuedClam', 'ArchaicPetra', 'NoblesseOblige'],
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['er'],
            goblet: ['defp'],
            circlet: ['defp', 'hb'],
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.25, defp: 1, em: 0.25, er: 1, cr: 0.5, cd: 0.25 },
    },
    YunJin: {
        element: 'geo',
        set: ['EmblemOfSeveredFate', 'NoblesseOblige', 'HuskOfOpulentDreams'],
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['defp', 'er'],
            goblet: ['defp'],
            circlet: ['defp'],
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.25, defp: 1, em: 0.25, er: 1, cr: 0.5, cd: 0.25 },
    },
    Diluc: {
        element: 'pyro',
        set: ['GladiatorsFinale', 'WanderersTroupe', 'ShimenawasReminiscence', 'CrimsonWitchOfFlames'],
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['atkp', 'em'],
            goblet: ['pyroDB'],
            circlet: ['cr', 'cd'],
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.25, cr: 1, cd: 1 },
    },
    HuTao: {
        element: 'pyro',
        set: ['TenacityOfTheMillelith', 'WanderersTroupe', 'RetracingBolide', 'ShimenawasReminiscence', 'CrimsonWitchOfFlames'],
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['hpp', 'em'],
            goblet: ['pyroDB'],
            circlet: ['cr', 'cd'],
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0.5, atkp: 0.25, defp: 0, em: 0.5, er: 0.25, cr: 1, cd: 1 },
    },
    Klee: {
        element: 'pyro',
        set: ["GladiatorsFinale", "WanderersTroupe", "RetracingBolide", "Lavawalker", "ShimenawasReminiscence", "CrimsonWitchOfFlames"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp"],
            goblet: ["pyroDB"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.25, er: 0.25, cr: 1, cd: 1 }
    },
    Xiangling: {
        element: 'pyro',
        set: ["NoblesseOblige", "ShimenawasReminiscence", "GladiatorsFinale", "WanderersTroupe", "EmblemOfSeveredFate", "CrimsonWitchOfFlames"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["em", "er", "atkp"],
            goblet: ["pyroDB"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.5, cr: 1, cd: 1 }
    },
    Bennett: {
        element: 'pyro',
        set: ["OceanHuedClam", "MaidenBeloved", "NoblesseOblige"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["er", "hpp"],
            goblet: ["hpp"],
            circlet: ["hb", "hpp"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 0.25, defp: 0, em: 0.25, er: 1, cr: 0.25, cd: 0.25 }
    },
    Yanfei: {
        element: 'pyro',
        set: ["", "RetracingBolide", "CrimsonWitchOfFlames", "WanderersTroupe"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp"],
            goblet: ["pyroDB"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.25, cr: 1, cd: 1 }
    },
    Amber: {
        element: 'pyro',
        set: ["CrimsonWitchOfFlames", "NoblesseOblige", "WanderersTroupe"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp"],
            goblet: ["pyroDB"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.25, er: 0.25, cr: 1, cd: 1 }
    },
    Xinyan: {
        element: 'pyro',
        set: ["PaleFlame", "GladiatorsFinale", "ShimenawasReminiscence", "RetracingBolide", "HuskOfOpulentDreams", "TenacityOfTheMillelith", "BloodstainedChivalry"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["defp", "atkp"],
            goblet: ["defp", "physicalDB"],
            circlet: ["cr", "cd", "defp"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0.5, em: 0, er: 0.5, cr: 1, cd: 1 }
    },
    Yoimiya: {
        element: 'pyro',
        set: ["GladiatorsFinale", "CrimsonWitchOfFlames", "RetracingBolide", "Lavawalker", "ShimenawasReminiscence"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp"],
            goblet: ["pyroDB"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.25, cr: 1, cd: 1 }
    },
    Thoma: {
        element: 'pyro',
        set: ["TenacityOfTheMillelith", "EmblemOfSeveredFate"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["er", "hpp"],
            goblet: ["hpp"],
            circlet: ["hpp"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 0.25, defp: 0, em: 0.25, er: 1, cr: 0.5, cd: 0.25 }
    },
    Tartaglia: {
        element: 'hydro',
        set: ["ShimenawasReminiscence", "NoblesseOblige", "GladiatorsFinale", "WanderersTroupe", "HeartOfDepth"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp", "er", "em"],
            goblet: ["hydroDB"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.25, cr: 1, cd: 1 }
    },
    Xingqiu: {
        element: 'hydro',
        set: ["GladiatorsFinale", "NoblesseOblige", "HeartOfDepth", "ShimenawasReminiscence", "EmblemOfSeveredFate"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp", "er"],
            goblet: ["hydroDB"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.5, cr: 1, cd: 1 }
    },
    Mona: {
        element: 'hydro',
        set: ["HeartOfDepth", "WanderersTroupe", "EmblemOfSeveredFate", "NoblesseOblige", "TenacityOfTheMillelith"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["er"],
            goblet: ["atkp"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.25, er: 0.5, cr: 1, cd: 1 }
    },
    Barbara: {
        element: 'hydro',
        set: ["TenacityOfTheMillelith", "MaidenBeloved", "NoblesseOblige", "OceanHuedClam"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["er", "hpp"],
            goblet: ["hpp"],
            circlet: ["hb", "hpp"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 0.25, defp: 0, em: 0.25, er: 1, cr: 0.5, cd: 0.25 }
    },
    SangonomiyaKokomi: {
        element: 'hydro',
        set: ["MaidenBeloved", "OceanHuedClam", "TenacityOfTheMillelith", "HeartOfDepth"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["hpp", "er"],
            goblet: ["hydroDB", "hpp"],
            circlet: ["hb"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 0.5, defp: 0, em: 0.5, er: 0.5, cr: 0, cd: 0 }
    },
    /*
    KamisatoAyato: {
        element: 'hydro',
        set: ["EchoesOfAnOffering", "GladiatorsFinale", "HeartOfDepth"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["hpp", "er"],
            goblet: ["hydroDB", "hpp"],
            circlet: ["hb"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0.25, atkp: 0.5, defp: 0, em: 0.25, er: 0.25, cr: 1, cd: 1 }
    },
    */
    Ganyu: {
        element: 'cryo',
        set: ["NoblesseOblige", "GladiatorsFinale", "ShimenawasReminiscence", "EmblemOfSeveredFate", "BlizzardStrayer", "WanderersTroupe"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp"],
            goblet: ["cryoDB"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.25, er: 0.25, cr: 1, cd: 1 }
    },
    Qiqi: {
        element: 'cryo',
        set: ["EmblemOfSeveredFate", "MaidenBeloved", "NoblesseOblige", "OceanHuedClam", "TenacityOfTheMillelith"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["er", "atkp"],
            goblet: ["atkp"],
            circlet: ["hb", "atkp"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 1, defp: 0, em: 0, er: 1, cr: 0.25, cd: 0.25 }
    },
    KamisatoAyaka: {
        element: 'cryo',
        set: ["GladiatorsFinale", "NoblesseOblige", "ShimenawasReminiscence", "EmblemOfSeveredFate", "BlizzardStrayer"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp"],
            goblet: ["cryoDB"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.25, er: 0.5, cr: 1, cd: 1 }
    },
    Chongyun: {
        element: 'cryo',
        set: ["BlizzardStrayer", "EmblemOfSeveredFate", "Lavawalker", "NoblesseOblige"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp"],
            goblet: ["cryoDB"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.25, cr: 1, cd: 1 }
    },
    Rosaria: {
        element: 'cryo',
        set: ["GladiatorsFinale", "ShimenawasReminiscence", "BlizzardStrayer", "BloodstainedChivalry", "EmblemOfSeveredFate", "PaleFlame", "NoblesseOblige"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp", "er"],
            goblet: ["cryoDB", "physicalDB"],
            circlet: ["cr"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.25, er: 0.5, cr: 1, cd: 1 }
    },
    Kaeya: {
        element: 'cryo',
        set: ["NoblesseOblige", "BloodstainedChivalry", "EmblemOfSeveredFate", "PaleFlame", "GladiatorsFinale", "BlizzardStrayer"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp", "er"],
            goblet: ["cryoDB", "physicalDB", "atkp"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.25, er: 0.25, cr: 1, cd: 1 }
    },
    Eula: {
        element: 'cryo',
        set: ["GladiatorsFinale", "BloodstainedChivalry", "ShimenawasReminiscence", "PaleFlame"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp"],
            goblet: ["physicalDB"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0, er: 0.5, cr: 1, cd: 1 }
    },
    Diona: {
        element: 'cryo',
        set: ["OceanHuedClam", "TenacityOfTheMillelith", "MaidenBeloved", "NoblesseOblige"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["hpp", "er"],
            goblet: ["hpp"],
            circlet: ["hpp", "hb"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 0, defp: 0, em: 0, er: 1, cr: 0.5, cd: 0.25 }
    },
    Aloy: {
        element: 'cryo',
        set: ["GladiatorsFinale", "ShimenawasReminiscence", "EmblemOfSeveredFate", "NoblesseOblige", "BlizzardStrayer"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp", "er", "em"],
            goblet: ["cryoDB"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.25, er: 0.25, cr: 1, cd: 1 }
    },
    Shenhe: {
        element: 'cryo',
        set: ["ShimenawasReminiscence", "GladiatorsFinale", "NoblesseOblige"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp", "er"],
            goblet: ["atkp"],
            circlet: ["atkp"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 1, defp: 0, em: 0.25, er: 0.5, cr: 0.5, cd: 0.25 }
    },
    Venti: {
        element: 'anemo',
        set: ["", "ViridescentVenerer"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp", "er", "em"],
            goblet: ["anemoDB", "em"],
            circlet: ["cr", "cd", "em"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.5, cr: 1, cd: 1 }
    },
    Jean: {
        element: 'anemo',
        set: ["ShimenawasReminiscence", "OceanHuedClam", "GladiatorsFinale", "ViridescentVenerer", "NoblesseOblige", "MaidenBeloved"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp", "er"],
            goblet: ["anemoDB", "atkp"],
            circlet: ["cr", "cd", "atkp", "hb"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.25, er: 0.5, cr: 1, cd: 1 }
    },
    Sucrose: {
        element: 'anemo',
        set: ["GladiatorsFinale", "NoblesseOblige", "ShimenawasReminiscence", "ViridescentVenerer"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["em", "er", "atkp"],
            goblet: ["em", "anemoDB"],
            circlet: ["cr", "cd", "em"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.25, defp: 0, em: 1, er: 0.5, cr: 0.5, cd: 0.25 }
    },
    KaedeharaKazuha: {
        element: 'anemo',
        set: ["", "ViridescentVenerer"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["em", "atkp"],
            goblet: ["anemoDB", "em", "atkp"],
            circlet: ["cr", "cd", "em", "atkp"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 1, er: 0.5, cr: 0.5, cd: 0.5 }
    },
    Xiao: {
        element: 'anemo',
        set: ["ViridescentVenerer", "GladiatorsFinale", "ShimenawasReminiscence", ""],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp"],
            goblet: ["anemoDB", "atkp"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.25, er: 0.25, cr: 1, cd: 1 }
    },
    Sayu: {
        element: 'anemo',
        set: ["ShimenawasReminiscence", "OceanHuedClam", "ViridescentVenerer", "MaidenBeloved"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["em", "er", "atkp"],
            goblet: ["em", "anemoDB"],
            circlet: ["em", "hb", "atkp"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 1, defp: 0, em: 0.5, er: 1, cr: 0.5, cd: 0.25 }
    },
    Keqing: {
        element: 'eletro',
        set: ["GladiatorsFinale", "NoblesseOblige", "BloodstainedChivalry", "PaleFlame", "Thundersoother", "ShimenawasReminiscence", "ThunderingFury"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp"],
            goblet: ["electroDB", "physicalDB"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.25, er: 0.25, cr: 1, cd: 1 }
    },
    Razor: {
        element: 'eletro',
        set: ["ShimenawasReminiscence", "BloodstainedChivalry", "PaleFlame", "GladiatorsFinale"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp"],
            goblet: ["physicalDB"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.25, er: 0.25, cr: 1, cd: 1 }
    },
    Beidou: {
        element: 'eletro',
        set: ["GladiatorsFinale", "ShimenawasReminiscence", "EmblemOfSeveredFate", "NoblesseOblige", "ThunderingFury"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp", "er"],
            goblet: ["electroDB", "atkp"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.25, er: 0.5, cr: 1, cd: 1 }
    },
    Lisa: {
        element: 'eletro',
        set: ["WanderersTroupe", "EmblemOfSeveredFate", "ThunderingFury"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp", "em", "er"],
            goblet: ["electroDB", "atkp", "em"],
            circlet: ["cr", "cd", "em"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.5, cr: 1, cd: 1 }
    },
    Fischl: {
        element: 'eletro',
        set: ["PaleFlame", "ThunderingFury", "GladiatorsFinale", "BloodstainedChivalry", "ShimenawasReminiscence", "Thundersoother", "TenacityOfTheMillelith"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp"],
            goblet: ["electroDB", "physicalDB"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.5, cr: 1, cd: 1 }
    },
    RaidenShogun: {
        element: 'eletro',
        set: ["", "EmblemOfSeveredFate"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["er", "atkp"],
            goblet: ["electroDB", "atkp"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.25, er: 0.5, cr: 1, cd: 1 }
    },
    KujouSara: {
        element: 'eletro',
        set: ["GladiatorsFinale", "ThunderingFury", "ShimenawasReminiscence", "EmblemOfSeveredFate", "NoblesseOblige"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["er", "atkp"],
            goblet: ["electroDB", "atkp"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.25, er: 0.5, cr: 1, cd: 1 }
    },
    YaeMiko: {
        element: 'eletro',
        set: ["ShimenawasReminiscence", "GladiatorsFinale", "ThunderingFury", "Thundersoother", "TenacityOfTheMillelith"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp"],
            goblet: ["electroDB"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.5, cr: 1, cd: 1 }
    },
    /*
    TravelerAnemo: {
        element: 'anemo',
        set: ["", "ViridescentVenerer"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp", "em"],
            goblet: ["anemoDB", "em"],
            circlet: ["cr", "cd", "em"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.25, defp: 0, em: 1, er: 1, cr: 0.5, cd: 0.25 }
    },
    TravelerGeo: {
        element: 'geo',
        set: ["GladiatorsFinale", "ShimenawasReminiscence", "ArchaicPetra", "NoblesseOblige"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["atkp"],
            goblet: ["geoDB"],
            circlet: ["cr", "cd"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0, er: 0.25, cr: 1, cd: 1 }
    },
    TravelerElectro: {
        element: 'eletro',
        set: ["ShimenawasReminiscence", "GladiatorsFinale", "WanderersTroupe", "EmblemOfSeveredFate", "NoblesseOblige"],
        main: {
            flower: ["hp"],
            plume: ["atk"],
            sands: ["er"],
            goblet: ["atkp", "em"],
            circlet: ["cr", "cd", "em"]
        },
        weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.5, cr: 1, cd: 1 }
    }
    */
}
