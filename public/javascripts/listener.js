document.addEventListener("DOMContentLoaded", function () {
    const modalLog = document.getElementById('signin_form');
    const modalReg = document.getElementById('signup_form');
    const subbtn = document.getElementById('subbtn')
    const regbtn = document.getElementById('regbtn')
    const btnReg = document.getElementById('reg');
    const btnLog = document.getElementById('log');
    const error = document.getElementById('error')
    const spanReg = document.getElementsByClassName("close")[0];
    const spanLog = document.getElementsByClassName("close")[1];
    
    btnReg.addEventListener('click', () => {
        modalReg.style.display = "block"
    })
    btnLog.addEventListener('click', ()=>{
        modalLog.style.display = "block"
    })
    spanLog.addEventListener('click', () =>  {
        modalLog.style.display = "none"
    })
    window.addEventListener('click', (event) => {
        if (event.target == modalLog) {
            modalLog.style.display = "none";
        }
    })
    spanReg.addEventListener('click', () =>  {
        modalReg.style.display = "none"
    })
    window.addEventListener('click', (event) => {
        if (event.target == modalReg) {
            modalReg.style.display = "none";
        }
    })
    subbtn.addEventListener('click', async (event) => {
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        event.preventDefault()
        let response = await fetch('/login', {
            method: 'POST',
            headers :{ 'Content-type': 'application/json; charset=UTF-8'},
            body:JSON.stringify({email, password})
            })
        response = await response.status
        if(response == 200) {
            location.reload();
        }
        else {
            error.style.display = "inline"
        }
    })
    regbtn.addEventListener('click', async (event) => {
        let nickname = document.getElementById('nickname').value
        let email = document.getElementById('emailreg').value
        let password = document.getElementById('passwordreg').value
        event.preventDefault()
        if(nickname && email && password === '') {
            return alert('pull all fields')
            
        }
        let response = await fetch('/user/create', {
            method: 'POST',
            headers :{ 'Content-type': 'application/json; charset=UTF-8'},
            body:JSON.stringify({nickname ,email, password})
            })
        response = await response.status
        if(response == 200) {
            location.reload();
        }
        else {
            error.style.display = "inline"
        }
    })
    
})
