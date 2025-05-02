import { JSX } from 'react';
import NavigationBar from '../NavigationBar.tsx';

type AuthLayoutProps = {
	title: string;
	subtitle: string;
	children: React.ReactNode;
	linkText: string;
	linkHref: string;
};

function AuthLayout({ title, subtitle, children, linkText, linkHref }: AuthLayoutProps): JSX.Element {
	return (
		<div className="authLayout">
			<NavigationBar />
			<main className="h-10/12 w-screen">
				<section className="h-full w-full flex flex-row">
					<aside className="h-full w-3/5"></aside>
					<section className="h-full w-2/5 flex flex-col justify-center items-center">
						<h1 className="font-mono text-5xl my-2">{title}</h1>
						<p className="my-2">{subtitle}</p>
						{children}
						<p>
							{linkText}
							<a href={linkHref} className="bg-transparent border-0 text-blue-500 pl-1">
								{linkHref === '/signup' ? 'Sign up' : 'Login'}
							</a>
						</p>
					</section>
				</section>
			</main>
		</div>
	);
}

export default AuthLayout;
