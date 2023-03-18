import type { IBuild } from "@/ys/types";
import { CharacterData } from "@/ys/data";
import { isSame } from "./utils";
import { i18n } from "@/i18n";

function createBuildFromData(key: string) {
    if (!(key in CharacterData)) return undefined;
    let c = CharacterData[key].build;
    return {
        key,
        name: i18n.global.t("character." + key),
        set: [...c.set],
        main: {
            sands: { ...c.main.sands },
            goblet: { ...c.main.goblet },
            circlet: { ...c.main.circlet },
        },
        weight: { ...c.weight },
    };
}

function isCustomizedBuild(b: IBuild) {
    if (!(b.key in CharacterData)) return true;

    let c = createBuildFromData(b.key)!;
    if (b.name !== c.name) return true;
    if (!isSame(b.set, c.set)) return true;
    if (!isSame(b.main.sands, c.main.sands)) return true;
    if (!isSame(b.main.goblet, c.main.goblet)) return true;
    if (!isSame(b.main.circlet, c.main.circlet)) return true;
    if (!isSame(b.weight, c.weight)) return true;

    return false;
}

export function fixStorage() {
    // sort
    if (localStorage.getItem("sort.by") !== null) {
        // default value
        let sort = {
            by: "avg",
            weight: {
                hp: 0,
                atk: 0,
                def: 0,
                hpp: 0,
                atkp: 0.5,
                defp: 0,
                em: 0.5,
                er: 0.5,
                cr: 1,
                cd: 1,
            },
            buildKeys: [] as string[],
            set: [] as string[],
            sands: [] as string[],
            goblet: [] as string[],
            circlet: [] as string[],
        };
        // old values
        if (localStorage.getItem("sort.by") !== null) {
            sort.by = localStorage.getItem("sort.by")!;
            localStorage.removeItem("sort.by");
        }
        if (localStorage.getItem("sort.buildKeys") !== null) {
            sort.buildKeys = JSON.parse(
                localStorage.getItem("sort.buildKeys")!
            );
            localStorage.removeItem("sort.buildKeys");
        }
        if (localStorage.getItem("selected_build_keys") !== null) {
            localStorage.removeItem("selected_build_keys");
        }
        if (localStorage.getItem("sort.scoreAlg") !== null) {
            localStorage.removeItem("sort.scoreAlg");
        }
        if (localStorage.getItem("sort.sets") !== null) {
            sort.set = JSON.parse(localStorage.getItem("sort.sets")!);
            localStorage.removeItem("sort.sets");
        }
        if (localStorage.getItem("sort.sands") !== null) {
            sort.sands = JSON.parse(localStorage.getItem("sort.sands")!);
            localStorage.removeItem("sort.sands");
        }
        if (localStorage.getItem("sort.goblet") !== null) {
            sort.goblet = JSON.parse(localStorage.getItem("sort.goblet")!);
            localStorage.removeItem("sort.goblet");
        }
        if (localStorage.getItem("sort.circlet") !== null) {
            sort.circlet = JSON.parse(localStorage.getItem("sort.circlet")!);
            localStorage.removeItem("sort.circlet");
        }
        if (localStorage.getItem("weight") !== null) {
            sort.weight = JSON.parse(localStorage.getItem("weight")!);
            localStorage.removeItem("weight");
        }
        localStorage.setItem("sort", JSON.stringify(sort));
    }

    // yas
    if (localStorage.getItem("yas_version") !== null) {
        localStorage.setItem(
            "yas.version",
            localStorage.getItem("yas_version")!
        );
        localStorage.removeItem("yas_version");
    }
    if (localStorage.getItem("yas_config") !== null) {
        localStorage.setItem("yas.config", localStorage.getItem("yas_config")!);
        localStorage.removeItem("yas_config");
    }

    // artMode
    if (localStorage.getItem("artMode.showAffnum")) {
        let artMode = {
            normalize: false,
            reverseOrder: false,
            alikeEnabled: true,
        };
        if (localStorage.getItem("artMode.showAffnum") !== null) {
            artMode.normalize =
                localStorage.getItem("artMode.showAffnum") === "true";
            localStorage.removeItem("artMode.showAffnum");
        }
        if (localStorage.getItem("artMode.reverseOrder") !== null) {
            artMode.reverseOrder =
                localStorage.getItem("artMode.reverseOrder") === "true";
            localStorage.removeItem("artMode.reverseOrder");
        }
        if (localStorage.getItem("artMode.alikeEnabled") !== null) {
            artMode.alikeEnabled =
                localStorage.getItem("artMode.alikeEnabled") === "true";
            localStorage.removeItem("artMode.alikeEnabled");
        }
        localStorage.setItem("art_mode", JSON.stringify(artMode));
        if (localStorage.getItem("artMode.useMaxAsUnit") !== null) {
            localStorage.setItem(
                "affnum_multiplier_key",
                localStorage.getItem("artMode.useMaxAsUnit")! ? "1/0.85" : "1"
            );
            localStorage.removeItem("artMode.useMaxAsUnit");
        }
    }

    // builds
    if (localStorage.getItem("builds") !== null) {
        let builds = JSON.parse(localStorage.getItem("builds")!) as IBuild[];
        let customizedBuilds = builds.filter(isCustomizedBuild);
        localStorage.setItem(
            "customized_builds",
            JSON.stringify(customizedBuilds)
        );
        localStorage.removeItem("builds");
    }
}
