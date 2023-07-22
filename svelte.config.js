// Import the necessary modules
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

// Define the configuration object
/** 
 * The configuration object adheres to the @sveltejs/kit.Config type.
 * @see https://kit.svelte.dev/docs#configuration
 */
const config = {
	// Preprocess your Svelte components using Vite preprocessor
	preprocess: vitePreprocess(),

	// SvelteKit configuration
	kit: {
		// Set the adapter to @sveltejs/adapter-auto
		adapter: adapter()
	}
};

// Export the configuration object as the default export
export default config;