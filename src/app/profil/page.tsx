'use client'
import { useEffect, useState } from 'react'
import { Tabs, Tab, Card, CardBody, CardHeader, Image, CardFooter, Button } from "@nextui-org/react";
import { GoCheckCircleFill } from "react-icons/go";
import { AutoSizer, Grid, List } from 'react-virtualized';
import Navbar from '@/components/layout/homepage/navbar'
import Footer from '@/components/layout/homepage/footer'
import { PlusIcon } from '@heroicons/react/20/solid';
import CustomTable from '@/components/layout/dashboard/CustomTable';
import { FaBookmark } from "react-icons/fa6";
import { IoCalendar, IoStar } from "react-icons/io5";

export default function Profil() {
	const [section, setSection] = useState(1);

	const [active, setActive] = useState(2);
	const columns = [
		{ name: "No ", uid: "nomor" },
		{ name: "Nama", uid: "names" },
		{ name: "Jabatan", uid: "position" },
	];

	const body = [
		{ id: 1, nomor: 1, name: " SETIAWAN, S.ST ", position: " Kepala UPT Puskesmas " },
		{ id: 2, nomor: 2, name: " Ns. ERVANI ZUHELDI, S.Kep ", position: " Perawat " },
		{ id: 3, nomor: 3, name: " VARIA MEGASARI,S.ST.,M.Kes. ", position: " Bidan " },
		{ id: 4, nomor: 4, name: " AGUS SUPRIYANTO,S.Kep. ", position: " Perawat " },
		{ id: 5, nomor: 5, name: " Ns. APRIANI SANTIKA,S.Kep. ", position: " Perawat " },
		{ id: 6, nomor: 6, name: " EKA RENI SUGIANTO,AMd.KG ", position: " Perawat Gigi " },
		{ id: 7, nomor: 7, name: " dr. NENG AYU RATI PURWANI ", position: " Dokter Umum " },
		{ id: 8, nomor: 8, name: " SITI JUHAERIYAH,S.Kep ", position: " Perawat " },
		{ id: 9, nomor: 9, name: " WIDIATI, A.Md.Keb ", position: " ASN Bidan Desa " },
		{ id: 10, nomor: 10, name: " DADAN YUSIPTA, AMd. Keb ", position: " ASN Bidan Desa " },
		{ id: 11, nomor: 11, name: "	TRI AYU WULANDARI, A.Md.Keb ", position: " ASN Bidan Desa " },
		{ id: 12, nomor: 12, name: "	RATIH DEWI SAKINAH, A.Md.Keb ", position: "	ASN Bidan Desa " },
		{ id: 13, nomor: 13, name: "	MUHAMMAD NURUL ZIKRI, A.Md.Kep ", position: " Perawat " },
		{ id: 14, nomor: 14, name: "	SENDI OKYANTO, A.Md.Kep	", position: " Perawat " },
		{ id: 15, nomor: 15, name: "	IKKE REMA FIRJANAH, A.Md.Kep ", position: " Perawat " },
		{ id: 16, nomor: 16, name: "	RATIH RATNIATIH, A,Md.Gz ", position: " Gizi	" },
		{ id: 17, nomor: 17, name: "	RIDA WATI, A.Md.Keb ", position: " Bidan " },
		{ id: 18, nomor: 18, name: "	NEVITA WIDIARTI, A.Md Keb ", position: " Bidan " },
		{ id: 19, nomor: 19, name: "	NOVIA HERLINA, A.Md Kep	", position: " Perawat " },
		{ id: 20, nomor: 20, name: "	RINI OKTAVIA, A.Md.KL	", position: " Sanitarian " },
		{ id: 21, nomor: 21, name: "	apt.Tri Yuni Semdu Gultom, S.Farm ", position: " Apoteker " },
		{ id: 22, nomor: 22, name: "	Ishaini Larasati, A.Md.AK ", position: " Analis " },
		{ id: 23, nomor: 23, name: "	dr. RENI FRISKA MEGAWATI, M.M ", position: " Dokter Umum " },
		{ id: 24, nomor: 24, name: "	dr. EKA SANDRA AMELIA	", position: " Dokter Umum " },
		{ id: 25, nomor: 25, name: "	PISTA LAMINALIA, A.Md.Keb ", position: " Bidan " },
		{ id: 26, nomor: 26, name: "	VINA MAESA, A.Md.Keb ", position: "	Bidan " },
		{ id: 27, nomor: 27, name: "	LEDYA SHOFA, A.Md.Keb ", position: " Bidan " },
		{ id: 28, nomor: 28, name: "	LISA INDIYANI, A.Md.Keb	", position: " Bidan" },
		{ id: 29, nomor: 29, name: "	Ns. CECEP KUSWANTO, S.Kep ", position: " Perawat " },
		{ id: 30, nomor: 30, name: "	MIRDA NOVIYAN ROSADHI, S.Kep ", position: " Perawat " },
		{ id: 31, nomor: 31, name: "	LAMI ROSIANI, A.Md.Keb ", position: " Bidan " },
		{ id: 32, nomor: 32, name: "	EKA ROLINA, A.Md.Kes ", position: "	Perawat Gigi " },
		{ id: 33, nomor: 33, name: "	EVI SUSANTI, A.Md.Keb ", position: " Bidan " },
		{ id: 34, nomor: 34, name: "	Ns. SRI MURNI, S.Kep ", position: "	Perawat	" },
		{ id: 35, nomor: 35, name: "	ANA MARHAYATI, A.Md.Kep	", position: " Perawat " },
		{ id: 36, nomor: 36, name: "	RAGA SETIALI, A.Md.Kep ", position: " Perawat " },
		{ id: 37, nomor: 37, name: "	AYU ANGGERAINI, STR.Keb ", position: " Bidan " },
		{ id: 38, nomor: 38, name: "	YOVI MAYANGSARI, STR.Keb ", position: " Bidan " },
		{ id: 39, nomor: 39, name: "	ANA SULISTIAWATI, A.Md.Keb ", position: " Bidan " },
		{ id: 40, nomor: 40, name: "	ROHATI, A.Md.Keb ", position: " Bidan " },
		{ id: 41, nomor: 41, name: "	SUHERMAN, S.Pd.I ", position: " Driver Ambulance " },
		{ id: 42, nomor: 42, name: "	CAHYO PURWOKO, A.Md ", position: " Pranata Komputer " },
		{ id: 43, nomor: 43, name: "	ICHA YULIANA ", position: "	Cleaning Service " },
		{ id: 44, nomor: 44, name: "	SUBANA ", position: " Penjaga Kantor " },
		{ id: 45, nomor: 45, name: "	RAMSINAH ", position: " Juru Masak " },
		{ id: 46, nomor: 46, name: "	Yeyen Sutanti, A.Md.Keb	", position: " Bidan " },
		{ id: 47, nomor: 47, name: "	TUSYANI, A.Md.KL ", position: " Sanitarian " },
		{ id: 48, nomor: 48, name: "	Halimatussadiyah, A.Md.Keb ", position: " Bidan " },
		{ id: 49, nomor: 49, name: "	Andi Putra ", position: " Perawat " },
		{ id: 50, nomor: 50, name: "	Novada Irma Lestari, A.Md.Keb ", position: " Bidan " },
		{ id: 51, nomor: 51, name: "	Siti Khotimah ", position: " Cleaning Service " },
	];

	const columns1 = [
		{ name: "No ", uid: "nomor" },
		{ name: "Kategori", uid: "names" },
		{ name: "Total", uid: "amount" },
	];

	const body1 = [
		{ id: 1, nomor: 1, name: "Pegawai PNS ", amount: " 20 Orang " },
		{ id: 2, nomor: 2, name: " Pegawai Nusantara Sehat", amount: " 2 Orang " },
		{ id: 3, nomor: 3, name: " Pegawai Tidak Tetap ", amount: " 2 Orang " },
		{ id: 4, nomor: 4, name: " Pegawai Tenaga Honor Non PNSD ", amount: " 21 Orang " },
		{ id: 5, nomor: 5, name: " Tenaga Kerja BLUD ", amount: "6 Orang " },
	];

	return (
		<div className="flex w-screen flex-col md:w-full">
			<Navbar>
				<main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white w-full">
					<div className="flex justify-center w-full mx-10 min-h-fit">
						<div className='flex justify-start items-start w-full'>
							<Image
								alt="Login"
								src={section === 1 ? "/profil_01.jpg" : section === 2 ? "/logo_puskesmas.png" : "/logopuskesmas.png"}
								radius="none"
								removeWrapper={true}
								width={"100%"}
								height={"100%"}
							/>
						</div>
					</div>
					<div className='flex flex-col bg-gray-100 rounded-md justify-between items-center text-center px-2 p-4'>
						<div className=' text-3xl font-bold '> PUSKESMAS KLUMBAYAN BARAT</div>
						UPT Puskesmas Kelumbayan Barat merupakan suatu organisasi unit kerja di bawah naungan Instansi Dinas Kesehatan Kabupaten Tanggamus, berada didaerah yang jauh ujung bagian Timur dari Kabupaten Tanggamus berbatasan langsung dengan Kabupaten Pesawaran Provinsi Lampung, dengan jangkauan perjalanan 4-5 jam dari Ibu kota Kabupaten Tanggamus. Tepatnya di Dusun Jatiringin Pekon Lengkukai Kecamatan Kelumbayan Barat Kabupaten Tanggamus. UPT Puskesmas Kelumbayan Barat tepatnya terletak pada koordinat S 05 39 635 dan E 105 03 054. Puskesmas ini didirikan pada tahun 2009 dan mulai beroperasi pada bulan Februari 2010 di dusun Rejosari Pekon Lengkukai dengan status Puskesmas Rawat Jalan.
					</div>
					<div className="flex justify-around w-full h-20v gap-4 md:gap-0 mb-10 md:mb-0">
						<div className="flex flex-col gap-2 md:flex-row items-center md:gap-5">
							<div className='flex bg-green-700 p-4 rounded-lg justify-center'><IoStar  size={28} color="white" /></div>
							<div>
								<div className="font-bold text-black">Akreditasi Puskesmas</div>
								<div>Madya</div>
							</div>
						</div>
						<div className="flex flex-col gap-2 md:flex-row items-center md:gap-5">
							<div className='flex bg-green-700 p-4 rounded-lg justify-center'><IoCalendar  size={28} color="white" /></div>
							<div>
								<div className="font-bold text-black">jadwal Puskesmas</div>
								<div>Hari : Senin - Sabtu</div>
								<div>Pukul : 08.00 - 14.30 WIB</div>
							</div>
						</div>
						<div className="flex flex-col gap-2 md:flex-row items-center md:gap-5">
							<div className='flex bg-green-700 p-4 rounded-lg justify-center'><FaBookmark size={28} color="white" /></div>
							<div>
								
								<div className="font-bold text-black">Surat Registrasi</div>
								<div>1234567890</div>
							</div>
						</div>
					</div>
					<div className='flex flex-row p-3  m-3 bg-green-700 text-white rounded-md w-full' >
						<div className='flex flex-col w-1/2 justify-between items-center text-center border-white border-x-2 px-2 p-4'>
							<div className='font-bold'>Visi</div>
							Menjadikan Kabupaten Tanggamus Yang Tangguh, Agamis, Mandiri dan Sejahtera
						</div>
						<div className='flex flex-col w-1/2 justify-between items-center text-center border-white border-x-2 px-2 p-3'>
							<div className='flex font-bold'>Misi</div>
							Mewujudkan sumber daya manusia yang sehat, cerdas, unggul, berkarakter dan berdaya saing
						</div>
					</div>
					<div className='flex flex-col rounded-md justify-between items-center text-center px-2 p-4'>
						<div className='flex font-bold text-5x1'>STRUKTUR ORGANISASI</div>
						<div className='flex font-bold text-lg'>UPTD Puskesmas Klumbayan Barat</div>
					</div>
					<div className="flex flex-col p-6 w-screen md:w-3/4">
						<div className="flex flex-col p-6 rounded-md w-full h-full ">
							<CustomTable columns={columns} body={body} />
						</div>
					</div>
					{/* <div className="flex flex-col p-6 w-screen md:w-3/4">
						<div className='flex font-bold text-md'> Jumlah Pegawai dan Tenaga Kerja</div>
						<div className="flex flex-col p-6  rounded-md w-full h-full ">
							<CustomTable columns={columns1} body={body1} />
						</div>
					</div> */}
				</main>
			</Navbar>
			<Footer />
		</div>
	)
}
