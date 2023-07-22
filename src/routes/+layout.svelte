<script lang="ts">
	// Importing required modules and CSS stylesheets
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css'; // Importing NProgress CSS styles
	import "uno.css"; // Importing Uno.css styles
	import { navigating } from '$app/stores';
	import '$lib/assets/css/global.css'; // Importing custom global CSS styles
	import Seo from '$lib/components/Seo.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { applyAction, enhance } from '$app/forms';

	// Configuring NProgress settings
	NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16
	});

	$: {
		// Using a reactive statement to trigger NProgress start and done based on navigating status
		if ($navigating) {
			NProgress.start(); // Start NProgress when navigating
		}
		if (!$navigating) {
			NProgress.done(); // Finish NProgress when navigation is done
		}
	}

	export let data; // Exporting the 'data' prop
</script>

<Seo />
{#if data?.profile}
<!-- If 'data.profile' exists, render the main content with a sidebar -->
<main class="lg:grid lg:grid-cols-[6%_94%] h-full">
	<Sidebar />
	<div class="lg:grid-area-[1/2]">
		<slot /> <!-- Rendering the content passed as a slot -->
	</div>
</main>
{:else}
<!-- If 'data.profile' does not exist, render the content directly -->
<div>
	<slot /> <!-- Rendering the content passed as a slot -->
</div>
{/if}