import Telebot from './../../../classes/Telebot.js'
import bundleSkills from './skills/index.js'

// ...starting Telebot instance.
let pixProofAdvisorBot = new Telebot({
    name: 'pixProofAdvisorBot',
    naname: '@zkhcPixProofAdvisorBot',
    lowdb: global.$lowdb,
    token: penv.TBOT_TOKEN_PPA,
    admins: penv.TBOT_AMDS,
    noptions: { polling: true },
    pixmanager: Number(penv.TBOT_PIX_MAN),
    debug: true
})

pixProofAdvisorBot.learn(bundleSkills)

pixProofAdvisorBot.meeting(async function (ttchat) {
    
    this.clog('  ...running meeting()\n')
    
    await this.sendonce(ttchat.id, [
        'Oi, tudo bem?',
        'Sou um robo e me chamo ' + this.$name,
        'Trabalho para o @zchkLiveBot.'
    ])

    await this.sendone(ttchat.id, 'Minha função é notificar os comprovantes de pagamento PIX aos administradores.')
})

pixProofAdvisorBot.donce(async function (ttchat) {
    this.clog('  ...running pixProofAdvisorBot.donce()\n')
    await this.sendone(ttchat.id, `Oi novamente, @${ttchat.name}!`)
})

pixProofAdvisorBot.on('new-pix-to-advise', async function (pdata) {

    // .DEBUG ----------------------------------------- *
    await this.debug(pdata, process.cwd(), 50, 1000 * 10)
    // .DEBUG ----------------------------------=------ *

    // send pix and instructs
    await this.sendone(this.$pixmanager, '👋')
    
    await this.sendonce(this.$pixmanager, [
        '🧾 Comprovante recarga PIX',
        `🤑 R$ ${pdata.rechargeBrl}; ${pdata.rechargeCoins} zhckoins.`,
        '👤 Useruid: ' + pdata.ttchatid
    ])

    await 

    await this.sendonce(this.$pixmanager, [
        `Para confirmar:`, 
        `/rrm ${pdata.rechargeBrl} ${pdata.ttchatid}` 
    ])

    // await this.sendone('@uploadphotoonlinebot', pdata._photo)
})

pixProofAdvisorBot.on('new-pix-receipt', async function (receiptimgpurl) {
    await this.sendone(this.$pixmanager, receiptimgpurl);
})

pixProofAdvisorBot.on('command-recharge', async function (ttchat, text) {

    // // .DEBUG ------------------------------------------------ *
    // await this.debug(ttchat, process.cwd(), 64, 1000 * 10, true)
    // // .DEBUG ------------------------------------------------ *

    let proc1 = Number(text.replaceAll('/rrm', '')),
        zchkoin = proc1.substring(0, proc1.indexOf(' ')),
        tgtgetuseid = proc1.substring(proc1.indexOf(' ') + 1),
        brl = zchkoin / 10;

    // .DEBUG -------------------------------------------------------------- *
    await this.debug({zchkoin, tgtgetuseid, brl}, process.cwd(), 74, Infinity)
    // .DEBUG -------------------------------------------------------------- *
})

pixProofAdvisorBot.incoming(async function (ttchat, text) {

    if (this.isadmin(ttchat.id)) {

        if (text && text.includes('/rrm')) {
            await this.emit('command-recharge', ttchat, text)
            return;
        }
    }

    // if (ttchat.username === '@uploadphotoonlinebot') {
    //     await this.emit('new-pix-receipt', text)
    //     return;
    // }

    if (!this.get(ttchat.id, 'WrongReplyCount')) { // no .WrongReplyCount prop in .$storage .
        this.set(ttchat.id, 'WrongReplyCount', 0)
    }

    await this.$onwrong(
        ttchat, 
        ['O que?', 
            'Minha única função é notificar.', 
                'Não sei demais assuntos.'], 
        async function () {
            this.clog('  ...pixProofAdvisorBot incoming wroing reply.')
    }, true)
})

export default pixProofAdvisorBot;