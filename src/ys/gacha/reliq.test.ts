import { expect, test } from "vitest";
import {
    getIncreAffnumPdf,
    getIncreAffnumMinMaxAvg,
    getAffnumPdf,
} from "./reliq";
import { moment } from "./utils";

const weight = {
    hp: 0,
    atk: 0,
    def: 0,
    hpp: 0,
    atkp: 1,
    defp: 0,
    em: 0,
    er: 1 / 3,
    cr: 1 / 2,
    cd: 1,
};

test("Incremental Affnum PDF", () => {
    const pdf1 = getIncreAffnumPdf("atkp", weight, 8);
    expect(moment(pdf1, 0)).toBeCloseTo(1);
    expect(moment(pdf1, 1)).toBeCloseTo(367406465531 / 34247584800);
    const pdf2 = getIncreAffnumPdf("atkp", weight, 0);
    expect(moment(pdf2, 0)).toBeCloseTo(1);
    expect(moment(pdf2, 1)).toBeCloseTo(0);
    const pdf3 = getIncreAffnumPdf("atkp", weight, 1);
    expect(moment(pdf3, 0)).toBeCloseTo(1);
    expect(moment(pdf3, 1)).toBeCloseTo(119 / 96);
});

test("Incremental Affnum PDF with fixed minors", () => {
    const pdf1 = getIncreAffnumPdf("atkp", weight, 6, ["cr", "atk"]);
    expect(moment(pdf1, 0)).toBeCloseTo(1);
    expect(moment(pdf1, 1)).toBeCloseTo(5358179 / 585900);
    const pdf2 = getIncreAffnumPdf("atkp", weight, 4, [
        "cr",
        "atk",
        "hp",
        "em",
    ]);
    expect(moment(pdf2, 0)).toBeCloseTo(1);
    expect(moment(pdf2, 1)).toBeCloseTo(17 / 4);
    const pdf3 = getIncreAffnumPdf("atkp", weight, 0, ["cr", "atk"]);
    expect(moment(pdf3, 0)).toBeCloseTo(1);
    expect(moment(pdf3, 1)).toBeCloseTo(0);
});

test("Min/max/avg of affnum", () => {
    expect(getIncreAffnumMinMaxAvg("atkp", weight, 0, [])).toEqual({
        min: 0,
        max: 0,
        avg: 0,
    });
    const result = getIncreAffnumMinMaxAvg("atkp", weight, 4, []);
    expect(result.min).toBeCloseTo(0);
    expect(result.max).toBeCloseTo(11 / 6);
    expect(result.avg).toBeCloseTo(367406465531 / 34247584800 / 20);
});

test("Affnum PDF", () => {
    const pdf1 = getAffnumPdf("atkp", weight, 5);
    expect(moment(pdf1, 0)).toBeCloseTo(1);
    expect(moment(pdf1, 1)).toBeCloseTo(
        ((367406465531 / 34247584800) * 41) / 40
    );
    const pdf2 = getAffnumPdf("atkp", weight, 3);
    expect(moment(pdf2, 0)).toBeCloseTo(1);
    expect(moment(pdf2, 1)).toBeCloseTo(2571845258717 / 456634464000);
});
