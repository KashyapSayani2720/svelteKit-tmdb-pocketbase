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

			// Authenticate the new user using their email and password
			const { token, user } = await locals.pb.collection('users').authWithPassword(data.email, data.password);

			// Uncomment the following code if there is an action to update the user profile
			// const updatedProfile = await locals.pb.records.update('profiles', user.profile.id, {
			// 	name: data.name
			// });

			// Clear the authentication store to log out any previous users
			locals.pb.authStore.clear();
		} catch (err) {
			// Log and handle any errors that occur during the registration process
			console.log('Error:', err);
			return {
				error: true,
				message: err
			};
		}

		// After successful registration, redirect to the login page
		throw redirect(303, '/login');
	}
};