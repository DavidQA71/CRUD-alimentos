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

		if (response.ok) {
			console.log('funciona okey')
			localStorage.setItem('user', userVerify.username);
			sessionStorage.setItem('loggedIn', 'true');
			location.hash = '#/';
		}

		if (response.status === 401) {
			alert('Credenciales incorrectas')
		}

	} catch (error) {
		console.log(error);
	}
}


