const models = require('./../models/index');
const express = require('express');
const router = express.Router();

//GET game page
router.get('/game', async function (req, res) {
    res.render('game');
});

router.get('/questions', async function (req, res) {
    let question = await models.Question.findByPk(id);
    res.send(question.question);
});


//POST game page
router.post('/game', async function (req, res) {
    let response = req.body;
    let currentAnswer = await models.Question.getAnswer(response.question, response.answer);

    if(currentAnswer === 0) {
        res.send('Success');
    } else {
        res.send('Not such a big success')
    }

});





module.exports = router;
