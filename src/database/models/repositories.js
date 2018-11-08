/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('repositories', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    clone_url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    forks: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    html_url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    github_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    downloads_url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    language: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    languages_url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ssh_url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    svn_url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    watchers: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    stargazers_count: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    node_id: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'repositories'
  });
};
