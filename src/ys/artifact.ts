import { assert, choice } from "./utils";
import { ArtifactData } from "./data";
import type { ISlotKey, IMinorAffixKey } from "./types";

export class Affix {
    key = "";
    value = 0;
    constructor(obj?: any) {
        if (obj) {
            this.key = obj.key;
            this.value = obj.value;
        }
    }
    valueString() {
        if (["hp", "atk", "def", "em"].includes(this.key)) {
            return this.value.toFixed(0);
        } else {
            return this.value.toFixed(1) + "%";
        }
    }
}

export class Artifact {
    set = "";
    slot = "";
    rarity = 5; // 4, 5
    level = 0;
    lock = false;
    location = "";
    mainKey = "";
    minors: Affix[] = [];
    data = {
        index: -Math.random(), // 圣遗物唯一标识，如果是导入的圣遗物就是导入数据中的序号，否则一般是Math.random()生成的随机数取相反数（因为想和导入的圣遗物在“不排序”时区分开）
        source: "", // 圣遗物数据来源，例如"good"，内部生成的source为''
        lock: false, // 导入数据中圣遗物的原本加解锁信息，用来识别在本工具中做过的修改
    };
    constructor(o?: any) {
        if (!o || typeof o != "object") return;
        Object.keys(o).forEach((key) => {
            if (this.hasOwnProperty(key) && key != "minors" && key != "data") {
                (this as any)[key] = o[key];
            }
        });
        this.minors = [];
        if (o.minors instanceof Array) {
            for (let m of o.minors) {
                this.minors.push(new Affix(m));
            }
        }
        this.data.lock = this.lock;

        this.validate();
    }

    validate() {
        if (this.rarity != 4 && this.rarity != 5) {
            throw new Error("Invalid rarity");
        }
    }

    get mainStats() {
        let mainStatsAll;

        if (this.rarity === 5) {
            mainStatsAll = ArtifactData.mainStatsR5;
        } else if (this.rarity === 4) {
            mainStatsAll = ArtifactData.mainStatsR4;
        } else {
            throw new Error("Invalid rarity");
        }

        if (this.mainKey in mainStatsAll) {
            return mainStatsAll[this.mainKey as keyof typeof mainStatsAll];
        } else if (this.mainKey.endsWith("DB")) {
            return mainStatsAll.elementalDB;
        } else {
            return undefined;
        }
    }

    get minorStats() {
        if (this.rarity === 5) {
            return ArtifactData.minorStatsR5;
        } else if (this.rarity === 4) {
            return ArtifactData.minorStatsR4;
        } else {
            throw new Error("Invalid rarity");
        }
    }

    get nMinorsUpgraded() {
        return Math.floor(this.level / 4);
    }

    get nMinorsToUpgrade() {
        return this.rarity - this.nMinorsUpgraded;
    }

    static rand({
        set,
        slot,
        mainKey,
        rarity = 5,
        level = 0,
    }: {
        set?: string;
        slot?: string;
        mainKey?: string;
        rarity?: number;
        level?: number;
    }) {
        let A = new Artifact();
        // set
        if (set) {
            assert(ArtifactData.setKeys.includes(set), "Invalid set key");
            A.set = set;
        } else {
            A.set = choice(ArtifactData.setKeys);
        }
        // slot
        if (slot) {
            assert(ArtifactData.slotKeys.includes(slot), "Invalid slot key");
            A.slot = slot;
        } else {
            A.slot = choice(ArtifactData.slotKeys);
        }
        // main affix
        if (mainKey) {
            assert(
                // ArtifactData.mainKeys[
                //     A.slot as keyof typeof ArtifactData.mainKeys
                // ].includes(mainKey),
                ArtifactData.mainKeys.all.includes(mainKey),
                "Invalid main key"
            );
            A.mainKey = mainKey;
        } else {
            A.mainKey = choice(
                Object.keys(ArtifactData.mainProbs[A.slot as ISlotKey]),
                Object.values(ArtifactData.mainProbs[A.slot as ISlotKey])
            );
        }
        // rarity
        assert([4, 5].includes(rarity), "Invalid rarity");
        A.rarity = rarity;
        // level
        assert(
            Number.isInteger(level) && level >= 0 && level <= 4 * rarity,
            "Invalid level"
        );
        A.level = level;
        // minor affixes
        let nMinorsInit = Math.random() < 0.8 ? A.rarity - 2 : A.rarity - 1,
            nMinorsUpgrade = Math.floor(A.level / 4),
            nMinors = nMinorsInit + nMinorsUpgrade,
            minorStats =
                A.rarity == 5
                    ? ArtifactData.minorStatsR5
                    : ArtifactData.minorStatsR4;
        A.minors = choice(
            ArtifactData.minorKeys.filter((k) => k != A.mainKey),
            Object.entries(ArtifactData.minorPickWeights)
                .filter((e) => e[0] != A.mainKey)
                .map((e) => e[1]),
            Math.min(nMinors, 4)
        ).map(
            (key) =>
                new Affix({
                    key,
                    value:
                        minorStats[key as IMinorAffixKey] *
                        choice([0.7, 0.8, 0.9, 1.0]),
                })
        );
        for (let _ = 4; _ < nMinors; ++_) {
            let minor = choice(A.minors);
            minor.value +=
                minorStats[minor.key as IMinorAffixKey] *
                choice([0.7, 0.8, 0.9, 1.0]);
        }
        return A;
    }
}
