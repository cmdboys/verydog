const userController = require('../../database/controller/now_hot')
const Chrome = require('../Chrome')

class HotNewsWork {
  
  async doWorker(){
    console.log('<-------------------------------------->')
    console.log('hi! 【github执行热门操作】'+ new Date())
    
    
    console.log('hi! 初始化成功')
    let sendData = {
      weibo: '',
      baidu: '',
      bilibili: ''
    }
  
    console.log('hi! 拉取百度[0%]')
    try {
      let res = await Chrome.getBaiduTop();
      sendData.baidu = JSON.stringify(res.data);
    }catch (e) {
      console.log(e, 'hi! 拉取百度失败')
    }
  
    
    
    
    
    
    console.log('hi! 拉取微博[60%]')
    try {
      let res = await Chrome.getWeiboTop();
      
      sendData.weibo = JSON.stringify(res.data);
    }catch (e) {
      console.log('hi! 拉取微博失败')
    }
  
    
    console.log('hi! 拉取bilibili[80%]')
    try {
  
      let res = await Chrome.getBilibiliTop();
      
      sendData.bilibili = JSON.stringify(res.data);
    }catch (e) {
      console.log('hi! 拉取B站失败')
    }
  


  
  
    await userController.removeAll()
    
    console.log('hi! 完毕[100%]')
    await userController.append(sendData)
    console.log('------------hi! github热门更新完毕--------------')
  }
  
  
}

module.exports = new HotNewsWork()