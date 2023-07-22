<script lang="ts">
	import BannerHome from '$lib/components/home/BannerHome.svelte';
	import ListMovie from '$lib/components/home/ListMovie.svelte';
	import type { IDetailMovie, IGenreMovieList, IListMovie } from '$lib/types/movie';

	export let data: {
		banner: IDetailMovie;
		list_movie_popular: IListMovie[];
		list_movie_top_rated: IListMovie[];
		list_movie_upcoming: IListMovie[];
		list_movie_now_playing: IListMovie[];
		user_id: String,
		genre_movie_list: IGenreMovieList[]
	};
</script>

<div class="lt-lg:mb-20">
	<BannerHome content={data.banner} type="movies" />
	<ListMovie genre={data.genre_movie_list} user_id={data.user_id} title="Popular Movies" content={data.list_movie_popular} />
	<ListMovie genre={data.genre_movie_list} user_id={data.user_id} title="Top Rated Movies" content={data.list_movie_top_rated} />
	<ListMovie genre={data.genre_movie_list} user_id={data.user_id} title="Upcoming Movies" content={data.list_movie_upcoming} />
	<ListMovie genre={data.genre_movie_list} user_id={data.user_id} title="Now Playing Movies" content={data.list_movie_now_playing} />
</div>
