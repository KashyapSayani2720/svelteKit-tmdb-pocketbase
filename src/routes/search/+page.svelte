<script lang="ts">
	// Importing components and types
	import ListSearchMovie from './../../lib/components/search/ListSearchMovie.svelte';
	// import { enhance, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { IListMovie, IListTv } from '$lib/types/movie';
	import { browser } from '$app/environment';
	import type { ActionData, PageData } from './$types';
	import ListMovie from '$lib/components/home/ListMovie.svelte';
	
	// Props definition for the component
	export let form: ActionData;
	export let data: {
		user_id: String;
	};

	// State variables
	let isLoading: boolean = false;
	let curr_page: number = 1;
	let search: string = '';
	let listData: IListMovie[] & IListTv[] = form?.data ?? [];

</script>

<!-- Search form for searching movies or TV shows -->
<form action="?/search" method="POST" class="flex justify-center items-center w-full">
	<!-- Hidden input to store the current page number for pagination -->
	<input type="hidden" name="curr_page" value={curr_page} />
	<input
		<!-- Input field for search query -->
		type="text"
		name="search"
		id="search"
		bind:value={search}
		placeholder="Search movie or TV"
		disabled={isLoading}
		autocomplete="off"
		class="w-full m-4 p-3 px-4 bg-black text-white text-base border-1 border-gray-7 rounded focus:outline-none focus:bg-gray-8 disabled:opacity-50"
	/>
</form>

<!-- Conditional rendering based on the loading state and search results -->
{#if isLoading}
	<!-- Show loading state -->
	<div class="flex flex-col justify-center items-center">
		<div class="loading" />
		<div class="text-sm mt-2">Loading movie & TV shows..</div>
	</div>
{:else if listData.length === 0}
	<!-- Show message when no search results are found -->
	<div class="flex flex-col justify-center items-center">
		<div class="i-ph-film-strip w-10 h-10 mb-2" />
		Movie Not Found
	</div>
{:else}
	<!-- Show search results when available -->
	<div class="mb-30">
		<ListSearchMovie content={listData} />
	</div>
{/if}
</script>