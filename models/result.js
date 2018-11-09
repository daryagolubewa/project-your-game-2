'use strict';
module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('results', {
    score: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  Result.associate = function(models) {
    Result.belongsTo(models.users);
  };
  return Result;
};