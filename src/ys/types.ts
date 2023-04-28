import { CharacterData, PresetData } from "./data";

export interface IWeight {
    [key: string]: number;
}

export type {
    // affnum
    ISetBonusTable,
    IAffixWeightTable,
    IAffnumResult,
    IAffnumResults,
    // pbuild
    IBuild,
    IPBuildResult,
    IPBuildResults,
    IPBuildSortBy,
    // defeat
    IDefeatResults,
    // pequip
    IPEquipResults,
} from "./sort";

export type IMinorAffixKey =
    | "hp"
    | "atk"
    | "def"
    | "hpp"
    | "atkp"
    | "defp"
    | "em"
    | "er"
    | "cr"
    | "cd";

export type ISlotKey = "flower" | "plume" | "sands" | "goblet" | "circlet";

export type ICharKey = keyof typeof CharacterData;

export type IPresetKey = keyof typeof PresetData;
