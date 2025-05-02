import { JSX } from 'react';
import AuthForm from '../components/AuthForm';
import AuthLayout from '../components/layout/AuthLayout';
import useAuthVerification from '../hooks/useAuthVerification';

export default function LoginPage(): JSX.Element {
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
