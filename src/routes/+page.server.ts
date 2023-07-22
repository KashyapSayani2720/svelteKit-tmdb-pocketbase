/* eslint-disable @typescript-eslint/no-explicit-any */
// The above line disables the linting rule "@typescript-eslint/no-explicit-any" for this file.

// Importing required modules and types
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { IListMovie } from '$lib/types/movie';

// Defining the server-side load function for the component
export const load: PageServerLoad = async ({ locals }) => {
  // Checking if the user is authenticated, otherwise redirect to login
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, '/login');
  }

  try {
    // Constructing the parameters for API requests
    const params = `api_key=${import.meta.env.VITE_SECRET_API_KEY_V3}&language=en-US&append_to_response=videos,images,credits,external_ids,release_dates&include_image_language=en`;

    // Creating the API base URL
    const url = `${import.meta.env.VITE_SVELTEKIT_API_BASE_URL}api/movies`;

    // Getting the user_id from the authenticated user
    const user_id = locals.pb.authStore.baseModel.id;

    // Creating the URLs for different movie lists
    const urlListMoviePopular = `${import.meta.env.VITE_SECRET_API_URL}/movie/popular?${params}`;
    const urlListMovieTopRated = `${import.meta.env.VITE_SECRET_API_URL}/movie/top_rated?${params}`;
    const urlListMovieUpComing = `${import.meta.env.VITE_SECRET_API_URL}/movie/upcoming?${params}`;
    const urlListMovieNowPlaying = `${import.meta.env.VITE_SECRET_API_URL}/movie/now_playing?${params}`;

    // Fetching data for each movie list using the generateOptions function
    const resposeListMoviePopular = await fetch(url, generateOptions(urlListMoviePopular, user_id));
    const resposeListMovieTopRated = await fetch(url, generateOptions(urlListMovieTopRated, user_id));
    const resposeListMovieUpComing = await fetch(url, generateOptions(urlListMovieUpComing, user_id));
    const resposeListMovieNowPlaying = await fetch(url, generateOptions(urlListMovieNowPlaying, user_id));

    // Parsing JSON responses to get movie lists
    const jsonListMoviePopular: IListMovie[] = await resposeListMoviePopular.json();
    const jsonListMovieTopRated: IListMovie[] = await resposeListMovieTopRated.json();
    const jsonListMovieUpComing: IListMovie[] = await resposeListMovieUpComing.json();
    const jsonListMovieNowPlaying: IListMovie[] = await resposeListMovieNowPlaying.json();

    // Initializing a variable to hold the movie banner data
    let jsonDetailMovie = [];

    // If there are popular movies available, fetch the details of the first movie to use as the banner
    if (jsonListMoviePopular) {
      const urlBannerPopular = `${import.meta.env.VITE_SECRET_API_URL}/movie/${jsonListMoviePopular[0].id}?${params}`;
      const resposeBanner = await fetch(urlBannerPopular);
      const data = await resposeBanner.json();
      jsonDetailMovie = data;
    }

    // Return the fetched data as props for the component
    return {
      banner: jsonDetailMovie,
      list_movie_popular: jsonListMoviePopular,
      list_movie_top_rated: jsonListMovieTopRated,
      list_movie_upcoming: jsonListMovieUpComing,
      list_movie_now_playing: jsonListMovieNowPlaying,
      user_id: user_id,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error getting the list of popular movies');
  }
};

// Function to generate options for the fetch request
function generateOptions(url: string, user_id: string) {
  const data = {
    user_id: user_id,
    url: url,
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