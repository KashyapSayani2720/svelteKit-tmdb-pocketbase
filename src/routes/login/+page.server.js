// Import the 'redirect' function from the '@sveltejs/kit' package
import { redirect } from '@sveltejs/kit';

// This function is called during server-side rendering (SSR) and is used to check if the user is authenticated.
// If the user is authenticated (based on the 'isValid' property of 'authStore' in 'locals.pb'), it will redirect them to the homepage ('/') with a 303 status code.
// 'locals' is an object containing data related to the current request/response.
export const load = ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    throw redirect(303, '/');
  }
};

// This is an object containing named actions that can be invoked from the Svelte components.
// In this case, it defines a 'login' action that handles a user login attempt.
// 'request' is an object representing the incoming HTTP request, and 'locals' is again the data related to the current request/response.
export const actions = {
  login: async ({ request, locals }) => {
    // Get form data from the request using the 'formData' method.
    const formData = await request.formData();
    const data = Object.fromEntries([...formData]);

		try {
			const { token, record } = await locals.pb.collection("users").authWithPassword(data.email, data.password);
			if (record.verified){
				return { status: 200, error: false, message: "Logged in Succesfully" }
			}else{
				return { status: 400, error: true, message: "Please, Verify your email!" }
			}
		} catch (err) {
			console.log('Error:', err);
			return {
				status:400,
				error: true,
				email: data.email,
				message: "Incorrect Email or Passowrd!"
			};
		}
	}
};