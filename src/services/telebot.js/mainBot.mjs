import path    from 'path'
import Telebot from './../../../classes/Telebot.js'
import qrmap        from './skills/qrmap.js'
import bundleSkills from './skills/index.js'

// ...starting Telebot instance.
let mainBot = new Telebot({
    name: 'mainBot',
    naname: '@rkhcbot',
    lowdb: global.$lowdb,
    token: penv.TBOT_TOKEN,
    admins: penv.TBOT_AMDS,
    noptions: { polling: true },
    pixmanager: Number(penv.TBOT_PIX_MAN),
    debug: true
})

mainBot.learn(bundleSkills)

mainBot.meeting(async function (ttchat) {
    
    this.clog('  ...running meeting()\n')

    await this.sendonce(ttchat.id, [
        'Parece que ainda não nos conhecemos, né?',
        'Sou um 🤖 e me chamo ' + this.$name,
        'Vendo o melhor serviço de infocc live/dead checking.',
        '→ Para saber mais, digite /sobre.'
    ])
})

mainBot.donce(async function (ttchat) {
    this.clog('  ...running mainBot.donce()\n')
    await this.sendone(ttchat.id, `Oi, @${ttchat.name}. Bom revê-lo!`)
})

// * custom event handlers ------------------------------- *
mainBot.on('root-command', async function (ttchat, text) {
    
    if (text === '/init') {
        await this.set(ttchat.id, 'CurrentState', 'mainmenu')
        await this.$instruct(ttchat);
        return;
    }

    if (text === '/myid') {
        await this.sendone(ttchat.id, ttchat.id)
        return;
    }

    if (text === '/iadm') {
        if (this.isadmin(ttchat.id)) {
            await this.sendone(ttchat.id, 'You are an administrador.');
        } else {
            await this.sendone(ttchat.id, 'You are not an administrador.');
        }

        return;
    }

    if (text === '/crew') {
        await this.sendonce(ttchat.id, this.getcrew())
        return;
    }

    if (this.isadmin(ttchat.id)) {

        if (text.includes('/rrus')) {
            
            const rawploads = Number(text.replaceAll('/rrus', '')),
                  zchkoin = rawploads.substring(0, rawploads.indexOf(' ')),
                  tgtgetuseid = rawploads.substring(rawploads.indexOf(' ') + 1)
                  brl = zchkoin / 10;

            await this.sendone(ttchat.id, `${(zchkoin.toFixed(2))} zchkoin sent ${ttchat.$nname}.`);
            await this.inc(ttchat.id, 'balance', zchkoin);
            return;
        }

        if (text.includes('/rr')) {
            
            const zchkoin = Number(text.replaceAll('/rr ', '')),
                  brl = zchkoin / 10;
            
            await this.sendone(ttchat.id, `Added ${(zchkoin.toFixed(2))} to your balance.`);
            await this.upset(ttchat.id, { balance: zchkoin })
            return;
        }
    }
})

mainBot.on('mmenu-command', async function (ttchat, text, allright) {

    if (!allright) {
        
        await this.$onwrong(ttchat, 'O que? Não lhe entendi.', async () => {
            await this.$instruct(ttchat)
        }, true)

        return;
    }
    
    if (text && text === '/chk') {
        this.set(ttchat.id, 'CurrentState', 'askinfostextlist') // somiguef
        await this.$askinfostextlist(ttchat)
        return;
    } 

    if (text && text === '/chks') {
        await this.sendone(ttchat.id, 'Listando suas check chks...')
        return;
    }

    if (text && text === '/chking') {
        await this.sendone(ttchat.id, 'Listando suas check infos...')
        return;
    } 

    if (text && text === '/saldo') {
        let chatd = await this.fetch(ttchat.id)
        await this.sendone(ttchat.id, `Seu saldo atual: ${chatd.balance.toFixed(2)} zchkoin`)
        return;
    } 

    if (text && text === '/recarga') {
        await this.$askchargeamount(ttchat)
        this.set(ttchat.id, 'CurrentState', 'awaitrechargezchkoin') // somiguef
        return;
    }
    
    if (text && text === '/sobre') {   
        await this.$speechAbout(ttchat)             
        return;
    }

    if (text && text === '/ajuda') {
        await this.sendone(ttchat.id, 'Entre em contato com um dos adms:')
        await this.sendonce(ttchat.id, [ '@shbieOFC', '@dutch', '@Dylan' ]); 
        return;
    }

    if (text && text === '/tutvid') {
        await this.sendonce(ttchat.id, [
            '→ Acesse o link abaixo',
            'https://youtube.com/kd902k3d9j3d9l'
        ])
        return;
    }
})

