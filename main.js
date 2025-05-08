import { router } from './router.js';

window.addEventListener('hashchange', router);

window.addEventListener('DOMContentLoaded', () => {
	if (!location.hash) {
		location.hash = '#/login';
	} else {
		router();
	}
});