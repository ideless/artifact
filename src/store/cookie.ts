export default {
    set(key: string, value: string, expire: number = 365 * 24 * 60 * 60 * 1000) {
        let exp = new Date()
        exp.setTime(exp.getTime() + expire)
        document.cookie = key + '=' + encodeURI(value) + ';expires=' + exp.toUTCString()
    },
    get(key: string) {
        let arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return decodeURI(arr[2]);
        else
            return null;
    },
    del(key: string) {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval = this.get(key);
        if (cval != null)
            document.cookie = key + "=" + cval + ";expires=" + exp.toUTCString();
    }
}