mainBot.on('validates', async function (ttchat, infos) {
    
    this.clog('  validates event emitted')
    this.clog('  ttchat:', ttchat.id)
    this.clog('  infos:', infos)
    
    let upinfos = infos.map(inf => {
        inf.card = inf.card === 'MASTERCARD' ? 'MASTER' : inf.card;
        inf.bank = inf.bank.replaceAll('.', '').replaceAll(',', '').substr(0, 13);
        return inf;
    })

    let infotextsarr = this.$infoObjToTextMany(upinfos),
        infotextsraw = infotextsarr.join('\n');

    // continues til end of process logics
    await this.sendone(ttchat.id, infotextsraw)
    await this.sendone(ttchat.id, '⌛ Enviando infos para a pool de chk.')
   
    // mock post
    await util.delayRandom({min: 1000, max: 1500})
   
    await this.sendonce(ttchat.id, [
        'Suas chk infos já estão na pool rotativa ✅',
        'A medida que forem chk, notificarei aqui protamente!'
    ])

    await this.sendonce(ttchat.id, [
        '→ Para gerenciar seus chks: \n',
        '/chk - para add novas infos para check.',
        '/chks - para listar suas infos testadas.',
        '/chking - para listar suas infos na fila de chk.',
        '/clear - para todas suas infos testadas.\n'
    ])

    await this.sendone(ttchat.id, '→ Para voltar ao menu, digite /init')
})

mainBot.on('asking-text-list', async function (ttchat, text) {
    
    if (text === '/ex') {
        
        this.sendone(ttchat.id, 
            `4571736053174033|04|2024|658
             4571736085454726|10|2025|543
             4571736041368473|10|2027|802
             4032473213507240|11|2026|822
             4032476064675867|03|2027|314
             5526401124645056|09|2024|416
             5526400771483175|05|2024|413
             4032476044444867|03|2027|314
             5526401444445056|09|2024|416
             5524444444483175|05|2024|413`.replaceAll(' ', ''))
        
        return;
    }
    
    // ...else handles the list itself
    try {
    
        const _infoscoll = this.$rawTextList(text).to.arrayOfObjects(),
              _inforaws = this.$rawTextList(text).to.arrayOfStrings();
    
        if (_infoscoll.length < 5) {
            await this.sendone(ttchat.id, 'Mínimo de infos: 5')
            return;
        }

        if (_infoscoll.length > 300) {
            await this.sendone(ttchat.id, 'Máximo de infos por vez: 300')
            return;
        }
        
        // set temp order data
        this.set(ttchat.id, 'OrderInfosObjs', _infoscoll)
        this.set(ttchat.id, 'OrderInfosRaws', _inforaws)
        this.set(ttchat.id, 'OrderAmount', _infoscoll.length)
        this.set(ttchat.id, 'OrderTotal', this.$infoAmountToBRL(_infoscoll.length))
        
        // invoves new state and launchs
        this.set(ttchat.id, 'CurrentState', 'askconfirmpurchase')
        await this.$askconfirmpurchase(ttchat)
        return;

    } catch (err) {
        
        cerr('  Fail at .$rawTextList()', err)

        await this.$onwrong(ttchat, 'Lista inválida; revise a formatação.', async () => {
            await this.$askinfostextlist(ttchat)
        }, false)
        
        return;
    }
})

