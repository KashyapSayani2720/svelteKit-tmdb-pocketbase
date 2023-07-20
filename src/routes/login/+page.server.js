import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}
};

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);

		try {
			const { token, user } = await locals.pb.collection("users").authWithPassword(data.email, data.password);
		} catch (err) {
			console.log('Error:', err);
			return {
				error: true,
				email: data.email
			};
		}
		throw redirect(303, '/');
	}
};
