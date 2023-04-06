from sympy import *
from itertools import permutations, product

init_printing()

P_MINOR = {
    "hp": Rational(6, 44),
    "atk": Rational(6, 44),
    "def": Rational(6, 44),
    "hpp": Rational(4, 44),
    "atkp": Rational(4, 44),
    "defp": Rational(4, 44),
    "em": Rational(4, 44),
    "er": Rational(4, 44),
    "cr": Rational(3, 44),
    "cd": Rational(3, 44),
}


def get_avg_affnum(
    main_key: str,
    weight: dict[str, float],
    n_minors: int,
    minor_keys: list[str]
) -> float:
    avg_affnum = 0

    all_minor_keys = [key for key in P_MINOR.keys()
                      if key != main_key and key not in minor_keys]
    p_all = sum(P_MINOR[key] for key in all_minor_keys)

    for new_minor_keys in permutations(all_minor_keys, min(n_minors, 4-len(minor_keys))):
        p = 1
        p_all_tmp = p_all
        for minor_key in new_minor_keys:
            p *= P_MINOR[minor_key] / p_all_tmp
            p_all_tmp -= P_MINOR[minor_key]

        avg_affnum_tmp = 0
        for minor_key in new_minor_keys:
            avg_affnum_tmp += weight[minor_key] * Rational(8+9, 20)

        for minor_key in minor_keys + list(new_minor_keys):
            avg_affnum_tmp += weight[minor_key] * \
                Rational(8+9, 80) * max(n_minors-4+len(minor_keys), 0)

        avg_affnum += p * avg_affnum_tmp

    return avg_affnum


if __name__ == "__main__":
    avg_affnum = get_avg_affnum(
        "atkp",
        {
            "hp": 0,
            "atk": 0,
            "def": 0,
            "hpp": 0,
            "atkp": 1,
            "defp": 0,
            "em": 0,
            "er": Rational(1, 3),
            "cr": Rational(1, 2),
            "cd": 1,
        },
        6,
        []
    )
    print(avg_affnum)
