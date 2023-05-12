import { Artifact } from "../artifact";
import { assert, whatis } from "../utils";
import { ArtifactData } from "../data";

interface IGoodFormat {
    format: "GOOD";
    version: number;
    source: string;
    artifacts?: Array<{
        setKey: string;
        slotKey: string;
        level: number;
        rarity: number;
        mainStatKey: string;
        location: string;
        lock: boolean;
        substats: Array<{
            key: string;
            value: number;
        }>;
    }>;
}

const keymap = {
    affix: <{ [key: string]: string }>{
        hp: "hp",
        atk: "atk",
        def: "def",
        hpp: "hp_",
        atkp: "atk_",
        defp: "def_",
        em: "eleMas",
        er: "enerRech_",
        hb: "heal_",
        cr: "critRate_",
        cd: "critDMG_",
        pyroDB: "pyro_dmg_",
        hydroDB: "hydro_dmg_",
        electroDB: "electro_dmg_",
        anemoDB: "anemo_dmg_",
        cryoDB: "cryo_dmg_",
        geoDB: "geo_dmg_",
        physicalDB: "physical_dmg_",
        dendroDB: "dendro_dmg_",
    },
};

export default {
    loads(json: string) {
        let good = JSON.parse(json) as IGoodFormat;
        assert(typeof good == "object" && "artifacts" in good);
        assert(good.artifacts instanceof Array);
        let source = (good.source || "*") + "/good";
        let result: Artifact[] = [],
            allSetKeys = new Set(ArtifactData.setKeys);
        good.artifacts!.forEach((a, i) => {
            if (a.rarity < 4) return;
            if (!allSetKeys.has(a.setKey)) {
                console.warn(`Ignoring unrecognized artifact: ${a.setKey}`);
                return;
            }
            let artifact = new Artifact({
                set: a.setKey,
                slot: a.slotKey,
                level: a.level,
                rarity: a.rarity,
                location: a.location,
                lock: a.lock,
                mainKey: whatis(a.mainStatKey, keymap.affix) as string,
                minors: a.substats.map((x) => ({
                    key: whatis(x.key, keymap.affix),
                    value: x.value,
                })),
            });
            artifact.data.index = i;
            artifact.data.source = source;
            // artifact.validate()
            result.push(artifact);
        });
        return result;
    },
    dumps(artifacts: Artifact[]) {
        let good: IGoodFormat = {
            format: "GOOD",
            version: 1,
            source: "",
            artifacts: artifacts.map((a) => ({
                setKey: a.set,
                slotKey: a.slot,
                level: a.level,
                rarity: a.rarity,
                lock: a.lock,
                location: a.location,
                mainStatKey: keymap.affix[a.mainKey],
                substats: a.minors.map((m) => ({
                    key: keymap.affix[m.key],
                    value: m.value,
                })),
            })),
        };
        return JSON.stringify(good);
    },
};
