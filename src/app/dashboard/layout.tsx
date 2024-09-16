"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import React from "react";
import FooterDB from "@/components/layout/dashboard/Footer";
import { AuthContextProvider } from "@/components/firebase/AuthContext";
import { Image } from "@nextui-org/image";
import getDataCollection from "@/components/firebase/getDataCollection";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/components/firebase/config";
import { AiOutlineDashboard } from "react-icons/ai";
import { toast } from "react-toastify";

const auth = getAuth(firebase_app);

export default function LayoutDB({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [menuNavbar, setmenuNavbar] = useState<any>();
  const pathname = usePathname();
  const [reload, setReload] = useState(true);
  const [dataAccount, setdataAccount] = useState([]);
  const [currentUser, setcurrentUser] = useState<any>();

  const logOut = useCallback(() => {
    return router.push("/dashboard/logout");
  }, [router]);

  async function getDataRole() {
    const { result, error } = await getDataCollection("Role");
    if (error) {
      toast("Error Get Role Data !");
      return;
    }
    if (result) {
      setReload(false);
      setdataAccount(result);
    }
  }

  useEffect(() => {
    if (reload) {
      getDataRole();
    }
  }, [reload]);

  const userCheck = useCallback(
    async (user: { email: any }) => {
      let search: any = dataAccount.find((data: any) => {
        return user?.email === data?.email;
      });
      setcurrentUser(search);
    },
    [dataAccount]
  );

  const roleCheck = useCallback(
    async (user: any) => {
      const menuItemsAdmin = [
        {
          href: "/dashboard/beranda",
          title: "Beranda",
        },
        {
          href: "/dashboard/pendaftaran",
          title: "Pendaftaran",
        },
        {
          href: "/dashboard/manajemen",
          title: "Manajemen",
          items: [
            { title: "Pasien", href: "/dashboard/manajemen/pasien" },
            { title: "Obat", href: "/dashboard/manajemen/inventori/obat" },
            {
              title: "Peralatan Kesehatan",
              href: "/dashboard/manajemen/inventori/alkes",
            },
            { title: "Rekam Medis", href: "/dashboard/manajemen/rekamMedis" },
            { title: "Dokter", href: "/dashboard/manajemen/dokter" },
            { title: "Pegawai", href: "/dashboard/manajemen/pegawai" },
            {
              title: "Informasi Kesehatan",
              href: "/dashboard/manajemen/info_kes",
            },
          ],
        },
        {
          href: "/dashboard/account",
          title: "Akun",
          items: [
            { title: "profile", href: "/dashboard/account/profile" },
            {
              title: "manage account",
              href: "/dashboard/account/manageaccount",
            },
          ],
        },
        {
          action: () => logOut(),
          href: "/login",
          title: "Logout",
        },
      ];
      const menuItems = [
        {
          href: "/dashboard/beranda",
          title: "Beranda",
        },
        {
          href: "/dashboard/pendaftaran",
          title: "Pendaftaran",
        },
        {
          href: "/dashboard/manajemen",
          title: "Manajemen",
          items: [
            { title: "Pasien", href: "/dashboard/manajemen/pasien" },
            { title: "Obat", href: "/dashboard/manajemen/inventori/obat" },
            {
              title: "Peralatan Kesehatan",
              href: "/dashboard/manajemen/inventori/alkes",
            },
            { title: "Rekam Medis", href: "/dashboard/manajemen/rekamMedis" },
            { title: "Dokter", href: "/dashboard/manajemen/dokter" },
            { title: "Pegawai", href: "/dashboard/manajemen/pegawai" },
            {
              title: "Informasi Kesehatan",
              href: "/dashboard/manajemen/info_kes",
            },
          ],
        },
        {
          href: "/dashboard/account",
          title: "Akun",
          items: [{ title: "profile", href: "/dashboard/account/profile" }],
        },
        {
          action: () => logOut(),
          href: "/login",
          title: "Logout",
        },
      ];

      const { result, error } = await getDataCollection("Role");
      let search = result?.find((data: any) => {
        return user?.email === data?.email;
      });
      if (search?.role === 0) {
        setmenuNavbar(menuItemsAdmin);
      } else if (search?.role === 1) {
        setmenuNavbar(menuItems);
      } else if (search?.role === 2) {
        setmenuNavbar(menuItems);
      } else {
        toast("User Not Found");
        return logOut();
      }
    },
    [logOut]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        userCheck(user);
        roleCheck(user);
      }
      // if (reload) {
      //   if (user) {
      //     userCheck(user);
      //   }
      // }
    });

    return () => unsubscribe();
  }, [roleCheck, userCheck]);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       roleCheck(user);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [roleCheck]);

  return (
    <AuthContextProvider>
      <div className="min-h-screen flex flex-col">
        <div className="bg-toscadb h-[8vh] flex items-center font-semibold uppercase justify-between ">
          <div className="w-60 bg-white h-14 pl-2 py-4">
            <Image
              alt="Puskesmas"
              src="/logo_puskesmas.png"
              radius="none"
              removeWrapper={true}
              width={"100%"}
            />
          </div>
          <div className="text-center font-bold text-white w-full pr-1">
            {currentUser?.role === 0
              ? "Super Admin"
              : currentUser?.role === 1
              ? "Dokter"
              : "Pegawai"}
          </div>
          <div className="pr-5">
            {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
            <h1 className="text-sm font-signature ml-2">
              <a
                className="link-underline link-underline-black text-white justify-item-center justify-between"
                href="/"
                // target="/home"
                // rel="noreferrer"
              >
                <AiOutlineDashboard size={28} color="white" />
                Home
              </a>
            </h1>
          </div>
        </div>
        <div className="flex flex-col md:flex-row flex-1">
          <aside className="bg-white w-full md:w-60 md:block sm:block hidden">
            <nav>
              <ul>
                {menuNavbar?.map(
                  ({
                    href,
                    title,
                    items,
                    action,
                  }: {
                    href: string;
                    title: string;
                    items: [];
                    action?: () => void;
                  }) => (
                    <li className="m-2" key={title}>
                      {items?.length !== undefined && items.length > 0 ? (
                        <Accordion
                          motionProps={{
                            variants: {
                              enter: {
                                y: 0,
                                opacity: 1,
                                height: "auto",
                                transition: {
                                  height: {
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                    duration: 1,
                                  },
                                  opacity: {
                                    easings: "ease",
                                    duration: 1,
                                  },
                                },
                              },
                              exit: {
                                y: -10,
                                opacity: 0,
                                height: 0,
                                transition: {
                                  height: {
                                    easings: "ease",
                                    duration: 0.25,
                                  },
                                  opacity: {
                                    easings: "ease",
                                    duration: 0.3,
                                  },
                                },
                              },
                            },
                          }}
                        >
                          <AccordionItem
													classNames={{base:'light'}}
                            key={title}
                            aria-label="Accordion 1"
                            title={title}
                          >
                            <div className="flex flex-col gap-3 pl-3">
                              {items.map((data: any, index) => (
                                <Link
                                  key={data?.href}
                                  href={data?.href}
                                  className={`flex p-2 capitalize rounded text-gray-700 hover:bg-cyan-100 cursor-pointer ${
                                    pathname === data.href
                                      ? "text-black bg-cyan-400"
                                      : "bg-white"
                                  }`}
                                >
                                  {data.title}
                                </Link>
                              ))}
                            </div>
                          </AccordionItem>
                        </Accordion>
                      ) : action !== undefined ? (
                        <Button
                          onClick={() => action()}
                          size="lg"
                          className={`flex p-2  w-full justify-start rounded text-gray-700 hover:bg-cyan-100 cursor-pointer ${
                            pathname === href
                              ? "text-black bg-cyan-400"
                              : "bg-white"
                          }`}
                        >
                          {title}
                        </Button>
                      ) : (
                        <Link
                          href={href}
                          className={`flex p-2  rounded text-gray-700 hover:bg-cyan-100 cursor-pointer ${
                            pathname === href
                              ? "text-black bg-cyan-400"
                              : "bg-white"
                          }`}
                        >
                          {title}
                        </Link>
                      )}
                    </li>
                  )
                )}
              </ul>
            </nav>
          </aside>
          <div className="flex-1 bg-gray-200">{children}</div>
          {/* <main className="flex-1">{children}</main> */}
        </div>
      </div>
    </AuthContextProvider>
  );
}
