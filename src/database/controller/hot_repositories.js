let db = require('../index')
let controller = require('../models/hot_repositories')(db.Sequelize, db.DataTypes)

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
  
  getHot(){
    return controller.findAll({
      attributes: ['language', 'html_url', 'created_at', 'description', 'name', 'watchers', 'stargazers_count', 'forks']
    })
  }
};