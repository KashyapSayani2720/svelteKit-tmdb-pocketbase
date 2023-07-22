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
			const { token, record } = await locals.pb.collection("users").authWithPassword(data.email, data.password);
			if (record.verified) {
				return { status: 200, error: false, message: "Logged in Successfully" }
			}
			else {
				return { status: 400, error: true, message: "Please verified your email!" }
			}
		} catch (err) {
			console.log('Error:', err);
			return { status: 400, error: true, message: "Email or Password is incorrect!" }
		}
	}
};
