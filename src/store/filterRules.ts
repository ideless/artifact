import { Artifact } from "@/ys/artifact";

export default [
    {
        label: "无",
        accept: (_a: Artifact) => true,
    },
    {
        label: "三词条",
        accept: (a: Artifact) => {
            return a.minors.length === 3;
        },
    },
    {
        label: "四词条",
        accept: (a: Artifact) => {
            return a.minors.length === 4;
        },
    },
    {
        label: "三词条单暴",
        accept: (a: Artifact) => {
            if (a.minors.length != 3) return false;
            let cnt = 0;
            a.minors.forEach((m) => {
                if (m.key == "cr" || m.key == "cd") cnt++;
            });
            return cnt == 1;
        },
    },
    {
        label: "双暴",
        accept: (a: Artifact) => {
            let cnt = 0;
            a.minors.forEach((m) => {
                if (m.key == "cr" || m.key == "cd") cnt++;
            });
            return cnt == 2;
        },
    },
    {
        label: "垃圾",
        accept: (a: Artifact) => {
            const garbage = ["atk", "atkp", "hp", "hpp", "def", "defp"];
            if (garbage.includes(a.mainKey)) {
                let allGarbage = true;
                a.minors.forEach((m) => {
                    if (!garbage.includes(m.key)) allGarbage = false;
                });
                return allGarbage;
            }
            return false;
        },
    },
];
