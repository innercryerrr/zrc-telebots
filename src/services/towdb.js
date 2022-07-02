const path = require('path');

async function towdb (colls) {

    if (colls) {
        // ...
    }

    const start = async () => {
        
        let lowdb = await import('lowdb'),
            pathy = path.join(__dirname, '..', '..', 'db.json'),
            adapter = new lowdb.JSONFile(pathy);
    
        global.$lowdb = new lowdb.Low(adapter)
        
        if (!global.$lowdb.data) {
             global.$lowdb.data = {};
        }
       
        await $lowdb.read()
    }
    
    await start();
}

module.exports = {
    setup: towdb
}