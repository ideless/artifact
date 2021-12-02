import { Affix, Artifact } from "../artifact"
import { whatis } from "./utils"
import { assert } from "../error"

export default {
    keymap: {
        set: {
            GladiatorsFinale: 'gladiatorFinale',
            WanderersTroupe: 'wandererTroupe',
            Thundersoother: 'thunderSmoother',
            ThunderingFury: 'thunderingFury',
            MaidenBeloved: 'maidenBeloved',
            ViridescentVenerer: 'viridescentVenerer',
            CrimsonWitchofFlames: 'crimsonWitch',
            Lavawalker: 'lavaWalker',
            NoblesseOblige: 'noblesseOblige',
            BloodstainedChivalry: 'bloodstainedChivalry',
            ArchaicPetra: 'archaicPetra',
            RetracingBolide: 'retracingBolide',
            BlizzardStrayer: 'blizzardStrayer',
            HeartofDepth: 'heartOfDepth',
            TenacityoftheMillelith: 'tenacityOfTheMillelith',
            PaleFlame: 'paleFlame',
            ShimenawasReminiscence: 'shimenawaReminiscence',
            EmblemofSeveredFate: 'emblemOfSeveredFate',
            HuskofOpulentDreams: 'huskOfOpulentDreams',
            OceanHuedClam: 'oceanHuedClam',
        },
        affix: {
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
            pyro: 'fireBonus',
            hydro: 'waterBonus',
            electro: 'thunderBonus',
            anemo: 'windBonus',
            cryo: 'iceBonus',
            geo: 'rockBonus',
            physical: 'physicalBonus',
        },
        type: {
            flower: 'flower',
            plume: 'feather',
            sands: 'sand',
            goblet: 'cup',
            circlet: 'head',
        }
    },
    /**
     * 
     * @param {string} json
     */
    loads(json) {
        let mona = JSON.parse(json)
        assert(mona.version == '1', 'Unsupported version')
        let ret = []
        const mtypes = ['flower', 'feather', 'sand', 'cup', 'head']
        for (let mtype of mtypes) {
            for (let martifact of mona[mtype]) {
                let set = whatis(martifact['setName'], this.keymap.set)
                if (!set) {
                    console.warn(`Ignoring unrecognized artifact: ${martifact['setName']}`)
                    continue
                }
                let artifact = new Artifact()
                artifact.set = set
                artifact.type = whatis(mtype, this.keymap.type)
                artifact.level = martifact['level']
                artifact.rarity = martifact['star']
                artifact.mainAffix = new Affix({
                    key: whatis(martifact['mainTag']['name'], this.keymap.affix),
                    value: martifact['mainTag']['value'],
                })
                for (let ma of martifact['normalTags']) {
                    artifact.minorAffixes.push(new Affix({
                        key: whatis(ma['name'], this.keymap.affix),
                        value: ma['value']
                    }))
                }
                ret.push(artifact)
            }
        }
        return ret
    }
}