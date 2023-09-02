import requests
from random import randint
import logging
import re
from bs4 import BeautifulSoup
import bbcode

from cache import cache, cache_expire

logging.basicConfig(
    format="%(asctime)s %(levelname)-8s %(message)s", level=logging.DEBUG)
logger = logging.getLogger(__name__)


class NGAGuest:
    def __init__(
        self,
        host: str = "https://ngabbs.com",
        cookie: str = None,
        logger: logging.Logger = None
    ):
        self.host = host
        self.cookie = cookie
        self.logger = logger

    def _log(self, msg: str, level: int = logging.INFO):
        if self.logger:
            self.logger.log(level, msg)

    def _log_response(self, rsp: requests.Response):
        level = logging.DEBUG

        self._log(f"Response: {rsp.status_code} {rsp.reason}", level=level)
        self._log(f"Headers: {rsp.headers}", level=level)
        self._log(f"Body: {rsp.text}", level=level)

    def _update_cookie(self, cookie_dict: dict):
        self.cookie = "; ".join([f"{k}={v}" for k, v in cookie_dict.items()])
        self._log(f"Updated cookie: {self.cookie}")

    @cache.memoize(expire=cache_expire, tag="nga_guest_get", ignore=(0, 2))
    def _get(self, url: str, max_retries: int = 5):
        while True:
            rsp = requests.get(
                self.host + url + f"&rand={randint(0, 999)}",
                headers={"Cookie": self.cookie}
            )
            self._log_response(rsp)

            if rsp.status_code == 200:
                return rsp.text

            if max_retries <= 0:
                raise Exception(f"Failed to get {url}: no more retries")
            else:
                max_retries -= 1

            if "Set-Cookie" in rsp.headers:
                lastvisit = re.search(r"lastvisit=(\d+);",
                                      rsp.headers["Set-Cookie"])
                ngaPassportUid = re.search(
                    r"ngaPassportUid=(\w+);", rsp.headers["Set-Cookie"])
                if lastvisit and ngaPassportUid:
                    self._update_cookie({
                        "lastvisit": lastvisit.group(1),
                        "ngaPassportUid": ngaPassportUid.group(1),
                        "guestJs": lastvisit.group(1),
                    })

    def get_thread(self, tid: int):
        url = f"/read.php?tid={tid}"
        html = self._get(url)

        soup = BeautifulSoup(html, features="html.parser")

        subject = soup.select_one("#postsubject0").text
        content = soup.select_one("#postcontent0").text

        print(bbcode.render_html(content))


if __name__ == "__main__":
    logger.info("Test NGA Guest")

    nga = NGAGuest(logger=logger)

    nga.get_thread(27859119)

    for tid in [
        # 27859119,  # 前言

    ]:
        pass
