import { IScoreAlg } from "./types"

class Item {
    key: string
    constructor(key: string) { this.key = key }
    get value() { return localStorage.getItem(this.key) }
    set value(v: string | null) {
        if (v === null) {
            localStorage.removeItem(this.key)
        } else {
            localStorage.setItem(this.key, v)
        }
    }
}

class TypedItem<T> {
    key: string
    defaultValue: T
    constructor(key: string, defaultValue: T) {
        this.key = key
        this.defaultValue = defaultValue
    }
    get value() {
        let item = localStorage.getItem(this.key)

        if (item === null) {
            return this.defaultValue
        }

        if (typeof this.defaultValue != 'string') {
            try {
                return JSON.parse(item) as T
            } catch {
                return this.defaultValue
            }
        }

        return item as unknown as T
    }
    set value(v: T) {
        if (typeof v == 'string') {
            localStorage.setItem(this.key, v)
        } else {
            localStorage.setItem(this.key, JSON.stringify(v))
        }
    }
    exists() { return localStorage.getItem(this.key) !== null }
    remove() { localStorage.removeItem(this.key) }
}

export default {
    yas: {
        config: new TypedItem<object>('yas.config', {}),
        version: new Item('yas.version'),
    },
    builds: new TypedItem<object[]>('builds', []),
    sort: {
        by: new TypedItem<string>('sort.by', 'avg'),
        buildKeys: new TypedItem<string[]>('sort.buildKeys', []),
        scoreAlg: new TypedItem<IScoreAlg>('sort.scoreAlg', 'sum'),
        sets: new TypedItem<string[]>('sort.sets', []),
        sands: new TypedItem<string[]>('sort.sands', []),
        goblet: new TypedItem<string[]>('sort.goblet', []),
        circlet: new TypedItem<string[]>('sort.circlet', []),
    },
    weight: new TypedItem<object>('weight', {}),
    artMode: {
        showAffnum: new TypedItem<boolean>('artMode.showAffnum', false),
        useMaxAsUnit: new TypedItem<boolean>('artMode.useMaxAsUnit', false),
        reverseOrder: new TypedItem<boolean>('artMode.reverseOrder', false),
        alikeEnabled: new TypedItem<boolean>('artMode.alikeEnabled', true),
    }
}