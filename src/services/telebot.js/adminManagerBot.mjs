import Telebot from './../../../classes/Telebot.js'

// ...starting Telebot instance.
let managerBot = new Telebot({
        name: 'managerBot',
        naname: '@rkhcAssistbot',
        lowdb: global.$lowdb,
        token: penv.TBOT_TOKEN_AST,
        admins: penv.TBOT_AMDS,
        noptions: { polling: true }
})

managerBot.meeting(async function (ttchat) {
    clog('  ...running meeting()\n')
    await this.sendonce(ttchat.id, [
        'Oi, tudo bem?',
        'Sou um robo e me chamo ' + this.$name,
        'Trabalho como managere do @zchkLiveBot.'
    ])
})

managerBot.donce(async function (ttchat) {
    clog('  ...running managerBot.donce()\n')
    await this.sendone(ttchat.id, `Oi novamente, @${ttchat.name}!`)
})

managerBot.incoming(async function (ttchat, text) {
    if (text === '/stoptasks') {
        this.goscope('')
    }
})

managerBot.scopeify('incoming', async function (ttchat, text) {
    if (text === '/stoptasks') {
        this.stoptask()
    }
})

managerBot.on('ordered', async function (ttchat, order, ) {
    clog(' ...')
})

// managerBot.task({ 
//     name: 'notify',
//     init: '7',
//     stop: '16',
//     delay: 4500,
//     timeout: 1000 * 60
// }, function () {
//     this.say('running...')
// })

export default managerBot;