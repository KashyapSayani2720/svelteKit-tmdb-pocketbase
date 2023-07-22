/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { IListMovie } from '$lib/types/movie';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
	try {
		const params = `api_key=${
			import.meta.env.VITE_SECRET_API_KEY_V3
		}&language=en-US&append_to_response=videos,images,credits,external_ids,release_dates&include_image_language=en`;

		const url = `${import.meta.env.VITE_SVELTEKIT_API_BASE_URL}api/movies`;

		const user_id = locals.pb.authStore.baseModel.id;
	

		const urlListMoviePopular = `${import.meta.env.VITE_SECRET_API_URL}/movie/popular?${params}`;
		const urlListMovieTopRated = `${import.meta.env.VITE_SECRET_API_URL}/movie/top_rated?${params}`;
		const urlListMovieUpComing = `${import.meta.env.VITE_SECRET_API_URL}/movie/upcoming?${params}`;
		const urlListMovieNowPlaying = `${
			import.meta.env.VITE_SECRET_API_URL
		}/movie/now_playing?${params}`;

		const resposeListMoviePopular = await fetch(url,generateOptions(urlListMoviePopular,user_id));
		const resposeListMovieTopRated = await fetch(url,generateOptions(urlListMovieTopRated,user_id));
		const resposeListMovieUpComing = await fetch(url,generateOptions(urlListMovieUpComing,user_id));
		const resposeListMovieNowPlaying = await fetch(url,generateOptions(urlListMovieNowPlaying,user_id));

		const jsonListMoviePopular: IListMovie[] =
			await resposeListMoviePopular.json();
		const jsonListMovieTopRated: IListMovie[] =
			await resposeListMovieTopRated.json();
		const jsonListMovieUpComing: IListMovie[] =
			await resposeListMovieUpComing.json();
		const jsonListMovieNowPlaying: IListMovie[] =
			await resposeListMovieNowPlaying.json();

		let jsonDetailMovie = [];

		if (jsonListMoviePopular) {
			const urlBannerPopular = `${import.meta.env.VITE_SECRET_API_URL}/movie/${
				jsonListMoviePopular[0].id
			}?${params}`;
			const resposeBanner = await fetch(urlBannerPopular);
			const data = await resposeBanner.json();
			jsonDetailMovie = data;
		}
		return {
			banner: jsonDetailMovie,
			list_movie_popular: jsonListMoviePopular,
			list_movie_top_rated: jsonListMovieTopRated,
			list_movie_upcoming: jsonListMovieUpComing,
			list_movie_now_playing: jsonListMovieNowPlaying,
			user_id:user_id
		};
	} catch (error) {
		console.log(error);
		throw new Error('error get list movie popular');
	}
};

function generateOptions(url:String,user_id:String){
	
	const data = {
		user_id: user_id,
		url: url
	};
  
	const options = {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(data),
	};

	return options;
}