document.addEventListener('DOMContentLoaded', () => {
    const showQuestion = document.querySelector('.tableCell');
    const sendAnswer = document.querySelector('btnAnswer');
    const modalReg = document.getElementById('signup_form');

    //клик на ячейку, вызов модального окна с вопросом
    showQuestion.addEventListener('click', async (e) => {
        let questId = e.target.id;
        let response = await fetch(`questions?id=${questId}`);

        let question = await response.text();
        const questField = document.getElementById('question');
        questField.innerText = question;
        modalReg.style.display = "block"

    });


    //ввод ответа на вопрос, отправка ответа на сервер, получение ответа от сервера
    sendAnswer.addEventListener('click', async () => {
        const answer = document.getElementById('answer').value;
        const question = document.getElementById('question').value;
        const cost = document.querySelector('cost'); // див с ценой, который будет пропадать после ответа

        let response = await fetch('/game', {
            method: 'post',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({question: question, answer: answer})
        });
        response = await response.status
        if(response === 200) {
            cost.style.display = 'none';
        }
        else {
            error.style.display = "inline"
        }
    })


});