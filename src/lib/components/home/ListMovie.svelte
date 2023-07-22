<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { IListMovie, IGenreMovieList } from '../../types/movie';
	import ImageLoader from '../image/ImageLoader.svelte';
	import StarRating from '../StarRating.svelte';
	import MultiSelect from 'svelte-multiselect';
	import { filterMovies } from '$lib/helpers/filterMovie';
	import PocketBase from 'pocketbase';
	import { writable } from 'svelte/store';

	export let title: string;
	export let content: IListMovie[] | any = [];
	export let user_id: String | "";
	export let isWatchList = false;
	export let isFilter = false;

	const contentStore = writable<IListMovie[]>(content);
	
	const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

	export let genre: IGenreMovieList[] = new Array();

	// console.log('content...', content);
	const startYear = 2010;
	const endYear = 2024;
	const ratings = ['Above 5', 'Below 5'];
	const years: [] = [];

	for (let year = startYear; year <= endYear; year++) {
		years.push(year);
	}

	let isMobile = false;
	let selectedGenre: any = [];
	let selectedYear: any = [];
	let selectedRating: any = [];

	async function filterMoviesByParams() {
		const selectedGenreObjs = genre.filter((obj: any) => selectedGenre.includes(obj.name));
		const selectedGenreIds = selectedGenreObjs.map((obj: any) => obj.id).join(',');

		const { movie_list_with_filter } = await filterMovies(
			selectedGenreIds,
			selectedYear[0] || '',
			selectedRating,
			user_id
		);

		// if (movie_list_with_filter.length != 0) {
			contentStore.set(movie_list_with_filter);
		// }
	}

	onMount(async () => {
		const userAgent = navigator.userAgent.toLowerCase();
		isMobile = /mobile|android|ios|iphone|ipad|ipod/i.test(userAgent);
	});

	function updateContext(movie:IListMovie){
		contentStore.update(store => {
				const index = store.findIndex(item => item.id === movie.id);
				if (index !== -1) {
					// If movie exists in the store, update its addedToWatchlist property
					const updatedItem = { ...store[index], addedToWatchlist: !movie.addedToWatchlist };
					return [...store.slice(0, index), updatedItem, ...store.slice(index + 1)];
				}
				return store; // If movie not found, return the original store
    		});
		
		isWatchList && contentStore.set($contentStore.filter((content) => content.addedToWatchlist));
	}

	async function handleWatchList(movie: IListMovie){

		const data = {
			"user_id" : user_id,
			"media_id": movie.id
		};

		if(movie.addedToWatchlist){
			const media = await pb.collection("watch_list").getFullList({
				
				filter: `id="${user_id}"` && `media_id="${movie.id}"`
			});	

			
			const record = await pb.collection('watch_list').delete(media[0].id);

			if(record){
				updateContext(movie);
			}
		}
		else{
			const record = await pb.collection('watch_list').create(data);
			if(record.media_id){
				updateContext(movie);
			}
		}
	}

</script>
	

	<div class="container-fluid">
		<div class="text-white text-center text-2xl m-4 fw-bold">{title}</div>
		{#if isFilter}
		<div class="d-flex justify-content-center align-tems-center flex-wrap gap-3 m-4">
			<MultiSelect
				bind:selected={selectedGenre}
				on:change={filterMoviesByParams}
				placeholder={'Filter By Genre'}
				options={genre.map((obj) => obj.name)}
				--sms-options-bg="#111827"
				--sms-selected-bg="#fc682f"
				--sms-li-active-bg="#fc682f"
				--sms-options-margin="10px 0px 0px 0px"
			/>
			<MultiSelect
				bind:selected={selectedYear}
				on:change={filterMoviesByParams}
				placeholder={'Filter By Year'}
				options={years}
				maxSelect={1}
				--sms-options-bg="#111827"
				--sms-selected-bg="#fc682f"
				--sms-li-active-bg="#fc682f"
				--sms-options-margin="10px 0px 0px 0px"
			/>
	
			<MultiSelect
				bind:selected={selectedRating}
				on:change={filterMoviesByParams}
				placeholder={'Filter By Rating'}
				options={ratings}
				maxSelect={1}
				--sms-options-bg="#111827"
				--sms-selected-bg="#fc682f"
				--sms-li-active-bg="#fc682f"
				--sms-options-margin="10px 0px 0px 0px"
			/>
		</div>
		{/if}
		<div class='{["/movies","/watchlist"].includes($page.route.id) ? 'row justify-content-center' : (!isMobile ? 'row justify-content-center' : '')} flex gap-4 overflow-x-auto pb-5 mb-5'>
			{#each $contentStore as item}
				<div data-sveltekit-preload-code class="col-lg-2 col-md-4 col-sm-12	 bg-gray-9 p-2 rounded-md w-300px justify-content-center">
					<a href="/movies/{item.id}" class="text-white decoration-none">
						<div class="">
							<ImageLoader
								src={`${import.meta.env.VITE_PUBLIC_IMAGE_URL}w300/${item.poster_path}`}
								alt="poster-{item.id}"
								classes="object-cover rounded-md"
							/>
						</div>
						<div class="p-2">
							<div class="text-base font-light line-clamp-1">{item.title}</div>
							<div class="flex items-center gap-2">
								<StarRating rating={item.vote_average} class="w-20" />
								<div class="text-gray-4 font-light text-sm">{item.vote_average}</div>
							</div>
						</div>
					</a>
					<span class="text-gray-4 font-light text-sm" ><button class="btn btn-danger {item.addedToWatchlist ? 'i-ph-plus-fill' : 'i-ph-plus-light'}" on:click={() => handleWatchList(item)} />{!isMobile ? (item.addedToWatchlist ? "Added To Watchlist" : "Add To Watchlist") : ""}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- <div class="container-fluid px-10 mt-6 mb-10 lt-md:px-6">
		<div class="text-white text-center text-2xl m-4">{title}</div>
		<div class="{$page.route.id == "/movies" ? 'row' : (!isMobile ? 'row ' : '')} flex gap-4 overflow-x-auto pb-6 justify-content-center">
			{#each $contentStore as item}
				<div data-sveltekit-preload-code class="col-lg-2 flex flex-col bg-gray-9 p-2 rounded-md justify-content-center">
					<a href="/movies/{item.id}" class="text-white decoration-none">
						<div class="">
							<ImageLoader
								src={`${import.meta.env.VITE_PUBLIC_IMAGE_URL}w300/${item.poster_path}`}
								alt="poster-{item.id}"
								classes="object-cover rounded-md"
							/>
						</div>
						<div class="p-2">
							<div class="text-base font-light line-clamp-1">{item.title}</div>
							<div class="flex items-center gap-2">
								<StarRating rating={item.vote_average} class="w-20" />
								<div class="text-gray-4 font-light text-sm">{item.vote_average}</div>
							</div>
						</div>
					</a>
					<span class="text-gray-4 font-light text-sm" ><button class="btn btn-danger {item.addedToWatchlist ? 'i-ph-plus-fill' : 'i-ph-plus-light'}" on:click={() => handleWatchList(item)} />{!isMobile ? (item.addedToWatchlist ? "Added To Watchlist" : "Add To Watchlist") : ""}</span>
				</div>
			{/each}
		</div>
	</div> -->

	{#if $contentStore.length == 0}
		<div class="flex flex-col justify-center items-center">
			<div class="i-ph-film-strip w-10 h-10 mb-2" />
			 {title} Not Found
		</div>
	{/if}