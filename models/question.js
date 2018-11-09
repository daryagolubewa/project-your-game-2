'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('questions', {
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    deck_id: DataTypes.INTEGER
  }, {});

  Question.associate = function(models) {
    Question.belongsTo(models.decks);
  };

  Question.getQuestions = async (deck) => {
    return await Question.findAll({
        where: {
            id: deck
        }
    })
  };

    Question.getAnswer = async (answer) => {
        return await Question.findAll({
            where: {
                answer: answer
            }
        })
    };

  return Question;
};

