interface IPresetData {
    [key: string]: {
        [key: string]: number;
    };
}

export default <IPresetData>{
    攻充: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 1, defp: 0, em: 0, er: 1, cr: 0, cd: 0 },
    攻充双暴: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 1, defp: 0, em: 0, er: 1, cr: 1, cd: 1 },
    攻充精双暴: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 1, defp: 0, em: 1, er: 1, cr: 1, cd: 1 },
    攻击爆伤: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 1, defp: 0, em: 0, er: 0, cr: 0, cd: 1 },
    攻双暴: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 1, defp: 0, em: 0, er: 0, cr: 1, cd: 1 },
    攻生充双暴: { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 1, defp: 0, em: 0, er: 1, cr: 1, cd: 1 },
    攻生双暴: { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 1, defp: 0, em: 0, er: 0, cr: 1, cd: 1 },
    攻生精双暴: { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 0.5, defp: 0, em: 1, er: 0, cr: 1, cd: 1 },
    攻精双暴: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 1, defp: 0, em: 1, er: 0, cr: 1, cd: 1 },
    攻精充双暴: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 1, defp: 0, em: 1, er: 1, cr: 1, cd: 1 },
    攻防双暴: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 1, em: 0, er: 0, cr: 1, cd: 1 },
    攻防充双暴: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 1, em: 0, er: 1, cr: 1, cd: 1 },
    生: { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 0, defp: 0, em: 0, er: 0, cr: 0, cd: 0 },
    生充: { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 0, defp: 0, em: 0, er: 1, cr: 0, cd: 0 },
    生攻充: { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 1, defp: 0, em: 0, er: 1, cr: 0, cd: 0 },
    生精: { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 0, defp: 0, em: 1, er: 0, cr: 0, cd: 0 },
    生攻精充: { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 1, defp: 0, em: 1, er: 1, cr: 0, cd: 0 },
    生精双暴: { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 0, defp: 0, em: 1, er: 0, cr: 1, cd: 1 },
    生精充双暴: { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 0, defp: 0, em: 1, er: 1, cr: 1, cd: 1 },
    生精爆伤: { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 0, defp: 0, em: 1, er: 0, cr: 0, cd: 1 },
    生双暴: { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 0, defp: 0, em: 0, er: 0, cr: 1, cd: 1 },
    生充双暴: { hp: 0, atk: 0, def: 0, hpp: 1, atkp: 0, defp: 0, em: 0, er: 1, cr: 1, cd: 1 },
    精: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0, defp: 0, em: 1, er: 0, cr: 0, cd: 0 },
    精充: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0, defp: 0, em: 1, er: 1, cr: 0, cd: 0 },
    精双暴: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0, defp: 0, em: 1, er: 0, cr: 1, cd: 1 },
    精充双暴: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0, defp: 0, em: 1, er: 1, cr: 1, cd: 1 },
    防充: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0, defp: 1, em: 0, er: 1, cr: 0, cd: 0 },
    防双暴: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0, defp: 1, em: 0, er: 0, cr: 1, cd: 1 },
    充: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0, defp: 0, em: 0, er: 1, cr: 0, cd: 0 },
};
