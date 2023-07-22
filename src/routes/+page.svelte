<script lang="ts">
	import BannerHome from '$lib/components/home/BannerHome.svelte';
	import ListMovie from '$lib/components/home/ListMovie.svelte';
	import type { IDetailMovie, IListMovie } from '$lib/types/movie';

	export let data: {
		banner: IDetailMovie;
		list_movie_popular: IListMovie[];
		list_movie_top_rated: IListMovie[];
		list_movie_upcoming: IListMovie[];
		list_movie_now_playing: IListMovie[];
		user_id: String
	};
</script>

<div class="lt-lg:mb-20">
	<BannerHome content={data.banner} type="movies" />
	<ListMovie user_id={data.user_id} title="Popular Movies" content={data.list_movie_popular} />
	<ListMovie user_id={data.user_id} title="Top Rated Movies" content={data.list_movie_top_rated} />
	<ListMovie user_id={data.user_id} title="Upcoming Movies" content={data.list_movie_upcoming} />
	<ListMovie user_id={data.user_id} title="Now Playing Movies" content={data.list_movie_now_playing} />
</div>
