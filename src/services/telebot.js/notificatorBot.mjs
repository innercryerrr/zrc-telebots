import Telebot from './../../../classes/Telebot.js'

// ...starting Telebot instance.
let notificatorBot = new Telebot({
        name: 'notificatorBot',
        naname: '@zkhcNotifierBot',
        lowdb: global.$lowdb,
        token: penv.TBOT_TOKEN_NTF,
        admins: penv.TBOT_AMDS,
        noptions: { polling: true }
})

notificatorBot.meeting(async function (ttchat) {
    clog('  ...running meeting()\n')
    await this.sendonce(ttchat.id, [
        'Oi, tudo bem?',
        'Sou um robo e me chamo ' + this.$name,
        'Trabalho como managere do @zchkLiveBot.'
    ])
})

notificatorBot.donce(async function (ttchat) {
    clog('  ...running notificatorBot.donce()\n')
    await this.sendone(ttchat.id, `Oi novamente, @${ttchat.name}!`)
})

notificatorBot.incoming(async function (ttchat, text) {
    if (text === '/stoptasks') {
        this.stoptask()
    }
})

export default notificatorBot;