import { Artifact } from "@/ys/artifact"
import CharacterData from "@/ys/data/character"
import chs from "@/ys/locale/chs"

const charKeys = ['Traveler'].concat(Object.keys(CharacterData).filter(k => !k.startsWith('Traveler')))
const setKeys = Object.keys(chs.set)

const testArts = process.env.NODE_ENV == 'development' ? charKeys.map(key => {
    let a = Artifact.rand({ sets: setKeys })
    a.location = key
    return a
}) : []

export {
    testArts
}
