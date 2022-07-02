// import { infoCharsMap } from '../config.js'

function infoObjToText  (_infoObj, _demo, _includeCus) {
    
    // * hope formart _infoObj
    // = output from infoText + database props

    let main = (__infoObj) => {

        let _ios = __infoObj,
            _toText = [ 
                _ios.number,
                _ios.month,
                _ios.year,
                _ios.cvv,
                _ios.level,
                _ios.type,
                _ios.card
            ].join('|')

            _toText = _toText + `|${_ios.country}`
            _toText = _toText + `|${_ios.bank
                                    .replaceAll('BANCO', '')
                                    .replaceAll('BRASIL', 'BRA')
                                    .replaceAll('BRAZIL', 'BRA')
                                    .replaceAll(',', '')
                                    .replaceAll('.', '')
                                    .replaceAll(' ', '.')
                                    .replace('.', '')} *`;

            _toText = '💳' + _toText;

        if (_ios._errorValid) {
            _toText = _toText + ` (${_ios._errorValid.toLocaleUpperCase()}) `;
        }

        if (_ios._errorLive) {
            _toText = _toText + ` (${_ios._errorLive.toLocaleUpperCase()}) `;
        }

        if (typeof _ios._cashout === 'number') {
            _toText = _toText + ` $${(_ios._cashout / 100).toFixed(2)} `
        }

        // _toText = _toText + ` ${infoCharsMap._valid[_ios._valid]}`;
        // _toText = _toText + ` ${infoCharsMap._live[_ios._live]} `;
        _toText = _toText + ` ✅ `;
        _toText = _toText + ` 🔥`;
        _toText = _toText.replaceAll('  ', ' ')

        if (__infoObj._cus && _includeCus) {
            
            let _ioc = __infoObj._cus,
                
                $toTxtCus = [
                    _ioc.holdername,
                    _ioc.cpf,
                    _ioc.phone
                        .replace('(', '')
                        .replace(') ', '')
                        .replace('-', ''),
                    _ioc.email
                ].join(' | '),

                $toTxtLocs = [
                    _ioc.cep,
                    `${_ioc.city} - ${_ioc.stateAbbr}`,
                    _ioc.address
                ].join(' | ')
                 .replace('undefined', '')
                 .replace('  ', ' ');
            
            _toText = _toText + `\n👤${$toTxtCus}`
            _toText = _toText + `\n📍${$toTxtLocs}`
        }

        _toText = _toText = _toText.replaceAll('undefined', '')

        // ready return
        return _toText
    }

    if (_demo) {
        main = demoTextMode;
    }

    if (_infoObj.constructor.name === 'Array') {
        
        let _txtArray = _infoObj.map(_obj => {
            return main(_obj)
        })

        return _txtArray.join('\n\n') // txt raw 
    }

    if (_infoObj.constructor.name === 'Object') {
        return main(_infoObj)
    }
}

function demoTextMode (_io) {

    let _text = `
        #${_io.number.substring(0, 8)}|
        ${_io.level}|
        ${_io.card}|
        ${_io.type}|
        ✅ 
        🔥
    `

    _text = _text.replaceAll(' ', '')
    _text = _text.replaceAll('\n', '')

    return _text
}

export default infoObjToText