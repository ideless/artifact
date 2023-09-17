import requests
from random import randint
import logging
import re
from bs4 import BeautifulSoup
import bbcode

from cache import cache, cache_expire


class NGABBCodeParser(bbcode.Parser):
    def __init__(self):
        super().__init__()

        self.add_formatter("size", self._format_size)
        self.add_formatter("collapse", self._format_collapse)
        self.add_formatter("img", self._format_img)
        self.add_formatter("del", self._format_del)

    def _format_size(self, tag_name, value, options, parent, context):
        return f'<span style="font-size: {options["size"]}%">{value}</span>'

    def _format_collapse(self, tag_name, value, options, parent, context):
        return f'<details><summary>{options["collapse"]}</summary>{value}</details>'

    def _format_img(self, tag_name, value, options, parent, context):
        return f'<img src="{value}" />'

    def _format_del(self, tag_name, value, options, parent, context):
        return f'<del>{value}</del>'


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
        self.bbcode_parser = NGABBCodeParser()

    def _log(self, msg: str, level: int = logging.INFO):
        if self.logger:
            self.logger.log(level, msg)

    def _log_response(self, rsp: requests.Response):
        level = logging.DEBUG

        self._log(f"Response: {rsp.status_code} {rsp.reason}", level=level)
        self._log(f"Headers: {rsp.headers}", level=level)
        self._log(f"Body: {len(rsp.text)} bytes", level=level)

    def _update_cookie(self, cookie_dict: dict):
        self.cookie = "; ".join([f"{k}={v}" for k, v in cookie_dict.items()])
        self._log(f"Updated cookie: {self.cookie}")

    @cache.memoize(expire=cache_expire, tag="nga_guest_get", ignore=(0, 2))
    def _get(self, url: str, max_retries: int = 5):
        n_retries = 0
        while True:
            rsp = requests.get(
                self.host + url + f"&rand={randint(0, 999)}",
                headers={"Cookie": self.cookie}
            )
            self._log_response(rsp)

            if rsp.status_code == 200:
                self._log(f"Got {url} after {n_retries} retries")
                return rsp.text

            if n_retries >= max_retries:
                raise Exception(f"Failed to get {url}: no more retries")
            else:
                self._log(
                    f"Failed to get {url}: {rsp.status_code} {rsp.reason},"
                    " retrying...",
                    level=logging.WARNING
                )
                n_retries += 1

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

    def get_post_content(self, pid: int):
        '''Get post content and parsed as BeautifulSoup'''
        url = f"/read.php?pid={pid}"
        html = self._get(url)
        soup = BeautifulSoup(html, features="html.parser")
        content = soup.select_one("#postcontent0").text
        html = self.bbcode_parser.format(content)
        soup = BeautifulSoup(html, features="html.parser")
        return soup


if __name__ == "__main__":
    logger = logging.getLogger(__name__)
    logger.info("Test NGA Guest")

    nga = NGAGuest(logger=logger)

    logger.info(nga.get_post_content(1))
