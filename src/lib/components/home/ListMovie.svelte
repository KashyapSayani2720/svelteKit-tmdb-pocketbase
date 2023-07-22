<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { IListMovie, IGenreMovieList } from '../../types/movie';
	import ImageLoader from '../image/ImageLoader.svelte';
	import StarRating from '../StarRating.svelte';
	import MultiSelect from 'svelte-multiselect';
	import { filterMovies } from '$lib/helpers/filterMovie';

	export let title: string;
	export let content: IListMovie[] | any = [];
	export let genre: IGenreMovieList[] | any = [];

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
		console.log('selectedParmas: ', selectedGenre, selectedYear, selectedRating);

		const selectedGenreObjs = genre.filter((obj: any) => selectedGenre.includes(obj.name));
		const selectedGenreIds = selectedGenreObjs.map((obj: any) => obj.id).join(',');

		const { movie_list_with_filter } = await filterMovies(
			selectedGenreIds,
			selectedYear[0] || '',
			selectedRating
		);

		if (movie_list_with_filter != 0) {
			content = movie_list_with_filter;
		}
	}

	onMount(async () => {
		const userAgent = navigator.userAgent.toLowerCase();
		isMobile = /mobile|android|ios|iphone|ipad|ipod/i.test(userAgent);
	});
</script>

<div class="container-fluid">
	<div class="text-white text-center text-2xl m-4 fw-bold">{title}</div>
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
	<div
		class="{$page.route.id == '/movies'
			? 'row'
			: !isMobile
			? 'row '
			: ''} flex gap-4 overflow-x-auto pb-6 justify-content-center"
	>
		{#each content as item}
			<div
				data-sveltekit-preload-code
				class="col-lg-2 bg-gray-9 p-2 rounded-md w-300px justify-content-center"
			>
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
				<span class="text-base font-light line-clamp-1"
					><button class="btn btn-danger i-ph-plus-light" /> Add To Watchlist</span
				>
			</div>
		{/each}
	</div>
</div>
