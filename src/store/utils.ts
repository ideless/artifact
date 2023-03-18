export function assign(a: { [k: string]: any }, b: any) {
    if (!b || typeof b != "object") return false;
    Object.keys(b).forEach((key) => {
        if (a.hasOwnProperty(key)) {
            (a as any)[key] = b[key];
        }
    });
    return true;
}

export function isSameArray(a: any[], b: any[]) {
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] != b[i]) return false;
    }
    return true;
}

export function isSameObject(a: any, b: any) {
    let aKeys = Object.keys(a);
    let bKeys = Object.keys(b);
    if (aKeys.length != bKeys.length) return false;
    for (let i = 0; i < aKeys.length; i++) {
        let key = aKeys[i];
        if (bKeys.indexOf(key) < 0) return false;
        if (a[key] != b[key]) return false;
    }
    return true;
}

export function isSame(a: any, b: any) {
    if (a == b) return true;
    if (a instanceof Array && b instanceof Array) {
        return isSameArray(a, b);
    } else if (typeof a == "object" && typeof b == "object") {
        return isSameObject(a, b);
    }
    return false;
}
