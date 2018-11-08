const HotWork = require('../util/timework/HotNewsWork')
const HotReps = require('../util/timework/RepsHotWork')
const Github = require('../git/git')

let git = new Github()

module.exports = [{
  interval: '6h',
  immediate: true,
  handle: async () => {
    try{
      git.run()
    }catch (e) {
    }
  }
}, {
  interval: '1d',
  immediate: true,
  handle: async () => {
    // 每天更新下github热门项目
    try{
      await HotReps.doWorker();
    }catch (e) {
    }
  }
} , {
  cron: '0 */1 * * *',
  handle: 'crontab/test',
  type: 'all'
}]
