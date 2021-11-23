class YsError extends Error {
    /**
     * @param {string} message 
     */
    constructor(message) {
        super(message)
        this.name = 'YsError'
    }
}

class YsAssertionError extends YsError {
    /**
     * @param {string} message 
     */
    constructor(message) {
        super(message)
        this.name = 'YsAssertionError'
    }
}

/**
 * 
 * @param {*} p 
 * @param {string} [message] 
 */
function assert(p, message) {
    if (!p) {
        throw new YsAssertionError(message)
    }
}

export { YsError, YsAssertionError }
export { assert }