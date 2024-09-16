"use client";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import FooterDB from "@/components/layout/dashboard/Footer";
import { Button, Progress } from "@nextui-org/react";
import { EditIcon } from "@/components/assets/EditIcon";
import { DeleteIcon } from "@/components/assets/DeleteIcon";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import getDataCollection from "@/components/firebase/getDataCollection";
import { toast } from "react-toastify";
import updateData from "@/components/firebase/updateData";
import { v4 as uuidv4 } from "uuid";

function EditDB() {
  const router = useRouter();
  const [active, setActive] = useState(2);
  const searchParams = useSearchParams();
  const [reload, setReload] = useState(true);
  const [dataUser, setdataUser] = useState<any>({});
  const [dataObat, setdataObat] = useState<any>();
  const [tdItem, settdItem] = useState("");
  const [nadi, setnadi] = useState("");
  const [rate, setrate] = useState("");
  const [suhu, setsuhu] = useState("");
  const [beratBadan, setberatBadan] = useState("");
  const [tinggiBadan, settinggiBadan] = useState("");
  const [BMI, setBMI] = useState("");
  const [subyektif, setsubyektif] = useState("");
  const [obyektif, setobyektif] = useState("");
  const [assesment, setassesment] = useState("");
  const [plan, setplan] = useState("");
  const [diagnosis, setdiagnosis] = useState("");
  const [tindakan, settindakan] = useState("");

  const getDataPasiens = useCallback(async () => {
    const { result, error } = await getDataCollection("Pasien");
    if (error) {
      toast("Error Get Medicine Data !");
      return;
    }
    let id = searchParams?.get("data");
    if (result) {
      const found = result?.find((data: any) => data?.id === id);
      setdataUser(found);
      setReload(false);
      // result?.forEach((data: any) => {
      //   if (id === data.id) {
      //   }
      // });
      // setDataPasien(result);
    }
  }, [searchParams]);

  const getDataObats = useCallback(async () => {
    const { result, error } = await getDataCollection("Obat");
    if (error) {
      toast("Error Get Medicine Data !");
      setReload(false);
      return;
    }
    if (result) {
      setdataObat(result);
      // result?.forEach((data: any) => {
      //   if (id === data.id) {
      //   }
      // });
      // setDataPasien(result);
    }
    setReload(false);
  }, []);

  // useEffect(() => {
  //   console.log("result datauser ", dataUser);
  // }, [dataUser]);

  useEffect(() => {
    if (reload) {
      getDataPasiens();
      getDataObats();
    }
    // console.log("data ", data);
  }, [getDataObats, getDataPasiens, reload]);

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
      value: tdItem,
      setValue: settdItem,
    },
    {
      title: "Nadi (x/min)",
      value: nadi,
      setValue: setnadi,
    },
    {
      title: "Resp Rate (x/min)",
      value: rate,
      setValue: setrate,
    },
    {
      title: "Suhu (C)",
      value: suhu,
      setValue: setsuhu,
    },
    {
      title: "BB (kg)",
      value: beratBadan,
      setValue: setberatBadan,
    },
    {
      title: "TB (cm)",
      value: tinggiBadan,
      setValue: settinggiBadan,
    },
    {
      title: "BMI",
      value: BMI,
      setValue: setBMI,
    },
    {
      title: "(S) Subyektif",
      value: subyektif,
      setValue: setsubyektif,
    },
    {
      title: "(O) Obyektif",
      value: obyektif,
      setValue: setobyektif,
    },
    {
      title: "(A) Assesment",
      value: assesment,
      setValue: setassesment,
    },
    {
      title: "(P) Plan",
      value: plan,
      setValue: setplan,
    },
    {
      title: "Diagnosis",
      value: diagnosis,
      setValue: setdiagnosis,
    },
    {
      title: "Tindakan",
      value: tindakan,
      setValue: settindakan,
    },
  ];
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const [selectedObat, setSelectedObat] = React.useState("");
  const handleSelectObat = (e: any) => {
    setSelectedObat(e.target.value);
  };
  const [amountObat, setAmountObat] = React.useState(0);
  const handleSetAmountObat = (e: any) => {
    setAmountObat(Number(e.target.value));
  };
  const [selectedObats, setSelectedObats] = React.useState<any>([]);
  const handleSimpanObat = () => {
    let findData: any = {};
    if (selectedObat !== "") {
      findData = dataObat?.find((data: any) => data?.id === selectedObat);
      if (findData?.stock < amountObat) {
        return toast(`Stock Hanya Tersedia ${findData?.stock?.toString()}`);
      }
    }
    let data = [
      ...(selectedObats || []),
      {
        id: findData?.id,
        obat: findData?.nama,
        amount: amountObat,
      },
    ];
    setSelectedObats(data);
  };
  function removeItemOnce(arr: any[], value: any) {
    let newArray: any = [];
    arr.forEach((element: any, index: any) => {
      if (index !== value) {
        newArray.push(element);
      }
    });
    return newArray;
  }
  function deleteSelectedObats(index: number) {
    const newData = removeItemOnce(selectedObats, index);
    setSelectedObats(newData);
  }

  async function simpanRekamMedis() {
    let updateDataUser: any = { ...dataUser };
    let dataObject = {
      id: uuidv4(),
      tanggalAntrian: updateDataUser?.tanggalberobat,
      tanggalInput: new Date(),
      tdItem: tdItem,
      nadi: nadi,
      rate: rate,
      suhu: suhu,
      beratBadan: beratBadan,
      tinggiBadan: tinggiBadan,
      BMI: BMI,
      subyektif: subyektif,
      obyektif: obyektif,
      assesment: assesment,
      plan: plan,
      diagnosis: diagnosis,
      tindakan: tindakan,
      obats: selectedObats,
    };
    updateDataUser.rekamMedis = [...updateDataUser?.rekamMedis, dataObject];

    if (selectedObats.length > 0) {
      selectedObats.forEach(async (data: any) => {
        let updateObat = {
          ...dataObat?.find((datas: any) => datas.id === data?.id),
        };
        updateObat.stock = Number(updateObat.stock) - data?.amount;
        delete updateObat.nomor;
        delete updateObat.id;
        const { result, error } = await updateData(
          "Obat",
          data?.id,
          updateObat
        );
        if (error) {
          return toast(`Error Update Obat ${data?.nama}`);
        }
      });
    }
    let id = updateDataUser.id;
    updateDataUser.statusProsesMedis = 2;
    delete updateDataUser.id;
    delete updateDataUser.nomor;
    const { result, error } = await updateData("Pasien", id, updateDataUser);
    if (error) {
      return toast(`Error Update User`);
    }
    return router.push("/dashboard/manajemen/rekamMedis");
  }

  if (reload) {
    return (
      <Progress
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
      />
    );
  } else {
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
          <div className="flex flex-col p-6 w-full ">
            <div className="flex flex-col md:flex-row">
              <div className="w-fit">
                <div className="flex m-3 rounded-md bg-white justify-center ">
                  <div className="flex flex-col justify-items-center p-6 gap-2 rounded-lg ">
                    {listing.map((data, index) => (
                      <div
                        className={`flex flex-row w-full gap-9 border-2 p-2 rounded-md ${
                          index % 2 !== 0 ? "bg-gray-100 " : "bg-white "
                        }`}
                        key={index}
                      >
                        <div className="min-w-[50%]  border-r-3 ">{data?.title}</div>
                        <div className="overflow-auto capitalize">{data?.body}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-row 8  rounded-md w-full h-full bg-white pb-10">
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
                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 pt-2"
                      >
                        <Input
                          classNames={{ base:"light" }}
                          autoFocus
                          type={data?.title}
                          variant={"bordered"}
                          label={data?.title}
                          labelPlacement="outside"
                          value={data?.value}
                          onValueChange={data?.setValue}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-row border-y-4">
                    <div className=" flex flex-col p-2">
                      <div className="">
                        Nama Obat :
                        <div className="text-white">
                          <Select
                            classNames={{ base:"light" }}
                            items={dataObat ?? []}
                            label="Pilih Obat"
                            variant="bordered"
                            placeholder="Pilih Obat"
                            labelPlacement="outside"
                            selectedKeys={[selectedObat]}
                            className="max-w-xs bg-gray-100 text-white"
                            onChange={handleSelectObat}
                          >
                            {(dataObat: any) => (
                              <SelectItem key={dataObat?.id} classNames={{ base: "light" }} className="text-white">
                                {dataObat?.nama}
                              </SelectItem>
                            )}
                            {/* <SelectItem key="bla" value={"bla"}>
                              bla
                            </SelectItem>
                            <SelectItem key="blaa" value={"blaa"}>
                              blaa
                            </SelectItem>
                            <SelectItem
                              key="blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                              value={"blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
                            >
                              blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            </SelectItem> */}
                          </Select>
                        </div>
                      </div>
                      <div className="flex flex-row p-4 ">
                        Jumlah
                        <Input
                          classNames={{ base:"light" }}
                          type="number"
                          placeholder="00"
                          labelPlacement="outside"
                          className="border rounded-xl p-1"
                          inputMode="numeric"
                          value={amountObat?.toString()}
                          onChange={handleSetAmountObat}
                          // onChange={ }
                        />
                      </div>
                      <div className="flex-col p-5 justify-items-center">
                        <Button
                          color="primary"
                          variant="ghost"
                          onClick={handleSimpanObat}
                        >
                          Simpan Obat
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-row w-full gap-9 border-2 p-2 rounded-md ">
                      <div className="p-3 w-3/2">
                        obat yang dipilih :
                        <div className=" flex flex-col border-2 p-2">
                          {" "}
                          Nama Obat dan Jumlah
                          <div className=" flex flex-col border-2 ">
                            {selectedObats?.map((data: any, index: number) => (
                              <div
                                key={data?.obat}
                                className="flex flex-row items-center justify-between border-b-2 "
                              >
                                <div className="flex p-2 w-full">
                                  {data?.obat} x {data?.amount}
                                </div>
                                <button
                                  className="p-1"
                                  onClick={() => deleteSelectedObats(index)}
                                >
                                  <DeleteIcon />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 items-center pt-5 justify-end m-3">
                    <Button
                      color="success"
                      className="p-2 pl-3 text-white"
                      onPress={simpanRekamMedis}
                    >
                      <EditIcon />
                      Simpan
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <FooterDB />
      </div>
    );
  }
}
export default EditDB;
