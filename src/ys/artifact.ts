import { assert, choice } from "./utils";
import { ArtifactData } from "./data";

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
    rarity = 5;
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
    }
    validate() {
        assert(this.rarity == 5, "Only 5 star artifacts are supported");
        assert(
            [3, 4].includes(this.minors.length),
            "Invalid artifact: number of minors is not 3 or 4"
        );
        assert(
            this.level >= 0 && this.level <= 20,
            "Invalid artifact: invalid level"
        );
        assert(
            this.level < 4 || this.minors.length == 4,
            "Invalid artifact: number of minors is not 4"
        );
    }
    /**
     * 注意：要指定主词条(mainKey)，必须同时指定一个正确的位置(slot)
     */
    static rand({
        sets,
        slot,
        mainKey,
        init_3,
        level = 0,
    }: {
        sets?: string[];
        slot?: string;
        mainKey?: string;
        init_3?: boolean;
        level?: number;
    }) {
        let artifact = new Artifact();
        // 套装
        if (sets instanceof Array && sets.length) {
            artifact.set = choice(sets);
        }
        // 部位
        if (
            slot &&
            ["flower", "plume", "sands", "goblet", "circlet"].includes(slot)
        ) {
            artifact.slot = slot;
        } else {
            artifact.slot = choice([
                "flower",
                "plume",
                "sands",
                "goblet",
                "circlet",
            ]);
        }
        // 主词条
        if (mainKey && ArtifactData.mainKeys[artifact.slot].includes(mainKey)) {
            artifact.mainKey = mainKey;
        } else {
            let mains: string[] = [],
                main_prs: number[] = [];
            for (let key in ArtifactData.mainDistr[artifact.slot]) {
                mains.push(key);
                main_prs.push(ArtifactData.mainDistr[artifact.slot][key]);
            }
            artifact.mainKey = choice(mains, main_prs);
        }
        // 是否初始3词条
        if (init_3 == undefined) {
            init_3 = Math.random() < 0.8;
        }
        // 等级
        artifact.level = level;
        // 副词条列表
        let p_all =
            artifact.mainKey in ArtifactData.minorStat
                ? 1 - ArtifactData.minorDistr[artifact.mainKey]
                : 1;
        let all_minors: string[] = [],
            minor_prs: number[] = [];
        for (let m in ArtifactData.minorDistr)
            if (m != artifact.mainKey) {
                all_minors.push(m);
                minor_prs.push(ArtifactData.minorStat[m] / p_all);
            }
        let minor_keys = choice(all_minors, minor_prs, 4);
        let minor_values = [0, 0, 0, 0];
        for (let i = 0; i < 4; ++i) {
            minor_values[i] = 7 + choice(4);
        }
        let n_level_up = Math.floor(level / 4);
        if (init_3) n_level_up--;
        for (let i = 0; i < n_level_up; ++i) {
            let j = choice(4);
            let k = 7 + choice(4);
            minor_values[j] += k;
        }
        let len = init_3 && level < 4 ? 3 : 4;
        for (let i = 0; i < len; ++i) {
            artifact.minors.push(
                new Affix({
                    key: minor_keys[i],
                    value:
                        (minor_values[i] / 10) *
                        ArtifactData.minorStat[minor_keys[i]],
                })
            );
        }
        return artifact;
    }
}
