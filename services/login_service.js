

export async function getValidUser(userVerify) {
	const options = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		},
		body: JSON.stringify(userVerify)
	}
	let response = await fetch('http://localhost:4000/users/login/', options);

	return response;
}

