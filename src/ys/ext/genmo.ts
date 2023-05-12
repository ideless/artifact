import { Affix, Artifact } from "../artifact";
import { whatis, assert } from "../utils";

type IGenmoFormat = Array<{
    asKey: string;
    rarity: number;
    slot: string;
    level: number;
    mainStat: string;
    subStat1Type: string;
    subStat1Value: number;
    subStat2Type: string;
    subStat2Value: number;
    subStat3Type: string;
    subStat3Value: number;
    subStat4Type?: string;
    subStat4Value?: number;
}>;

const keymap = {
    set: <{ [key: string]: string }>{
        Instructor: "instructor",
        GladiatorsFinale: "gladiators_finale",
        WanderersTroupe: "wanderers_troupe",
        Thundersoother: "thundersoother",
        ThunderingFury: "thundering_fury",
        MaidenBeloved: "maiden_beloved",
        ViridescentVenerer: "viridescent_venerer",
        CrimsonWitchOfFlames: "crimson_witch_of_flames",
        Lavawalker: "lavawalker",
        NoblesseOblige: "noblesse_oblige",
        BloodstainedChivalry: "bloodstained_chivalry",
        ArchaicPetra: "archaic_petra",
        RetracingBolide: "retracing_bolide",
        BlizzardStrayer: "blizzard_walker",
        HeartOfDepth: "heart_of_depth",
        TenacityOfTheMillelith: "tenacity_of_the_millelith",
        PaleFlame: "pale_flame",
        ShimenawasReminiscence: "reminiscence_of_shime",
        EmblemOfSeveredFate: "seal_of_insulation",
        HuskOfOpulentDreams: "husk_of_opulent_dreams",
        OceanHuedClam: "divine_chorus",
        VermillionHereafter: "vermillion_hereafter",
        EchoesOfAnOffering: "echoes_of_an_offering",
        DeepwoodMemories: "deepwood_memories",
        GildedDreams: "gilded_dreams",
        DesertPavilionChronicle: "desert_pavilion_chronicle",
        FlowerOfParadiseLost: "flower_of_paradise_lost",
        NymphsDream: "nymphs_dream",
        VourukashasGlow: "vourukashas_glow",
    },
    affix: <{ [key: string]: string }>{
        hp: "flatHP",
        atk: "flatATK",
        def: "flatDEF",
        hpp: "percentHP",
        atkp: "percentATK",
        defp: "percentDEF",
        em: "elementalMastery",
        er: "energyRecharge",
        hb: "healing",
        cr: "critRate",
        cd: "critDamage",
        pyroDB: "pyroDamage",
        hydroDB: "hydroDamage",
        electroDB: "electroDamage",
        anemoDB: "anemoDamage",
        cryoDB: "cryoDamage",
        geoDB: "geoDamage",
        physicalDB: "physicalDamage",
        dendroDB: "dendroDamage",
    },
    slot: <{ [key: string]: string }>{
        flower: "flower",
        plume: "plume",
        sands: "eon",
        goblet: "goblet",
        circlet: "circlet",
    },
};

function getSubStatType(artifact: Artifact, index: number) {
    if (index < artifact.minors.length) {
        return keymap.affix[artifact.minors[index].key];
    } else {
        return "flatATK";
    }
}

function getSubStatValue(artifact: Artifact, index: number) {
    if (index < artifact.minors.length) {
        return artifact.minors[index].value;
    } else {
        return 0;
    }
}

export default {
    loads(json: string) {
        let genmo = JSON.parse(json) as IGenmoFormat;
        assert(genmo instanceof Array);
        let result: Artifact[] = [];
        genmo.forEach((a, i) => {
            if (a.rarity < 4) return;
            let set = whatis(a.asKey, keymap.set);
            if (!set) {
                console.warn(`Ignoring unrecognized artifact: ${a.asKey}`);
                return;
            }
            let artifact = new Artifact({
                set,
                slot: whatis(a.slot, keymap.slot) as string,
                level: a.level,
                rarity: a.rarity,
                mainKey: whatis(a.mainStat, keymap.affix) as string,
            });
            artifact.minors.push(
                new Affix({
                    key: whatis(a.subStat1Type, keymap.affix),
                    value: a.subStat1Value,
                })
            );
            artifact.minors.push(
                new Affix({
                    key: whatis(a.subStat2Type, keymap.affix),
                    value: a.subStat2Value,
                })
            );
            artifact.minors.push(
                new Affix({
                    key: whatis(a.subStat3Type, keymap.affix),
                    value: a.subStat3Value,
                })
            );
            if (a.subStat4Value) {
                artifact.minors.push(
                    new Affix({
                        key: whatis(a.subStat4Type!, keymap.affix),
                        value: a.subStat4Value,
                    })
                );
            }
            artifact.data.index = i;
            artifact.data.source = "*/genmo";
            // artifact.validate()
            result.push(artifact);
        });
        return result;
    },
    dumps(artifacts: Artifact[]) {
        let genmo: IGenmoFormat = artifacts.map((a) => ({
            asKey: keymap.set[a.set],
            rarity: a.rarity,
            slot: keymap.slot[a.slot],
            level: a.level,
            mainStat: keymap.affix[a.mainKey],
            subStat1Type: getSubStatType(a, 0),
            subStat1Value: getSubStatValue(a, 0),
            subStat2Type: getSubStatType(a, 1),
            subStat2Value: getSubStatValue(a, 1),
            subStat3Type: getSubStatType(a, 2),
            subStat3Value: getSubStatValue(a, 2),
            subStat4Type: getSubStatType(a, 3),
            subStat4Value: getSubStatValue(a, 3),
        }));
        return JSON.stringify(genmo);
    },
};
