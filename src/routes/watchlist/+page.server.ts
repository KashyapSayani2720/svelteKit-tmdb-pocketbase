/* eslint-disable @typescript-eslint/no-explicit-any */

// Importing the redirect function from @sveltejs/kit and the PageServerLoad type from $types
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Definition of the load function with the PageServerLoad type
export const load: PageServerLoad = async ({ locals }) => {
	
	// Checking if the user is not authenticated and redirecting to the login page
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	try {
		// Constructing the parameters for the API request
		const params = `api_key=${
			import.meta.env.VITE_SECRET_API_KEY_V3
		}&language=en-US&append_to_response=videos,images,credits,external_ids,release_dates&include_image_language=en`;

		// Constructing the URL for the API request to fetch a list of movies
		const urlListMovie = `${import.meta.env.VITE_SECRET_API_URL}/discover/movie?${params}`;

		// Constructing the URL for the internal API endpoint to fetch movies
		const url = `${import.meta.env.VITE_SVELTEKIT_API_BASE_URL}api/movies`;

		// Data to be sent in the POST request to the internal API endpoint
		const data = {
			is_watch_list: true,
			user_id: locals.pb.authStore.baseModel.id,
			url: urlListMovie
		};

		// Options for the fetch POST request
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};

		// Fetching the list of movies from the internal API endpoint
		const resposeListMovie = await fetch(url,options);

		// Parsing the JSON response from the internal API
		const jsonListMovie: { page: string; results: any } = await resposeListMovie.json();
	
		// Returning the data to be used in the Svelte component
		return {
			list_movie_popular: jsonListMovie,
			user_id: locals.pb.authStore.baseModel.id
		};

	} catch (error) {
		// Handling errors and logging them
		console.log(error);
		throw new Error('error get list movie popular');
	}
};