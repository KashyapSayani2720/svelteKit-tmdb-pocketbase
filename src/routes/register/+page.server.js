import { redirect } from '@sveltejs/kit';

/**
 * Function to load the registration page.
 * If the user is already authenticated, redirect to the home page.
 * @param {Object} locals - The locals object containing user authentication data.
 */
export const load = ({ locals }) => {
	// If the user is already authenticated, redirect to the home page
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}
};

/**
 * Actions for handling the registration process.
 * @type {import('./$types').Actions}
 */
export const actions = {
	register: async ({ locals, request }) => {
		// Extract form data from the request
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);

		try {
			// Create a new user using the form data
			const newUser = await locals.pb.collection('users').create(data);
			const verifieduer = await locals.pb.collection('users').requestVerification(data.email);

			return { status: 200, error: false, message: "Successfully Registered!" }
		} catch (err) {
			// Log and handle any errors that occur during the registration process
			console.log('Error:', err);
			if (err.response.data.email) {
				return { status: 400, error: true, message: "Email already Registered!" }
			} else if (err.response.data.passwordConfirm) {
				return { status: 400, error: true, message: "Password and Confirm password not matching" }
			} else {
				return {
					statu: 400,
					error: true,
					message: "Failed to Register!"
				};
			}
		}

	}
};