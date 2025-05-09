export async function userAuth() {
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
			console.log('funciona okey')
			localStorage.setItem('user', userVerify.username);
			sessionStorage.setItem('loggedIn', 'true');
			location.hash = '#/';
			// Si la respuesta fue 200-299
			window.location.href = 'http://127.0.0.1:5500/principal_page.html';
		}

		if (response.status === 401) {
			alert('Credenciales incorrectas')
		}

	} catch (error) {
		console.log(error);
	}
}


