

const userAuth = async ()=> {
    try {
        const userVerify = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(userVerify)
        }
        let response = await fetch('http://localhost:4000/users/login/', options);
        /* let data = await response.json(); */
        
        if (response.ok) {
            localStorage.setItem('user', userVerify.username);
            // Si la respuesta fue 200-299
            window.location.href = 'http://127.0.0.1:5500/principal_page.html';
        }
        
        if(response.status === 401) {
            alert('Credenciales incorrectas')
        } /* else {
            alert('Error al iniciar sesión');
        } */
        
    } catch (error) {
        console.log(error)

        
        
    }
}

//crear variable del loginBtn

inputsForm.loginBtn.addEventListener('click', (event)=> {
    event.preventDefault();
    userAuth();
    spinnerModal();
});



