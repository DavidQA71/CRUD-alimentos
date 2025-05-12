import { getValidUser } from "../../services/login_service.js";
import { 
	BOOTSTRAP_STYLE_LINK, 
	BOOTSTRAP_STYLE_HREF, 
	BOOTSTRAP_STYLE_INTEGRITY 
} from "../../core/utilities.js";


async function userAuth() {
	try {
		const userVerify = {
			username: document.getElementById('username').value,
			password: document.getElementById('password').value
		}

		const response = await getValidUser(userVerify);

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

		if (!document.querySelector(BOOTSTRAP_STYLE_LINK)) {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = BOOTSTRAP_STYLE_HREF;
			link.integrity = BOOTSTRAP_STYLE_INTEGRITY;
			link.crossOrigin = 'anonymous';
			document.head.appendChild(link);
		}
	}


	let loginBtn = document.getElementById('loginBtn');

	loginBtn.addEventListener('click', (event) => {
		event.preventDefault();
		userAuth();
		spinnerModal();
	});
}
