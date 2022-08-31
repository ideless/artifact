import Rel from './excel/Rel'
import RelSet from './excel/RelSet'
import RelMP from './excel/RelMP'
import RelAffix from './excel/RelAffix'
import Avatar from './excel/Avatar'

interface IR {
    itemId: number
    guid: string
    equip: {
        reliquary: {
            level: number
            mainPropId: number
            appendPropIdList: number[]
        }
        isLocked?: boolean
    }
}

const SlotPrior: { [k: string]: number } = {
    flower: 4,
    plume: 3,
    sands: 2,
    goblet: 1,
    circlet: 0,
}

function cmp(v1: any, v2: any) {
    if (v1 < v2) throw 1
    else if (v1 > v2) throw -1
}

export default {
    toGood(store: any, avatar: any) {
        // get map: rel guid => owner
        let owner: any = {}
        avatar.avatarList.forEach((a: any) => {
            a.equipGuidList.forEach((g: string) => {
                owner[g] = Avatar[a.avatarId]
            })
        })
        // GOOD artifacts
        const GOOD: any = {
            format: "GOOD",
            version: 1,
            source: "pcap",
        }
        GOOD.artifacts = store.itemList
            .filter((item: any) => item.itemId in Rel)
            .sort((r1: IR, r2: IR) => {
                try {
                    cmp(r1.equip.reliquary.level, r2.equip.reliquary.level)
                    cmp(RelSet[Rel[r1.itemId].setId].ord, RelSet[Rel[r2.itemId].setId].ord)
                    cmp(SlotPrior[Rel[r1.itemId].slot], SlotPrior[Rel[r2.itemId].slot])
                    cmp(r1.equip.reliquary.appendPropIdList.length, r2.equip.reliquary.appendPropIdList.length)
                    cmp(r1.guid, r2.guid)
                    return 0
                } catch (c) {
                    return c
                }
            })
            .map((r: IR) => {
                let a: any = {}
                a.setKey = RelSet[Rel[r.itemId].setId].key
                a.slotKey = Rel[r.itemId].slot
                a.level = r.equip.reliquary.level - 1
                a.rarity = 5
                a.mainStatKey = RelMP[r.equip.reliquary.mainPropId]
                a.lock = r.equip.isLocked ? true : false
                let substats: any = {}
                r.equip.reliquary.appendPropIdList.forEach(id => {
                    if (!(RelAffix[id].key in substats))
                        substats[RelAffix[id].key] = 0
                    substats[RelAffix[id].key] += RelAffix[id].val
                })
                a.substats = Object.entries(substats).map(([key, value]) => ({ key, value }))
                a.location = owner[r.guid] ?? ''
                return a
            })

        return GOOD;
    }
}