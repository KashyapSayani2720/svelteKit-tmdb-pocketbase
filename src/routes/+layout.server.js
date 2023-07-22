import { env } from '$env/dynamic/private';

/**
 * Function to load user data and analytics ID from the server.
 *
 * @param {Object} options - The options object containing the locals.
 * @param {Object} options.locals - The locals object containing user data.
 * @returns {Object} An object with user profile data and analytics ID.
 */
export function load({ locals }) {
	if (locals.user) {
		return {
			profile: JSON.parse(JSON.stringify(locals.user)),
			analyticsId: env.VERCEL_ANALYTICS_ID
		};
	} else {
		return { analyticsId: env.VERCEL_ANALYTICS_ID };
	}
}