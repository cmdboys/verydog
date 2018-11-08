module.exports = {
  github: {
    repositories: 'https://api.github.com/search/repositories',
    users: 'https://api.github.com/search/users',
    search: 'https://github.com/search',
    trending: 'https://github-trending-api.now.sh/repositories'
  },
  baidu: {
    top: 'http://top.baidu.com/mobile_v2/buzz/hotspot'
  },
  weibo: {
    top: 'https://m.weibo.cn/api/container/getIndex?containerid=231583&page_type=searchall',
    says: 'https://m.weibo.cn/api/container/getIndex'
  },
  bilibili: {
    fanju: 'https://bangumi.bilibili.com/api/timeline_v2_global'
  },
  
  wenzhang: { //热门文章
    juejin: 'https://timeline-merger-ms.juejin.im/v1/get_entry_by_rank?src=web&before=0&limit=0&category=all', //掘金
  }
}
