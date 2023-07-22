import { error, redirect } from '@sveltejs/kit';

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
			const { token, user } = await locals.pb.collection("users").requestPasswordReset(data.email);
			return { status: 200, error: false, message: "Reset Password link has been send on your email!" }
		} catch (err) {
			console.log('Error:', err);
			return {
				status:err.status,
				error: true,
				email: data.email,
				message:"Failed to send Reset Password link!"
			};
		}

	}
};