mainBot.on('pix-proof-received', async function (ttchat, nmsg) {

    // .DEBUG ----------------------------------------- *
    await this.debug({ ttchat }, process.cwd(), 258, Infinity, true);
    // .DEBUG ----------------------------------=------ *

    if (!nmsg.photo) {
        
        cerr('  Fail at ev pix-proof-received')
        cerr('  nmsg.photo is not set.')
        
        await this.$onwrong(ttchat, [
            'O que?',
            '→ Preciso que me envie o comprovante PIX. \n' +
            '→ Imagem tipo: .png, .pdf entre outros.'
        ], async () => {
            await this.$askchargeamount(ttchat)
        }, false)

        return;
    } 
    
    // else...
    this.clog('  nmsg', nmsg)
    this.clog('  nmsg.photo', nmsg.photo)
    
    await this.sendonce(ttchat.id, [
        'Sua recarga será ativa em alguns minutos.',
        'Muito obrigado 🤗'
    ])

    this.clog('  nmsg.chat', nmsg.chat)
    this.clog('  nmsg.chat.id', nmsg.chat.id)

    const rechargeBrl = this.get(ttchat.id, 'RechargeBrl'),
          rechargeCoins = this.get(ttchat.id, 'RechargeCoins');

    // .DEBUG -------------------------------------------------------------- *
    await this.debug({ rechargeBrl, rechargeCoins }, process.cwd(), 287, 5000);
    // .DEBUG -------------------------------------------------------------- *
    
    // await this.$n.forwardMessage(this.$pixmanager, ttchat.id, nmsg.message_id)
    
    // delegates a command to advisorBot
    // await this.sendone('@zkhcPixProofAdvisorBot', '/warnpix')
    const pixbot = this.take('pixProofAdvisorBot');
    
    await pixbot.emit('new-pix-to-advise', {
        rechargeBrl, 
        rechargeCoins, 
        ttchatid: ttchat.id,
        photo: nmsg.photo
    })
})

mainBot.on('new-pix-invoice', async function (ttchat, text, alright) {

    if (alright) {
        
        const zchcoin = Number(text.replace('/', '')),
              brl = zchcoin / 10,
              pixdata = qrmap[zchcoin];

        // await this.pixInvoice(ttchat.id, {
        //     qrimgurl: pixdata.img,
        //     caption: `👉 PIX Recarga: R$ ${ brl.toFixed(2) } \n ${pixdata.text}`
        // })

        // return;


        await this.feedback(ttchat.id, 'upload_document', 'Gerando faturamento...', 1000);
        await this.sendone(ttchat.id, `👉 PIX Recarga: R$ ${ brl.toFixed(2) } 💰 ${ zchcoin } chkcoins`)

        await this.sendimg(ttchat.id, pixdata.img, {
            caption: `<a href="http://copy.ieet/${pixdata.text}" target="_self" style="text-align:center">Copiar o código PIX</a>`,
            width: 300, height: 300,
            parse_mode: 'HTML'
        })

        await this.sendonce(ttchat.id, [
            '🔴  Após pagar, enviar comprovante.',
            '🟡  Aguarde a recarga em até 10min.',
            '🟢  Você será notificado aqui mesmo.'
        ])
f 
        // set order/recarhge payloads
        this.set(ttchat.id, 'RechargeBrl', brl)
        this.set(ttchat.id, 'RechargeCoins', zchcoin)

        // change scope
        this.set(ttchat.id, 'CurrentState', 'awaitpixproof')
        return;

    } else {
        
        await this.$onwrong(ttchat, 'Valor incorreto.', async () => {
            await this.$askchargeamount(ttchat)
        }, false); 
        
        return;
    }
})

