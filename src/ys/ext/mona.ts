import { Affix, Artifact } from "../artifact"
import data from "../data"
import { whatis, assert } from "../utils"

export default {
    keymap: {
        set: <{ [key: string]: string }>{
            GladiatorsFinale: 'gladiatorFinale',
            WanderersTroupe: 'wandererTroupe',
            Thundersoother: 'thunderSmoother',
            ThunderingFury: 'thunderingFury',
            MaidenBeloved: 'maidenBeloved',
            ViridescentVenerer: 'viridescentVenerer',
            CrimsonWitchOfFlames: 'crimsonWitch',
            Lavawalker: 'lavaWalker',
            NoblesseOblige: 'noblesseOblige',
            BloodstainedChivalry: 'bloodstainedChivalry',
            ArchaicPetra: 'archaicPetra',
            RetracingBolide: 'retracingBolide',
            BlizzardStrayer: 'blizzardStrayer',
            HeartOfDepth: 'heartOfDepth',
            TenacityOfTheMillelith: 'tenacityOfTheMillelith',
            PaleFlame: 'paleFlame',
            ShimenawasReminiscence: 'shimenawaReminiscence',
            EmblemOfSeveredFate: 'emblemOfSeveredFate',
            HuskOfOpulentDreams: 'huskOfOpulentDreams',
            OceanHuedClam: 'oceanHuedClam',
        },
        affix: <{ [key: string]: string }>{
            hp: 'lifeStatic',
            atk: 'attackStatic',
            def: 'defendStatic',
            hpp: 'lifePercentage',
            atkp: 'attackPercentage',
            defp: 'defendPercentage',
            em: 'elementalMastery',
            er: 'recharge',
            hb: 'cureEffect',
            cr: 'critical',
            cd: 'criticalDamage',
            pyroDB: 'fireBonus',
            hydroDB: 'waterBonus',
            electroDB: 'thunderBonus',
            anemoDB: 'windBonus',
            cryoDB: 'iceBonus',
            geoDB: 'rockBonus',
            physicalDB: 'physicalBonus',
        },
        slot: <{ [key: string]: string }>{
            flower: 'flower',
            plume: 'feather',
            sands: 'sand',
            goblet: 'cup',
            circlet: 'head',
        }
    },
    getAffix(key: string, value: number) {
        key = whatis(key, this.keymap.affix) as string
        if (!(['hp', 'atk', 'def', 'em'].includes(key))) {
            value = value * 100
            value = parseFloat(value.toFixed(1))
        }
        return new Affix({ key, value })
    },
    loads(json: string) {
        let mona = JSON.parse(json)
        // assert(mona.version == '1', 'Unsupported version')
        let ret = []
        const mtypes = ['flower', 'feather', 'sand', 'cup', 'head']
        for (let mtype of mtypes) {
            for (let martifact of mona[mtype]) {
                if (martifact['star'] !== 5) continue
                let set = whatis(martifact['setName'], this.keymap.set)
                if (!set) {
                    console.warn(`Ignoring unrecognized artifact: ${martifact['setName']}`)
                    continue
                }
                let artifact = new Artifact()
                artifact.set = set
                artifact.slot = whatis(mtype, this.keymap.slot) as string
                artifact.level = martifact['level']
                artifact.rarity = martifact['star']
                artifact.main = this.getAffix(martifact['mainTag']['name'], martifact['mainTag']['value'])
                for (let ma of martifact['normalTags']) {
                    artifact.minors.push(this.getAffix(ma['name'], ma['value']))
                }
                artifact.data.index = ret.length
                artifact.validate()
                ret.push(artifact)
            }
        }
        return ret
    },
    dumps(artifacts: Artifact[]) {
        let mona: { [key: string]: any[] } = { flower: [], feather: [], sand: [], cup: [], head: [] }
        for (let a of artifacts) {
            let type = this.keymap.slot[a.slot]
            mona[type].push({
                setName: this.keymap.set[a.set],
                position: type,
                mainTag: {
                    name: this.keymap.affix[a.main.key],
                    value: data.mainStat[a.main.key][a.level]
                },
                normalTags: a.minors.map(m => ({
                    name: this.keymap.affix[m.key],
                    value: ['hp', 'atk', 'def', 'em'].includes(m.key) ? m.value : m.value / 100
                })),
                omit: false,
                star: a.rarity,
                level: a.level,
            })
        }
        return JSON.stringify(mona)
    }
}