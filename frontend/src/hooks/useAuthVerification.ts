import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type useAuthVerificationReturn = {
	isLoading: boolean,
	message: string,
}

function useAuthVerification(): useAuthVerificationReturn {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [message, setMessage] = useState<string>('Loading... Please Wait a moment');
	const navigate = useNavigate();

	const VerifyPermission = (): boolean => {
		try {
			// return localStorage.getItem('accessToken') ? true : false;
			return !!localStorage.getItem('accessToken');
		} catch (err) {
			console.error(err);
			setMessage('Enable Cookie and Site Data Permission');
			return false;
		}
	};

	const VerifySession = async (): Promise<void> => {
		try {
			const { data } = await axios.post<{ accessToken: string }>(
				'http://localhost:3000/api/auth/verify-session',
				{},
				{
					withCredentials: true,
				}
			);
			console.log('Session verified:', data.accessToken);
			navigate('/');
		} catch (err) {
			console.log('Error verifying session:', err);
			setMessage('Error Token Please Login with Credentials');
			setIsLoading(false);
		}
	};

	// try for 3 times and then show login page - feature
	useEffect(() => {
		const isPermission: boolean = VerifyPermission();
		if (isPermission) {
			VerifySession();
		} else {
			setIsLoading(false);
		}
	}, []);

	return { isLoading, message };
}

export default useAuthVerification;