const Sequelize = require('sequelize');
const env = require('../config/env')


let moreConfgi = {
  local: {
    database: 'verydog_ai',
    username: 'root',
    password: 'wasgr',
    port: '3306',
    host: '127.0.0.1'
  },
  local2: {
    database: 'verydog_ai',
    username: 'root',
    password: 'root',
    port: '3306',
    host: '127.0.0.1'
  }
}

let config = moreConfgi[env]

// sequelize-auto -h localhost -d verydog_ai -u root -x 123456

let sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: 'mysql',
  pool: {
    max: 20, //default: 5 最大并发连接数，超过连接数的请求将被拒绝 经测试20可支持到100个并发
    min: 0,
    idle: 10000, //默认值：10000 连接闲置（未使用）10秒后，从池中删除连接
    acquire: 30000, //默认值：10000 抛出错误之前，池将尝试获取连接的最长时间（以毫秒为单位）
    evict: 10000, //默认值：10000 驱逐旧的连接的时间间隔（以毫秒为单位）。将其设置为0可禁用此功能。
    handleDisconnects: true, //默认值：true Controls if pool should handle connection disconnect automatically without throwing errors
  },
  define: {
    timestamps: false
  },
  // disable logging; default: console.log
  //logging: true,
  logging: function (sql, detail) {
    // logger为log4js的Logger实例
    // console.log(sql)
  }
});

module.exports = {
  Sequelize: sequelize,
  DataTypes: Sequelize
}