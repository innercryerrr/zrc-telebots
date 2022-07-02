function shuffleArray (array) {
    for (let i = array.length - 1; i > 0; i--) {
         let rand = Math.floor(Math.random() * (i + 1));
         [array[i], array[rand]] = [array[rand], array[i]]
    }
}

function maybe (_chance, ops) {

    let $chance = new Chance()

    if (!_chance) {
        _chance = 50;
    }
    
    let $do = $chance.bool({ 
        likelihood: _chance 
    })

    if ($do) {
        ops.do()
    } else {
        ops.dont()
    }
}

function isBadBank (bank) {
    
    let isbadBank = $c.blacklistBanks.some(_bank => { 
        return bank.includes(_bank)
    })

    return isbadBank
}

async function delayRandom (delay = {}, _logTxt = '') {

    const min = delay.min,
          max = delay.max

    let _rms = Math.floor(Math.random() * (max - min + 1)) + min;

    if (_logTxt && _logTxt.length !== 0) {
        console.log(_logTxt, _rms)
    }

    return new Promise(resolve => setTimeout(resolve, _rms))
}

function containsEachotherAny (firstarr, targetarr) {
    return firstarr.find(v => { 
        return targetarr.includes(v)
    })
}

function arrayRotate (arr, count) {
    const _arr = Array.from(arr)
    count = count % _arr.length;
    while (_arr.length && count < 0) count += _arr.length;
    _arr.push.apply(_arr, _arr.splice(0, count));
    return _arr;
}

function logPort (port) {
    return () => {
        console.log(`[\x1b[34mSERVER\x1b[37m] Listening on port: \x1b[36m${port} 🤖 \x1b[37m`)
        return console.log('...', '\n')
    }
}

function assignKey (query) {
    let obj = {}
    obj[$c.apiKeyName] = $c.apiKeyValue
    return Object.assign(query, obj)
}

function genHash (str = 'hh', seed = 0) {
    
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    
    return 4294967296 * (2097151 & h2) + (h1>>>0);
}

function genValidcpf () {
    
    let _cpgen;

    while (!_cpgen) {
        _cpgen = generate();
    }

    return _cpgen;
}

module.exports = {
    
    set () {

        clog('\n    Setting util.js as global .util')

        const util = {
            maybe,
            genHash,
            genValidcpf,
            logPort,
            assignKey,
            isBadBank,
            arrayRotate,
            delayRandom,
            shuffleArray,
            containsEachotherAny
        }

        Object.assign(global, { util })
    }
}