function rawTextList (infostextlist) {
    
    let f = infostextlist.replaceAll(' ', ''),
        s = f.split('\n'),
        t = s.filter(e => e != '');

    return {
        to: {
            
            formated () {
                return t.join('\n')
            },
            
            arrayOfStrings () {
                return t;
            },
            
            arrayOfObjects () {
                return t.map(infotext => {
                    let _infoarr = infotext.split('|')
                    return {
                        number: _infoarr[0],
                        month: _infoarr[1],
                        year: _infoarr[2],
                        cvv: _infoarr[3]
                    }
                })
            }
        }
    }
}

function rawToObject (_infotext) {
    
    let _infoarr = _infotext.split('|')
    
    return {
        number: _infoarr[0],
        month: _infoarr[1],
        year: _infoarr[2],
        cvv: _infoarr[3]
    }
}

function infoObjToText (cobj) {
    
    let base = `${cobj._valid ? '🟢' : '❌'} ${cobj.number}|${cobj.month}|${cobj.year}|${cobj.cvv}` +
                 ` - ${cobj.level} * ${cobj.type} * ${cobj.card} * ${cobj.bank} * ${cobj.country} ` +
                    `${cobj._validityError ? '⚠️ ' +  cobj._validityError : ''}`;

    if (cobj._liveChecked) {
        base = base + ` ${cobj._live ? 'Live 🔥 R$ ' + cobj._liveCheckDebit : 'Dead 💀' + cobj._liveCheckError }`;
    }

    return base;
}

function infoObjToTextMany (infoscoll) {
    return infoscoll.map(inf => {
        return infoObjToText(inf)
    })
}

async function getChecksByChat (chatid) {
    
    await util.delayRandom({min: 250, max: 500})
    
    return [

        { // case 01
            _textraw: '123456789123|01|01|555',
            number: 222222222222,
            month: 22,
            year: 22,
            cvv: 222,
            // first,
            level: 'GOLD',
            type: 'credit',
            card: 'MasterCard',
            bank: 'Itau S.A',
            country: 'BR',
            _valid: true,
            _validityError: null,
            // other
            _liveChecked: true,
            _live: true,
            _liveCheckDebit: 220,
            _liveCheckError: null,
            // identifier
            _ttchatid: 1111
        },

        { // case 02
            number: 333333333333,
            month: 33,
            year: 33,
            cvv: 333,
            // first,
            level: 'GOLD',
            type: 'credit',
            card: 'MasterCard',
            bank: 'Itau S.A',
            country: 'BR',
            _valid: true,
            _validityError: null,
            // other
            _liveChecked: true,
            _live: true,
            _liveCheckDebit: 339,
            _liveCheckError: null,
            // identifier
            _ttchatid: 1111
        },

        { // case 03
            number: 444444444444,
            month: 44,
            year: 44,
            cvv: 444,
            // first,
            level: 'GOLD',
            type: 'credit',
            card: 'MasterCard',
            bank: 'Itau S.A',
            country: 'BR',
            _valid: true,
            _validityError: null,
            // other
            _liveChecked: true,
            _live: false,
            _liveCheckDebit: null,
            _liveCheckError: 'Recusado pelo emirssor',
            // identifier
            _ttchatid: 1111
        },

        { // case 04
            number: 555555555555,
            month: 55,
            year: 55,
            cvv: 555,
            // first,
            level: 'GOLD',
            type: 'credit',
            card: 'MasterCard',
            bank: 'Itau S.A',
            country: 'BR',
            _valid: true,
            _validityError: null,
            // other
            _liveChecked: false,
            _live: null,
            _liveCheckDebit: null,
            _liveCheckError: null,
            // identifier
            _ttchatid: 1111
        },

        { // case 05 (wont even pass 2 live check)
            number: 666666666666,
            month: 66,
            year: 66,
            cvv: 666,
            // first,
            level: 'GOLD',
            type: 'credit',
            card: 'MasterCard',
            bank: 'Itau S.A',
            country: 'BR',
            _valid: false,
            _validityError: 'Numero inválido',
            // other
            _liveChecked: false,
            _live: null,
            _liveCheckDebit: null,
            _liveCheckError: null,
            // identifier
            _ttchatid: 1111
        }
    ]
}

async function addChecks () {

}

async function removeChecks () {

}

function fetchPixCode (chat, brl, cb) {
    setTimeout(() => {
        cb(100, null)
    }, 1500)
}

function infoAmountToBRL (infoAmount) {
    return infoAmount * 0.10;
}

module.exports = {
    rawTextList,
    rawToObject,
    infoObjToText,
    infoObjToTextMany,
    getChecksByChat,
    addChecks,
    removeChecks,
    fetchPixCode,
    infoAmountToBRL,
    ...require('./speech.js'),
    ...require('./verify/index.js'),
    ...require('./validate/index.js')
}