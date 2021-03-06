async function checkDuplicity (ccObj, session) {

    const infosColl = global.mongoDB.collection('infos')

    return await infosColl.findOne({
        number: ccObj.number,
        _ownerId: session._id
    })
}

module.exports = checkDuplicity