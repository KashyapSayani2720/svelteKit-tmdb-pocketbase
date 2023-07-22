import type { PageServerLoad } from './$types';

/**
 * Function to load TV show details from the server.
 * @type {PageServerLoad}
 * @param {Object} params - The params object containing route parameters.
 * @param {string} params.id - The ID of the TV show to fetch details for.
 * @returns {Promise<Object>} An object containing TV show details.
 */
export const load: PageServerLoad = async ({ params }) => {
	try {
		// Constructing the parameters for the API request
		const paramApi = `api_key=${
			import.meta.env.VITE_SECRET_API_KEY_V3
		}&language=en-US&append_to_response=videos,images,credits,external_ids,release_dates&include_image_language=en`;

		// Constructing the URL for the API request to fetch TV show details
		const url = `${import.meta.env.VITE_SECRET_API_URL}/tv/${params.id}?${paramApi}`;

		// Fetching the TV show details from the API
		const resposeDetailTv = await fetch(url);
		const resFinal = await resposeDetailTv.json();

		// Returning the extracted details to be used in the Svelte component
		return {
			backdrop_path: resFinal.backdrop_path,
			poster_path: resFinal.poster_path,
			id: resFinal.id,
			overview: resFinal.overview,
			popularity: resFinal.popularity,
			release_date: resFinal.first_air_date,
			runtime: resFinal.episode_run_time.length === 0 ? 0 : resFinal.episode_run_time,
			title: resFinal.name,
			vote_average: resFinal.vote_average,
			vote_count: resFinal.vote_count,
			budget: 0,
			revenue: 0,
			genres: resFinal.genres,
			spoken_languages: resFinal.spoken_languages,
			status: resFinal.status,
			production_companies: resFinal.production_companies,
			credits: resFinal.credits,
			images: resFinal.images,
			videos: resFinal.videos
		};
	} catch (error) {
		// Handling errors and logging them
		console.log(error);
	}
};