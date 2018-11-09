'use strict';


const fs = require('fs');


module.exports = {
  up: (queryInterface, Sequelize) => {
    let questionObjects = [
        {question:'Кому принадлежит высказывание :"Я знаю, что я ничего не знаю"?', answer:'Сократ', cost:200, deck_id:1},
        {question:'Где возникло понятие философия?', answer:'Греция', cost:400, deck_id:1},
        {question:'Древнегреческий философ, сравнивающий мир с потоком, рекой', answer: 'Гераклит', cost:600, deck_id:1},
        {question:'Какой ученый ввел понятие «философия»', answer: 'Пифагор', cost: 800, deck_id:1},
        {question:'Кто сказал: «Движущийся предмет не движется ни в том месте, где он находится, ни в том, месте где его нет»', answer:'Зенон', cost:1000, deck_id:1},
        {question:'Кто исполнил основной саундтрек в "Скайфолле"', answer:'Адель', cost:200, deck_id:2},
        {question:'В какой организации работал агент 007', answer:'MI6', cost:200, deck_id:2},
        {question:'Шон Коннери носил это во всех сериях бондианы', answer:'Парик', cost:600, deck_id:2},
        {question:'Только этому актеру было позволено брать любой Aston Martin с фабрики до конца его дней.', answer:'Дэниел Крейг', cost:800, deck_id:2},
        {question:'Существование MI6 британское правительство отрицало вплоть до... (назвать деситялетие)', answer:'1994', cost:1000, deck_id:2},
        {question:'Сколько клеток на шахматной доске?', answer:'64', cost:200, deck_id:3},
        {question:'Как называется ничья в шахматах?', answer:'Пат', cost:400, deck_id:3},
        {question:'Ход, который делают одновременно двумя фигурами?', answer:'Рокировка', cost:600, deck_id:3},
        {question:'Какая фигура может резко возрасти в звании', answer:'Пешка', cost:800, deck_id:3},
        {question:'Название какой фигуры с персидского языка дословно переводится как «полководец»?', answer:'Ферзь', cost:1000, deck_id:3},
        {question:'Кто написал "Евгений Онегин"', answer:'Пушкин', cost:200, deck_id:4},
        {question:'К какому жанру относится «Евгений Онегин»?', answer:'Роман в стихах', cost:400, deck_id:4},
        {question:'Кого убил Онегин', answer:'Ленский', cost:600, deck_id:4},
        {question:'Где познакомился А.С. Пушкин с Онегиным на страницах романа?', answer:'Петербург', cost:800, deck_id:4},
        {question:'Как назвал роман «Евгений Онегин» русский критик В.Г.Белинский', answer:'Энциклопедия русской жизни', cost:1000, deck_id:4},
        {question:'Столица Канады', answer:'Оттава', cost:200, deck_id:5},
        {question:'Самая населенная страна после Индии', answer:'США', cost:400, deck_id:5},
        {question:'В каком году Израиль стал независимым?', answer:'1948', cost:600, deck_id:5},
        {question:'Сколько лет Российской федерации', answer:'27', cost:800, deck_id:5},
        {question:'Сколько стран входят в состав Великобритании', answer:'3', cost:1000, deck_id:5},
        {question:'Этот желтый транспорт упоминался Битлс', answer:'Подводная лодка', cost:200, deck_id:6},
        {question:'Синее небо над желтым полем, назовите страну?', answer:'Украина', cost:400, deck_id:6},
        {question:'Что любят девочки, любят мальчики?', answer:'Одуванчики', cost:600, deck_id:6},
        {question:'сколько было яиц фаберже', answer:'71', cost:800, deck_id:6},
        {question:'Как называется частица света?', answer:'Фотон', cost:100, deck_id:6}
    ]


  return queryInterface.bulkInsert('questions', questionObjects, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('questions', null, {});
  }
};