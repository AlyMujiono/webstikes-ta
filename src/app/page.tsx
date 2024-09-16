"use client";
import { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Image,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { GoCheckCircleFill } from "react-icons/go";
import { AutoSizer, Grid, List } from "react-virtualized";
import Navbar from "@/components/layout/homepage/navbar";
import Footer from "@/components/layout/homepage/footer";
import { FaBookmark } from "react-icons/fa6";
import { IoCalendar, IoStar } from "react-icons/io5";
import { PlusIcon } from "@heroicons/react/20/solid";
import CustomTable from "@/components/layout/dashboard/CustomTable";
import getDataCollection from "@/components/firebase/getDataCollection";
import { toast } from "react-toastify";

export default function Home() {
  const [section, setSection] = useState(1);
  const [dataContent, setdataContent] = useState<any>([]);

  async function getDataContent() {
    const { result, error } = await getDataCollection("Content");
    if (error) {
      toast("Error Get Content Data !");
      return;
    }
    if (result) {
      var selfContent = result.filter(function (el: any) {
        return el.kategori === 9;
      });
      setdataContent(selfContent);
      console.log("filter content ", selfContent);
    }
  }
  useEffect(() => {
    getDataContent();
  }, []);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function renderContent() {
    return dataContent?.map((data: any) => {
      return (
        <div
          className="flex flex-row bg-gray-100 m-5 p-5 gap-5 rounded-md"
          key={data.id}
        >
          <div className=" text-3xl font-bold justify-between items-center text-center w-1/3 ">
            <Image
              alt="Login"
              src={data.foto !== "" ? data.foto : "/logopuskesmas.png"}
              radius="none"
              removeWrapper={true}
              width={"100%"}
              height={"100%"}
            />
          </div>
          <div className=" flex flex-col  w-screen bg-white">
            <div className="flex font-bold text-3x1 p-3">{data.judul}</div>
            <div className="flex text-2x1 border-b-2 border-gray-300 p-3 h-1/2">
              {data.deskripsi}
            </div>
            <div className="flex text-3x1 border-b-2 border-gray-300 p-3">
              Tanggal Update{" "}
              {data?.update_at?.toDate().toLocaleDateString("id", options)}
            </div>
          </div>
        </div>
      );
    });
  }

  // const list = [
  // 	['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125 /* ... */],
  // 	// And so on...
  // ];
  // function cellRenderer({ columnIndex, key, rowIndex, style }) {
  // 	return (
  // 		<div key={key} style={style}>
  // 			{list[rowIndex][columnIndex]}
  // 		</div>
  // 	);
  // }

  return (
    <div className="flex flex-col">
      <Navbar>
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
          <div className="flex justify-center w-screen mx-10 min-h-fit">
            <div className="flex justify-start items-start w-[45vw]">
              <Image
                alt="Login"
                src={
                  section === 1
                    ? "/puskes.png"
                    : section === 2
                    ? "/logo_puskesmas.png"
                    : "/logopuskesmas.png"
                }
                radius="none"
                removeWrapper={true}
                width={"100%"}
                height={"100%"}
              />
            </div>
          </div>
          <div className="flex py-6 text-3xl font-bold ">
            {" "}
            PUSKESMAS KLUMBAYAN BARAT
          </div>
          <div className="flex gap-2 mb-5 md:mb-5 justify-around w-screen px-4">
            <div className="flex flex-col md:flex-row items-center gap-5">
              <div className="flex bg-green-700 p-4 rounded-lg justify-center">
                <IoStar size={28} color="white" />
              </div>
              <div>
                <div className="font-bold text-black">Akreditasi Puskesmas</div>
                <div>Madya</div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-5">
              <div className="flex bg-green-700 p-4 rounded-lg justify-center">
                <IoCalendar size={28} color="white" />
              </div>
              <div>
                <div className="font-bold text-black">jadwal Puskesmas</div>
                <div>Hari : Senin - Sabtu</div>
                <div>Pukul : 08.00 - 14.30 WIB</div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-5">
              <div className="flex bg-green-700 p-4 rounded-lg justify-center">
                <FaBookmark size={28} color="white" />
              </div>
              <div>
                <div className="font-bold text-black">Surat Registrasi</div>
                <div>1234567890</div>
              </div>
            </div>
          </div>
          <div>
            <Tabs
              aria-label="Options"
              classNames={{
								base:'flex w-screen',
                tabList: "justify-center bg-green-700 w-screen px-2 text-white",
                tab: "flex w-screen px-0 bg-white ",
                tabContent:
                  "group-data-[selected=true]:text-[#06b6d4] bg-white group-data-[selected=true]:bg-white max-w-[40vw] flex w-full text-black ",
								panel:'flex w-screen max-w-[100vw]',
								cursor:'bg-white dark:bg-white'
              }}
              fullWidth={true}
            >
              <Tab
                key="photos"
                title={<p className="py-5 px-2 w-full text-clip overflow-auto ">Jadwal Layanan Puskesmas</p>}
								className="flex w-screen"
              >
                <div className="flex flex-row w-screen  max-w-[100vw]	">
                  <div className="flex w-1/2 ">
                    <Image
                      alt="Login"
                      src={"./jadwal-01.png"}
                      radius="none"
                      removeWrapper={true}
                      width={"100%"}
                      height={"100%"}
                    />
                  </div>
                  <div className="flex flex-col gap-10 w-[48%]">
                    <div className="text-lg font-bold border-y-2 border-black">
                      Jadwal Layanan
                    </div>
                    <div className="flex flex-row ">
                      <GoCheckCircleFill size={30} color="green" />
                      <div className="">
                        <div className="font-bold text-lg">Pelayanan CATIN</div>
                        <div className="">
                          Senin, Rabu, Jumat dan Sabtu 07.00 s.d 12.00
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row ">
                      <GoCheckCircleFill size={30} color="green" />
                      <div className="">
                        <div className="font-bold text-lg">Pelayanan CATIN</div>
                        <div className="">
                          Senin, Rabu, Jumat dan Sabtu 07.00 s.d 12.00
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row ">
                      <GoCheckCircleFill size={30} color="green" />
                      <div className="">
                        <div className="font-bold text-lg">Pelayanan CATIN</div>
                        <div className="">
                          Senin, Rabu, Jumat dan Sabtu 07.00 s.d 12.00
                        </div>
                      </div>
                    </div>
                    <div className="flex w-screen justify-end">
                      {/* <div className="p-5 bg-gray-200 mr-44 text-black">
                        Jadwal Lainnya
                      </div> */}
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab
                key="music"
                title={<p className="py-5 px-2 w-full text-clip overflow-auto  ">Layanan luar Gedung</p>}
								className="flex w-screen bg-white"
              >
                <div className="flex flex-row w-screen  max-w-[100vw]	">
                  <div className="flex w-1/2 max-w-fit">
                    <Image
                      alt="Login"
                      src={"./layanan2-01.png"}
                      radius="none"
                      removeWrapper={true}
                      width={"100%"}
                      height={"100%"}
                    />
                  </div>
                  <div className="flex flex-col gap-10 w-1/2">
                    <div className="text-lg font-bold border-y-2 border-black">
                      Jadwal Layanan
                    </div>
                    <div className="flex flex-row ">
                      <GoCheckCircleFill size={30} color="green" />
                      <div className="">
                        <div className="font-bold text-lg">
                          Data belum Di Input
                        </div>
                        {/* <div className="w-64">Senin, Rabu, Jumat dan Sabtu 07.00 s.d 12.00</div> */}
                      </div>
                    </div>
                    <div className="flex w-screen justify-end">
                      {/* <div className="p-5 bg-gray-200 mr-44 text-black">
                        Jadwal Lainnya
                      </div> */}
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
            <div className="flex flex-col w-screen">
              <div className="flex w-screen justify-center text-white bg-green-700 py-5 font-bold text-xl">
                Berita Puskesmas
              </div>
              {renderContent()}
            </div>
          </div>
        </main>
      </Navbar>
      <Footer />
    </div>
  );
}
