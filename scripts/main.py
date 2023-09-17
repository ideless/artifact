import bs4
import logging
from pydantic import BaseModel

from nga import NGAGuest


logging.basicConfig(
    format="%(asctime)s %(levelname)-8s %(message)s", level=logging.DEBUG)
logger = logging.getLogger(__name__)


class CharBuild(BaseModel):
    name: str
    sets: list[str]
    sands_mains: list[str]
    goblet_mains: list[str]
    circlet_mains: list[str]
    best_minors: list[str]


def parse_build_from_raw_text(text: str) -> CharBuild:
    sets_marker = "圣遗物套装"
    mains_marker = "圣遗物对应属性"
    minors_marker = "圣遗物有效词条"
    weapon_marker = "推荐武器"

    for m in [sets_marker, mains_marker, minors_marker, weapon_marker]:
        assert text.find(m) != -1, f"{m} not found in {text}"


nga = NGAGuest(logger=logger)

builds = []

for pid in [
    635739983,  # 岩
    635740877,  # 火
    635741997,  # 水
    635742419,  # 冰
    635742911,  # 风
    635743435,  # 雷
    635744974,  # 草
    635745349,  # 旅行者(空/荧)
]:
    soup = nga.get_post_content(pid)
    for d in soup.find_all("details"):
        name: str = d.find("summary").text
        try:
            builds.append(parse_build_from_raw_text(d.text))
        except AssertionError as e:
            logger.warning(f"Skipped {name}: {e}")
