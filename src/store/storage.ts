import { YasConfig } from "./types"

export default {
    hasYasConfig() {
        return localStorage.getItem('yas_config') != null
    },
    getYasConfig(): YasConfig {
        return new YasConfig(JSON.parse(localStorage.getItem('yas_config')!))
    },
    setYasConfig(config: YasConfig) {
        localStorage.setItem('yas_config', JSON.stringify(config))
    },
    getYasVersion() {
        return localStorage.getItem('yas_version')
    },
    setYasVersion(version: string) {
        localStorage.setItem('yas_version', version)
    },
}