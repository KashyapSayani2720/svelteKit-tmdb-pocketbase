<script lang="ts">
	import BannerHome from '$lib/components/home/BannerHome.svelte';
	import ListMovie from '$lib/components/home/ListMovie.svelte';
	import type { IDetailMovie, IListMovie, IListTv } from '$lib/types/movie';
	import ListTv from '$lib/components/home/ListTv.svelte';

	export let data: {
		list_movie_popular: IListMovie[];
		user_id: String;
	};
</script>

<ListMovie title="Movies" user_id={data.user_id} content={data.list_movie_popular} />