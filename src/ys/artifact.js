class Affix {
    key = ''
    value = 0

    /**
     * @param {Object} obj 
     */
    constructor(obj) {
        if (obj) {
            this.key = obj.key
            this.value = obj.value
        }
    }

    valueString() {
        if (['hp', 'atk', 'def', 'em'].includes(this.key)) {
            return this.value.toFixed(0)
        } else {
            return (100 * this.value).toFixed(1) + '%'
        }
    }
}

class Artifact {
    set = ''
    type = ''
    rarity = 0
    level = 0
    mainAffix = new Affix()
    /**
     * @type {Affix[]}
     */
    minorAffixes = []
    data = {}

    /**
     * @param {Object} obj 
     */
    constructor(obj) {
        if (obj) {
            // deep copy
            let objJson = JSON.stringify(obj)
            obj = JSON.parse(objJson)
            this.set = obj.set
            this.type = obj.type
            this.rarity = obj.star
            this.level = obj.level
            this.mainAffix = new Affix(obj.mainAffix)
            for (let o in obj.minorAffixes) {
                this.minorAffixes.push(new Affix(o))
            }
        }
    }

}

export { Affix, Artifact }