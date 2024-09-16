"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/homepage/navbar";
import Footer from "@/components/layout/homepage/footer";
import CustomTable from "@/components/layout/dashboard/CustomTable";
import getDataCollection from "@/components/firebase/getDataCollection";
import { toast } from "react-toastify";

function JadwalDokter() {
  const [section, setSection] = useState(1);
  const [active, setActive] = useState(2);
  const [reload, setReload] = useState(true);
  const [dataDokter, setdataDokter] = useState([]);

  const columns = [
    { name: "No ", uid: "nomor" },
    { name: "Nama Lengkap", uid: "nama" },
    { name: "Spesialis", uid: "spesialis" },
    { name: "Jam", uid: "jamkerja" },
    { name: "Hari", uid: "harikerja" },
    { name: "Status", uid: "statusdokter" },
    { name: "Keterangan", uid: "alasan" },
  ];

  async function getDataDokter() {
    const { result, error } = await getDataCollection("Dokter");
    // let error,result;
    if (error) {
      toast("Error Get Medicine Data !");
      return;
    }
    if (result) {
      setReload(false);
      setdataDokter(result);
      // console.log("result ", result);
    }
  }

  useEffect(() => {
    if (reload) {
      getDataDokter();
    }
  }, [reload]);

  return (
    <div className="flex flex-col w-screen md:w-full">
      <Navbar>
        <main className="flex min-h-screen w-screen flex-col items-center justify-between p-24 bg-white md:w-full">
          <div className="flex flex-col bg-[url('/bg1.png')] m-5 p-5 gap-5 rounded-md w-screen md:w-full">
            <div className=" text-3xl font-bold justify-between items-center text-center w-screen md:w-full">
              {" "}
              JADWAL DOKTER
            </div>
            <div className=" text-3xl font-bold justify-between items-center text-center w-screen md:w-full">
              {" "}
              PUSKESMAS KLUMBAYAN BARAT
            </div>
            <CustomTable
              columns={columns}
              body={dataDokter}
              pagination={dataDokter.length > 10 ? true : false}
            />
          </div>
        </main>
      </Navbar>
      <Footer />
    </div>
  );
}

export default JadwalDokter;
