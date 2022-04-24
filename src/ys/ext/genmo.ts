import { assert } from "@vue/compiler-core"
import { Affix, Artifact } from "../artifact"
import data from "../data"
import { whatis } from "../utils"

export default {
    keymap: {
        set: <{ [key: string]: string }>{
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
            VermillionHereafter: 'vermillion_hereafter',
            EchoesOfAnOffering: 'echoes_of_an_offering'
        },
        affix: <{ [key: string]: string }>{
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
        slot: <{ [key: string]: string }>{
            flower: 'flower',
            plume: 'plume',
            sands: 'eon',
            goblet: 'goblet',
            circlet: 'circlet',
        }
    },
    getSubStatType(artifact: Artifact, index: number) {
        if (index < artifact.minors.length) {
            return this.keymap.affix[artifact.minors[index].key]
        } else {
            return 'flatATK'
        }
    },
    getSubStatValue(artifact: Artifact, index: number) {
        if (index < artifact.minors.length) {
            return artifact.minors[index].value
        } else {
            return 0
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
            artifact.data.source = 'genmo'
            artifact.validate()
            ret.push(artifact)
        }
        return ret
    },
    dumps(artifacts: Artifact[]) {
        let genmo: any[] = []
        for (let a of artifacts) {
            genmo.push({
                asKey: this.keymap.set[a.set],
                rarity: a.rarity,
                slot: this.keymap.slot[a.slot],
                level: a.level,
                mainStat: this.keymap.affix[a.main.key],
                subStat1Type: this.getSubStatType(a, 0),
                subStat1Value: this.getSubStatValue(a, 0),
                subStat2Type: this.getSubStatType(a, 1),
                subStat2Value: this.getSubStatValue(a, 1),
                subStat3Type: this.getSubStatType(a, 2),
                subStat3Value: this.getSubStatValue(a, 2),
                subStat4Type: this.getSubStatType(a, 3),
                subStat4Value: this.getSubStatValue(a, 3),
            })
        }
        return JSON.stringify(genmo)
    }
}