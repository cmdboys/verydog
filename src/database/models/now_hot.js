/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('now_hot', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    baidu: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    weibo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bilibili: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'now_hot'
  });
};
