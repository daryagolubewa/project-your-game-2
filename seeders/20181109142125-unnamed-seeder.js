'use strict';


const fs = require('fs');


module.exports = {
  up: (queryInterface, Sequelize) => {
    let deckObjects = [{name:'Философы'},
    {name:'Агент 007'},
    {name:'Шахматы'},
    {name:'Евгений Онегин'},
    {name:'Страны и народы'},
    {name:'Желтая тема'}];

  return queryInterface.bulkInsert('decks', deckObjects, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('decks', null, {});
  }
};