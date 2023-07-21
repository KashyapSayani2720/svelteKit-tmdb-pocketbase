<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { IListMovie } from '../../types/movie';
	import ImageLoader from '../image/ImageLoader.svelte';
	import StarRating from '../StarRating.svelte';
	
	export let title: string;
	export let content: IListMovie[] | any = [];
	
	let isMobile = false;
	
	onMount(async () => {
		const userAgent = navigator.userAgent.toLowerCase();
		isMobile = /mobile|android|ios|iphone|ipad|ipod/i.test(userAgent);
  	});


</script>
	<div class="container-fluid">
		<div class="text-white text-center text-2xl m-4">{title}</div>
		<div class='{$page.route.id == "/movies" ? 'row' : (!isMobile ? 'row ' : '')} flex gap-4 overflow-x-auto pb-6 justify-content-center'>
			{#each content as item}
				<div data-sveltekit-preload-code class="col-lg-2 bg-gray-9 p-2 rounded-md w-300px  justify-content-center">
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
					<span class="text-base font-light line-clamp-1"><button class="btn btn-danger i-ph-plus-light" /> Add To Watchlist</span>
				</div>
			{/each}
		</div>
	</div>