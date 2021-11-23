/**
 * 
 * @param {string} w 
 * @param {Object} dict 
 */
function whatis(w, dict) {
    for (let key in dict) {
        if (dict[key] == w) {
            return key
        }
    }
    return undefined
}

export { whatis }