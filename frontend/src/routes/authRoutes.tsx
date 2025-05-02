import { Routes, Route } from 'react-router-dom';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import { JSX } from 'react';

function authRoutes(): JSX.Element {
	return (
		<Routes>
			<Route path="/signup" element={<SignupPage />} />
			<Route path="/login" element={<LoginPage />} />
		</Routes>
	);
}

export default authRoutes;
