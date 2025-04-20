import AuthForm from '../components/AuthForm';
import NavigationBar from '../components/NavigationBar';

function LoginPage() {
	return (
		<div className="loginPage" aria-label="Login Page">
			<NavigationBar />
			<main className="h-10/12 w-screen">
				<section className="h-full w-full flex flex-row" aria-label="Login Section">
					<aside className="h-full w-3/5"></aside>
					<section className="h-full w-2/5 flex flex-col justify-center items-center" aria-label="Login Form">
						<h1 className="font-mono text-5xl my-2">Login</h1>
						<p className="my-2">Enter Credentials</p>
						<AuthForm showPathName={'login'} />
						<p>
							Don't have an account ?
							<a href="/signup" className="bg-transparent border-0 text-blue-500 pl-1">
								Sign up
							</a>
						</p>
					</section>
				</section>
			</main>
		</div>
	);
}

export default LoginPage;
