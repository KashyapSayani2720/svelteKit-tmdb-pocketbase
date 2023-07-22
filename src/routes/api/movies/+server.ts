import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import type { IListMovie } from '../../../lib/types/movie';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {

    const { is_watch_list, user_id, url } = await request.json();

    const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);
    
    let media_ids = new Array();

    let content : IListMovie[] = new Array();
    
    try {
        
        const watchListMovies = await pb.collection("watch_list").getFullList({
			filter: `user_id = "${user_id}"`
		});

		media_ids = watchListMovies.map((watch)=>watch.media_id);

        const resposeListMovie = await fetch(url);

        const jsonListMovie : { page: string; results: any } = await resposeListMovie.json();

        content = jsonListMovie.results.map((content: IListMovie)=> media_ids.includes(content.id) ? { ...content, addedToWatchlist: true } : { ...content, addedToWatchlist: false } );

        if(is_watch_list){
            content = content.filter((movie)=> movie.addedToWatchlist);
        }

        return json(content);

	} catch (error) {
		console.log(error);
		throw new Error('error get list movie popular');
	}
}