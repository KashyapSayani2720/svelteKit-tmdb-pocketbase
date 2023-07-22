// Import the 'redirect' function from the '@sveltejs/kit' package
import { redirect } from '@sveltejs/kit';

// This function is called during server-side rendering (SSR) and is used to check if the user is authenticated.
// If the user is authenticated, it will redirect them to the homepage ('/') with a 303 status code.
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
      // Attempt to request a password reset for the given email address using a 'pb' collection (probably a database).
      // The response includes a 'token' and 'user' object.
      const { token, user } = await locals.pb.collection("users").requestPasswordReset(data.email);
    } catch (err) {
      // If an error occurs during the password reset request, log the error and return an object indicating an error occurred.
      console.log('Error:', err);
      return {
        error: true,
        email: data.email
      };
    }

    // If the password reset request is successful, redirect the user to the login page with a 303 status code.
    throw redirect(303, '/login');
  }
};