// * main root event handlers ------------------------------- *
mainBot.incoming(async function (ttchat, text, nmsg) {

    this.clog('\n    A new $listen activity on...')
    this.clog('        ttchat.id:', ttchat.id) // custom chat obj
    this.clog('        text:', text) // msg native content shortcut

    try {

        // if rootcmd
        if (text && [
            '/init', 
            '/myid', '/iadm',   
            '/rr', '/rrus', '/crew'
        ].includes(text)) {
            await this.emit('root-command', ttchat, text)
            return;
        }

        if (!this.get(ttchat.id, 'CurrentState')) { // no .CurrentState prop in .$storage .
             this.set(ttchat.id, 'CurrentState', 'mainmenu')
        }

        if (!this.get(ttchat.id, 'WrongReplyCount')) { // no .WrongReplyCount prop in .$storage .
            this.set(ttchat.id, 'WrongReplyCount', 0)
        }
    
        if (this.get(ttchat.id, 'CurrentState') === 'mainmenu') {
            this.set(ttchat.id, 'CurrentState', 'awaitmenucommand')
            await this.$instruct(ttchat)
            return;
        }
    
        if (this.get(ttchat.id, 'CurrentState') === 'awaitmenucommand') {
            
            // if menu cmd
            if (text && [
                '/chk', '/chks', 
                '/chking', '/clear', 
                '/ajuda', '/tutvideo',
                '/saldo', '/recarga', '/sobre'
            ].includes(text)) {
                await this.emit('mmenu-command', ttchat, text, true)
            } else { 
                await this.emit('mmenu-command', ttchat, text, false)
            }; return;
        }

        if (this.get(ttchat.id, 'CurrentState') === 'askinfostextlist') {
            await this.emit('asking-text-list', ttchat, text);
            return;
        }

        if (this.get(ttchat.id, 'CurrentState') === 'askconfirmpurchase') {
            if (text && text === '/ok') {
                this.set(ttchat.id, 'CurrentState', 'initingorder')
            } else {
                await this.$onwrong(ttchat, 'O que? Não lhe entendi.', async () => {
                    await this.$askconfirmpurchase(ttchat)
                }, false)
                return;
            }
        }

        if (this.get(ttchat.id, 'CurrentState') === 'initingorder') {
            
            let ttchatd = await this.fetch(ttchat.id),
                _balance = ttchatd.balance,
                _orderTotal = this.get(ttchat.id, 'OrderTotal');

            if (_balance < _orderTotal) {
                await this.sendone(ttchat.id, `Saldo é insuficiente: R$ ${_balance.toFixed(2)}`)
                return;
            }

            this.set(ttchat.id, 'CurrentState', 'awaitchkvalids')
            
            await this.upset(ttchat.id, '$dec', 'balance', _orderTotal)
            await this.sendonce(ttchat.id, [
                'Confirmado!',
                'Seu saldo atual: ' + `R$ ${(_balance - _orderTotal).toFixed(2)}`
            ])
        }

        if (this.get(ttchat.id, 'CurrentState') === 'awaitchkvalids') {
            
            await this.sendone(ttchat.id, '⌛ Executando check de validação. Aguarde!')
            
            const _orderInfosRaws = this.get(ttchat.id, 'OrderInfosRaws'),
                  _validatedInfos = await this.$validateMany(_orderInfosRaws);
            
            if (_validatedInfos.error) {
                cerr(' Fail at $validateMany', _validatedInfos.error)
            } else {
                await this.emit('validates', ttchat, _validatedInfos.data)
            }
        }


        // Recharge Related Code -------------------------------------------- *
        // ------------------------------------------------------------------ *

        if (this.get(ttchat.id, 'CurrentState') === 'awaitrechargezchkoin') {
    
            if (text && [
                '/100', '/200', '/300', '/400', 
                '/500', '/600', '/700', '/800', '/900',
                '/1000', '/1250', '/1500', '/3000', '/5000', '/9999',
            ].includes(text)) {
                await this.emit('new-pix-invoice', ttchat, text, true);
            } else { 
                await this.emit('new-pix-invoice', ttchat, text, false);
            }; 
            
            return;
        }

        if (this.get(ttchat.id, 'CurrentState') === 'awaitpixproof') {
            await this.emit('pix-proof-received', ttchat, nmsg)
            this.set(ttchat.id, 'CurrentState', 'awaitpixconfirm')
            return;
        }

        if (this.get(ttchat.id, 'CurrentState') === 'awaitpixconfirm') {
            await this.sendany(ttchat.id, [
                'O que? Tenha calma.',
                'Aguarde a confirmação do pagamento.',
                'O pagamento, ao ser processado, será avisado aqui mesmo!'
            ])
        }

    } catch (err) {
        cerr('  Fail at ttbot.incoming try()', err)
    }
})

export default mainBot;