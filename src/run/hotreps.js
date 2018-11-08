const userScript = require('../util/timework/RepsHotWork')

async function index(){
  await userScript.doWorker()
}

index()