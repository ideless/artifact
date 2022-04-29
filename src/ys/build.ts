export interface IBuild {
        set: {
            2: string[]
            4: string[]
        }
        main: {
            [slotKey: string]: string[]
        }
}
interface IBuildExt extends IBuild {
    minors: string
}

export default <{ [charKey: string]: IBuildExt }>{
    Noelle: {
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
        minors: 'cd,cr,defp,er'
    },
    Ningguang: {
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
        minors: 'atkp,cd,cr'
    },
    Zhongli: {
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
        minors: 'atkp,cd,cr,er,hpp'
    },
    Albedo: {
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
        minors: 'cd,cr,defp'
    },
    AratakiItto: {
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
        minors: 'atkp,cd,cr,defp,er'
    },
    Gorou: {
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
        minors: 'cr,defp,em,er'
    },
    TravelerGeo: {
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
        minors: 'atkp,cd,cr'
    },
    YunJin: {
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
        minors: 'cr,defp,em,er'
    },
    Diluc: {
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
        minors: 'atkp,cd,cr,em'
    },
    HuTao: {
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
        minors: 'atkp,cd,cr,em,hpp'
    },
    Klee: {
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
        minors: 'atkp,cd,cr,em'
    },
    Xiangling: {
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
        minors: 'atkp,cd,cr,em,er'
    },
    Bennett: {
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
        minors: 'er,hpp'
    },
    Yanfei: {
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
        minors: 'atkp,cd,cr,em'
    },
    Amber: {
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
        minors: 'atkp,cd,cr,em'
    },
    Xinyan: {
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
        minors: 'atkp,cd,cr,defp,er'
    },
    Yoimiya: {
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
        minors: 'atkp,cd,cr,em'
    },
    Thoma: {
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
        minors: 'cr,er,hpp'
    },
    Tartaglia: {
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
        minors: 'atkp,cd,cr,em'
    },
    Xingqiu: {
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
        minors: 'atkp,cd,cr,em,er'
    },
    Mona: {
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
        minors: 'atkp,cd,cr,em,er'
    },
    Barbara: {
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
        minors: 'er,hpp'
    },
    SangonomiyaKokomi: {
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
        minors: 'atkp,em,er,hpp'
    },
    KamisatoAyato: {
        set: {2:[],
            4:["EchoesOfAnOffering", "GladiatorsFinale", "HeartOfDepth"]},
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['atkp'],
            goblet: ['hydroDB'],
            circlet: ['cr', 'cd']
        },
        minors: 'atkp,cd,cr,em,er'
    },
    Ganyu: {
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
        minors: 'atkp,cd,cr,er'
    },
    Qiqi: {
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
        minors: 'atkp,er'
    },
    KamisatoAyaka: {
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
        minors: 'atkp,cd,cr,er'
    },
    Chongyun: {
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
        minors: 'atkp,cd,cr,em'
    },
    Rosaria: {
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
        minors: 'atkp,cd,cr,er'
    },
    Kaeya: {
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
        minors: 'atkp,cd,cr'
    },
    Eula: {
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
        minors: 'atkp,cd,cr,er'
    },
    Diona: {
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
        minors: 'er,hpp'
    },
    Aloy: {
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
        minors: 'atkp,cd,cr,em,er'
    },
    Shenhe: {
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
        minors: 'atkp,cr,er'
    },
    Venti: {
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
        minors: 'atkp,cd,cr,em,er'
    },
    Jean: {
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
        minors: 'atkp,cd,cr,em,er'
    },
    Sucrose: {
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
        minors: 'atkp,cd,cr,em,er'
    },
    KaedeharaKazuha: {
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
        minors: 'atkp,cd,cr,em,er'
    },
    Xiao: {
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
        minors: 'atkp,cd,cr'
    },
    Sayu: {
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
        minors: 'atkp,em,er'
    },
    TravelerAnemo: {
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
        minors: 'atkp,cd,cr,em,er'
    },
    Keqing: {
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
        minors: 'atkp,cd,cr'
    },
    Razor: {
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
        minors: 'atkp,cd,cr'
    },
    Beidou: {
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
        minors: 'atkp,cd,cr,er'
    },
    Lisa: {
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
        minors: 'atkp,cd,cr,em,er'
    },
    Fischl: {
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
        minors: 'atkp,cd,cr,em'
    },
    RaidenShogun: {
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
        minors: 'atkp,cd,cr,er'
    },
    KujouSara: {
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
        minors: 'atkp,cd,cr,er'
    },
    TravelerElectro: {
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
        minors: 'atkp,cd,cr,em,er'
    }
}