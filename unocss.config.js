// Import necessary modules from 'unocss'
import {
	defineConfig,
	presetWind,
	presetIcons,
	presetUno,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss';

// Define the Unocss configuration
export default defineConfig({
	// Custom shortcuts for classes
	shortcuts: {
		// Shortcut for 'form-input' class
		'form-input': 'bg-gray-2 font-standar px-3 rounded-md h-10 w-fill text-sm border-none focus:outline-stone-3',
		// Shortcut for 'btn' class
		btn: 'bg-transparent border-none p-4 text-white'
	},
	// Apply presets for styles
	presets: [
		// Apply the Uno preset
		presetUno(),
		// Apply the Wind preset
		presetWind(),
		// Apply the Icons preset with 'warn' option set to true
		presetIcons({
			warn: true
		})
	],
	// Transformers to extend the capabilities of Unocss
	transformers: [
		// Transformer for custom directives
		transformerDirectives(),
		// Transformer for variant group
		transformerVariantGroup()
	],
	// Custom theme settings
	theme: {
		// Define custom colors
		colors: {
			// Primary color set to '#fc6830'
			primary: '#fc6830'
		},
		// Define breakpoints for responsive design
		breakpoints: {
			xxs: '320px',
			xs: '480px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px'
		}
	}
});
