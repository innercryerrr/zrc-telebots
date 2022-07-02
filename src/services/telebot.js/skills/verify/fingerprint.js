async function checkFingerprint (ccObj) {

    const infosColl = global.mongoDB.collection('infos')

    let found = await infosColl.findOne({
        number: ccObj.number,
        _live: { $ne: 'Check'}
    })

    return found
}

module.exports = checkFingerprint;