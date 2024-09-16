"use client";
import React, { useCallback, useEffect, useState } from "react";
import FooterDB from "@/components/layout/dashboard/Footer";
import { DeleteIcon } from "@/components/assets/DeleteIcon";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import getDataCollection from "@/components/firebase/getDataCollection";
import { toast } from "react-toastify";
import { CircularProgress } from "@nextui-org/react";

function LihatDB() {
  const [active, setActive] = useState(2);
  const searchParams = useSearchParams();
  const [reload, setReload] = useState(true);
  const [dataUser, setdataUser] = useState<any>();
  const [choosedRekamMedis, setchoosedRekamMedis] = useState<any>();

  const getDataPasiens = useCallback(async () => {
    const { result, error } = await getDataCollection("Pasien");
    if (error) {
      toast("Error Get Medicine Data !");
      return;
    }
    let id = searchParams.get("data");
    if (result) {
      const found = result?.find((data: any) => data.id === id);
      setdataUser(found);
      setchoosedRekamMedis(found.rekamMedis[0]);
      setReload(false);
      // setDataPasien(result);
    }
  }, [searchParams]);

  // useEffect(() => {
  //   console.log("result datauser ", dataUser);
  // }, [dataUser]);

  useEffect(() => {
    if (reload) {
      getDataPasiens();
    }
    // console.log("data ", data);
  }, [getDataPasiens, reload]);

  const optionsDate: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const listing = [
    {
      title: "Nama Pasien",
      body: dataUser?.nama,
    },
    {
      title: "NIK",
      body: dataUser?.nik,
    },
    {
      title: "Jenis Kelamin",
      body: dataUser?.gender,
    },
    {
      title: "Tanggal Lahir",
      body: new Date(dataUser?.tanggallahir?.toDate()).toLocaleDateString(
        "id",
        optionsDate
      ),
    },
    {
      title: "Nomor BPJS",
      body: dataUser?.bpjs,
    },
    {
      title: "Nomor Telepon",
      body: dataUser?.telepon,
    },
    {
      title: "Pekerjaan",
      body: dataUser?.pekerjaan,
    },
    {
      title: " Alamat",
      body: dataUser?.alamat,
    },
    {
      title: "Dokter",
      body: dataUser?.dokter,
    },
  ];

  const listing1 = [
    {
      title: "TD (120/80)",
      value: choosedRekamMedis?.tdItem,
    },
    {
      title: "Nadi (x/min)",
      value: choosedRekamMedis?.nadi,
    },
    {
      title: "Resp Rate (x/min)",
      value: choosedRekamMedis?.rate,
    },
    {
      title: "Suhu (C)",
      value: choosedRekamMedis?.suhu?.toString(),
    },
    {
      title: "BB (kg)",
      value: choosedRekamMedis?.beratBadan?.toString(),
    },
    {
      title: "TB (cm)",
      value: choosedRekamMedis?.tinggiBadan?.toString(),
    },
    {
      title: "BMI",
      value: choosedRekamMedis?.BMI,
    },
    {
      title: "(S) Subyektif",
      value: choosedRekamMedis?.subyektif,
    },
    {
      title: "(O) Obyektif",
      value: choosedRekamMedis?.obyektif,
    },
    {
      title: "(A) Assesment",
      value: choosedRekamMedis?.assesment,
    },
    {
      title: "(P) Plan",
      value: choosedRekamMedis?.plan,
    },
    {
      title: "Diagnosis",
      value: choosedRekamMedis?.diagnosis,
    },
    {
      title: "Tindakan",
      value: choosedRekamMedis?.tindakan,
    },
  ];

  if (dataUser) {
    return (
      <div className="flex 2xl:h-100v flex-col bg-gray-200 ">
        <div className="flex flex-col flex-1">
          <div className="flex justify-between px-5 p-4 bg-white ">
            <div className="flex text-gray-500 font-semibold ">
              <p>MANAJEMEN REKAM MEDIS</p>
            </div>
            <div className="flex gap-4">
              <div>Sikes</div>
              <div>/</div>
              <div>Rekam Medis</div>
              <div>/</div>
              <div className={`${active === 2 ? "text-toscadb" : ""}`}>
                Data Rekam Medis
              </div>
            </div>
          </div>
          <div className="flex flex-col p-6 w-full object-center justify-between ">
            <div className="flex w-full bg-white pt-3 rounded-md px-4 p-4">
              <div className="flex flex-row  ">
                Rekam Medis
                {dataUser?.rekamMedis?.map((data:any) => {
                  return (
                    <button
                      className={`flex  pt-1/2 rounded-md justify-center px-1/2 p-1 ml-3 ${
                        data.id === choosedRekamMedis?.id
                          ? "bg-black text-white"
                          : "bg-gray-300"
                      }`}
                      key={data.id}
                      onClick={() => setchoosedRekamMedis(data)}
                    >
                      {new Date(
                        data?.tanggalInput?.toDate()
                      ).toLocaleDateString("id", optionsDate)}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col md:flex-row mt-3 ">
              <div>
                <div className="flex flex-row m-3 rounded-md w-50  bg-white justify-center">
                  <div className="flex flex-col justify-items-center p-6 gap-2 rounded-lg">
                    {listing.map((data, index) => (
                      <div
                        className={`flex flex-row w-full gap-9 border-2 p-2 rounded-md ${
                          index % 2 !== 0 ? "bg-gray-100 " : "bg-white "
                        }`}
                        key={index}
                      >
                        <div className="w-1/2 border-r-3 ">{data.title}</div>
                        <div className="w-1/2 capitalize">{data.body}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-row 8  rounded-md w-full h-full bg-white">
                <div className="flex flex-col w-full p-5 border-2 rounded-lg ">
                  {listing1.map((data, index) => (
                    <div
                      className={`flex flex-row w-full gap-8 p-1 rounded-xl ${
                        index % 2 !== 0 ? "bg-gray-100 " : "bg-white "
                      }`}
                      key={index}
                    >
                      <div
                        key={"bordered"}
                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                      >
                        {/* <Input type={data.title} variant={"bordered"} label={data.title} disabled/> */}
                        <div className="w-1/4">{data.title}</div>
                        <div className="">: {data.value}</div>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-row border-y-4">
                    <div className="flex flex-row w-full gap-9 border-2 p-2 rounded-md ">
                      <div className="p-3 w-3/2">
                        obat yang dipilih :
                        <div className=" flex flex-col border-2 p-2">
                          {" "}
                          Nama Obat dan Jumlah
                          <div className=" flex flex-col border-2 ">
                            {choosedRekamMedis?.obats?.map((data:any) => (
                              <div
                                key={data.id}
                                className="flex flex-row items-center justify-between border-b-2 "
                              >
                                <div className="flex p-2 w-full">
                                  {data.obat} x {data.amount}
                                </div>
                                {/* <button
                                  className="p-1"
                                  // onClick={() => deleteSelectedObats(index)}
                                >
                                  <DeleteIcon />
                                </button> */}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex items-end justify-center ">
          <FooterDB />
        </div> */}
      </div>
    );
  } else {
    return <CircularProgress aria-label="Loading..." />;
  }
}

export default LihatDB;
