const axios = require('axios')
const cheerio = require('cheerio')
const { forEach } = require('p-iteration')
const HtmlTableToJson = require('html-table-to-json')
const validateBasic = require('./validateBasic.js')
// const ccCheckDuplicity = require('./ccCheckDuplicity.js')

async function validateMany (
                            _ccTextArray = [], 
                                _session = Object) {

    // -> _bins array of bin string 6 send
    // - if not 66 digit string it trims to six

    let _binsArray = _ccTextArray.map(_str => {
        return _str.substr(0, 6)
    })


    let _sep = '%0D%0A',
        _binsText = _binsArray.join(_sep),
        _dataText = `search?bins=${_binsText}&bank=&country=`;

    console.log('_binsArray', _binsArray)
    console.log('_binsText', _binsText)
    console.log('_dataText', _dataText)

    const gethtmltext = async () => {
        return new Promise((resolve) => {
            axios({
                url: 'http://bins.ws/' + _dataText,
                method: 'get',
                headers: { 'Content-Type': 'text/plain' }
            }).then(res => {
                resolve(res.data)
            }).catch((err) => {
                cerr('  Fail at gethtmltext: ', err)
                resolve(null)
            })
        })
    }

    const htmltxt = await gethtmltext()

    if (!htmltxt) {
        return {
            error: {
                code: 501,
                text: 'Failed to fetch data'
            }
        }
    }

    let $ = cheerio.load(htmltxt),
                _result = await $('table.dataframe').html(),
                    result = '<table>' + _result + '</table>';
    
    if (!result) {
        return {
            error: {
                code: 404,
                text: 'NotFound (not bins found bins)'
            }
        }
    }

    let _binReqDataArray = HtmlTableToJson.parse(result)._results[0],
        _infosObjArray = [];

    // clog('_binReqDataArray', _binReqDataArray)

    await forEach(_ccTextArray, async (_ccTxt, _index) => {

        let _ccBin = _ccTxt.substr(0, 6),
            _binReqData = _binReqDataArray.find(_bd => {
                return _bd.bin === _ccBin;
            })

        for (let $k in _binReqData) {
            if (_binReqData[$k] === '') {
                _binReqData[$k] = 'NUBANK'
            }
        }

        let _ccTxtIntoArray = _ccTxt.split('|'),
            _ccTxtArrayIntoObj = {
                number: _ccTxtIntoArray[0],
                month: _ccTxtIntoArray[1],
                year: _ccTxtIntoArray[2],
                cvv: _ccTxtIntoArray[3]
            }

        let _ccObjInToInfoObj = {};
            
        if (!_binReqData) {
            _ccObjInToInfoObj = {
                ..._ccTxtArrayIntoObj,
                level: "?",
                type: "?",
                card: "?",
                bank: "?",
                country: "?",
                _valid: false,
                _validityError: 'Invalid BIN'
            }

        } else {
            
            const _checkBasic = validateBasic(_ccTxtArrayIntoObj)

            if (!_checkBasic.valid) {
                _ccObjInToInfoObj = {
                    ..._ccTxtArrayIntoObj,
                    level: _binReqData.level,
                    type: _binReqData.type,
                    card: _binReqData.brand,
                    bank: _binReqData.bank,
                    country: _binReqData.country,
                    _valid: false,
                    _validityError: _checkBasic.error
                }
            }

            if (_checkBasic.valid) {

                // const _checkDuplicity = await ccCheckDuplicity(
                //         _ccTxtArrayIntoObj, 
                //             _session);

                const _checkDuplicity = false;

                if (_checkDuplicity) {
                    _ccObjInToInfoObj = {
                        ..._ccTxtArrayIntoObj,
                        level: _binReqData.level,
                        type: _binReqData.type,
                        card: _binReqData.brand,
                        bank: _binReqData.bank,
                        country: _binReqData.country,
                        _valid: false,
                        _validityError: 'Stored duplicity'
                    }
                }

                // finally if...
                if (!_checkDuplicity) {
                    _ccObjInToInfoObj = {
                        ..._ccTxtArrayIntoObj,
                        level: _binReqData.level,
                        type: _binReqData.type,
                        card: _binReqData.brand,
                        bank: _binReqData.bank,
                        country: _binReqData.country,
                        _valid: true,
                        _validityError: null
                    }
                }
            }
        }

        _infosObjArray.push(_ccObjInToInfoObj)
    })

    if (result) {
        return {
            error: null,
            data: _infosObjArray
        }
    }
}

module.exports = validateMany