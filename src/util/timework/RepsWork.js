const userController = require('../../database/controller/repositories')
const Chrome = require('../Chrome')
const Sleep = require('../Sleep')

class RepsWork {
  
  async doWorker(q){
    console.log('<-------------------------------------->')
    console.log('hi! 【github执行仓库操作】'+q)
    let maxPage = Chrome.MAXPAGE
    let maxSize = Chrome.per_page
    let dataCount = 0;
    let relPage = 0;
    
    console.log('hi! 初始化中...')
    
    // await userController.removeAll()
    // console.log('hi! 删除成功全部')
    
    // 首先第一次获取数量
    let firstRes = await Chrome.getGithubRepositories({
      page: 1,
      q
    })
    
    if(firstRes.code != 200) {
      console.log('hi! 执行用户更新初始化失败')
      return
    }
    
    
    dataCount = firstRes.data.total_count;
    relPage = Math.ceil(dataCount / maxSize)
    maxPage = Math.min(relPage, maxPage)
    
    
    console.log('hi! 初始化成功，准备开始执行更新')
    
    await Sleep(1000)
    
    for(var i=0; i<maxPage; i++){
      let res = await Chrome.getGithubRepositories({
        page: i + 1,
        q
      })
      
      if(res.code != 200){
        console.log('第' + (i + 1) + '次次执行失败');
        console.log('----------------------')
        console.log(res)
        console.log('----------------------')
        continue;
      }
      
      let mainDatas = []
      
      if(res.data && res.data.items){
        mainDatas = res.data.items
      }
      
      for(var j=0; j<mainDatas.length; j++){
        try{
          let isExist = await userController.findByGithubId(mainDatas[j].id)
          
          if(isExist){
            console.log('【info】已存在直接跳过')
          }else{
            await userController.append(mainDatas[j])
            console.log('插入成功，当前第'+(i+1)+'页,'+(j+1)+'条')
          }
          
        }catch (e) {
          console.log(e)
        }
      }
      console.log('等待四秒')
      await Sleep(4000);
    }
    
    console.log('------------hi! github仓库更新完毕--------------')
  }
  
  
}

module.exports = new RepsWork();