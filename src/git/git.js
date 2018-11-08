const exec = require('child_process').exec;
const GitScript = require('../script')
const HotWork = require('../util/timework/HotNewsWork')
const writeJSON = require('../git/writeJSON')
const moment = require('moment')
let writer = new writeJSON()


class Git {
  
  sleep(time){
    return new Promise(resolve => {
      setTimeout(()=>{resolve()}, time)
    })
  }
  
  
  async runDev(cmdStr){
    return new Promise(resolve => {
      exec(cmdStr, function(err, stdout, stderr){
        resolve({
          err,
          data: stdout
        })
      });
    })
    
  }
  
  
  async run(){
    let reback = {
      msg: '',
      error: []
    }
  
    // 首先从远程pull 一下
    let gitPull = await this.runDev(GitScript.git.pull())
    gitPull.err && reback.error.push(gitPull.err)
  
    // pull完之后休息1秒
    await this.sleep(1000)
    

    // 更新下百度
    try{
      await HotWork.doWorker();
    }catch (e) {
      console.log('update baidu tags fail.', e)
    }
    // 更新文件
    try{
      await writer.run()
    }catch (e) {
      console.log('update file fail.', e)
    }


  
    let today = moment().format('YYYY-MM-DD HH:mm:ss')
    
    // 提交GIT
    let gitAdd = await this.runDev(GitScript.git.add())
    gitAdd.err && reback.error.push(gitAdd.err)
  
    let gitCommit = await this.runDev(GitScript.git.commit(today))
    gitCommit.err && reback.error.push(gitCommit.err)
  
    let gitPush = await this.runDev(GitScript.git.push())
    gitPush.err && reback.error.push(gitPush.err)
  
  
    return reback
  }
}


module.exports = Git
