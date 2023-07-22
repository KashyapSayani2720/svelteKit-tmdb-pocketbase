/* eslint-disable @typescript-eslint/no-explicit-any */

import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { IListMovie } from '$lib/types/movie';

export const load: PageServerLoad = async ({ locals }) => {
  // Disable eslint rule for explicit 'any' types for the following block

  if (!locals.pb.authStore.isValid) {
    throw redirect(303, '/login');
  }

  try {
    const params = `api_key=${import.meta.env.VITE_SECRET_API_KEY_V3
      }&language=en-US&append_to_response=videos,images,credits,external_ids,release_dates&include_image_language=en`;

    const genreParams = `api_key=${import.meta.env.VITE_SECRET_API_KEY_V3
      }`

    const urlListMovie = `${import.meta.env.VITE_SECRET_API_URL}/discover/movie?${params}`;
    const urlListMovieGenre = `${import.meta.env.VITE_SECRET_API_URL}/genre/movie/list?${genreParams}`;

    const url = `${import.meta.env.VITE_SVELTEKIT_API_BASE_URL}api/movies`;

    const data = {
      user_id: locals.pb.authStore.baseModel.id,
      url: urlListMovie,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    
    // const urlListTvPopular = `${import.meta.env.VITE_SECRET_API_URL}/watchlist/popular?${params}`;
    const resposeListMovie = await fetch(url, options);

    if (!resposeListMovie.ok) {
      // Handle non-2xx responses if needed
      throw new Error('Network response was not ok');
    }

    const resposeListMovieGenre = await fetch(urlListMovieGenre);
    // const resposeListTv = await fetch(urlListTvPopular);

    const jsonListMovie: IListMovie[] = await resposeListMovie.json();
    const jsonListMovieGenre: { genres: any } = await resposeListMovieGenre.json();

    return {
      list_movie_popular: jsonListMovie,
      user_id: locals.pb.authStore.baseModel.id,
      genre_movie_list: jsonListMovieGenre.genres,
    };
  } catch (error) {
    console.error('Error calling the endpoint:', error);
    throw error;
  }
};