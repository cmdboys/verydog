const userScript = require('../util/timework/HotNewsWork')

async function index(){
  await userScript.doWorker()
}

index()