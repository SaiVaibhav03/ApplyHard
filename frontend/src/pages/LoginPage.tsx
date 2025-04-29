import AuthForm from '../components/AuthForm.tsx';
import AuthLayout from '../components/layout/AuthLayout.tsx';
import useAuthVerification from '../hooks/useAuthVerification.ts';

export default function LoginPage() {
	const { isLoading, message } = useAuthVerification();

	return (
		<>
			{isLoading ? (
				<h1 style={{ color: 'black' }}>{message}</h1>
			) : (
				<AuthLayout title="Login" subtitle="Enter Credentials" linkText="Don't have an account?" linkHref="/signup">
					<AuthForm showPathName="login" />
				</AuthLayout>
			)}
		</>
	);
}
