// implementation of some python utilities

export function range(...args: number[]) {
    let d = []
    if (args.length == 1) {
        for (let i = 0; i < args[0]; ++i) d.push(i)
    } else if (args.length == 2) {
        for (let i = args[0]; i < args[1]; ++i) d.push(i)
    } else if (args.length == 3) {
        if (args[2] > 0) {
            for (let i = args[0]; i < args[1]; i += args[2]) d.push(i)
        } else {
            for (let i = args[0]; i > args[1]; i += args[2]) d.push(i)
        }
    }
    return d
}

export function product(...args: Array<any[]>) {
    if (args.length == 0) return []
    let d: any[] = [], indices = []
    for (let a of args) {
        if (a.length == 0) return d
        indices.push(0)
    }
    while (true) {
        // push element
        let b: any[] = []
        for (let i = 0; i < args.length; ++i) b.push(args[i][indices[i]])
        d.push(b)
        // increase indices by 1
        for (let i = args.length - 1; i >= 0; --i) {
            indices[i]++
            if (indices[i] == args[i].length) {
                if (i == 0) return d
                else indices[i] = 0
            } else break;
        }
    }
}

export function zeros(shape: number[] | number, start: number = 0) {
    let d: any[] = []
    if (typeof shape == 'number') {
        for (let i = 0; i < shape; ++i)d.push(0)
    } else if (start == shape.length - 1) {
        for (let i = 0; i < shape[start]; ++i)d.push(0)
    } else if (start < shape.length - 1) {
        for (let i = 0; i < shape[start]; ++i)d.push(zeros(shape, start + 1))
    }
    return d
}

export function swap(arr: any[], i: number, j: number) {
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
}

function _permutations(arr: any[], n: number, d: any[], start: number = 0) {
    if (start == n) {
        d.push(arr.slice(0, n))
    } else {
        for (let i = 0; i < arr.length - start; ++i) {
            _permutations(arr, n, d, start + 1)
            if ((n - start) % 2) swap(arr, start, arr.length - 1 - i)
            else swap(arr, start, arr.length - 1)
        }
    }
}

export function permutations(arr: any[], n?: number): any[][] {
    if (n == undefined) n = arr.length
    if (n < 1 || n > arr.length) throw new Error('permutations: invalid n')
    let d: any[] = []
    _permutations([...arr], n, d)
    return d
}

export function convolve(...args: Array<number[]>) {
    if (args.length == 0) return []
    for (let a of args) {
        if (a.length == 0) return []
    }
    let d = [1]
    for (let a of args) {
        let dnew = []
        for (let i = 0; i < d.length; ++i)
            for (let j = 0; j < a.length; ++j) {
                if (i + j == dnew.length) dnew.push(0)
                dnew[i + j] += d[i] * a[j]
            }
        d = dnew
    }
    return d
}

export function toPDF(d: number[]) {
    let pLast = 0, ret = []
    for (let p of d) {
        ret.push(p - pLast)
        pLast = p
    }
    return ret
}

export function toCDF(d: number[]) {
    let S = 0, ret = []
    for (let p of d) {
        S += p
        ret.push(S)
    }
    return ret
}

export function moment(d: number[], t: number = 1) {
    let s = 0
    for (let n = 1; n < d.length; ++n) {
        s += d[n] * n ** t
    }
    return s
}

export function mix(ds: number[][], ps: number[]) {
    if (ds.length != ps.length || ps.length == 0) throw new Error('Invalid arguments')
    let ret = []
    for (let i = 0; i < ps.length; ++i) {
        for (let j = 0; j < ds[i].length; ++j) {
            if (j == ret.length) ret.push(0)
            ret[j] += ps[i] * ds[i][j]
        }
    }
    if (ps.length == 1 && ret.length)
        ret[0] += 1 - ps[0]
    return ret
}

export function dot(...arr: number[][]) {
    if (arr.length == 0) throw new Error('Invalid arguments')
    let ret = [...arr[0]]
    for (let i = 1; i < arr.length; ++i) {
        while (ret.length > arr[i].length) ret.pop()
        for (let j = 0; j < ret.length; ++j) {
            ret[j] *= arr[i][j]
        }
    }
    return ret
}

export function rescale(d: number[], k: number) {
    let ret: number[] = []
    for (let i = 0; i < d.length; ++i) {
        let j = Math.round(i * k)
        while (ret.length <= j) ret.push(0)
        ret[j] += d[i]
    }
    return ret
}

export function shrink(d: number[]) {
    while (d[d.length - 1] == 0) d.pop()
}

export function choice(m: number): number
export function choice<Type>(arr: Type[]): Type
export function choice<Type>(arr: Type[], n: number, p: number[]): Type[]
export function choice<Type>(mOrArr: number | Type[], n?: number, p?: number[]): number | Type | Type[] {
    if (typeof mOrArr === 'number') {
        return Math.floor(Math.random() * mOrArr)
    } else if (n !== undefined && p !== undefined) {
        let a = [...mOrArr]
        let d = [...p]
        let sum = 0
        for (let w of d) {
            sum += w
        }
        for (let i = 0; i < n; ++i) {
            let r = Math.random() * sum
            let acc = 0
            for (let j = i; j < a.length; ++j) {
                acc += d[j]
                if (r <= acc) {
                    sum -= d[j]
                    swap(a, i, j)
                    swap(d, i, j)
                    break
                }
            }
        }
        return a.slice(0, n)
    } else {
        let i = Math.floor(Math.random() * mOrArr.length)
        return mOrArr[i]
    }
}