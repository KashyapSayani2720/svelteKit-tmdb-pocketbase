import { env } from '$env/dynamic/private';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals }) {
	if (locals.user) {
		return {
			profile: JSON.parse(JSON.stringify(locals.user)),
			analyticsId: env.VERCEL_ANALYTICS_ID
		};
	}
	else{
		return { analyticsId: env.VERCEL_ANALYTICS_ID };
	}
}