(async (global) => {
    
    // shortcut
    global.clog = console.log;
    global.cinf = console.info;
    global.cerr = console.error;
    global.penv = process.env;

    clog('\n  Initializing zrcbb-services stack.')
    clog('\n    ...setting global. attributes.')

    cinf('\n  1. Setting env and global.utils\n')
    require('dotenv').config()
    require('./../library/util.js').set()
    
    cinf('\n  2. Starting Lowdb.js\n')
    await require('./services/towdb.js').setup()

    cinf('\n  3. Starting Telebot.js: telebot.js \n')
    await import('./services/telebot.js/start.mjs')

    // cinf('\n  4. Starting httpServer.js\n')
    // require('./services/httpServer.js/index.js').run()
    // require('./services/httpServer.js/bin/server.js')

})(global)
