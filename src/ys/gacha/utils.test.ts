import { test, expect, bench } from "vitest";
import {
    range,
    zeros,
    product,
    permutations,
    // combinations,
    convolve,
    toPDF,
    toCDF,
    moment,
    mix,
    dot,
    rescale,
} from "./utils";

test("range", () => {
    expect(range(0)).toEqual([]);
    expect(range(1)).toEqual([0]);
    expect(range(1, 1)).toEqual([]);
    expect(range(1, 2)).toEqual([1]);
    expect(range(1, 4, 2)).toEqual([1, 3]);
    expect(range(4, 1, -2)).toEqual([4, 2]);
});

test("zeros", () => {
    expect(zeros(0)).toEqual([]);
    expect(zeros(1)).toEqual([0]);
    expect(zeros([1, 1])).toEqual([[0]]);
    expect(zeros([1, 1, 1])).toEqual([[[0]]]);
    expect(zeros([0, 1])).toEqual([]);
    expect(zeros([1, 0])).toEqual([]);
});

test("product", () => {
    expect(product()).toEqual([[]]);
    expect(product([])).toEqual([]);
    expect(product([1, 2])).toEqual([[1], [2]]);
    expect(product([], [1, 2])).toEqual([]);
    expect(product([1, 2], [3, 4])).toEqual([
        [1, 3],
        [1, 4],
        [2, 3],
        [2, 4],
    ]);
});

test("permutations", () => {
    expect(permutations([])).toEqual([[]]);
    expect(permutations([1])).toEqual([[1]]);
    expect(permutations([1, 2])).toEqual([
        [1, 2],
        [2, 1],
    ]);
    const perms = permutations([1, 2, 3]).map((a) => a.join(","));
    expect(perms.length === 6);
    expect(new Set(perms).size == 6);
});

// test("combinations", () => {
//     expect(Array.from(combinations([], 1))).toEqual([]);
//     expect(Array.from(combinations([1], 0))).toEqual([[]]);
//     expect(Array.from(combinations([1, 2], 1))).toEqual([[1], [2]]);
//     expect(Array.from(combinations([1, 2, 3], 2))).toEqual([
//         [1, 2],
//         [1, 3],
//         [2, 3],
//     ]);
// });

test("convolve", () => {
    expect(convolve()).toEqual([]);
    expect(convolve([])).toEqual([]);
    expect(convolve([1], [])).toEqual([]);
    expect(convolve([0.5, 0.5])).toEqual([0.5, 0.5]);
    expect(convolve([0.5, 0.5], [0.2, 0.8])).toEqual([0.1, 0.5, 0.4]);
});

test("toPDF", () => {
    expect(toPDF([])).toEqual([]);
    expect(toPDF([1])).toEqual([1]);
    expect(toPDF([0.5, 1])).toEqual([0.5, 0.5]);
});

test("toCDF", () => {
    expect(toCDF([])).toEqual([]);
    expect(toCDF([1])).toEqual([1]);
    expect(toCDF([0.5, 0.5])).toEqual([0.5, 1]);
});

test("moment", () => {
    expect(moment([])).toEqual(0);
    expect(moment([0.5, 0.3, 0.2], 0)).toEqual(1);
    expect(moment([0.5, 0.3, 0.2], 1)).toEqual(0.7);
    expect(moment([0.5, 0.3, 0.2], 2)).toEqual(1.1);
});

test("mix", () => {
    expect(() => mix([], [])).toThrowError();
    expect(() => mix([], [1])).toThrowError();
    expect(mix([[0.5, 0.5]], [1])).toEqual([0.5, 0.5]);
    expect(mix([[0.5, 0.5]], [0.2])).toEqual([0.9, 0.1]);
    expect(mix([[0.5, 0.5], [1]], [0.2, 0.8])).toEqual([0.9, 0.1]);
});

test("dot", () => {
    expect(() => dot()).toThrowError();
    expect(dot([1])).toEqual([1]);
    expect(dot([0.5, 0.5], [1])).toEqual([0.5]);
});

test("rescale", () => {
    expect(rescale([0.5, 0.5], 0.1)).toEqual([1]);
    expect(rescale([0.5, 0.5], 2)).toEqual([0.5, 0, 0.5]);
});
