"use client";
import getDataCollection from "@/components/firebase/getDataCollection";
import CustomTable from "@/components/layout/dashboard/CustomTable";
import CustomTablePagination from "@/components/layout/dashboard/CustomTablePagination";
import FooterDB from "@/components/layout/dashboard/Footer";
import { Button, Input } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { SearchIcon } from "@/components/assets/SearchIcon";

function RekamMedisDB() {
  const [active, setActive] = useState(2);
  const [reload, setReload] = useState(true);
  const [dataPasien, setDataPasien] = useState([]);
  const [show, setShow] = useState(false);
  const [chooseData, setChooseData] = useState<any>();
  const [dataSortedPegawai, setdataSortedPegawai] = useState<any>([]);
  const [search, setsearch] = useState<any>("");
  const [dataSortedPasien, setdataSortedPasien] = useState<any>([]);

  const columns = [
    { name: "No. Rekam Medis", uid: "nrk" },
    { name: "Name", uid: "nama" },
    { name: "No. BPJS", uid: "bpjs" },
    { name: "Jenis Kelamin", uid: "gender" },
    { name: "Status", uid: "statusPasien" },
    { name: "Aksi", uid: "antrianRekamMedis" },
  ];

  async function getDataPasiens() {
    const { result, error } = await getDataCollection("Pasien");
    if (error) {
      toast("Error Get Medicine Data !");
      return;
    }
    if (result) {
      setReload(false);
      setDataPasien(result);
      setdataSortedPasien(result);
    }
  }

  useEffect(() => {
    if (reload) {
      getDataPasiens();
    }
  }, [reload]);

  const sortedSearch = useMemo(() => {
    let sortData = dataPasien
      .filter((data: any) => {
        return data.nama.toLowerCase().includes(search.toLowerCase());
      })
      .sort((a: any, b: any) => {
        if (
          a.nama.toLowerCase().indexOf(search.toLowerCase()) >
          b.nama.toLowerCase().indexOf(search.toLowerCase())
        ) {
          return 1;
        } else if (
          a.nama.toLowerCase().indexOf(search.toLowerCase()) <
          b.nama.toLowerCase().indexOf(search.toLowerCase())
        ) {
          return -1;
        } else {
          if (a.nama > b.nama) return 1;
          else return -1;
        }
      });

    setdataSortedPasien(sortData);
  }, [dataPasien, search]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between px-4 bg-white py-5">
        <div className="flex text-gray-500 font-semibold">
          <p>Manajemen Rekam Medis</p>
        </div>
        <div className="flex gap-4">
          <div>Sikes</div>
          <div>/</div>
          <div>Manajemen</div>
          <div>/</div>
          <div className="text-toscadb">Rekam Medis</div>
        </div>
      </div>
      <div className="flex flex-col bg-white m-5 p-5 gap-5">
        <div>DATA REKAM MEDIS</div>
        <div className="py-4 ">
          <div className="w-80 h-20 px-8 rounded-2xl flex justify-center items-centershadow-lg">
            <Input
              isClearable
              radius="lg"
              labelPlacement="outside"
              value={search}
              onValueChange={setsearch}
              classNames={{
                label: "text-black/50 dark:text-white/90",
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "shadow-xl",
                  "bg-default-200/50",
                  "dark:bg-default/60",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/70",
                  "dark:hover:bg-default/70",
                  "group-data-[focused=true]:bg-default-200/50",
                  "dark:group-data-[focused=true]:bg-default/60",
                  "!cursor-text",
                ],
              }}
              placeholder="Type to search..."
              startContent={
                <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>
          {/* <CustomTablePagination /> */}
        </div>
        <div className="py-4">
          <CustomTable
            columns={columns}
            body={dataSortedPasien}
            pagination={dataSortedPasien.length > 10 ? true : false}
            isLoading={reload}
          />
          {/* <CustomTablePagination /> */}
        </div>
      </div>
      <FooterDB />
    </div>
  );
}

export default RekamMedisDB;
