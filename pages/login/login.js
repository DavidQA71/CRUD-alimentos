import { getValidUser } from "../../services/login_service.js";
import {
	BOOTSTRAP_STYLE_LINK,
	BOOTSTRAP_STYLE_HREF,
	BOOTSTRAP_STYLE_INTEGRITY
} from "../../core/bootstrap_const.js";

import { showSpinner, hideSpinner } from "../../core/utilities.js";


export async function renderLogin() {
	const html = await fetch('/pages/login/login.html').then((render) =>
		render.text()
	);

	const spinner = await fetch('/components/spinner/spinner.html').then((render) =>
		render.text()
	);

	const app = document.getElementById('app');
	app.innerHTML = spinner;
	app.innerHTML += html;

	//cargo los estilos de mi componente
	if (!document.querySelector('link[href="./pages/login/login.css"]')) {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = './pages/login/login.css';
		document.head.appendChild(link);
	}

	if (!document.querySelector('link[href="/components/spinner/spinner.css"]')) {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = '/components/spinner/spinner.css';
		document.head.appendChild(link);
	}

	if (!document.querySelector(BOOTSTRAP_STYLE_LINK)) {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = BOOTSTRAP_STYLE_HREF;
		link.integrity = BOOTSTRAP_STYLE_INTEGRITY;
		link.crossOrigin = 'anonymous';
		document.head.appendChild(link);
	}


	let loginBtn = document.getElementById('loginBtn');

	loginBtn.addEventListener('click', (event) => {
		event.preventDefault();
		userAuth();
	});
}



async function userAuth() {
	try {
		const userVerify = {
			email: document.getElementById('username').value,
			password: document.getElementById('password').value
		}


		const response = await getValidUser(userVerify);

		const data = await response.json();
		if (response.ok) {
			localStorage.setItem('user', userVerify.email);
			sessionStorage.setItem('loggedIn', 'true');
			sessionStorage.setItem('token', data.token);
			location.hash = '#/';
		}

		if (response.status === 401) {
			alert('Credenciales incorrectas')
		}



	} catch (error) {
		console.log(error);
	} finally {

	}
}


