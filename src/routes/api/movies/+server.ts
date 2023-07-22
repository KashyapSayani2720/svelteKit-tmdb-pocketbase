import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import type { IListMovie } from '../../../lib/types/movie';

/** 
 * RequestHandler function to handle POST requests.
 * @type {import('./$types').RequestHandler}
 */
export async function POST({ request }) {

    // Extracting data from the request body
    const { is_watch_list, user_id, url } = await request.json();

    // Initializing a new PocketBase instance with the provided URL
    const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);
    
    let media_ids = new Array();

    let content : IListMovie[] = new Array();
    
    try {
        
        // Retrieving the watch list movies from the PocketBase collection
        const watchListMovies = await pb.collection("watch_list").getFullList({
			filter: `user_id = "${user_id}"`
		});

		// Extracting media_ids from the watchListMovies
        media_ids = watchListMovies.map((watch)=>watch.media_id);

        // Fetching the list of movies from the provided URL
        const resposeListMovie = await fetch(url);

        // Parsing the response as JSON
        const jsonListMovie : { page: string; results: any } = await resposeListMovie.json();

        // Mapping the list of movies, adding 'addedToWatchlist' property based on whether the movie's ID is in the watch list
        content = jsonListMovie.results.map((content: IListMovie)=> media_ids.includes(content.id) ? { ...content, addedToWatchlist: true } : { ...content, addedToWatchlist: false } );

        // If 'is_watch_list' is true, filter the content to include only movies that are in the watch list
        if(is_watch_list){
            content = content.filter((movie)=> movie.addedToWatchlist);
        }

        // Return the content as JSON response
        return json(content);

	} catch (error) {
		console.log(error);
		throw new Error('error get list movie popular');
	}
}