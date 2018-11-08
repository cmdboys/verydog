let db = require('../index')
let controller = require('../models/users')(db.Sequelize, db.DataTypes)

module.exports = {
  append(config){
    return controller.create({
      avatar_url: config.avatar_url,
      html_url: config.html_url,
      user_id: config.id,
      login: config.login,
      url: config.url,
      followers_url: config.followers_url,
      language: config.language,
      create_time: new Date().getTime()
    })
  },
  
  removeAll(){
    return controller.destroy({
      where: {},
      truncate: true
    })
  },
  
  findNoLangUser(){
    return controller.findAll({
      where: {
        language: 'null',
      },
      attributes: ['id', 'login']
    })
  },
  updateLangById(id, lang){
    return controller.update({
      language: lang
    }, {
      where: {
        id: id
      }
    })
  },
  
  getUser(){
    return controller.findAll({
      order: [
        db.Sequelize.fn( 'RAND' )
      ],
      limit: 30,
      attributes: ['avatar_url', 'html_url', 'language', 'login']
    })
  }
};