import { Affix, Artifact } from "../artifact";
import { whatis, assert } from "../utils";

interface IMonaTag {
    name: string;
    value: number;
}

interface IMonaArtifact {
    setName: string;
    position: string;
    mainTag: IMonaTag;
    normalTags: IMonaTag[];
    star: number;
    level: number;
    omit?: boolean;
    equip?: string;
}

interface IMonaFormat {
    version?: string;
    flower?: IMonaArtifact[];
    feather?: IMonaArtifact[];
    sand?: IMonaArtifact[];
    cup?: IMonaArtifact[];
    head?: IMonaArtifact[];
}

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
        let mona = JSON.parse(json) as IMonaFormat;
        // assert(mona.version == '1', 'Unsupported version')
        assert(mona instanceof Object);
        let result: Artifact[] = [],
            mona_positions = [
                "flower",
                "feather",
                "sand",
                "cup",
                "head",
            ] as const;
        mona_positions.forEach((key) => {
            assert(key in mona && mona[key] instanceof Array);
            mona[key]!.forEach((a) => {
                if (a.star < 4) return;
                let set = whatis(a.setName, keymap.set);
                if (!set) {
                    console.warn(
                        `Ignoring unrecognized artifact: ${a.setName}`
                    );
                    return;
                }
                let artifact = new Artifact({
                    set,
                    slot: whatis(a.position, keymap.slot) as string,
                    level: a.level,
                    rarity: a.star,
                    mainKey: whatis(a.mainTag.name, keymap.affix) as string,
                    minors: a.normalTags.map((t) => getAffix(t.name, t.value)),
                });
                artifact.data.source = "*/mona";
                result.push(artifact);
            });
        });
        return result;
    },
    dumps(artifacts: Artifact[]) {
        let mona: IMonaFormat = {
            flower: [],
            feather: [],
            sand: [],
            cup: [],
            head: [],
        };
        for (let a of artifacts) {
            let position = keymap.slot[a.slot],
                mainStats = a.mainStats;
            if (!mainStats) continue;
            mona[position as "cup"]!.push({
                setName: keymap.set[a.set],
                position: position,
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
