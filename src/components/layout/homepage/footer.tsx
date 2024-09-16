import Link from 'next/link';

import FooterMenu from '../../moleculs/footer-menu';
// import { getMenu } from 'lib/shopify';
import { Suspense } from 'react';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default function Footer() {
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
		<footer className="text-sm text-white bg-teal-500 border-t-2 border-gray-200">
			<div className="mx-auto flex w-full flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm  md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
				<div>
					<Link className="flex items-center gap-2 text-black md:pt-1" href="/">
						{/* <LogoSquare size="sm" /> */}
						<span className="uppercase">{SITE_NAME}</span>
					</Link>
				</div>
				<Suspense
					fallback={
						<div className="flex h-[188px] w-[200px] flex-col gap-2">
							<div className={skeleton} />
							<div className={skeleton} />
							<div className={skeleton} />
							<div className={skeleton} />
							<div className={skeleton} />
							<div className={skeleton} />
						</div>
					}
				>
					<div className='flex flex-col md:w-1/3'>
						<div className="flex text-lg font-bold">
							UPTD Puskesmas Klumbayan Barat
						</div>
						<div>
							Meningkatkan fungsi manajemen Puskesmas dalam upaya meningkatkan kinerja puskesmas sebagai pusat pengembangan, pembinaan dan pelaksanaan upaya kesehatan diwilayah kerja UPTD Puskesmas Klumbayan Barat
						</div>
					</div>
					<div className='flex flex-col md:w-1/4'>
						<div className="flex text-lg font-bold">
							Alamat :
						</div>
						<div>
							Jl. Lintas Barat No. 1 Pekon Lengkukai Kec. Klumbayan Barat, Kab. Tanggamus, Lampung. 
						</div>
					</div>			
					<div className='flex flex-col md:w-1/4'>
						<div className="flex text-lg font-bold">
							Hubungi Kami :
						</div>
						<div>
							Telp : 
						</div>
						<div>
							Email : 
						</div>
					</div>		
					{/* <FooterMenu menu={menu} /> */}
				</Suspense>
				{/* <div className="md:ml-auto">
        </div> */}
			</div>
			<div className="border-t border-neutral-200 py-4 text-sm dark:border-neutral-700">
				<div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
					<p> Copyright
						&copy; {copyrightDate} {copyrightName}
						{copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} Puskesmas Klumbayan Barat.
					</p>
					<hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
				</div>
			</div>
		</footer>
	);
}