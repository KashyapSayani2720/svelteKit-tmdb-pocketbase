<script lang="ts">
	import BannerHome from '$lib/components/home/BannerHome.svelte';
	import ListMovie from '$lib/components/home/ListMovie.svelte';
	import type { IDetailMovie, IListMovie, IListTv, IGenreMovieList } from '$lib/types/movie';
	import ListTv from '$lib/components/home/ListTv.svelte';

	export let data: {
		banner: IDetailMovie;
		list_movie_popular: IListMovie[];
		// list_tv_popular: IListTv[];
		genre_movie_list: IGenreMovieList[];
	};
</script>

<!-- fetching CSR -->
<!-- <Suspense>
	<PopularMovies />
	<ListTv />
</Suspense> -->

<!-- fetching SSR -->
<!-- <BannerHome content={data.banner} /> -->
<ListMovie title="Movies" content={data.list_movie_popular} genre={data.genre_movie_list}/>
<!-- <ListTv title="Popular TV" content={data.list_tv_popular} /> -->