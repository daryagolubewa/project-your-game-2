'use strict';
module.exports = (sequelize, DataTypes) => {
  const Deck = sequelize.define('decks', {
    name: DataTypes.STRING
  }, {});
  Deck.associate = function(models) {
    Deck.hasMany(models.questions, {foreignKey: 'deck_id'});
  };

  Deck.getAllDecks = async () => {
    return await Deck.findAll()
  }

  return Deck;
};