"use client";
import { SearchIcon } from "@/components/assets/SearchIcon";
import createData from "@/components/firebase/createData";
import uploadFoto from "@/components/firebase/uploadFoto";
import CustomTable from "@/components/layout/dashboard/CustomTable";
import FooterDB from "@/components/layout/dashboard/Footer";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
  Image,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { useFilePicker } from "use-file-picker";
import Datepicker from "tailwind-datepicker-react";
import { toast } from "react-toastify";
import getDataCollection from "@/components/firebase/getDataCollection";
import updateData from "@/components/firebase/updateData";

function AlkesDB() {
  const [active, setActive] = useState(2);
  const [conditionModal, setconditionModal] = useState(1);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [alat, setalat] = useState("");
  const [deskripsi, setdeskripsi] = useState("");
  const [tanggalmasuk, settanggalmasuk] = useState(new Date());
  const [tanggalkadaluarsa, settanggalkadaluarsa] = useState(new Date());
  const [stock, setstock] = useState("");
  const [status, setstatus] = useState("");
  const [show, setShow] = useState(false);
  const [showexpired, setShowexpired] = useState(false);
  const [reload, setReload] = useState(true);
  const [dataAlat, setdataAlat] = useState([]);
  const [dataAlatDetail, setdataAlatDetail] = useState<any>();
  const [dataSortedAlat, setdataSortedAlat] = useState<any>([]);
  const [search, setsearch] = useState<any>("");

  const { openFilePicker, filesContent, loading, errors, plainFiles, clear } =
    useFilePicker({
      readAs: "DataURL",
      accept: "image/*",
      multiple: false,
      onFilesSelected: ({ plainFiles, filesContent, errors }) => {
        // this callback is always called, even if there are errors
        // console.log("onFilesSelected", plainFiles, filesContent, errors);
      },
      onFilesRejected: ({ errors }) => {
        // this callback is called when there were validation errors
        // console.log("onFilesRejected", errors);
      },
      onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
        // this callback is called when there were no validation errors
        // console.log("onFilesSuccessfullySelected", plainFiles, filesContent);
      },
    });

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const options = {
    title: "Pilih Tanggal Masuk",
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
    defaultDate: new Date(),
    language: "id",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Pilih Tanggal Masuk",
    inputDateFormatProp: dateOptions,
  };
  const options2 = {
    title: "Pilih Tanggal Kadaluarsa",
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
    defaultDate: new Date(),
    language: "id",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Pilih Tanggal Kadaluarsa",
    inputDateFormatProp: dateOptions,
  };

  const columns = [
    { name: "Nama Alat", uid: "nama" },
    { name: "Deskripsi", uid: "deskripsi" },
    { name: "Tanggal Masuk", uid: "expired_in" },
    { name: "Tanggal Kadaluarsa", uid: "expired_date" },
    { name: "Jumlah Stok", uid: "stock" },
    { name: "Aksi", uid: "actions" },
  ];

  const body = [
    {
      id: 1,
      nomor: 1,
      name: "albendazol",
      description:
        "Albendazole adalah obat yang umumnya digunakan untuk mengobati penyakit akibat infeksi di usus. Selain itu, obat ini juga dapat digunakan untuk mengatasi infeksi cacing di luar usus, seperti hati atau otak. Albendazole hanya boleh digunakan dengan resep dokter.",
      date_in: "Senin, 20 Januari 2023",
      expired: "minggu, 19 januari 2025",
      amount: "50",
    },
  ];

  async function getDataAlat() {
    const { result, error } = await getDataCollection("Alat");
    if (error) {
      toast("Error Get tools Data !");
      return;
    }
    if (result) {
      setReload(false);
      setdataAlat(result);
      setdataSortedAlat(result);
    }
  }

  useEffect(() => {
    if (reload) {
      getDataAlat();
    }
  }, [reload]);

  async function createAlat() {
    const { result, error } = await uploadFoto(
      "Alat",
      plainFiles[0].name,
      filesContent[0].content
    );
    if (error) {
      console.log("error");
    }
    var link_photo = result;
    if (link_photo) {
      var data = {
        nama: alat,
        deskripsi: deskripsi,
        expired_in: tanggalmasuk,
        expired_date: tanggalkadaluarsa,
        stock: Number(stock),
        status: status,
        foto: link_photo,
        visible: true,
      };
      const { result, error } = await createData("Alat", data);
      if (error) {
        console.log("error");
      }
      setReload(true);
    }
  }

  async function editAlat() {
    var data = dataAlatDetail;
    if (filesContent[0]?.content) {
      const { result, error } = await uploadFoto(
        "Alat",
        plainFiles[0]?.name,
        filesContent[0]?.content
      );
      if (error) {
        console.log("error");
      }
      data.foto = result;
    }
    if (data) {
      let id = data.id;
      delete data.nomor;
      delete data.id;
      const { result, error } = await updateData("Alat", id, data);
      if (error) {
        console.log("error");
      }
      onClose();
      setReload(true);
    }
  }

  async function deleteData() {
    var data = dataAlatDetail;
    let id = data.id;
    data.visible = false;
    delete data.nomor;
    delete data.id;
    const { result, error } = await updateData("Alat", id, data);
    if (error) {
      return console.log("error");
    }
    onClose();
    setReload(true);
  }

  const handleChange = (selectedDate: Date) => {
    settanggalmasuk(selectedDate);
  };
  const handleChangeEdit = (selectedDate: Date) => {
    setdataAlatDetail((prev: any) => {
      return {
        ...prev,
        expired_in: selectedDate,
      };
    });
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };
  const handleChangeexpired = (selectedDate: Date) => {
    settanggalkadaluarsa(selectedDate);
  };
  const handleChangeexpiredEdit = (selectedDate: Date) => {
    setdataAlatDetail((prev: any) => {
      return {
        ...prev,
        expired_Date: selectedDate,
      };
    });
  };
  const handleCloseexpired = (state: boolean) => {
    setShowexpired(state);
  };

  function openDetail(item: any) {
    clear();
    setdataAlatDetail(item);
    setconditionModal(2);
    onOpen();
  }
  function openDelete(item: any) {
    setdataAlatDetail(item);
    setconditionModal(3);
    onOpen();
  }

  const sortedSearch = useMemo(() => {
    let sortData = dataAlat
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

    setdataSortedAlat(sortData);
  }, [dataAlat, search]);

  function renderModal() {
    if (conditionModal === 1) {
      return (
        <Modal
          isOpen={isOpen}
          placement={"center"}
          classNames={{ base:"light text-black"  }}
          onOpenChange={onOpenChange}
          // size="full"
          scrollBehavior={"inside"}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Tambah Alat
                </ModalHeader>
                <ModalBody>
                  <Input
                    labelPlacement="outside"
                    type="text"
                    // type="email"
                    label="Nama alat"
                    onValueChange={setalat}
                    value={alat}
                    variant="bordered"
                    // isInvalid={isInvalid}
                    // color={isInvalid ? "danger" : "success"}
                    // errorMessage={isInvalid && "Please enter a valid email"}
                  />
                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Deskripsi Alat"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    value={deskripsi}
                    onValueChange={setdeskripsi}
                  />
                  {/* <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Tanggal Masuk"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    value={tanggalmasuk}
                    onValueChange={settanggalmasuk}
                  /> */}
                  <div className="mt-4 bg-gray-100">
                    <p>Tanggal Masuk</p>
                    <Datepicker
                      options={options}
                      onChange={handleChange}
                      show={show}
                      setShow={handleClose}
                    />
                  </div>
                  <div className="mt-4 bg-gray-100">
                    <p>Tanggal Kadaluarsa</p>
                    <Datepicker
                      options={options2}
                      onChange={handleChangeexpired}
                      show={showexpired}
                      setShow={handleCloseexpired}
                    />
                  </div>
                  {/* <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Tanggal Kadaluarsa"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    value={tanggalkadaluarsa}
                    onValueChange={settanggalkadaluarsa}
                  /> */}

                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Jumlah Stok"
                    labelPlacement="outside"
                    type="text"
                    inputMode="numeric"
                    variant="bordered"
                    value={stock}
                    onValueChange={setstock}
                  />
                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Status"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    value={status}
                    onValueChange={setstatus}
                  />
                  <div>
                    <p>Foto</p>
                    <Button
                      onClick={() => openFilePicker()}
                      fullWidth={true}
                      radius="sm"
                    >
                      {plainFiles?.length > 0 ? "Choose Again" : "Choose File"}
                    </Button>
                    {plainFiles?.length > 0 && (
                      <Button
                        onClick={() => clear()}
                        fullWidth={true}
                        radius="sm"
                      >
                        Clear
                      </Button>
                    )}
                    {plainFiles?.map((file) => (
                      <div key={file.name}>{file.name}</div>
                    ))}
                  </div>
                  {/* <Input
                    isRequired
                    label="Password"
                    labelPlacement="outside"
                    // placeholder="Enter your password"
                    type={isVisible ? "text" : "password"}
                    className="mb-5 mt-4 bg-gray-100 bg-white rounded-xl"
                    onValueChange={setpassword}
                    value={password}
                    isInvalid={password.length < 8 ?? false}
                    color={password.length < 8 ? "danger" : "success"}
                    errorMessage={password.length < 8 && "Minimal 8 Karakter"}
                  />
                  <Checkbox isSelected={isVisible} onValueChange={setIsVisible}>
                    Show Password
                  </Checkbox> */}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Batal
                  </Button>
                  <Button
                    // isDisabled={submitCheck()}
                    color="primary"
                    variant="solid"
                    onPress={createAlat}
                    // isLoading={loadingButton}
                  >
                    Tambah Alat
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      );
    } else if (conditionModal === 2) {
      return (
        <Modal
          isOpen={isOpen}
          placement={"center"}
          classNames={{ base:"light text-black"  }}
          onOpenChange={onOpenChange}
          // size="full"
          scrollBehavior={"inside"}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Alat
                </ModalHeader>
                <ModalBody>
                  <Input
                    labelPlacement="outside"
                    type="text"
                    // type="email"
                    label="Nama alat"
                    onValueChange={(item) =>
                      setdataAlatDetail((prev: any) => {
                        return {
                          ...prev,
                          nama: item,
                        };
                      })
                    }
                    value={dataAlatDetail.nama}
                    variant="bordered"
                    // isInvalid={isInvalid}
                    // color={isInvalid ? "danger" : "success"}
                    // errorMessage={isInvalid && "Please enter a valid email"}
                  />
                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Deskripsi Alat"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    onValueChange={(item) =>
                      setdataAlatDetail((prev: any) => {
                        return {
                          ...prev,
                          deskripsi: item,
                        };
                      })
                    }
                    value={dataAlatDetail.deskripsi}
                  />
                  {/* <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Tanggal Masuk"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    value={tanggalmasuk}
                    onValueChange={settanggalmasuk}
                  /> */}
                  <div className="mt-4 bg-gray-100">
                    <p>Tanggal Masuk</p>
                    <Datepicker
                      options={options}
                      onChange={handleChangeEdit}
                      show={show}
                      setShow={handleClose}
                    />
                  </div>
                  <div className="mt-4 bg-gray-100">
                    <p>Tanggal Kadaluarsa</p>
                    <Datepicker
                      options={options2}
                      onChange={handleChangeexpiredEdit}
                      show={showexpired}
                      setShow={handleCloseexpired}
                    />
                  </div>
                  {/* <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Tanggal Kadaluarsa"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    value={tanggalkadaluarsa}
                    onValueChange={settanggalkadaluarsa}
                  /> */}

                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Jumlah Stok"
                    labelPlacement="outside"
                    type="text"
                    inputMode="numeric"
                    variant="bordered"
                    onValueChange={(item) =>
                      setdataAlatDetail((prev: any) => {
                        return {
                          ...prev,
                          stock: Number(item),
                        };
                      })
                    }
                    value={dataAlatDetail.stock.toString()}
                  />
                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Status"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    onValueChange={(item) =>
                      setdataAlatDetail((prev: any) => {
                        return {
                          ...prev,
                          status: item,
                        };
                      })
                    }
                    value={dataAlatDetail.status}
                  />
                  {filesContent[0]?.content ? (
                    <Image
                      width={300}
                      alt="Foto Dokter"
                      src={filesContent[0]?.content}
                    />
                  ) : dataAlatDetail?.photo !== "" ? (
                    <Image
                      width={300}
                      alt="Foto Dokter"
                      src={dataAlatDetail?.foto}
                    />
                  ) : null}

                  <div>
                    <p>Foto</p>
                    <Button
                      onClick={() => openFilePicker()}
                      fullWidth={true}
                      radius="sm"
                    >
                      {plainFiles?.length > 0 ? "Choose Again" : "Choose File"}
                    </Button>
                    {plainFiles?.length > 0 && (
                      <Button
                        onClick={() => clear()}
                        fullWidth={true}
                        radius="sm"
                      >
                        Clear
                      </Button>
                    )}
                    {plainFiles?.map((file) => (
                      <div key={file.name}>{file.name}</div>
                    ))}
                  </div>
                  {/* <Input
                    isRequired
                    label="Password"
                    labelPlacement="outside"
                    // placeholder="Enter your password"
                    type={isVisible ? "text" : "password"}
                    className="mb-5 mt-4 bg-gray-100 bg-white rounded-xl"
                    onValueChange={setpassword}
                    value={password}
                    isInvalid={password.length < 8 ?? false}
                    color={password.length < 8 ? "danger" : "success"}
                    errorMessage={password.length < 8 && "Minimal 8 Karakter"}
                  />
                  <Checkbox isSelected={isVisible} onValueChange={setIsVisible}>
                    Show Password
                  </Checkbox> */}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Batal
                  </Button>
                  <Button
                    // isDisabled={submitCheck()}
                    color="primary"
                    variant="solid"
                    onPress={editAlat}
                    // isLoading={loadingButton}
                  >
                    Edit Alat
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      );
    } else if (conditionModal === 3) {
      return (
        <Modal
          isOpen={isOpen}
          placement={"center"}
          classNames={{ base:"light text-black"  }}
          onOpenChange={onOpenChange}
          // size="full"
          scrollBehavior={"inside"}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Yakin Hapus Data?
                </ModalHeader>
                <ModalBody>
                  <p>Apakah Kamu Yakin Untuk Menghapus Data?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="solid" onPress={onClose}>
                    Batal
                  </Button>
                  <Button
                    // isDisabled={submitCheck()}
                    color="danger"
                    variant="light"
                    onPress={() => deleteData()}
                    // isLoading={loadingButton}
                  >
                    Hapus Data
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      );
    }
  }
  return (
    <div className="flex flex-col bg-gray-200">
      {renderModal()}
      <div className="flex justify-between px-4 bg-white py-5">
        <div className="flex text-gray-500 font-semibold">
          <p>Manajemen Inventory - Alat</p>
        </div>
        <div className="flex gap-4">
          <div>Sikes</div>
          <div>/</div>
          <div>Manajemen</div>
          <div>/</div>
          <div>Inventori</div>
          <div>/</div>
          <div className="text-toscadb">Peralatan Medis</div>
        </div>
      </div>
      <div className="flex flex-col bg-white m-5 p-5 gap-5 rounded-md">
        <div>DATA ALAT</div>
        <div className="flex flex-row gap-5">
          <Button
            className="text-white bg-ungubt rounded-sm px-6 py-2"
            onClick={() => {
              clear();
              onOpen();
            }}
          >
            Tambah Alat
          </Button>
        </div>
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
        <CustomTable
          columns={columns}
          body={dataSortedAlat}
          pagination={dataSortedAlat.length > 10 ?? true}
          ondetail={(item: any) => openDetail(item)}
          onPressDelete={(item: any) => openDelete(item)}
        />
      </div>
      <FooterDB />
    </div>
  );
}

export default AlkesDB;
