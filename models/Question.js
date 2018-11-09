'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    deck_id: DataTypes.INTEGER
  }, {});

  Question.associate = function(models) {
    Question.belongsTo(models.Deck);
  };

  Question.getQuestions = async (deck) => {
    return await Question.findAll({
        where: {
            id: deck
        }
    })
  };

  return Question;
};

