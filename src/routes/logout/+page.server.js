import { redirect } from '@sveltejs/kit';

// The 'actions' object defines a set of actions that can be executed for specific routes.
// In this case, the 'default' action is executed when the corresponding route is accessed.

export const actions = {
  default: async ({ locals }) => {
    // Clear the authentication store to log out the user.
    locals.pb.authStore.clear();
    
    // Set the 'user' variable to null to indicate that the user is no longer logged in.
    locals.user = null;
    
    // Redirect the user to the home page (status code 303 means "See Other" and indicates a temporary redirect).
    throw redirect(303, '/');
  },
};