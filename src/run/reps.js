const userScript = require('../util/timework/RepsWork')
const Sleep = require('../util/Sleep')

async function index(){
  
  let flitter = []
  
  let gEv = 50;
  let max = 10000;
  let begin = 7350;
  let every = (max - begin) / gEv;
  
  for(var i=0; i<every; i++){
    flitter.push('stars:'+(begin+(i * gEv)) + '..' + (begin+((i + 1) * gEv)))
  }
  
  flitter.push('stars:>10000')
  
  for(var j=0; j<flitter.length; j++){
    console.log('筛选条件:'+flitter[j])
    await userScript.doWorker(flitter[j])
    console.log('休息1分钟-------------'+(j+1) + '/' + flitter.length + ' >> ' + (((j+1) / flitter.length) *100) +'%')
    await Sleep(60000);
  }
  
}

index()