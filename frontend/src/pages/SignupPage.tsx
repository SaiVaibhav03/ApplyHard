import { JSX } from 'react';
import AuthForm from '../components/AuthForm';
import AuthLayout from '../components/layout/AuthLayout';
import useAuthVerification from '../hooks/useAuthVerification';

export default function SignupPage(): JSX.Element {
	const { isLoading, message } = useAuthVerification();

	return (
		<>
			{isLoading ? (
				<h1 style={{ color: 'black' }}>{message}</h1>
			) : (
				<AuthLayout
					title="Signup"
					subtitle="Create a new account"
					linkText="Already have an account?"
					linkHref="/login"
				>
					<AuthForm showPathName="signup" />
				</AuthLayout>
			)}
		</>
	);
}
