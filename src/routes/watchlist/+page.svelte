<script lang="ts">
	// Importing the ListMovie component and IListMovie type
	import ListMovie from '$lib/components/home/ListMovie.svelte';
	import type { IListMovie } from '$lib/types/movie';

	// Props definition for the component
	export let data: {
		// An array of popular movies for the list
		list_movie_popular: IListMovie[];
		// The user ID to identify the user
		user_id: String;
	};
</script>

<!-- Rendering the ListMovie component with props -->
<ListMovie
	// Prop to specify that the list shows the user's watch list
	isWatchList={true}
	// The title for the ListMovie component
	title="Movies Watch List"
	// Passing the user ID to the ListMovie component
	user_id={data.user_id}
	// Passing the array of popular movies as content
	content={data.list_movie_popular}
/>