let db = require('../index')
let controller = require('../models/repositories')(db.Sequelize, db.DataTypes)

module.exports = {
  append(config){
    return controller.create({
      created_at: config.created_at,
      clone_url:config.clone_url,
      forks: config.forks,
      html_url: config.html_url,
      github_id: config.id,
      description: config.description,
      downloads_url: config.downloads_url,
      language: config.language || 'Markdown',
      languages_url: config.languages_url,
      name: config.name,
      ssh_url: config.ssh_url,
      svn_url: config.svn_url,
      watchers: config.watchers,
      stargazers_count: config.stargazers_count,
      node_id: config.node_id,
      
      create_time: new Date().getTime()
    })
  },
  
  removeAll(){
    return controller.destroy({
      where: {},
      truncate: true
    })
  },
  
  findByGithubId(github_id) {
    return controller.findOne({
      where: {
        github_id: github_id
      }
    })
  },
  
  getUser(){
    return controller.findAll({
      order: [
        db.Sequelize.fn( 'RAND' )
      ],
      limit: 30,
      attributes: ['created_at', 'description', 'html_url', 'language', 'name']
    })
  }
};