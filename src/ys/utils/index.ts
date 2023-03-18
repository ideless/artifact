export function whatis(w: string, dict: { [key: string]: string }) {
    for (let key in dict) {
        if (dict[key] == w) {
            return key
        }
    }
    return undefined
}

export function assert(p: any, msg?: string) {
    if (!p) {
        throw new Error(msg)
    }
}

export function argmax(obj: { [key: string]: number }, A: Set<string>): unknown {
    let m: number | undefined = undefined,
        ma: string | undefined = undefined
    A.forEach(a => {
        if (a in obj) {
            if (m === undefined || obj[a] > m) {
                m = obj[a]
                ma = a
            }
        }
    })
    return ma
}

export function argmin(obj: { [key: string]: number }, A: Set<string>): unknown {
    let m: number | undefined = undefined,
        ma: string | undefined = undefined
    A.forEach(a => {
        if (a in obj) {
            if (m === undefined || obj[a] < m) {
                m = obj[a]
                ma = a
            }
        }
    })
    return ma
}

export function swap(arr: any[], i: number, j: number) {
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
}

export function choice(m: number): number
export function choice<T>(arr: T[]): T
export function choice<T>(arr: T[], p: number[]): T
export function choice<T>(arr: T[], p: number[], n: number): T[]
export function choice<T>(mOrArr: number | T[], p?: number[], n?: number): number | T | T[] {
    if (typeof mOrArr === 'number') {
        return Math.floor(Math.random() * mOrArr)
    } else if (p == undefined && n == undefined) {
        let i = Math.floor(Math.random() * mOrArr.length)
        return mOrArr[i]
    } else if (p && n == undefined) {
        let sum_p = 0
        p.forEach(x => sum_p += x)
        let acc = 0, r = sum_p * Math.random()
        for (let i = 0; i < mOrArr.length; ++i) {
            acc += p[i]
            if (r <= acc) return mOrArr[i]
        }
        return mOrArr[0] // 不可能到达这里
    } else if (p && n) {
        let a = [...mOrArr]
        let d = [...p]
        let sum_p = 0
        p.forEach(x => sum_p += x)
        for (let i = 0; i < n; ++i) {
            let r = Math.random() * sum_p
            let acc = 0
            for (let j = i; j < a.length; ++j) {
                acc += d[j]
                if (r <= acc) {
                    sum_p -= d[j]
                    swap(a, i, j)
                    swap(d, i, j)
                    break
                }
            }
        }
        return a.slice(0, n)
    }
    return 0 // 不应该到达这里
}

export class SimpleCache<A, E, T> {
    cache: { [key: string]: T } = {}
    get: (args: A, extra?: E) => T
    constructor(calc: (args: A, extra: E) => T) {
        this.get = (args: A, extra?: E) => {
            let key = JSON.stringify(args)
            if (key in this.cache) return this.cache[key]
            return this.cache[key] = calc(args, extra!)
        }
    }
    set(args: A, value: T) {
        let key = JSON.stringify(args)
        this.cache[key] = value
    }
    clear() {
        this.cache = {}
    }
}