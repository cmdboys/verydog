/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    avatar_url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    html_url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    language: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    login: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    followers_url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'users'
  });
};
