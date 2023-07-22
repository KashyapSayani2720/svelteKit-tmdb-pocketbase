/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {

	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	try {
		const params = `api_key=${
			import.meta.env.VITE_SECRET_API_KEY_V3
		}&language=en-US&append_to_response=videos,images,credits,external_ids,release_dates&include_image_language=en`;

		const urlListMovie = `${import.meta.env.VITE_SECRET_API_URL}/discover/movie?${params}`;

		const url = `${import.meta.env.VITE_SVELTEKIT_API_BASE_URL}api/movies`;
	
		const data = {
			is_watch_list: true,
			user_id: locals.pb.authStore.baseModel.id,
			url: urlListMovie
		};
	
		const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
		};

		const resposeListMovie = await fetch(url,options);

		const jsonListMovie: { page: string; results: any } = await resposeListMovie.json();
	
		return {
			list_movie_popular: jsonListMovie,
			user_id:locals.pb.authStore.baseModel.id
		};

	} catch (error) {
		console.log(error);
		throw new Error('error get list movie popular');
	}
};