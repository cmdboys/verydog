// 向 dist/static/json 里面写文件

const fs = require('fs')
const path = require('path')
const pm2 = require('../../pm2')
const hot_repositories = require('../database/controller/hot_repositories')
const now_hot = require('../database/controller/now_hot')
const repositories = require('../database/controller/repositories')
const users = require('../database/controller/users')
const Chrome = require('../util/Chrome')
const Config = require('../config/config')
const Sleep = require('../util/Sleep')


class writeJSON {
  
  constructor() {
    
    this.targetFile = path.join(pm2.apps[0].cwd, '/dist/json/')
    
    this.config = {
      
      git_hot: {
        des: 'github近期热门项目',
        file: 'git_hot.json'
      },
      
      git_today_hot: {
        des: 'github今日热门',
        file: 'git_today_hot.json'
      },
      
      git_best: {
        des: 'github优质项目',
        file: 'git_best.json'
      },
      
      git_user: {
        des: 'github优质人物',
        file: 'git_user.json'
      },
      
      hot_search: {
        des: '热搜',
        file: 'hot_search.json'
      },
      
      weibo_says: {
        des: '微博大牛们的说说',
        file: 'weibo_says.json'
      },
      
      wenzhang: {
        des: '目前只收录了掘金',
        file: 'san_wen.json'
      }
    
    }
    
    this.joinPath()
  }
  
  joinPath(){
    for(let i in this.config) {
      let target = this.config[i]
      target.file = path.join(this.targetFile, target.file)
    }
  }
  
  readFile(path){
    return fs.readFileSync(path, 'utf8');
  }
  
  writeFile(path, str){
    fs.writeFileSync(path, str, 'utf8');
  }
  
  async getWeiboSays(){
  
    let arr = []
    
    for(let i=0; i<Config.weibo_users.length; i++) {
      try {
  
        let res = await Chrome.getWeiboSays({
          uid: Config.weibo_users[i],
          value: Config.weibo_users[i],
          type: 'uid'
        })
  
        if(res.code === 200 && res.data.ok === 1) {
          // 获取 containerid
    
          let containerid = res.data.data.tabsInfo.tabs[1].containerid
          
          // 根据containerid获取内容
          let contentRes = await Chrome.getWeiboSays({
            containerid
          })
          
          if(contentRes.code === 200 && contentRes.data.ok === 1) {
            for(let k=0; k<contentRes.data.data.cards.length; k++) {
              let nTarget = contentRes.data.data.cards[k]
              // 如果是 type == 9 那就是微博内容
              nTarget.card_type === 9 && arr.push(nTarget.mblog)
            }
          }
          
        }
        
      } catch (e) {
        console.log(e)
      }
      
      await Sleep(1000)
    }
  
    
    return arr.sort(function (a, b) {
      return parseInt(b.id) - parseInt(a.id)
    })
    
  }
  
  async getSanWen(){
    // 获取文章
    
    let sanwen = {
      juejin: {}
    }
    
    let juejin = await Chrome.getWenzhang_Juejin()
    
    juejin.code === 200 && (sanwen.juejin = juejin.data)


    return sanwen
  }
  
  
  async getGithubTrending(){
    // 获取文章
    
    let Trending = []
    
    let res = await Chrome.getGithubTrending()
    
    res.code === 200 && (Trending = res.data)
    
    return Trending
  }
  
  async run(){
  
  
    console.log('开始拉取')
  
    console.log('拉取github热门项目...')
    // 写入github热门项目
    let hotJson = await hot_repositories.getHot();
    this.writeFile(this.config.git_hot.file, JSON.stringify(hotJson))
  
    console.log('拉取github今日热门项目...')
    // 写入github热门项目
    let hotTrending = await this.getGithubTrending();
    this.writeFile(this.config.git_today_hot.file, JSON.stringify(hotTrending))

    
    console.log('拉取最近热词...')
    // 写入最近热词
    let hotnewsJson = await now_hot.getHot();
    this.writeFile(this.config.hot_search.file, JSON.stringify(hotnewsJson))
  
    
    console.log('拉取热门项目...')
    // 随机写入热门项目
    let repJson = await repositories.getUser()
    this.writeFile(this.config.git_best.file, JSON.stringify(repJson))
  
    console.log('拉取热门人物...')
    // 随机写入热门人物
    let userJson = await users.getUser()
    this.writeFile(this.config.git_user.file, JSON.stringify(userJson))
  
    console.log('拉取文章...')
    let wenzhangJson = await this.getSanWen()
    this.writeFile(this.config.wenzhang.file, JSON.stringify(wenzhangJson))
    
    console.log('拉取微博...')
    // 写入微博/微博不存数据库，直接拉取存档
    let weiboSaysJSon = await this.getWeiboSays()
    this.writeFile(this.config.weibo_says.file, JSON.stringify(weiboSaysJSon))
    
    console.log('done.')
  }
  
}



module.exports = writeJSON
