// https://www.cnblogs.com/endv/p/8089506.html

export default {
    set(name, value, expire = 30 * 24 * 60 * 60 * 1000) {
        var exp = new Date();
        exp.setTime(exp.getTime() + expire);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    get(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    del(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.get(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}