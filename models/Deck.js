'use strict';
module.exports = (sequelize, DataTypes) => {
  const Deck = sequelize.define('Deck', {
    name: DataTypes.STRING
  }, {});
  Deck.associate = function(models) {
    Deck.hasMany(models.Question);
    // Deck.hasMany(models.result);
  };

  Deck.getAllDecks = async () => {
    return await Deck.findAll()
  }

  return Deck;
};