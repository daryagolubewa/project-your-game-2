document.addEventListener('DOMContentLoaded', () => {
    const showQuestion = document.querySelector('.tableCell');
    const sendAnswer = document.querySelector('btnAnswer');

    //клик на ячейку, вызов модального окна с вопросом
    showQuestion.addEventListener('click', async () => {
        modalReg.style.display = "block"
        alert('sdmslmvfslvm;flsvmdlvfdll')
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