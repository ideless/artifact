const MinorAffixStat = {
    'hp': { p: 6, v: 298.75 },
    'atk': { p: 6, v: 19.45 },
    'def': { p: 6, v: 23.15 },
    'hpp': { p: 4, v: 0.0583 },
    'atkp': { p: 4, v: 0.0583 },
    'defp': { p: 4, v: 0.0729 },
    'em': { p: 4, v: 23.31 },
    'er': { p: 4, v: 0.0648 },
    'cr': { p: 3, v: 0.0389 },
    'cd': { p: 3, v: 0.0777 },
}

const MinorAffixes = [
    'hp', 'atk', 'def', 'hpp', 'atkp', 'defp', 'em', 'er', 'cr', 'cd'
]

const MainAffixes = {
    all: ['hp', 'atk', 'hpp', 'atkp', 'defp', 'em', 'er', 'hb', 'cr', 'cd', 'pyro', 'hydro', 'electro', 'anemo', 'cryo', 'geo', 'physical'],
    flower: ['hp'],
    plume: ['atk'],
    sands: ['hpp', 'atkp', 'defp', 'em', 'er'],
    goblet: ['hpp', 'atkp', 'defp', 'em', 'pyro', 'hydro', 'electro', 'anemo', 'cryo', 'geo', 'physical'],
    circlet: ['hpp', 'atkp', 'defp', 'em', 'hb', 'cr', 'cd']
}

export { MinorAffixStat, MinorAffixes, MainAffixes }