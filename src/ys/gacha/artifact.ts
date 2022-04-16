import { shrink, zeros, permutations, product, mix, convolve, rescale, toCumulative, choice } from "./utils"

const P_MINOR: { [key: string]: number } = {
    'hp': 6 / 44,
    'atk': 6 / 44,
    'def': 6 / 44,
    'hpp': 4 / 44,
    'atkp': 4 / 44,
    'defp': 4 / 44,
    'em': 4 / 44,
    'er': 4 / 44,
    'cr': 3 / 44,
    'cd': 3 / 44,
}

interface IWeight {
    [key: string]: number
}

export function affnumDistr(main: string, minorWeight: IWeight, lv: number = 5) {
    // get all permutations (takes ~5760 ops)
    let p_perm_3: IWeight = {}, p_perm_4: IWeight = {}, all_minors = []
    for (let m in P_MINOR) if (m != main) all_minors.push(m)
    let S = (main in P_MINOR) ? 1 - P_MINOR[main] : 1
    if (lv == 0) {
        for (let ms of permutations(all_minors, 3)) {
            let pr = 1, S_tmp = S
            for (let m of ms) {
                pr *= P_MINOR[m] / S_tmp
                S_tmp -= P_MINOR[m]
            }
            let ws: number[] = []
            for (let m of ms) ws.push(minorWeight[m])
            ws.sort()
            let ws_key = ws.join(',')
            if (ws_key in p_perm_3) p_perm_3[ws_key] += pr
            else p_perm_3[ws_key] = pr
        }
    }
    for (let ms of permutations(all_minors, 4)) {
        let pr = 1, S_tmp = S
        for (let m of ms) {
            pr *= P_MINOR[m] / S_tmp
            S_tmp -= P_MINOR[m]
        }
        let ws: number[] = []
        for (let m of ms) ws.push(minorWeight[m])
        ws.sort()
        let ws_key = ws.join(',')
        if (ws_key in p_perm_4) p_perm_4[ws_key] += pr
        else p_perm_4[ws_key] = pr
    }
    // calc ret[] (takes ~1,156,680 ops)
    let s1, s2, s3, s4
    function get_d4(ws: number[]) {
        let d4 = zeros(41)
        for (let i = 7; i <= 10; ++i) {
            s1 = ws[0] * i
            for (let j = 7; j <= 10; ++j) {
                s2 = s1 + ws[1] * j
                for (let k = 7; k <= 10; ++k) {
                    s3 = s2 + ws[2] * k
                    for (let l = 7; l <= 10; ++l) {
                        s4 = s3 + ws[3] * l
                        d4[Math.round(s4)] += 1
                    }
                }
            }
        }
        shrink(d4)
        for (let i = 0; i < d4.length; ++i) d4[i] /= 256
        return d4
    }
    function get_d3(ws: number[]) {
        let d3 = zeros(31)
        for (let i = 7; i <= 10; ++i) {
            s1 = ws[0] * i
            for (let j = 7; j <= 10; ++j) {
                s2 = s1 + ws[1] * j
                for (let k = 7; k <= 10; ++k) {
                    s3 = s2 + ws[2] * k
                    d3[Math.round(s3)] += 1
                }
            }
        }
        shrink(d3)
        for (let i = 0; i < d3.length; ++i) d3[i] /= 64
        return d3
    }
    function get_d2(ws: number[]) {
        let d2 = zeros(21)
        for (let i = 0; i < 4; ++i) {
            for (let j = 0; j < 4; ++j) {
                for (let k = 7; k <= 10; ++k) {
                    s1 = ws[i] * k
                    for (let l = 7; l <= 10; ++l) {
                        s2 = s1 + ws[j] * l
                        d2[Math.round(s2)] += 1
                    }
                }
            }
        }
        shrink(d2)
        for (let i = 0; i < d2.length; ++i) d2[i] /= 256
        return d2
    }
    function get_d1(ws: number[]) {
        let d1 = zeros(11)
        for (let i = 0; i < 4; ++i) {
            for (let j = 7; j <= 10; ++j) {
                s1 = ws[i] * j
                d1[Math.round(s1)] += 1
            }
        }
        shrink(d1)
        for (let i = 0; i < d1.length; ++i) d1[i] /= 16
        return d1
    }
    let ret = [0]
    let d, d4, d2, d1
    if (lv == 0) {
        // init 3
        for (let perm in p_perm_3) {
            let ws = perm.split(',').map(x => parseFloat(x))
            d = get_d3(ws)
            ret = mix([ret, d], [1, 0.8 * p_perm_3[perm]])
        }
        // init 4
        for (let perm in p_perm_4) {
            let ws = perm.split(',').map(x => parseFloat(x))
            d = get_d4(ws)
            ret = mix([ret, d], [1, 0.2 * p_perm_4[perm]])
        }
    } else if (lv == 1) {
        for (let perm in p_perm_4) {
            let ws = perm.split(',').map(x => parseFloat(x))
            d4 = get_d4(ws)
            d1 = get_d1(ws)
            // init 3
            d = d4
            ret = mix([ret, d], [1, 0.8 * p_perm_4[perm]])
            // init 4
            d = convolve(d4, d1)
            ret = mix([ret, d], [1, 0.2 * p_perm_4[perm]])
        }
    } else if (lv == 2) {
        for (let perm in p_perm_4) {
            let ws = perm.split(',').map(x => parseFloat(x))
            d4 = get_d4(ws)
            d2 = get_d2(ws)
            d1 = get_d1(ws)
            // init 3
            d = convolve(d4, d1)
            ret = mix([ret, d], [1, 0.8 * p_perm_4[perm]])
            // init 4
            d = convolve(d4, d2)
            ret = mix([ret, d], [1, 0.2 * p_perm_4[perm]])
        }
    } else if (lv == 3) {
        for (let perm in p_perm_4) {
            let ws = perm.split(',').map(x => parseFloat(x))
            d4 = get_d4(ws)
            d2 = get_d2(ws)
            d1 = get_d1(ws)
            // init 3
            d = convolve(d4, d2)
            ret = mix([ret, d], [1, 0.8 * p_perm_4[perm]])
            // init 4
            d = convolve(d4, d2, d1)
            ret = mix([ret, d], [1, 0.2 * p_perm_4[perm]])
        }
    } else if (lv == 4) {
        for (let perm in p_perm_4) {
            let ws = perm.split(',').map(x => parseFloat(x))
            d4 = get_d4(ws)
            d2 = get_d2(ws)
            d1 = get_d1(ws)
            // init 3
            d = convolve(d4, d2, d1)
            ret = mix([ret, d], [1, 0.8 * p_perm_4[perm]])
            // init 4
            d = convolve(d4, d2, d2)
            ret = mix([ret, d], [1, 0.2 * p_perm_4[perm]])
        }
    } else {
        for (let perm in p_perm_4) {
            let ws = perm.split(',').map(x => parseFloat(x))
            d4 = get_d4(ws)
            d2 = get_d2(ws)
            d1 = get_d1(ws)
            // init 3
            d = convolve(d4, d2, d2)
            ret = mix([ret, d], [1, 0.8 * p_perm_4[perm]])
            // init 4
            d = convolve(d4, d2, d2, d1)
            ret = mix([ret, d], [1, 0.2 * p_perm_4[perm]])
        }
    }
    return toCumulative(ret)
}