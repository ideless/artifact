import { Affix, Artifact } from "../artifact";
import { whatis, assert } from "../utils";

const keymap = {
    set: <{ [key: string]: string }>{
        Instructor: "instructor",
        GladiatorsFinale: "gladiatorFinale",
        WanderersTroupe: "wandererTroupe",
        Thundersoother: "thunderSmoother",
        ThunderingFury: "thunderingFury",
        MaidenBeloved: "maidenBeloved",
        ViridescentVenerer: "viridescentVenerer",
        CrimsonWitchOfFlames: "crimsonWitch",
        Lavawalker: "lavaWalker",
        NoblesseOblige: "noblesseOblige",
        BloodstainedChivalry: "bloodstainedChivalry",
        ArchaicPetra: "archaicPetra",
        RetracingBolide: "retracingBolide",
        BlizzardStrayer: "blizzardStrayer",
        HeartOfDepth: "heartOfDepth",
        TenacityOfTheMillelith: "tenacityOfTheMillelith",
        PaleFlame: "paleFlame",
        ShimenawasReminiscence: "shimenawaReminiscence",
        EmblemOfSeveredFate: "emblemOfSeveredFate",
        HuskOfOpulentDreams: "huskOfOpulentDreams",
        OceanHuedClam: "oceanHuedClam",
        VermillionHereafter: "VermillionHereafter",
        EchoesOfAnOffering: "EchoesOfAnOffering",
        DeepwoodMemories: "DeepwoodMemories",
        GildedDreams: "GildedDreams",
        DesertPavilionChronicle: "DesertPavilionChronicle",
        FlowerOfParadiseLost: "FlowerOfParadiseLost",
        NymphsDream: "NymphsDream",
        VourukashasGlow: "VourukashasGlow",
    },
    affix: <{ [key: string]: string }>{
        hp: "lifeStatic",
        atk: "attackStatic",
        def: "defendStatic",
        hpp: "lifePercentage",
        atkp: "attackPercentage",
        defp: "defendPercentage",
        em: "elementalMastery",
        er: "recharge",
        hb: "cureEffect",
        cr: "critical",
        cd: "criticalDamage",
        pyroDB: "fireBonus",
        hydroDB: "waterBonus",
        electroDB: "thunderBonus",
        anemoDB: "windBonus",
        cryoDB: "iceBonus",
        geoDB: "rockBonus",
        physicalDB: "physicalBonus",
        dendroDB: "dendroBonus",
    },
    slot: <{ [key: string]: string }>{
        flower: "flower",
        plume: "feather",
        sands: "sand",
        goblet: "cup",
        circlet: "head",
    },
};

function getAffix(key: string, value: number) {
    key = whatis(key, keymap.affix) as string;
    if (!["hp", "atk", "def", "em"].includes(key)) {
        value = value * 100;
        value = parseFloat(value.toFixed(1));
    }
    return new Affix({ key, value });
}

export default {
    loads(json: string) {
        let mona = JSON.parse(json);
        // assert(mona.version == '1', 'Unsupported version')
        assert(mona instanceof Object);
        let ret = [];
        const mtypes = ["flower", "feather", "sand", "cup", "head"];
        for (let mtype of mtypes) {
            assert(mtype in mona && mona[mtype] instanceof Array);
            for (let martifact of mona[mtype]) {
                if (martifact["star"] < 4) continue;
                let set = whatis(martifact["setName"], keymap.set);
                if (!set) {
                    console.warn(
                        `Ignoring unrecognized artifact: ${martifact["setName"]}`
                    );
                    continue;
                }
                let artifact = new Artifact();
                artifact.set = set;
                artifact.slot = whatis(mtype, keymap.slot) as string;
                artifact.level = martifact["level"];
                artifact.rarity = martifact["star"];
                artifact.mainKey = whatis(
                    martifact["mainTag"]["name"],
                    keymap.affix
                ) as string;
                for (let ma of martifact["normalTags"]) {
                    artifact.minors.push(getAffix(ma["name"], ma["value"]));
                }
                artifact.data.index = ret.length;
                artifact.data.source = "*/mona";
                // artifact.validate()
                ret.push(artifact);
            }
        }
        return ret;
    },
    dumps(artifacts: Artifact[]) {
        let mona: { [key: string]: any[] } = {
            flower: [],
            feather: [],
            sand: [],
            cup: [],
            head: [],
        };
        for (let a of artifacts) {
            let type = keymap.slot[a.slot],
                mainStats = a.mainStats;
            if (!mainStats) continue;
            mona[type].push({
                setName: keymap.set[a.set],
                position: type,
                mainTag: {
                    name: keymap.affix[a.mainKey],
                    value: ["hp", "atk", "em"].includes(a.mainKey)
                        ? mainStats[a.level]
                        : mainStats[a.level] / 100,
                },
                normalTags: a.minors.map((m) => ({
                    name: keymap.affix[m.key],
                    value: ["hp", "atk", "def", "em"].includes(m.key)
                        ? m.value
                        : m.value / 100,
                })),
                omit: false,
                star: a.rarity,
                level: a.level,
            });
        }
        return JSON.stringify(mona);
    },
};
