import NavigationBar from '../components/NavigationBar.tsx';
import AuthForm from '../components/AuthForm.tsx';

function SignupPage() {
	return (
		<div className="loginPage" aria-label="Login Page">
			<NavigationBar />
			<main className="h-10/12 w-screen">
				<section className="h-full w-full flex flex-row" aria-label="Login Section">
					<aside className="h-full w-3/5"></aside>
					<section className="h-full w-2/5 flex flex-col justify-center items-center" aria-label="Login Form">
						<h1 className="font-mono text-5xl my-2">Signup</h1>
						<p className="my-2">Enter details</p>
						<AuthForm showPathName={'signup'} />
						<p>
							Already Have an account ?
							<a href="/login" className="bg-transparent border-0 text-blue-500 pl-1">
								Login
							</a>
						</p>
					</section>
				</section>
			</main>
		</div>
	);
}

export default SignupPage;
