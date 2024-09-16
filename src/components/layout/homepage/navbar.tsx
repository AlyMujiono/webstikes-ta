"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import MenuDropDown from "../../moleculs/menudropdown";
import { Image } from "@nextui-org/image";

export default function Navbar({ children }: { children: any }) {
  const [nav, setNav] = useState(false);

  const menus = [
    {
      id: 1,
      link: "Home",
      url: "/",
      dropdown: [],
    },
    {
      id: 2,
      link: "Profil",
      url: "/profil",
      dropdown: [],
    },
    {
      id: 3,
      link: "Informasi",
      dropdown: [
        { title: "Sarana dan Prasarana", link: "/informasi/sarpras" },
        { title: "Jadwal Dokter", link: "/informasi/jadwal_dokter" },
      ],
    },
    {
      id: 4,
      link: "Program",
      dropdown: [
        { title: "P2 (Pengendalian Penyakit)", link: "/program/p2" },
        { title: "PTM (Penyakit Tidak Menular)", link: "/program/ptm" },
        { title: "KIA / KB", link: "/program/kia" },
        { title: "Imunisasi", link: "/program/imusisasi" },
        { title: "Gizi", link: "/program/gizi" },
        { title: "UKS", link: "/program/uks" },
        { title: "Promkes", link: "/program/promkes" },
        { title: "Lansia", link: "/program/lansia" },
        { title: "Kesehatan Jiwa", link: "/program/kesjiw" },
        { title: "Pls - Pk", link: "/program/plspk" },
        { title: "Remaja", link: "/program/remaja" },
      ],
    },
    {
      id: 5,
      link: "Layanan",
      dropdown: [
        { title: "Pengobatan Umum / BP", link: "/layanan/pengobatan" },
        { title: "KIA / KB", link: "/layanan/kia" },
        { title: "MTBS", link: "/layanan/mtbs" },
        { title: "Gigi", link: "/layanan/gigi" },
        { title: "Laboratorium", link: "/layanan/laboratorium" },
        { title: "Konseling", link: "/layanan/konseling" },
        { title: "Apotek", link: "/layanan/apotek" },
        { title: "UGD", link: "/layanan/ugd" },
        { title: "Pendaftaran", link: "/layanan/pendaftaran" },
        { title: "USG", link: "/layanan/usg" },
      ],
    },
    {
      id: 6,
      link: "Berita",
      url: "/berita",
      dropdown: [],
    },
    {
      id: 7,
      link: "Login",
      url: "/login",
      dropdown: [],
    },
  ];
  return (
    <div className="flex flex-col w-screen z-10">
      <div className="flex justify-between items-center w-screen h-20 px-4 text-white bg-white border-b-3 border-teal-500 fixed z-50">
        <div>
          {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
          <h1 className="text-5xl font-signature ml-2">
            <a
              className="link-underline link-underline-black"
              href="/"
              // target="/home"
              // rel="noreferrer"
            >
              <Image
                alt="Puskesmas"
                src="/logo_puskesmas.png"
                radius="none"
                removeWrapper={true}
                width={"100%"}
              />
            </a>
          </h1>
        </div>

        <ul className="hidden md:flex">
          {menus.map(({ id, link, dropdown, url }) => (
            <li
              key={id}
              className="nav-links px-4 cursor-pointer capitalize font-medium text-black hover:scale-105 hover:text-cyan-500 duration-200 link-underline"
            >
              {dropdown.length > 0 ? (
                <MenuDropDown title={link} dropdown={dropdown ?? []} />
              ) : (
                <Link href={url ?? ""}>{link}</Link>
              )}
            </li>
          ))}
        </ul>

        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        {nav && (
          <ul className="flex flex-col justify-center items-center absolute top-12 left-0 w-full h-screen bg-white text-gray-500 pt-2">
            {menus.map(({ id, link, url, dropdown }) => (
              <li
                key={id}
                className="nav-links px-4 cursor-pointer capitalize font-medium text-black hover:scale-105 hover:text-cyan-500 duration-200 link-underline"
              >
                {dropdown.length > 0 ? (
                  <MenuDropDown title={link} dropdown={dropdown} />
                ) : (
                  <Link onClick={() => setNav(!nav)} href={url ?? ""}>
                    {link}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {children}
    </div>
  );
}
