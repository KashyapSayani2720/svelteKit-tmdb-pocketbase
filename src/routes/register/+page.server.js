import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}
};

/** @type {import('./$types').Actions} */
export const actions = {
	register: async ({ locals, request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);

		try {
			const newUser = await locals.pb.collection('users').create(data);
			const verifieduer = await locals.pb.collection('users').requestVerification(data.email);

			return { status: 200, error: false, message: "Successfully Registered!" }
		} catch (err) {
			console.log('Error:', err);
			if (err.response.data.email) {
				return { status: 400, error: true, message: "Email already Registered!" }
			} else if (err.response.data.passwordConfirm) {
				return { status: 400, error: true, message: "Password and Confirm password not matching" }
			} else {
				return {
					statu: 400,
					error: true,
					message: "Failed to Register!"
				};
			}
		}

	}
};
