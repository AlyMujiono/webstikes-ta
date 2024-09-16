"use client";
// import { PlusIcon } from '@heroicons/react/20/solid'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState, useEffect, useMemo } from "react";
import Boxpasien from "@/components/moleculs/Boxpasien";
import FooterDB from "@/components/layout/dashboard/Footer";
import React from "react";
import { PlusIcon } from "@/components/assets/PlusIcon";
import createData from "@/components/firebase/createData";
import getDataCollection from "@/components/firebase/getDataCollection";
import Datepicker from "tailwind-datepicker-react";
import updateData from "@/components/firebase/updateData";
import { toast } from "react-toastify";
import CustomTable from "@/components/layout/dashboard/CustomTable";
import { SearchIcon } from "@/components/assets/SearchIcon";

function PasienDB() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [modal, setModalRender] = React.useState("pl");
  const [dokter, setdokter] = useState("");
  const [pasienlama, setpasienlama] = useState("");
  const [namePasienbaru, setnamePasienbaru] = useState("");
  const [nik, setnik] = useState("");
  const [lahir, setlahir] = useState(new Date());
  const [kelamin, setkelamin] = useState("");
  const [telepon, settelepon] = useState("");
  const [bpjs, setbpjs] = useState("");
  const [pekerjaan, setpekerjaan] = useState("");
  const [alamat, setalamat] = useState("");
  const [dokterbaru, setdokterbaru] = useState("");
  const [detailPasiens, setdetailPasiens] = useState<any>();
  const [reload, setReload] = useState(true);
  const [search, setsearch] = useState<any>("");
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const [dataPasien, setDataPasien] = useState([]);
  const [dataPasienSorted, setDataPasienSorted] = useState([]);
	

  const options = {
    title: "Pilih Tanggal Lahir",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: "Clear",
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      background: "bg-white dark:bg-gray-800",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "",
      disabledText: "bg-red-500",
      input: "",
      inputIcon: "",
      selected: "",
    },
    icons: {
      // () => ReactElement | JSX.Element
      prev: () => <span>Previous</span>,
      next: () => <span>Next</span>,
    },
    datepickerClassNames: "top-12",
    defaultDate: new Date("2000-01-01"),
    language: "id",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Pilih Tanggal",
    inputDateFormatProp: dateOptions,
  };

  const optionsEdit = {
    title: "Pilih Tanggal Lahir",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: "Clear",
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1920-01-01"),
    theme: {
      background: "bg-white dark:bg-gray-800",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "",
      disabledText: "bg-red-500",
      input: "",
      inputIcon: "",
      selected: "",
    },
    icons: {
      // () => ReactElement | JSX.Element
      prev: () => <span>Previous</span>,
      next: () => <span>Next</span>,
    },
    datepickerClassNames: "top-12",
    defaultDate: new Date(
      detailPasiens?.tanggallahir instanceof Date
        ? detailPasiens?.tanggallahir
        : detailPasiens?.tanggallahir?.toDate() ?? "2000-01-01"
    ),
    language: "id",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Pilih Tanggal",
    inputDateFormatProp: dateOptions,
  };

  const [show, setShow] = useState(false);
  const handleChange = (selectedDate: Date) => {
    setlahir(selectedDate);
  };
  const handleChangeEdit = (selectedDate: Date) => {
    setdetailPasiens((prev: any) => {
      return {
        ...prev,
        tanggallahir: selectedDate,
      };
    });
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  async function getDataPasien() {
    const { result, error } = await getDataCollection("Pasien");
    if (error) {
      toast("Error Get Medicine Data !");
      return;
    }
    if (result) {
      setReload(false);
      setDataPasien(result);
    }
  }
  useEffect(() => {
    if (reload) {
      getDataPasien();
    }
  }, [reload]);

  const columns = [
    { name: "No. Rekam Medis", uid: "nrk" },
    { name: "Nama", uid: "nama" },
    { name: "No. BPJS", uid: "bpjs" },
    { name: "NIK", uid: "nik" },
    { name: "Jenis Kelamin", uid: "gender" },
    { name: "Alamat", uid: "alamat" },
    { name: "Aksi", uid: "actions" },
  ];

  // const labels = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  // ];
  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       fill: true,
  //       label: "Jumlah Pasien",
  //       data: labels.map(() => faker.number.int({ min: 0, max: 1000 })), // array isi float atau int
  //       borderColor: "rgb(53, 162, 235)",
  //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  //     },
  //   ],
  // };

  const openDetail = (data: any) => {
    setdetailPasiens(data);
    handleOpen("dlantrian");
  };
  const openEdit = (data: any) => {
    setdetailPasiens(data);
    handleOpen("editPasien");
  };
  const openDelete = (data: any) => {
    setdetailPasiens(data);
    handleOpen("deletePasien");
  };

  const handleOpen = (type: string) => {
    setModalRender(type);
    onOpen();
  };

  useMemo(() => {
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

			setDataPasienSorted(sortData);
  }, [dataPasien, search]);

  async function simpanDataPasienBaru() {
    const data = {
      nama: namePasienbaru,
      nik: nik,
      tanggallahir: lahir,
      gender: kelamin,
      telepon: telepon,
      bpjs: bpjs,
      pekerjaan: pekerjaan,
      alamat: alamat,
      dokter: dokterbaru,
      statusProsesMedis: 0,
      created_ad: new Date(),
      tanggalberobat: new Date(),
      rekamMedis: [],
      visible: true,
    };
    try {
      const { result, error } = await createData("Pasien", data);
      if (error) {
        return console.log(error);
      }
      console.log("result ", result);
      onClose();
      setReload(true);
    } catch (error) {}
    console.log("data ", data);
    // onClose();
  }
  const handleSelectionChange = (e: any) => {
    setkelamin(e.target.value);
  };
  const handleSelectionChangeEdit = (e: any) => {
    setdetailPasiens((prev: any) => {
      return {
        ...prev,
        gender: e.target.value,
      };
    });
  };
  const handleSelectionChangePasiens = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setpasienlama(e.target.value);
  };

  const updatePasien = async () => {
    let tempData: any = {};
    dataPasien.find((element: any) => {
      if (element.id === pasienlama) {
        tempData = element;
        tempData.dokter = dokter;
        tempData.tanggalberobat = new Date();
        tempData.statusProsesMedis = 0;
      }
    });
    let id = tempData.id;
    delete tempData.id;
    delete tempData.nomor;
    const { error } = await updateData("Pasien", id, tempData);
    if (error) return console.log("error ", error);
    onClose();
    setReload(true);
  };

  async function editPasien() {
    let data = { ...detailPasiens };
    let id = data.id;
    delete data.id;
    delete data.nomor;
    const { error } = await updateData("Pasien", id, data);
    if (error) return console.log("error ", error);
    onClose();
    setReload(true);
  }

  async function deletePasien() {
    let data = { ...detailPasiens };
    let id = data.id;
    data.visible = false;
    delete data.id;
    delete data.nomor;
    const { error } = await updateData("Pasien", id, data);
    if (error) {
      toast("Delete Data Error");
    }
    setdetailPasiens({});
    onClose();
    setReload(true);
  }

  function renderModal() {
    if (modal === "dlantrian") {
      return (
        <>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            classNames={{ base:"light text-black"  }}
          >
            <ModalContent>
              {(onClose: any) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 bg-toscadb text-white">
                    Edit Pasien
                  </ModalHeader>
                  <ModalBody>
                    <Input
                    classNames={{ base:"light" }}
                      autoFocus
                      isReadOnly
                      label="Nama Pasien"
                      labelPlacement="outside"
                      type="text"
                      variant="bordered"
                      value={detailPasiens.nama}
                      onValueChange={(item: any) =>
                        setdetailPasiens((prev: any) => {
                          return {
                            ...prev,
                            nama: item,
                          };
                        })
                      }
                    />
                    <Input
                      isReadOnly
                      label="No. NIK"
                      labelPlacement="outside"
                      type="text"
                      inputMode="numeric"
                      variant="bordered"
                      value={detailPasiens.nik}
                      onValueChange={(item: any) =>
                        setdetailPasiens((prev: any) => {
                          return {
                            ...prev,
                            nik: item,
                          };
                        })
                      }
                    />
                    <div className="mt-4 bg-gray-100">
                      <Datepicker
                        options={optionsEdit}
                        onChange={handleChangeEdit}
                        show={show}
                        setShow={handleClose}
                      />
                    </div>
                    {/* <Input
											label="Tanggal Lahir"
											labelPlacement='outside'
											type="text"
											inputMode='text'
											variant="bordered"
											value={lahir}
											onValueChange={setlahir}
										/> */}
                    <Select
                      classNames={{ base:"light" }}
                      label="Jenis Kelamin"
                      placeholder="Pilih Jenis Kelamin"
                      labelPlacement="outside"
                      className="mt-5 bg-gray-100"
                      selectedKeys={[detailPasiens.gender]}
                      onChange={handleSelectionChangeEdit}
                    >
                      <SelectItem key={"pria"} value={"Pria"} classNames={{ base: "light" }} className="text-white">
                        Pria
                      </SelectItem>
                      <SelectItem key={"wanita"} value={"Perempuan"} classNames={{ base: "light" }} className="text-white">
                        Perempuan
                      </SelectItem>
                    </Select>
                    <Input
                      label="Nomor Telepon"
                      isReadOnly
                      labelPlacement="outside"
                      type="text"
                      inputMode="numeric"
                      variant="bordered"
                      value={detailPasiens.telepon}
                      onValueChange={(item: any) =>
                        setdetailPasiens((prev: any) => {
                          return {
                            ...prev,
                            telepon: item,
                          };
                        })
                      }
                    />
                    <Input
                      label="No. BPJS"
                      isReadOnly
                      labelPlacement="outside"
                      type="text"
                      inputMode="numeric"
                      variant="bordered"
                      value={detailPasiens.bpjs}
                      onValueChange={(item: any) =>
                        setdetailPasiens((prev: any) => {
                          return {
                            ...prev,
                            bpjs: item,
                          };
                        })
                      }
                    />
                    <Input
                      label="Pekerjaan"
                      labelPlacement="outside"
                      isReadOnly
                      type="text"
                      inputMode="text"
                      variant="bordered"
                      value={detailPasiens.pekerjaan}
                      onValueChange={(item: any) =>
                        setdetailPasiens((prev: any) => {
                          return {
                            ...prev,
                            pekerjaan: item,
                          };
                        })
                      }
                    />
                    <Input
                      label=" Alamat"
                      isReadOnly
                      labelPlacement="outside"
                      type="text"
                      inputMode="text"
                      variant="bordered"
                      value={detailPasiens.alamat}
                      onValueChange={(item: any) =>
                        setdetailPasiens((prev: any) => {
                          return {
                            ...prev,
                            alamat: item,
                          };
                        })
                      }
                    />
                    <Input
                      label="Dokter"
                      isReadOnly
                      labelPlacement="outside"
                      type="text"
                      inputMode="text"
                      variant="bordered"
                      value={detailPasiens.dokter}
                      onValueChange={(item: any) =>
                        setdetailPasiens((prev: any) => {
                          return {
                            ...prev,
                            dokter: item,
                          };
                        })
                      }
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="flat"
                      onPress={onClose}
                      className="bg-bluebt text-white"
                    >
                      Batal
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      );
    } else if (modal === "pl") {
      return (
        <>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            classNames={{ base:"light text-black"  }}
          >
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1 bg-toscadb text-white">
                    Tambah Pasien
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      // endContent={
                      //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      // }
                      classNames={{ base:"light" }}
                      label="Dokter"
                      labelPlacement="outside"
                      type="text"
                      variant="bordered"
                      value={dokter}
                      onValueChange={setdokter}
                    />
                    {/* <Input
											// endContent={
											//   <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
											// }
											label="Pasien"
											labelPlacement='outside'
											type="text"
											variant="bordered"
											value={pasienlama}
											onValueChange={setpasienlama}
										/> */}
                    <Select
                      classNames={{ base:"light" }}
                      items={dataPasien}
                      label="Pilih Pasien"
                      placeholder="Pilih Pasien"
                      className="max-w bg-gray-100"
                      selectedKeys={[pasienlama]}
                      onChange={handleSelectionChangePasiens}
                    >
                      {(pasiens: any) => (
                        <SelectItem key={pasiens.id} classNames={{ base: "light" }} className="text-white">
                          {pasiens.nama}
                        </SelectItem>
                      )}
                    </Select>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="flat"
                      onPress={updatePasien}
                      className="bg-greenbt text-white"
                    >
                      Tambahkan Keantrian
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      );
    } else if (modal === "editPasien") {
      return (
        <>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            classNames={{ base:"light text-black"  }}
          >
            <ModalContent>
              {(onClose: any) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 bg-toscadb text-white">
                    Edit Pasien
                  </ModalHeader>
                  <ModalBody>
                    <Input
                    classNames={{ base:"light" }}
                      autoFocus
                      label="Nama Pasien"
                      labelPlacement="outside"
                      type="text"
                      variant="bordered"
                      value={detailPasiens.nama}
                      onValueChange={(item: any) =>
                        setdetailPasiens((prev: any) => {
                          return {
                            ...prev,
                            nama: item,
                          };
                        })
                      }
                    />
                    <Input
                      label="No. NIK"
                      labelPlacement="outside"
                      type="text"
                      inputMode="numeric"
                      variant="bordered"
                      value={detailPasiens.nik}
                      onValueChange={(item: any) =>
                        setdetailPasiens((prev: any) => {
                          return {
                            ...prev,
                            nik: item,
                          };
                        })
                      }
                    />
                    <div className="mt-4 bg-gray-100">
                      <Datepicker
                        options={optionsEdit}
                        onChange={handleChangeEdit}
                        show={show}
                        setShow={handleClose}
                      />
                    </div>
                    {/* <Input
											label="Tanggal Lahir"
											labelPlacement='outside'
											type="text"
											inputMode='text'
											variant="bordered"
											value={lahir}
											onValueChange={setlahir}
										/> */}
                    <Select
                      classNames={{ base:"light" }}
                      label="Jenis Kelamin"
                      placeholder="Pilih Jenis Kelamin"
                      labelPlacement="outside"
                      className="mt-5 bg-gray-100"
                      selectedKeys={[detailPasiens.gender]}
                      onChange={handleSelectionChangeEdit}
                    >
                      <SelectItem key={"pria"} value={"Pria"} classNames={{ base: "light" }} className="text-white">
                        Pria
                      </SelectItem>
                      <SelectItem key={"wanita"} value={"Perempuan"} classNames={{ base: "light" }} className="text-white">
                        Perempuan
                      </SelectItem>
                    </Select>
                    <Input
                      label="Nomor Telepon"
                      labelPlacement="outside"
                      type="text"
                      inputMode="numeric"
                      variant="bordered"
                      value={detailPasiens.telepon}
                      onValueChange={(item: any) =>
                        setdetailPasiens((prev: any) => {
                          return {
                            ...prev,
                            telepon: item,
                          };
                        })
                      }
                    />
                    <Input
                      label="No. BPJS"
                      labelPlacement="outside"
                      type="text"
                      inputMode="numeric"
                      variant="bordered"
                      value={detailPasiens.bpjs}
                      onValueChange={(item: any) =>
                        setdetailPasiens((prev: any) => {
                          return {
                            ...prev,
                            bpjs: item,
                          };
                        })
                      }
                    />
                    <Input
                      label="Pekerjaan"
                      labelPlacement="outside"
                      type="text"
                      inputMode="text"
                      variant="bordered"
                      value={detailPasiens.pekerjaan}
                      onValueChange={(item: any) =>
                        setdetailPasiens((prev: any) => {
                          return {
                            ...prev,
                            pekerjaan: item,
                          };
                        })
                      }
                    />
                    <Input
                      label=" Alamat"
                      labelPlacement="outside"
                      type="text"
                      inputMode="text"
                      variant="bordered"
                      value={detailPasiens.alamat}
                      onValueChange={(item: any) =>
                        setdetailPasiens((prev: any) => {
                          return {
                            ...prev,
                            alamat: item,
                          };
                        })
                      }
                    />
                    <Input
                      label="Dokter"
                      labelPlacement="outside"
                      type="text"
                      inputMode="text"
                      variant="bordered"
                      value={detailPasiens.dokter}
                      onValueChange={(item: any) =>
                        setdetailPasiens((prev: any) => {
                          return {
                            ...prev,
                            dokter: item,
                          };
                        })
                      }
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="flat"
                      onPress={onClose}
                      className="bg-bluebt text-white"
                    >
                      Batal
                    </Button>
                    <Button
                      variant="flat"
                      onPress={editPasien}
                      className="bg-greenbt text-white"
                    >
                      Update Pasien
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      );
    } else if (modal === "deletePasien") {
      return (
        <>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            classNames={{ base:"light text-black"  }}
          >
            <ModalContent>
              {(onClose: any) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 bg-toscadb text-white">
                    Delete Pasien
                  </ModalHeader>
                  <ModalBody>
                    <p>Apakah Kamu Yakin Menghapus Data {detailPasiens.nama}</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="flat"
                      onPress={onClose}
                      className="bg-bluebt text-white"
                    >
                      Batal
                    </Button>
                    <Button
                      variant="solid"
                      onPress={deletePasien}
                      className="bg-red-600 text-white"
                    >
                      Hapus
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      );
    } else {
      return (
        <>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            classNames={{ base:"light text-black"  }}
          >
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1 bg-toscadb text-white">
                    Tambah Pasien Baru
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      label="Nama Pasien"
                      labelPlacement="outside"
                      type="text"
                      variant="bordered"
                      value={namePasienbaru}
                      onValueChange={setnamePasienbaru}
                    />
                    <Input
                      label="No. NIK"
                      labelPlacement="outside"
                      type="text"
                      inputMode="numeric"
                      variant="bordered"
                      value={nik}
                      onValueChange={setnik}
                    />
                    <div className="mt-4 bg-gray-100">
                      <Datepicker
                        options={options}
                        onChange={handleChange}
                        show={show}
                        setShow={handleClose}
                      />
                    </div>
                    {/* <Input
											label="Tanggal Lahir"
											labelPlacement='outside'
											type="text"
											inputMode='text'
											variant="bordered"
											value={lahir}
											onValueChange={setlahir}
										/> */}
                    <Select
                    classNames={{ base:"light" }}
                      label="Jenis Kelamin"
                      placeholder="Pilih Jenis Kelamin"
                      className="mt-5 bg-gray-100"
                      selectedKeys={[kelamin]}
                      onChange={handleSelectionChange}
                    >
                      <SelectItem key={"pria"} value={"Pria"} classNames={{ base: "light" }} className="text-white">
                        Pria
                      </SelectItem>
                      <SelectItem key={"wanita"} value={"Perempuan"} classNames={{ base: "light" }} className="text-white">
                        Perempuan
                      </SelectItem>
                    </Select>
                    <Input
                      label="Nomor Telepon"
                      labelPlacement="outside"
                      type="text"
                      inputMode="numeric"
                      variant="bordered"
                      value={telepon}
                      onValueChange={settelepon}
                    />
                    <Input
                      label="No. BPJS"
                      labelPlacement="outside"
                      type="text"
                      inputMode="numeric"
                      variant="bordered"
                      value={bpjs}
                      onValueChange={setbpjs}
                    />
                    <Input
                      label="Pekerjaan"
                      labelPlacement="outside"
                      type="text"
                      inputMode="text"
                      variant="bordered"
                      value={pekerjaan}
                      onValueChange={setpekerjaan}
                    />
                    <Input
                      label="Alamat"
                      labelPlacement="outside"
                      type="text"
                      inputMode="text"
                      variant="bordered"
                      value={alamat}
                      onValueChange={setalamat}
                    />
                    <Input
                      label="Dokter"
                      labelPlacement="outside"
                      type="text"
                      inputMode="text"
                      variant="bordered"
                      value={dokterbaru}
                      onValueChange={setdokterbaru}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="flat"
                      onPress={simpanDataPasienBaru}
                      className="bg-bluebt text-white"
                    >
                      Simpan
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      );
    }
  }

  return (
    <div className="flex flex-col">
      {renderModal()}
      <div className="flex justify-between px-4 bg-white py-5">
        <div className="flex text-gray-500 font-semibold">
          <p>Pasien</p>
        </div>
        <div className="flex gap-4">
          <div>Sikes</div>
          <div>/</div>
          <div>Manajemen</div>
          <div>/</div>
          <div className="text-toscadb">Pasien</div>
        </div>
      </div>
      <div className="flex flex-col bg-white m-5 p-5 gap-5">
        <div>DATA PASIEN</div>
        <div className="flex flex-row">
          <Button
            onPress={() => handleOpen("pb")}
            className="bg-greenbt text-white"
          >
            <PlusIcon
              size={24}
              width={20}
              height={20}
              className="h-5 w-5 text-white font-bold hover:text-violet-100"
              aria-hidden="true"
            />
            Pasien Baru
          </Button>
        </div>
        <div className="w-80 h-20 px-8 rounded-2xl flex justify-center items-centershadow-lg">
          <Input
            // label="Search"
            value={search}
            onValueChange={setsearch}
            isClearable
            radius="lg"
            labelPlacement="outside"
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
        <div className="py-4">
          <CustomTable
            columns={columns}
            body={dataPasienSorted}
            pagination={dataPasienSorted.length > 10 ? true : false}
            isLoading={reload}
            ondetail={(item: any) => openDetail(item)}
            onEdit={(item: any) => openEdit(item)}
            onPressDelete={(item: any) => openDelete(item)}
          />
        </div>
      </div>
      <FooterDB />
    </div>
  );
}

export default PasienDB;
