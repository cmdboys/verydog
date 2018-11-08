const userController = require('../../database/controller/users')
const Chrome = require('../Chrome')
const Sleep = require('../Sleep')

class UserWork {

  async doWorker(){
    console.log('<-------------------------------------->')
    console.log('hi! 【github执行用户操作】')
    let maxPage = Chrome.MAXPAGE
    let maxSize = Chrome.per_page
    let dataCount = 0;
    let relPage = 0;
  
    console.log('hi! 初始化中...')
    
    // await userController.removeAll()
    //
    // console.log('hi! 删除成功全部')
    
    // 首先第一次获取数量
    let firstRes = await Chrome.getGithubUsers({
      page: 1
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
      let res = await Chrome.getGithubUsers({
        page: i + 1
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
        
        let target = mainDatas[j]
        // 加一条，分析用户使用/擅长的语言
        // let lang = await this.goodAtLang(target.repos_url)
        //
        // if(!lang || lang == 'null' ||lang == null){
        //   lang = ''
        // }
        //
        // target.language = lang
        
        try{
          await userController.append(target)
          console.log('插入成功，当前第'+(i+1)+'页,'+(j+1)+'条，使用语言：'+target.language)
          console.log('等待4秒')
          // await Sleep(4000);
          
        }catch (e) {
          console.log(e)
        }
      }
      console.log('等待4秒')
      await Sleep(4000);
    }
  
    console.log('------------hi! github用户更新完毕--------------')
  }


  async updateUserLang(){
    console.log('执行更新用户语言')
    console.log('初始化。。。')
    let needUpdataUser = await userController.findNoLangUser()
    console.log('初始化成功');



    for(var i=0; i<needUpdataUser.length; i++){
      console.log('获取信息。。。。')
      let lang = await this.goodAtLang('https://api.github.com/users/'+(needUpdataUser[i].login)+'/repos');
      await userController.updateLangById(needUpdataUser[i].id, lang);
      console.log('更新成功，休息0.5秒-->' + needUpdataUser[i].login + ':' + lang + '//'+ (i+1) + '/' + needUpdataUser.length)
      await Sleep(500)
    }

    console.log('更新完毕');
  }

  async goodAtLang(reportUrl){
    try{
      let userReportItem = await Chrome.get(reportUrl)
      let comper = {}
      let bestArray = []
  
      if(userReportItem.code == 200){
    
        let data = userReportItem.data
    
        for(var i = 0; i<data.length; i++){
          comper[data[i].language] = comper[data[i].language] || 0
          comper[data[i].language]++
        }
    
        for(var j in comper){
          bestArray.push({
            lang: j,
            count: comper[j]
          })
        }
    
        let bestArrsss = bestArray.sort(function (a, b) {
          return  b.count - a.count
        })
        
        console.log(bestArrsss, '<===================')
        
        if(bestArrsss[0].lang != 'null'){
          return bestArrsss[0].lang
        }else{
          return bestArrsss[1].lang
        }
        
      }else{
        return ''
      }
    }catch (e) {
      console.log(e, '<===========')
      return ''
    }
  }
}


module.exports = new UserWork();