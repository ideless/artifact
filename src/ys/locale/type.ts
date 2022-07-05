interface ITextMap {
    [key: string]: string
}

export interface ITranslation {
    set: ITextMap
    affix: ITextMap
    slot: ITextMap
    character: ITextMap
    preset: ITextMap
    element: ITextMap
}