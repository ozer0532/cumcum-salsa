class Dictionary {
    constructor() {
        this.dict = [];
    }

    insert(key, value) {
        this.dict.push({
            key:    key,
            value:  value
        })
    }
}

module.exports = {
    Dictionary: Dictionary
}