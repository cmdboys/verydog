let db = require('../index')
let controller = require('../models/now_hot')(db.Sequelize, db.DataTypes)

module.exports = {
  append(config){
    return controller.create({
      baidu: config.baidu,
      weibo: config.weibo,
      bilibili: config.bilibili
    })
  },
  
  removeAll(){
    return controller.destroy({
      where: {},
      truncate: true
    })
  },
  
  getHot() {
    return controller.findOne()
  }
};