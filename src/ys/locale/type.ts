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
    preset: {
        [key: string]: string
    }
    element: {
        [key: string]: string
    }
}