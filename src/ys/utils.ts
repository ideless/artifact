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