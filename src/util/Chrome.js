let API_URLS = require('../config/API_URLS')
let axios = require('axios')
let qs = require('qs')
let moment = require('moment')

class Chrome {
  
  constructor(){
    this.MAXPAGE = 10
    this.per_page = 100
  }
  
  get(url, data){
    
    return new Promise(resolve => {
      
      if(url.indexOf('?') === -1){
        url += '?' + ( data ? decodeURIComponent(qs.stringify(data)) : '')
      }
      
      axios.get(url ,
        {},
        {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36'
        })
        .then(function (response) {
          // handle success
          resolve({
            code: 200,
            data: response.data,
            response
          })
        })
        .catch(function (error) {
          // handle error
          resolve({
            code: 500,
            data: null,
            error
          })
        })
  
    })
  }
  
  // 获取最佳仓库
  async getGithubRepositories(data){
    // max page = 34
    return this.get(API_URLS.github.repositories, {
      q: data.q || 'stars:>=1000',
      type: 'Repositories',
      page: data.page,
      per_page: this.per_page
    })
  }
  
  // 获取最佳用户
  
  async getGithubUsers(data){
    // max page = 34
    return this.get(API_URLS.github.users, {
      q: 'repos:>1+followers:>1000',
      page: data.page,
      per_page: this.per_page
    })
  }
  
  // 获取一个月内创建的最佳项目
  async getOneMonthBestRes(data){
    let month = moment().subtract(1, 'month').format('YYYY-MM')+'-01'
    return this.get(API_URLS.github.repositories, {
      q: 'created:>='+month+ '+stars:>=500',
      type: 'repositories',
      page: data.page,
      per_page: this.per_page
    })
  }
  
  async getBaiduTop(){
    return this.get(API_URLS.baidu.top)
  }
  
  async getWeiboTop(){
    return this.get(API_URLS.weibo.top)
  }
  
  async getBilibiliTop(){
    return this.get(API_URLS.bilibili.fanju)
  }
  
  async getWeiboSays(data){
    return this.get(API_URLS.weibo.says, data)
  }
  
  async getWenzhang_Juejin() {
    return this.get(API_URLS.wenzhang.juejin)
  }
  
  async getGithubTrending() {
    return this.get(API_URLS.github.trending)
  }
  
}



module.exports = new Chrome()
