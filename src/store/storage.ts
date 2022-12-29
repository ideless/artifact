import { IBuild, YasConfig } from "./types"
import CharacterData from "@/ys/data/character"
import chs from "@/ys/locale/chs"

export default {
    keys: {
        yas_config: 'yas_config',
        yas_version: 'yas_version',
        builds: 'builds',
        selected_build_keys: 'selected_build_keys',
    },
    hasYasConfig() {
        return localStorage.getItem(this.keys.yas_config) != null
    },
    getYasConfig(): YasConfig {
        return new YasConfig(JSON.parse(localStorage.getItem(this.keys.yas_config)!))
    },
    setYasConfig(config: YasConfig) {
        localStorage.setItem(this.keys.yas_config, JSON.stringify(config))
    },
    getYasVersion() {
        return localStorage.getItem(this.keys.yas_version)
    },
    setYasVersion(version: string) {
        localStorage.setItem(this.keys.yas_version, version)
    },
    getBuilds() {
        // 读取localStorage
        let jsonStored = localStorage.getItem(this.keys.builds) || '[]'
        let builds = JSON.parse(jsonStored) as IBuild[]
        // 增量更新
        let keys = new Set(builds.reduce((p, c) => p.concat([c.key]), [] as string[]))
        let newKeys = Object.keys(CharacterData).filter(key => !keys.has(key))
        newKeys.forEach(key => {
            let c = CharacterData[key]
            builds.push({
                key,
                name: chs.character[key],
                set: [...c.build.set],
                main: {
                    sands: [...c.build.main.sands],
                    goblet: [...c.build.main.goblet],
                    circlet: [...c.build.main.circlet],
                },
                weight: { ...c.build.weight },
            })
        })
        // 写入localStorage
        this.setBuilds(builds)

        return builds
    },
    setBuilds(builds: IBuild[]) {
        localStorage.setItem(this.keys.builds, JSON.stringify(builds))
    },
    getSelectedBuildKeys() {
        let jsonStored = localStorage.getItem(this.keys.selected_build_keys)
        if (jsonStored) {
            return JSON.parse(jsonStored) as string[]
        } else {
            return [] as string[]
        }
    },
    setSelectedBuildKeys(keys: string[]) {
        localStorage.setItem(this.keys.selected_build_keys, JSON.stringify(keys))
    },
}