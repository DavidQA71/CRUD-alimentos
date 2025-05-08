export async function renderLogin() {
	const html = await fetch('./pages/login/login.html').then((render) =>
		render.text()
	);
	document.getElementById('app').innerHTML = html;
	//cargo los estilos de mi componente
	if (!document.querySelector('link[href="./pages/login/login.css"]')) {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = './pages/login/login.css';
		document.head.appendChild(link);

		if (!document.querySelector('link[href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"]')) {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
			link.integrity = 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH';
			link.crossOrigin = 'anonymous';
			document.head.appendChild(link);
		}

	}
	/* document.getElementById('loginForm').addEventListener('submit', (e) => {
		e.preventDefault();
		//destructuring de los elementos target:
		const { username, password } = e.target;
		//simulamos credenciales:
		if (username.value === 'admin' && password.value === '123') {
			sessionStorage.setItem('loggedIn', 'true');
			location.hash = '#/';
		} else {
			alert('credenciales incorrectas');
		}
	}); */

	userAuth();
}



async function userAuth() {
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
			sessionStorage.setItem('loggedIn', 'true');
			location.hash = '#/';
            // Si la respuesta fue 200-299
            window.location.href = 'http://127.0.0.1:5500/principal_page.html';
        }
        
        if(response.status === 401) {
            alert('Credenciales incorrectas')
        } 
        
    } catch (error) {
        console.log(error);
    }
}