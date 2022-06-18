interface IPreset {
    characters: Array<{
        key: string
        element: string
        presets: number[]
    }>
    presets: Array<{
        [key: string]: number
    }>
}

export default <IPreset>{
    characters: [
        { key: 'Albedo', element: 'geo', presets: [19] },
        { key: 'Aloy', element: 'cryo', presets: [4, 8] },
        { key: 'Amber', element: 'pyro', presets: [4, 8] },
        { key: 'AratakiItto', element: 'geo', presets: [4, 9, 10, 19] },
        { key: 'Barbara', element: 'hydro', presets: [11] },
        { key: 'Beidou', element: 'electro', presets: [4] },
        { key: 'Bennett', element: 'pyro', presets: [4, 8, 2] },
        { key: 'Chongyun', element: 'cryo', presets: [4, 8] },
        { key: 'Diluc', element: 'pyro', presets: [4, 8] },
        { key: 'Diona', element: 'cryo', presets: [11] },
        { key: 'Eula', element: 'cryo', presets: [1, 3, 4] },
        { key: 'Fischl', element: 'electro', presets: [1, 2, 4] },
        { key: 'Ganyu', element: 'cryo', presets: [4, 8] },
        { key: 'Gorou', element: 'geo', presets: [18] },
        { key: 'HuTao', element: 'pyro', presets: [4, 7, 14, 15] },
        { key: 'Jean', element: 'anemo', presets: [1, 4] },
        { key: 'KaedeharaKazuha', element: 'anemo', presets: [4, 8, 17] },
        { key: 'Kaeya', element: 'cryo', presets: [4, 8] },
        { key: 'KamisatoAyaka', element: 'cryo', presets: [4, 8] },
        { key: 'KamisatoAyato', element: 'hydro', presets: [4, 6] },
        { key: 'Keqing', element: 'electro', presets: [4] },
        { key: 'Klee', element: 'pyro', presets: [4, 8] },
        { key: 'KujouSara', element: 'electro', presets: [1, 4] },
        { key: 'Lisa', element: 'electro', presets: [4] },
        { key: 'Mona', element: 'hydro', presets: [4, 8, 2] },
        { key: 'Ningguang', element: 'geo', presets: [4] },
        { key: 'Noelle', element: 'geo', presets: [4, 9, 10, 19] },
        { key: 'Qiqi', element: 'cryo', presets: [4] },
        { key: 'RaidenShogun', element: 'electro', presets: [1, 4] },
        { key: 'Razor', element: 'electro', presets: [4] },
        { key: 'Rosaria', element: 'cryo', presets: [4, 8] },
        { key: 'SangonomiyaKokomi', element: 'hydro', presets: [11, 12, 13] },
        { key: 'Sayu', element: 'anemo', presets: [1, 4] },
        { key: 'Shenhe', element: 'cryo', presets: [0, 4] },
        { key: 'Sucrose', element: 'anemo', presets: [16] },
        { key: 'Tartaglia', element: 'hydro', presets: [4, 8] },
        { key: 'Thoma', element: 'pyro', presets: [11] },
        { key: 'Traveler', element: '', presets: [4] },
        { key: 'Venti', element: 'anemo', presets: [2, 4] },
        { key: 'Xiangling', element: 'pyro', presets: [4, 8, 2] },
        { key: 'Xiao', element: 'anemo', presets: [4] },
        { key: 'Xingqiu', element: 'hydro', presets: [4, 8, 2] },
        { key: 'Xinyan', element: 'pyro', presets: [4, 9] },
        { key: 'YaeMiko', element: 'electro', presets: [8, 2] },
        { key: 'Yanfei', element: 'pyro', presets: [4, 8] },
        { key: 'Yelan', element: 'hydro', presets: [20, 21] },
        { key: 'Yoimiya', element: 'pyro', presets: [4, 8] },
        { key: 'YunJin', element: 'geo', presets: [18] },
        { key: 'Zhongli', element: 'geo', presets: [4, 5, 6] }
    ],
    presets: [
        { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 1, defp: 0, em: 0, er: 1, cr: 0, cd: 0 }, //  0: 攻充
        { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 1, defp: 0, em: 0, er: 1, cr: 1, cd: 1 }, //  1: 攻充双暴
        { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 1, defp: 0, em: 1, er: 1, cr: 1, cd: 1 }, //  2: 攻充精双暴
        { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 1, defp: 0, em: 0, er: 0, cr: 0, cd: 1 }, //  3: 攻击爆伤
        { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 1, defp: 0, em: 0, er: 0, cr: 1, cd: 1 }, //  4: 攻双暴
        { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 1, defp: 0, em: 0, er: 1, cr: 1, cd: 1 }, //  5: 攻生充双暴
        { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 1, defp: 0, em: 0, er: 0, cr: 1, cd: 1 }, //  6: 攻生双暴
        { hp: 0, atk: 0, def: 0, hpp: 1, atkp: .5, defp: 0, em: 1, er: 0, cr: 1, cd: 1 }, //  7: 攻生精双暴
        { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 1, defp: 0, em: 1, er: 0, cr: 1, cd: 1 }, //  8: 攻精双暴
        { hp: 0, atk: 0, def: 0, hpp: 0, atkp: .5, defp: 1, em: 0, er: 0, cr: 1, cd: 1 }, // 9: 攻防双暴
        { hp: 0, atk: 0, def: 0, hpp: 0, atkp: .5, defp: 1, em: 0, er: 1, cr: 1, cd: 1 }, // 10: 攻防充双暴
        { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 0, defp: 0, em: 0, er: 1, cr: 0, cd: 0 }, // 11: 生充
        { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 1, defp: 0, em: 0, er: 1, cr: 0, cd: 0 }, // 12: 生攻充
        { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 1, defp: 0, em: 1, er: 1, cr: 0, cd: 0 }, // 13: 生攻精充
        { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 0, defp: 0, em: 1, er: 0, cr: 1, cd: 1 }, // 14: 生精双暴
        { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 0, defp: 0, em: 1, er: 0, cr: 0, cd: 1 }, // 15: 生精爆伤
        { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0, defp: 0, em: 1, er: 0, cr: 0, cd: 0 }, // 16: 精
        { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0, defp: 0, em: 1, er: 1, cr: 0, cd: 0 }, // 17: 精充
        { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0, defp: 1, em: 0, er: 1, cr: 0, cd: 0 }, // 18: 防充
        { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0, defp: 1, em: 0, er: 0, cr: 1, cd: 1 }, // 19: 防双暴
        { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 0, defp: 0, em: 0, er: 0, cr: 1, cd: 1 }, // 20: 生双暴
        { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 0, defp: 0, em: 0, er: 1, cr: 1, cd: 1 }, // 21: 生充双暴
    ]
}