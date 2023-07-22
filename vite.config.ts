// Import the necessary modules
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Unocss from "unocss/vite";

// Define the Vite configuration
export default defineConfig({
	// List of plugins used by Vite
	plugins: [sveltekit(), Unocss()],

	// Configuration for the server
	server: {
		// Watch configuration with polling enabled
		watch: {
			usePolling: true
		},
		// Host configuration set to true
		host: true
	}
});