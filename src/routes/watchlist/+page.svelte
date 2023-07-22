<script lang="ts">
	import ListMovie from '$lib/components/home/ListMovie.svelte';
	import type { IListMovie } from '$lib/types/movie';

	export let data: {
		
		list_movie_popular: IListMovie[];
		user_id: String;
	};
</script>

<ListMovie isWatchList={true} title="Movies Watch List" user_id={data.user_id} content={data.list_movie_popular} />