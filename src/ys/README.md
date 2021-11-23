# Artifact

## Terminology and stats

Artifacts have **rarity** 1-5 and **level** 0-20.

There are 5 **type**s of artifacts:

| Artifact type      | `Artifact.type` |
| ------------------ | --------------- |
| Flower of Life     | `life`          |
| Plume of Death     | `plume`         |
| Sands of Eon       | `sands`         |
| Goblet of Eonothem | `goblet`        |
| Circlet of Logos   | `circlet`       |

Each artifact belongs to some artifact **set**, which includes (up to 2021-11-19):

| Set                       | `Artifact.set`           | Rarity |
| ------------------------- | ------------------------ | ------ |
| Initiate                  | `Initiate`               | 1      |
| Adventurer                | `Adventurer`             | 1-3    |
| Lucky Dog                 | `LuckyDog`               | 1-3    |
| Traveling Doctor          | `TravelingDoctor`        | 1-3    |
| Resolution of Sojourner   | `ResolutionofSojourner`  | 3-4    |
| Tiny Miracle              | `TinyMiracle`            | 3-4    |
| Berserker                 | `Berserker`              | 3-4    |
| Instructor                | `Instructor`             | 3-4    |
| The Exile                 | `TheExile`               | 3-4    |
| Defender's Will           | `DefendersWill`          | 3-4    |
| Brave Heart               | `BraveHeart`             | 3-4    |
| Martial Artist            | `MartialArtist`          | 3-4    |
| Gambler                   | `Gambler`                | 3-4    |
| Scholar                   | `Scholar`                | 3-4    |
| Prayers for Illumination  | `PrayersforIllumination` | 3-4    |
| Prayers for Destiny       | `PrayersforDestiny`      | 3-4    |
| Prayers for Wisdom        | `PrayersforWisdom`       | 3-4    |
| Prayers to Springtime     | `PrayerstoSpringtime`    | 3-4    |
| Gladiator's Finale        | `GladiatorsFinale`       | 4-5    |
| Wanderer's Troupe         | `WanderersTroupe`        | 4-5    |
| Thunder­soother           | `Thundersoother`         | 4-5    |
| Thundering Fury           | `ThunderingFury`         | 4-5    |
| Maiden Beloved            | `MaidenBeloved`          | 4-5    |
| Viridescent Venerer       | `ViridescentVenerer`     | 4-5    |
| Crimson Witch of Flames   | `CrimsonWitchofFlames`   | 4-5    |
| Lavawalker                | `Lavawalker`             | 4-5    |
| Noblesse Oblige           | `NoblesseOblige`         | 4-5    |
| Bloodstained Chivalry     | `BloodstainedChivalry`   | 4-5    |
| Archaic Petra             | `ArchaicPetra`           | 4-5    |
| Retracing Bolide          | `RetracingBolide`        | 4-5    |
| Blizzard Strayer          | `BlizzardStrayer`        | 4-5    |
| Heart of Depth            | `HeartofDepth`           | 4-5    |
| Tenacity of the Millelith | `TenacityoftheMillelith` | 4-5    |
| Pale Flame                | `PaleFlame`              | 4-5    |
| Shimenawa's Reminiscence  | `ShimenawasReminiscence` | 4-5    |
| Emblem of Severed Fate    | `EmblemofSeveredFate`    | 4-5    |
| Husk of Opulent Dreams    | `HuskofOpulentDreams`    | 4-5    |
| Ocean-Hued Clam           | `OceanHuedClam`          | 4-5    |

Rarity 5 artifacts have one **main affix** and 3-4 **minor affixes**.

| Affix name        | `Affix.name` | main or minor |
| ----------------- | ------------ | ------------- |
| HP                | `hp`         | main/minor    |
| ATK               | `atk`        | main/minor    |
| DEF               | `def`        | minor         |
| HP%               | `hpp`        | main/minor    |
| ATK%              | `atkp`       | main/minor    |
| DEF%              | `defp`       | main/minor    |
| Elemental Mastery | `em`         | main/minor    |
| Energy Recharge%  | `er`         | main/minor    |
| Crit Rate%        | `cr`         | main/minor    |
| Crit DMG%         | `cd`         | main/minor    |
| Pyro DMG%         | `pyro`       | main          |
| Hydro DMG%        | `hydro`      | main          |
| Dendro DMG%       | `dendro`     | main          |
| Electro DMG%      | `electro`    | main          |
| Anemo DMG%        | `anemo`      | main          |
| Cryo DMG%         | `cryo`       | main          |
| Geo DMG%          | `geo`        | main          |
| Physical DMG%     | `physical`   | main          |
| Healing Bonus     | `hb`         | main          |

