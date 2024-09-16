"use client";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import Navbar from "@/components/layout/homepage/navbar";
import Footer from "@/components/layout/homepage/footer";
import getDataCollection from "@/components/firebase/getDataCollection";
import { toast } from "react-toastify";

export default function P2() {
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
        return el.kategori === 1;
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
          className="flex flex-col items-center md:flex-row bg-gray-100 m-5 p-5 gap-5 rounded-md w-full"
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
          <div className=" flex flex-col  w-full bg-white">
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

  return (
    <div className="flex flex-col w-screen md:w-full">
      <Navbar>
        <main className="flex min-h-screen w-scree flex-col items-center justify-between p-24 bg-white md:w-full">
          <div className="flex flex-col bg-[url('/bg1.png')] m-5 p-5 gap-5 rounded-md w-screen md:w-full">
            <div className=" text-3xl font-bold justify-between items-center text-center w-screen md:w-full">
              {" "}
              P2 (PENGENDALIAN PENYAKIT)
            </div>
            <div className=" text-3xl font-bold justify-between items-center text-center w-screen md:w-full">
              {" "}
              PUSKESMAS KLUMBAYAN BARAT
            </div>
            {renderContent()}
          </div>
        </main>
      </Navbar>
      <Footer />
    </div>
  );
}
