import axios from 'axios';
import React, { JSX } from 'react';

const submitBtn: string = 'px-2 py-1 my-2 text-white border-1 border-blue-500 bg-blue-500 rounded-md';
const inputField: string =
	'h-9 w-3/5 my-2 px-3 py-1 rounded-md border border-[#e3e3e3] bg-transparent focus-visible:outline-none focus-visible:ring-1 text-sm';

type AuthFormProps = {
	showPathName: 'login' | 'signup';
};

function AuthForm({ showPathName }: AuthFormProps): JSX.Element {
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const form_data: Record<string, FormDataEntryValue | null> = {}; // type script
		form_data.email = formData.get('form[email]');
		form_data.password = formData.get('form[password]');

		if (showPathName == 'signup') {
			form_data.name = formData.get('form[name]');
		}

		try {
			const { data } = await axios.post<{ accessToken: string }>(
				`http://localhost:3000/api/auth/${showPathName}`,
				form_data,
				{ withCredentials: true }
			);
			console.log('data:' + data.accessToken);
			localStorage.setItem('accessToken', data.accessToken);
		} catch (err) {
			console.error('Auth error:', err);
		}
	};

	return (
		<>
			<form className="w-full flex flex-col justify-center items-center" onSubmit={handleSubmit}>
				{showPathName === 'signup' && <input type="text" name="form[name]" placeholder="Name" className={inputField} />}
				<input type="email" name="form[email]" className={inputField} placeholder="Email" />
				<input type="password" name="form[password]" className={inputField} placeholder="Password" />
				<button className={submitBtn}>{showPathName == 'signup' ? 'Signup' : 'Login'}</button>
			</form>
		</>
	);
}

export default AuthForm;
