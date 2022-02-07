export interface ITranslation {
    set: {
        [key: string]: {
            name: string
            pieces: {
                flower: string
                plume: string
                sands: string
                goblet: string
                circlet: string
            }
            bonus: {
                [n: number]: string
            }
        }
    }
    affix: {
        [key: string]: string
    }
    slot: {
        [key: string]: string
    }
    character: {
        [key: string]: string
    }
    preset: string[]
    element: {
        [key: string]: string
    }
}