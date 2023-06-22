import { Artifact } from "../artifact";
import { ArtifactData } from "../data";

class Ord {
    private data: { [key: string]: number } = {};
    set(key: string, value: number) {
        this.data[key] = value;
    }
    get(key: string) {
        if (key in this.data) return this.data[key];
        else return -1;
    }
}

const SetOrd = new Ord();
const SlotOrd = new Ord();
const MainOrd = new Ord();

ArtifactData.setKeys.forEach((set, i) => SetOrd.set(set, i));
ArtifactData.slotKeys.forEach((slot, i) => SlotOrd.set(slot, i));
ArtifactData.mainKeys.all.forEach((main, i) => MainOrd.set(main, i));

/**
 * 按套装、部位、主词条、等级为关键字的标准排序
 * @param arts 待排序的圣遗物列表，会被修改
 */
export function sort(arts: Artifact[]) {
    arts.sort((a, b) => {
        let delta = 0;

        delta = SetOrd.get(a.set) - SetOrd.get(b.set);
        if (delta) return delta;

        delta = SlotOrd.get(a.slot) - SlotOrd.get(b.slot);
        if (delta) return delta;

        delta = MainOrd.get(a.mainKey) - MainOrd.get(b.mainKey);
        if (delta) return delta;

        return -a.level + b.level;
    });
}