See more on the [basics of artifacts](https://genshin-impact.fandom.com/wiki/Artifacts).

Distribution of main affixes depends on the type of artifacts:

| Artifact Type      | Main affix        | Pick weight | Max value |
| ------------------ | ----------------- | ----------- | --------- |
| Flower of Life     | HP                | 1           | 4780      |
| Plume of Death     | ATK               | 1           | 311       |
| Sands of Eon       | HP%               | 8           | 0.466     |
| Sands of Eon       | ATK%              | 8           | 0.466     |
| Sands of Eon       | DEF%              | 8           | 0.583     |
| Sands of Eon       | Elemental Mastery | 3           | 186.5     |
| Sands of Eon       | Energy Recharge%  | 3           | 0.518     |
| Goblet of Eonothem | HP%               | 17          | 0.466     |
| Goblet of Eonothem | ATK%              | 17          | 0.466     |
| Goblet of Eonothem | DEF%              | 16          | 0.583     |
| Goblet of Eonothem | Pyro DMG%         | 4           | 0.466     |
| Goblet of Eonothem | Hydro DMG%        | 4           | 0.466     |
| Goblet of Eonothem | Electro DMG%      | 4           | 0.466     |
| Goblet of Eonothem | Anemo DMG%        | 4           | 0.466     |
| Goblet of Eonothem | Cryo DMG%         | 4           | 0.466     |
| Goblet of Eonothem | Geo DMG%          | 4           | 0.466     |
| Goblet of Eonothem | Physical DMG%     | 4           | 0.583     |
| Goblet of Eonothem | Elemental Mastery | 2           | 186.5     |
| Circlet of Logos   | HP%               | 11          | 0.466     |
| Circlet of Logos   | ATK%              | 11          | 0.466     |
| Circlet of Logos   | DEF%              | 11          | 0.583     |
| Circlet of Logos   | Crit Rate%        | 5           | 0.311     |
| Circlet of Logos   | Crit DMG%         | 5           | 0.622     |
| Circlet of Logos   | Healing Bonus     | 5           | 0.359     |
| Circlet of Logos   | Elemental Mastery | 2           | 186.5     |

Distribution of minor affixes does not depend on the type of artifacts.
Minor affix cannot be the same as the main affix.
By enhancing an artifact to level 4, 8, 12, 16, and 20, one minor affix
would be rolled and increased. If an artifact has less than 4 minor affixes,
a new minor affix would be rolled, which cannot confict with existing
main/minor affixes and follows the minor affix distribution. If an artifact
has exactly 4 minor affixes, one of the 4 minor affix would be rolled
with equal probability. One increment of a minor affix takes one of 4
possible values with equal probability, 70%, 80%, 90% and 100% of the
maximum value.

Distribution of minor affixes is:

| Minor affix       | Pick weight | Max value |
| ----------------- | ----------- | --------- |
| HP                | 6           | 298.75    |
| ATK               | 6           | 19.45     |
| DEF               | 6           | 23.15     |
| HP%               | 4           | 0.0583    |
| ATK%              | 4           | 0.0583    |
| DEF%              | 4           | 0.0729    |
| Elemental Mastery | 4           | 23.31     |
| Energy Recharge%  | 4           | 0.0648    |
| Crit Rate%        | 3           | 0.0389    |
| Crit DMG%         | 3           | 0.0777    |

See more on the [distribution of affixes](https://bbs.nga.cn/read.php?tid=25954661&fav=aebe13b2).

## Artifact potential

> In this section, only rarity 5 artifacts are considered.

Three statistics are considered important to the evaluation of an artifact's
potential: **expected affix number**, **maximum affix number** and
**minimum affix number**. Here "affix" refers to minor affixes
because main affixes are fixed. As minor affix increment takes
4 possible values, the affix number of a minor affix is defined to be the
ratio of its value divided by the maximum one-time increment of this
minor affix. The affix number of an artifact is defined to be an weighted
sum of each minor affix number, given the weight of each minor affix customed
by users. This is because certain minor affixes are considered useless while
others are usually more valuable. Weight of a minor affix must be between
0 and 1.

For an artifact, let $\alpha$ be the main affix, $a_{i}$ be a minor affix,
$A$ be the set of all minor affixes, $p( a_{i})$ be the pick weight,
$w( a_{i})$ be customized affix weight, $v^{*}( a_{i})$ be the maximum
one-time increment, and $v( a_{i})$ be the current affix value. Expected,
minimum and maximum affix numbers are refered to by
$\overline{S} ,S_{min} ,S_{max}$, respectively.

### Artifacts with 3 minor affixes

Let $a_{1} ,a_{2} ,a_{3}$ be the 3 minor affixes. Affix enhancement times
$n=5$. Expected affix number is
$$
\begin{aligned}
\overline{S} = & \sum _{i=1,2,3} w( a_{i})\left(\frac{v( a_{i})}{v^{*}( a_{i})} +4\times \frac{1}{4} \times 0.85\right)\\
 & +\frac{\sum _{a\in A\backslash \{a_{1} ,a_{2} ,a_{3} ,\alpha \}} w( a) p( a)}{\sum _{a\in A\backslash \{a_{1} ,a_{2} ,a_{3} ,\alpha \}} p( a)} \times \left( 0.85+4\times \frac{1}{4} \times 0.85\right).
\end{aligned}
$$
Maximum affix number is
$$
\begin{aligned}
a_{4} = & \operatorname{arg\ max}_{a\in A\backslash \{a_{1} ,a_{2} ,a_{3} ,\alpha \}} w( a) ,\\
a^{*} = & \operatorname{arg\ max}_{a\in \{a_{1} ,a_{2} ,a_{3} ,a_{4}\}} w( a) ,\\
S_{\min} = & \sum _{i=1,2,3} w( a_{i})\frac{v( a_{i})}{v^{*}( a_{i})} +w( a_{4}) +4w\left( a^{*}\right).
\end{aligned}
$$
Minimum affix number is
$$
\begin{aligned}
a_{4} = & \operatorname{arg\ min}_{a\in A\backslash \{a_{1} ,a_{2} ,a_{3} ,\alpha \}} w( a) ,\\
a^{*} = & \operatorname{arg\ min}_{a\in \{a_{1} ,a_{2} ,a_{3} ,a_{4}\}} w( a) ,\\
S_{\max} = & \sum _{i=1,2,3} w( a_{i})\frac{v( a_{i})}{v^{*}( a_{i})} +0.7\times \left( w( a_{4}) +4w\left( a^{*}\right)\right).
\end{aligned}
$$

### Artifact with 4 minor affixes

Let $a_{1} ,a_{2} ,a_{3} ,a_{4}$ be the 4 minor affixes. Affix enhancement times is $n$.
Expected affix number is
$$
\overline{S} =\sum _{i=1,2,3,4} w( a_{i})\left(\frac{v( a_{i})}{v^{*}( a_{i})} +n\times \frac{1}{4} \times 0.85\right).
$$
Maximum affix number is
$$
\begin{aligned}
a^{*} = & \operatorname{arg\ max}_{a\in \{a_{1} ,a_{2} ,a_{3} ,a_{4}\}} w( a) ,\\
S_{\max} = & \sum _{i=1,2,3,4} w( a_{i})\frac{v( a_{i})}{v^{*}( a_{i})} +n\cdot w\left( a^{*}\right).
\end{aligned}
$$
Minimum affix number is
$$
\begin{aligned}
a^{*} = & \operatorname{arg\ min}_{a\in \{a_{1} ,a_{2} ,a_{3} ,a_{4}\}} w( a) ,\\
S_{\min} = & \sum _{i=1,2,3,4} w( a_{i})\frac{v( a_{i})}{v^{*}( a_{i})} +0.75n\cdot w\left( a^{*}\right).
\end{aligned}
$$