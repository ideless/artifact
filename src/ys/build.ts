/**
 * Data parsed from https://ngabbs.com/read.php?tid=27859119
 */

interface IBuild {
    [characterKey: string]: {
        set: {
            2: string[]
            4: string[]
        }
        main: {
            [slotKey: string]: string[]
        }
        minors: string
        // weight: number
    }
}

export default <IBuild>{
    Noelle: {
        set: {
            2: [''],
            4: ['RetracingBolide', 'GladiatorsFinale', 'HuskOfOpulentDreams']
        },
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['defp'],
            goblet: ['geoDB', 'defp'],
            circlet: ['cr', 'cd']
        },
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.25,"defp":0.5,"em":0,"er":0.5,"cr":1,"cd":1}'
    },
    Ningguang: {
        set: {
            2: ['ArchaicPetra', 'GladiatorsFinale', 'NoblesseOblige', 'ShimenawasReminiscence'],
            4: ['']
        },
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['atkp'],
            goblet: ['geoDB'],
            circlet: ['cr', 'cd']
        },
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0,"er":0.25,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0.5,"atkp":0.5,"defp":0,"em":0,"er":0.25,"cr":1,"cd":1}'
    },
    Albedo: {
        set: {
            2: [''],
            4: ['ArchaicPetra', 'HuskOfOpulentDreams', 'TenacityOfTheMillelith']
        },
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['defp'],
            goblet: ['geoDB'],
            circlet: ['cr', 'cd', 'defp']
        },
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.25,"defp":0.5,"em":0,"er":0.25,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0.5,"em":0,"er":0.5,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.25,"defp":1,"em":0.25,"er":1,"cr":0.5,"cd":0.25}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.25,"defp":1,"em":0.25,"er":1,"cr":0.5,"cd":0.25}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.5,"er":0.25,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0.5,"atkp":0.25,"defp":0,"em":0.5,"er":0.25,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.25,"er":0.25,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.5,"er":0.5,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":1,"atkp":0.25,"defp":0,"em":0.25,"er":1,"cr":0.25,"cd":0.25}'
    },
    Yanfei: {
        set: {
            2: [''],
            4: ['RetracingBolide', 'CrimsonWitchOfFlames', 'WanderersTroupe']
        },
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['atkp'],
            goblet: ['pyroDB'],
            circlet: ['cr', 'cd']
        },
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.5,"er":0.25,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.25,"er":0.25,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0.5,"em":0,"er":0.5,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.5,"er":0.25,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":1,"atkp":0.25,"defp":0,"em":0.25,"er":1,"cr":0.5,"cd":0.25}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.5,"er":0.25,"cr":1,"cd":1}'
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
            circlet: ['cr', 'cd']
        },
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.5,"er":0.5,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.25,"er":0.5,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":1,"atkp":0.25,"defp":0,"em":0.25,"er":1,"cr":0.5,"cd":0.25}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":1,"atkp":0.5,"defp":0,"em":0.5,"er":0.5,"cr":0,"cd":0}'
    },
    KamisatoAyato: {
        set: {
            2: [],
            4: ['EchoesOfAnOffering', 'GladiatorsFinale', 'HeartOfDepth']
        },
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['hpp', 'er'],
            goblet: ['hydroDB', 'hpp'],
            circlet: ['hb']
        },
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0.25,"atkp":0.5,"defp":0,"em":0.25,"er":0.25,"cr":1,"cd":1}'
    },
    Ganyu: {
        set: {
            2: ['NoblesseOblige', 'GladiatorsFinale', 'ShimenawasReminiscence'],
            4: ['EmblemOfSeveredFate', 'BlizzardStrayer', 'WanderersTroupe']
        },
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['atkp'],
            goblet: ['cryoDB'],
            circlet: ['cr', 'cd']
        },
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.25,"er":0.25,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":1,"defp":0,"em":0,"er":1,"cr":0.25,"cd":0.25}'
    },
    KamisatoAyaka: {
        set: {
            2: ['GladiatorsFinale', 'NoblesseOblige', 'ShimenawasReminiscence'],
            4: ['EmblemOfSeveredFate', 'BlizzardStrayer']
        },
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['atkp'],
            goblet: ['cryoDB'],
            circlet: ['cr', 'cd']
        },
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.25,"er":0.5,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.5,"er":0.25,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.25,"er":0.5,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.25,"er":0.25,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0,"er":0.5,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":1,"atkp":0,"defp":0,"em":0,"er":1,"cr":0.5,"cd":0.25}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.25,"er":0.25,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":1,"defp":0,"em":0.25,"er":0.5,"cr":0.5,"cd":0.25}'
    },
    Venti: {
        set: {
            2: [''],
            4: ['ViridescentVenerer']
        },
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['atkp', 'er', 'em'],
            goblet: ['anemoDB', 'em'],
            circlet: ['cr', 'cd', 'em']
        },
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.5,"er":0.5,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.25,"er":0.5,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.25,"defp":0,"em":1,"er":0.5,"cr":0.5,"cd":0.25}'
    },
    KaedeharaKazuha: {
        set: {
            2: [''],
            4: ['ViridescentVenerer']
        },
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['em', 'atkp'],
            goblet: ['anemoDB', 'em', 'atkp'],
            circlet: ['cr', 'cd', 'em', 'atkp']
        },
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":1,"er":0.5,"cr":0.5,"cd":0.5}'
    },
    Xiao: {
        set: {
            2: ['ViridescentVenerer', 'GladiatorsFinale', 'ShimenawasReminiscence'],
            4: ['']
        },
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['atkp'],
            goblet: ['anemoDB', 'atkp'],
            circlet: ['cr', 'cd']
        },
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.25,"er":0.25,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":1,"defp":0,"em":0.5,"er":1,"cr":0.5,"cd":0.25}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.25,"er":0.25,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.25,"er":0.25,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.25,"er":0.5,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.5,"er":0.5,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.5,"er":0.5,"cr":1,"cd":1}'
    },
    RaidenShogun: {
        set: {
            2: [''],
            4: ['EmblemOfSeveredFate']
        },
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['er', 'atkp'],
            goblet: ['electroDB', 'atkp'],
            circlet: ['cr', 'cd']
        },
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.25,"er":0.5,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.25,"er":0.5,"cr":1,"cd":1}'
    },
    YaeMiko: {
        set: {
            2: ['ShimenawasReminiscence', 'GladiatorsFinale'],
            4: ['ThunderingFury', 'Thundersoother', 'TenacityOfTheMillelith']
        },
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['atkp'],
            goblet: ['electroDB'],
            circlet: ['cr', 'cd']
        },
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.5,"er":0.5,"cr":1,"cd":1}'
    },
    TravelerAnemo: {
        set: {
            2: [''],
            4: ['ViridescentVenerer']
        },
        main: {
            flower: ['hp'],
            plume: ['atk'],
            sands: ['atkp', 'em'],
            goblet: ['anemoDB', 'em'],
            circlet: ['cr', 'cd', 'em']
        },
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.25,"defp":0,"em":1,"er":1,"cr":0.5,"cd":0.25}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0,"er":0.25,"cr":1,"cd":1}'
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
        minors: '{"hp":0,"atk":0,"def":0,"hpp":0,"atkp":0.5,"defp":0,"em":0.5,"er":0.5,"cr":1,"cd":1}'
    }
}
