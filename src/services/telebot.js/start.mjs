import mainBot from './mainBot.mjs'
import adminManagerBot from './adminManagerBot.mjs'
import notificatorBot from './notificatorBot.mjs'
import pixProofAdvisorBot from './pixProofAdvisorBot.mjs'

start();

async function start () {
   
    // coowork 
    mainBot.coowork(notificatorBot)
    mainBot.coowork(adminManagerBot)
    mainBot.coowork(pixProofAdvisorBot)

    // start itself plus its cooworks instances all
    await mainBot.start()
}