<script lang="ts">
	/* Import components and types */
	import Detail from '$lib/components/detail/Detail.svelte';
	import Overview from '$lib/components/detail/Overview.svelte';
	import Photos from '$lib/components/detail/Photos.svelte';
	import Videos from '$lib/components/detail/Videos.svelte';
	import type { IDetailMovie } from '$lib/types/movie';
  
	/* Props and state variables */
	export let data: IDetailMovie;
	let activeTab: number = 1;
  
	/* Tab information */
	const listTabDetail = [
	  { tab: 1, label: 'OVERVIEW' },
	  { tab: 2, label: 'VIDEOS' },
	  { tab: 3, label: 'PHOTOS' }
	];
  </script>
  
  <div class="lt-lg:mb-20">
	<!-- Detail component -->
	<Detail content={data} />
  
	<!-- Tab buttons -->
	<div class="flex justify-center gap-10 mt-10 lt-lg:mt-0 lt-lg:grid lt-lg:grid-cols-3 lt-lg:gap-0">
	  {#each listTabDetail as tab}
		<button
		  on:click={() => (activeTab = tab.tab)}
		  class="btn text-xl px-0 py-1 font-bold cursor-pointer lt-lg:p-4 lt-lg:text-sm lt-lg:font-light 
			{activeTab === tab.tab
			  ? 'border-b border-white font-semibold lt-lg:bg-gray-8 lt-lg:border-none'
			  : 'text-gray-7 font-light lt-lg:bg-gray-9'}
		  "
		>
		  {tab.label}
		</button>
	  {/each}
	</div>
  
	<!-- Content based on active tab -->
	{#if activeTab === 1}
	  <Overview content={data} />
	{:else if activeTab === 2}
	  <Videos content={data} />
	{:else}
	  <Photos content={data} />
	{/if}
  </div>  