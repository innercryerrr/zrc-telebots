// const blacklist = require('../blacklist.js')
const blacklist = []

function ccCheckBlacklist (ccObj) {
    
    if (blacklist.includes(ccObj.number)) {
        return { ...ccObj}
    }

    return false
}

module.exports = ccCheckBlacklist