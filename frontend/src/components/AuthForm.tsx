import axios from 'axios';

function AuthForm({ showPathName }: { showPathName: string }) {
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const form_data: Record<string, FormDataEntryValue | null> = {}; // type script
		if (showPathName == 'signup') {
			form_data.name = formData.get('form[name]');
		}
		form_data.email = formData.get('form[email]');
		form_data.password = formData.get('form[password]');

		const response = await axios.post(`http://localhost:3000/api/auth/${showPathName}`, form_data);
		console.log('response' + JSON.stringify(response.data));
	};

	return (
		<>
			<form className="w-full flex flex-col justify-center items-center" onSubmit={handleSubmit}>
				{showPathName === 'signup' && (
					<input
						type="text"
						name="form[name]"
						className="h-9 w-3/5 my-2 px-3 py-1 rounded-md border border-[#e3e3e3] bg-transparent focus-visible:outline-none focus-visible:ring-1 text-sm"
						placeholder="Name"
					/>
				)}
				<input
					type="email"
					name="form[email]"
					className="h-9 w-3/5 my-2 px-3 py-1 rounded-md border border-[#e3e3e3] bg-transparent focus-visible:outline-none focus-visible:ring-1 text-sm"
					placeholder="Email"
				/>
				<input
					type="password"
					name="form[password]"
					className="h-9 w-3/5 my-2 px-3 py-1 rounded-md border border-[#e3e3e3] bg-transparent focus-visible:outline-none focus-visible:ring-1 text-sm"
					placeholder="Password"
				/>
				<button className="px-2 py-1 my-2 text-white border-1 border-blue-500 bg-blue-500 rounded-md">
					{showPathName == 'signup' ? 'Signup' : 'Login'}
				</button>
			</form>
		</>
	);
}

export default AuthForm;
