'use strict';
module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('Result', {
    score: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    deck_id: DataTypes.INTEGER
  }, {});
  Result.associate = function(models) {
    Result.belongsTo(models.User);
    // result.belongsTo(models.deck);
  };

  Result.toDeck = async (user, deck) => {
    return await Result.findAll({
      where: {
        user_id: user,
        deck_id: deck
      }
    })
  } 
  return Result;
};