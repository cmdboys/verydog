const userScript = require('../util/timework/UserWork')

async function index(){
  await userScript.updateUserLang()
}

index()