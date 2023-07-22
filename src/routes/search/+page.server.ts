// Importing the redirect function from SvelteKit
import { redirect } from '@sveltejs/kit';

// Importing the Actions and PageServerLoad types from $types
import type { Actions, PageServerLoad } from '../$types';

/**
 * Function to load data for the page server-side.
 * @type {PageServerLoad}
 * @param {Object} options - The options object containing locals.
 * @param {Object} options.locals - The locals object containing user authentication data.
 * @returns {Promise<Object>} An object with the user ID if the user is authenticated.
 */
export const load: PageServerLoad = async ({ locals }) => {
	// Redirect to login page if the user is not authenticated
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	// Return the user ID if the user is authenticated
	return {
		user_id: locals.pb.authStore.baseModel.id
	};
}

/**
 * Actions for handling search functionality on the page.
 * @type {Actions}
 */
export const actions: Actions = {
	search: async ({ request }) => {
		// Extracting data from the form submission
		const data = await request.formData();
		const curr_page = data.get('curr_page');
		const value = data.get('search');

		// Constructing parameters for the API request
		const params = `api_key=${
			import.meta.env.VITE_SECRET_API_KEY_V3
		}&language=en-US&query=${value}&page=${curr_page}&include_adult=false`;

		// Constructing the URL for the API search request
		const urlSearch = `${import.meta.env.VITE_SECRET_API_URL}/search/movie?${params}`;

		// Fetching search results from the API and parsing the JSON response
		const responseSearch = await (await fetch(urlSearch)).json();

		// Returning the search results with the total number of pages
		return {
			total_pages: responseSearch.total_pages,
			data: responseSearch.results,
		};
	}
};