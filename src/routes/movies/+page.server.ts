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
		
		const genreParams = `api_key=${
			import.meta.env.VITE_SECRET_API_KEY_V3
		}`

		const urlListMovie = `${import.meta.env.VITE_SECRET_API_URL}/discover/movie?${params}`;
		// const urlListTvPopular = `${import.meta.env.VITE_SECRET_API_URL}/watchlist/popular?${params}`;
		const urlListMovieGenre = `${import.meta.env.VITE_SECRET_API_URL}/genre/movie/list?${genreParams}`;


		const resposeListMovie = await fetch(urlListMovie);
		// const resposeListTv = await fetch(urlListTvPopular);
		const resposeListMovieGenre = await fetch(urlListMovieGenre);
	

		const jsonListMovie: { page: string; results: any } = await resposeListMovie.json();
		// const jsonListTv: { page: string; results: any } = await resposeListTv.json();
		const jsonListMovieGenre: { genres: any } = await resposeListMovieGenre.json();
		
		// let jsonDetailMovie = [];

		// if (jsonListMovie) {
		// 	const urlBannerPopular = `${import.meta.env.VITE_SECRET_API_URL}/movie/${
		// 		jsonListMovie.results[0].id
		// 	}?${params}`;
		// 	const resposeBanner = await fetch(urlBannerPopular);
		// 	const data = await resposeBanner.json();
		// 	jsonDetailMovie = data;
		// }
		return {
			// banner: jsonDetailMovie,
			list_movie_popular: jsonListMovie.results,
			// list_tv_popular: jsonListTv.results
			genre_movie_list: jsonListMovieGenre.genres,
		};
	} catch (error) {
		console.log(error);
		throw new Error('error get list movie popular');
	}
};
