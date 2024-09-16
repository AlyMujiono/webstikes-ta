'use client'
import { useEffect, useState } from 'react'
import { Tabs, Tab, Card, CardBody, CardHeader, Image, CardFooter, Button } from "@nextui-org/react";
import { GoCheckCircleFill } from "react-icons/go";
import { AutoSizer, Grid, List } from 'react-virtualized';
import Navbar from '@/components/layout/homepage/navbar'
import Footer from '@/components/layout/homepage/footer'
import { PlusIcon } from '@heroicons/react/20/solid';
import CustomTable from '@/components/layout/dashboard/CustomTable';

export default function TentangKami() {
    const [section, setSection] = useState(1);

    return (
        <div>
            <Navbar>
                <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white ">
                <div className="flex flex-col bg-[url('/bg1.png')] m-5 p-5 gap-5 rounded-md w-full ">
                        <div className=' text-3xl font-bold justify-between items-center text-center w-full'> TENTANG KAMI</div>
                        <div className=' text-3xl font-bold justify-between items-center text-center w-full'> PUSKESMAS KLUMBAYAN BARAT</div>
                        <div className="flex flex-row bg-gray-100 m-5 p-5 gap-5 rounded-md w-full ">
                            <div className=' text-3xl font-bold justify-between items-center text-center w-1/3 '>
                                <Image
                                    alt="Login"
                                    src={section === 1 ? "/puskes.png" : section === 2 ? "/logo_puskesmas.png" : "/logopuskesmas.png"}
                                    radius="none"
                                    removeWrapper={true}
                                    width={"100%"}
                                    height={"100%"}
                                />
                            </div>
                            <div className=' flex flex-col  w-full bg-white'>
                                <div className='flex font-bold text-3x1 p-3'>Judul</div>
                                <div className='flex text-2x1 border-b-2 border-gray-300 p-3 h-1/2'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </div>
                                <div className='flex text-3x1 border-b-2 border-gray-300 p-3'>Tanggal Update</div>
                            </div>
                        </div>
                    </div>
                </main>
            </Navbar>
            <Footer />
        </div>
    )
}
