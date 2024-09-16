import Link from 'next/link';

import FooterMenu from '../../moleculs/footer-menu';
// import { getMenu } from 'lib/shopify';
import { Suspense } from 'react';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default function FooterDB() {
	const currentYear = new Date().getFullYear();
	const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
	const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
	const menu = [{
		title: "Home",
		path: "/",
	},
	];
	const copyrightName = COMPANY_NAME || SITE_NAME || '';

	return (
		<footer className="text-sm text-black bg-white fixed bottom-0 w-full z-50">
			<div className="py-4 text-sm flex justify-center">
				<div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
					<p className='ml-8'> Copyright
						&copy; {copyrightDate} {copyrightName}
						{copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} Puskesmas Klumbayan Barat.
					</p>
					<hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
				</div>
			</div>
		</footer>
	);
}