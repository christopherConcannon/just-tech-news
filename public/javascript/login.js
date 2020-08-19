async function signupFormHandler(event) {
	event.preventDefault();

	const username = document.querySelector('#username-signup').value.trim();
	const email = document.querySelector('#email-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();

	// if all signup fields are filled out, make POST request to api/users route to create new user
	if (username && email && password) {
		const response = await fetch('/api/users', {
			method  : 'post',
			body    : JSON.stringify({
				username,
				email,
				password
			}),
			headers : { 'Content-Type': 'application/json' }
		});
		console.log(response);

		// check the response status
		if (response.ok) {
      document.location.replace('/dashboard/');
		} else {
			alert(response.statusText);
		}
	}
}

// if all login fields are filled out, make POST request to validate user
async function loginFormHandler(event) {
	event.preventDefault();

	const email = document.querySelector('#email-login').value.trim();
	const password = document.querySelector('#password-login').value.trim();

	if (email && password) {
		const response = await fetch('/api/users/login', {
			method  : 'post',
			body    : JSON.stringify({
				email,
				password
			}),
			headers : { 'Content-Type': 'application/json' }
		});

		// check the response status
		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert(response.statusText);
		}
	}
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
