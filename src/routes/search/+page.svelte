<script lang="ts">
	// import { enhance, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import ListMovieTv from '$lib/components/search/ListMovieTv.svelte';
	import type { IListMovie, IListTv } from '$lib/types/movie';
	import { browser } from '$app/environment';
	import type { ActionData, PageData } from './$types';
	import ListMovie from '$lib/components/home/ListMovie.svelte';
	
	export let form: ActionData;

	export let data: {
		user_id: String;
	};

	console.log("user_id : ",data.user_id)
	// export let data: PageData;
	// console.log(form);
	let isLoading: boolean = false;
	let curr_page: number = 1;
	let search: string = '';
	let listData: IListMovie[] & IListTv[] = form?.data ?? [];
	let totalPages: number = form?.total_pages ?? 0;

</script>

<form action="?/search" method="POST" class="flex justify-center items-center w-full">
	<!-- use:enhance={submitSearchMovieTv} -->
	<input type="hidden" name="curr_page" value={curr_page} />
	<input
		type="text"
		name="search"
		id="search"
		bind:value={search}
		placeholder="Search movie or tv"
		disabled={isLoading}
		autocomplete="off"
		class="w-full m-4 p-3 px-4 bg-black text-white text-base border-1 border-gray-7 rounded focus:outline-none focus:bg-gray-8 disabled:opacity-50"
	/>
</form>

{#if isLoading}
	<div class="flex flex-col justify-center items-center">
		<div class="loading" />
		<div class="text-sm mt-2">Loading movie & tv ..</div>
	</div>
{:else if listData.length === 0}
	<div class="flex flex-col justify-center items-center">
		<div class="i-ph-film-strip w-10 h-10 mb-2" />
		Movie Not Found
	</div>
{:else}
	<div class="mb-30">
		<ListMovie user_id={data.user_id} title="" content={listData} />
	</div>
{/if}
