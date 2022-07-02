// import { 
//     infoPropsMap, 
//     ccPropsMap } from '../config.js'

const ccPropsMap = {
    0: 'number', // 0
    1: 'month', // 1
    2: 'year', // 2
    3: 'cvv' // 3
}

function infoTextToObj (_infoText, _ccOnly) {

    // const _propsMap = _ccOnly ? ccPropsMap : infoPropsMap;
    const _propsMap = ccPropsMap;
    
    // * hope formart _infoText
    // - {numer}|{month}|{year}|{cvv} ...$or
    // - {numer}|{month}|{year}|{cvv}|{level}|{card}|{type}|{bank}|{country}|{live}
    // - 55555323|04|26|443
    // - 55555323|04|26|443|GOLD|MASTER|CREDIT|ITAU|BRAZIL|LIVE

    const main = (__infoText) => {

        const __1toArr = (_itx) => {

            // let _separator = this.settings.separator,
            let _separator = '|'
            let _toArray = _itx.split(_separator);

            return _toArray
        }

        const __2toObj = (_arr) => {
            return this.arrayToObject(_arr, _propsMap)
        }

        let _array = __1toArr(__infoText),
            _object = __2toObj(_array)

        return _object
    }

    if (_infoText.constructor.name === 'Array') {
        return _infoText.map(_itx => {
            return main(_itx)
        })
    }

    if (_infoText.constructor.name === 'String') {
        return main(_infoText)
    }
}

export default infoTextToObj