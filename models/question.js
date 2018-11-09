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

    Question.getAnswer = async (question, answer) => {
        return await Question.findAll({
            where: {
                question: question,
                answer: answer
            }
        })
    };

  return Question;
};

