import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function useAuthVerification() {
	const [isLoading, setIsLoading] = useState(true);
	const [message, setMessage] = useState('Loading... Please Wait a moment');
	const navigate = useNavigate();

	const VerifyPermission = () => {
		try {
			// we can write line of code like this to get boolean values
			// return localStorage.getItem('accessToken') ? true : false;
			return !!localStorage.getItem('accessToken');
		} catch (err) {
			console.log(err);
			setMessage('Enable Cookie and Site Data Permission');
			return false;
		}
	};

	const VerifySession = async () => {
		try {
			const response = await axios.post(
				'http://localhost:3000/api/auth/verify-session',
				{},
				{
					withCredentials: true,
				}
			);
			console.log('Session verified:', response.data);
			navigate('/');
		} catch (err) {
			console.log('Error verifying session:', err);
			setMessage('Error Token Please Login with Credentials');
			setIsLoading(false);
		}
	};

	// try for 3 times and then show login page - feature
	useEffect(() => {
		const isPermission = VerifyPermission();
		if (isPermission) {
			VerifySession();
		} else {
			setIsLoading(false);
		}
	}, []);

	return { isLoading, message };
}

export default useAuthVerification;