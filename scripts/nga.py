import requests
from diskcache import Cache
from random import randint
import logging
import re

cache = Cache(".cache")

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

    def _get(self, url: str, max_retries: int = 3):
        rsp = requests.get(
            self.host + url + f"&rand={randint(0, 999)}",
            headers={"Cookie": self.cookie}
        )
        self._log_response(rsp)

        if rsp.status_code == 200:
            return rsp.text

        if max_retries <= 0:
            raise Exception(f"Failed to get {url}: no more retries")

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

        return self._get(url, max_retries=max_retries - 1)

    def get_post(self, post_id: int):
        url = f"/read.php?tid={post_id}"
        return self._get(url)


if __name__ == "__main__":
    logger.info("Test NGA Guest")
    nga = NGAGuest(logger=logger)
    nga.get_post(27859119)
