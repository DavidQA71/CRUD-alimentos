import { userAuth } from "../login/login.js";
import { spinnerModal } from "../../core/utilities.js";

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


	let loginBtn = document.getElementById('loginBtn');

	loginBtn.addEventListener('click', (event) => {
		event.preventDefault();
		userAuth();
		/* spinnerModal(); */
	});
}
