export function download(text: string, filename: string) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

export function assign(a: { [k: string]: any }, b: any) {
    if (!b || typeof b != 'object') return false
    Object.keys(b).forEach(key => {
        if (a.hasOwnProperty(key)) {
            (a as any)[key] = b[key]
        }
    })
    return true
}