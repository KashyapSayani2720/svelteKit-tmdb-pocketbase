import { redirect } from "@sveltejs/kit";

/**
 * Actions for form submission in the SvelteKit application.
 * @type {import('./$types').Actions}
 */
export const actions = {
  default: async ({ locals, request }) => {
    try {
      // Parsing form data from the request
      const formData = await request.formData();
      const data = Object.fromEntries([...formData]);

      // Creating a new user in the database
      const newUser = await locals.pb.collection('users').create(data);
      // Requesting email verification for the new user
      const verifiedUser = await locals.pb.collection('users').requestVerification(data.email);

      // Returning a success status
      return { status: 200 }

    } catch (err) {
      console.log("Error", err);
      if (err.response.data.email) {
        // Handling error when email is already registered
        return {
          status: 400,
          error: true,
          message: "Email already registered!",
        };
      }
      else if (err.response.data.passwordConfirm) {
        // Handling error when password confirmation fails
        return {
          status: err.status,
          error: true,
          message: err.response.message,
        };
      }
      else {
        // Handling other general errors
        return {
          status: err.status,
          error: true,
          message: err.response.message,
        };
      }
    }
  },
};