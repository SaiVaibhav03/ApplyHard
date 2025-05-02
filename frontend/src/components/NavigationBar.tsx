import { JSX } from 'react';
import { Link, useLocation, Location } from 'react-router-dom';

function NavigationBar(): JSX.Element {
	const location: Location = useLocation();
	const path: string = location.pathname;
	return (
		<header className="h-1/12 w-screen p-3">
			<nav>
				<ul className="flex justify-center items-center gap-14">
					<Link to="/">Apply Hard</Link>
					<Link to="/">Home</Link>
					{path === '/login' && <Link to="/signup">Signup</Link>}
					{path === '/signup' && <Link to="/login">Login</Link>}
				</ul>
			</nav>
		</header>
	);
}

export default NavigationBar;
