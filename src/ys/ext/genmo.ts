import { assert } from "@vue/compiler-core"
import { Affix, Artifact } from "../artifact"
import data from "../data"
import { whatis } from "../utils"

export default {
    keymap: {
        set: {
            GladiatorsFinale: 'gladiators_finale',
            WanderersTroupe: 'wanderers_troupe',
            Thundersoother: 'thundersoother',
            ThunderingFury: 'thundering_fury',
            MaidenBeloved: 'maiden_beloved',
            ViridescentVenerer: 'viridescent_venerer',
            CrimsonWitchOfFlames: 'crimson_witch_of_flames',
            Lavawalker: 'lavawalker',
            NoblesseOblige: 'noblesse_oblige',
            BloodstainedChivalry: 'bloodstained_chivalry',
            ArchaicPetra: 'archaic_petra',
            RetracingBolide: 'retracing_bolide',
            BlizzardStrayer: 'blizzard_walker',
            HeartOfDepth: 'heart_of_depth',
            TenacityOfTheMillelith: 'tenacity_of_the_millelith',
            PaleFlame: 'pale_flame',
            ShimenawasReminiscence: 'reminiscence_of_shime',
            EmblemOfSeveredFate: 'seal_of_insulation',
            HuskOfOpulentDreams: 'husk_of_opulent_dreams',
            OceanHuedClam: 'divine_chorus',
        },
        affix: {
            hp: 'flatHP',
            atk: 'flatATK',
            def: 'flatDEF',
            hpp: 'percentHP',
            atkp: 'percentATK',
            defp: 'percentDEF',
            em: 'elementalMastery',
            er: 'energyRecharge',
            hb: 'healing',
            cr: 'critRate',
            cd: 'critDamage',
            pyroDB: 'pyroDamage',
            hydroDB: 'hydroDamage',
            electroDB: 'electroDamage',
            anemoDB: 'anemoDamage',
            cryoDB: 'cryoDamage',
            geoDB: 'geoDamage',
            physicalDB: 'physicalDamage',
        },
        slot: {
            flower: 'flower',
            plume: 'plume',
            sands: 'eon',
            goblet: 'goblet',
            circlet: 'circlet',
        }
    },
    loads(json: string) {
        let genmo = JSON.parse(json)
        assert(genmo instanceof Array)
        let ret = []
        for (let a of genmo) {
            if (a['rarity'] !== 5) continue
            let set = whatis(a['asKey'], this.keymap.set)
            if (!set) {
                console.warn(`Ignoring unrecognized artifact: ${a['asKey']}`)
                continue
            }
            let artifact = new Artifact()
            artifact.set = set
            artifact.slot = whatis(a['slot'], this.keymap.slot) as string
            artifact.level = a['level']
            artifact.rarity = a['rarity']
            let mainKey = whatis(a['mainStat'], this.keymap.affix) as string
            artifact.main = new Affix({
                key: mainKey,
                value: data.mainStat[mainKey][artifact.level]
            })
            artifact.minors.push(new Affix({
                key: whatis(a['subStat1Type'], this.keymap.affix),
                value: a['subStat1Value']
            }))
            artifact.minors.push(new Affix({
                key: whatis(a['subStat2Type'], this.keymap.affix),
                value: a['subStat2Value']
            }))
            artifact.minors.push(new Affix({
                key: whatis(a['subStat3Type'], this.keymap.affix),
                value: a['subStat3Value']
            }))
            if (a['subStat4Value']) {
                artifact.minors.push(new Affix({
                    key: whatis(a['subStat4Type'], this.keymap.affix),
                    value: a['subStat4Value']
                }))
            }
            artifact.data.index = ret.length
            artifact.validate()
            ret.push(artifact)
        }
        return ret
    }
}