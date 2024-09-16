"use client";
import { SearchIcon } from "@/components/assets/SearchIcon";
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
import { m } from "framer-motion";
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFilePicker } from "use-file-picker";
import Datepicker from "tailwind-datepicker-react";
import createData from "@/components/firebase/createData";
import uploadFoto from "@/components/firebase/uploadFoto";
import getDataCollection from "@/components/firebase/getDataCollection";
import { toast } from "react-toastify";
import updateData from "@/components/firebase/updateData";

function PegawaiDB() {
  const [active, setActive] = useState(2);
  const [conditionModal, setconditionModal] = useState(1);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [pegawai, setpegawai] = useState("");
  const [Nip, setNip] = useState("");
  const [jabatan, setjabatan] = useState("");
  const [datebirth, setdatebirth] = useState(new Date());
  const [gender, setgender] = useState(99);
  const [phone, setphone] = useState("");
  const [alamat, setalamat] = useState("");
  const [email, setemail] = useState("");
  const [alumni, setalumni] = useState("");
  const [hari, sethari] = useState("");
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState("");
  const [waktuPraktek, setwaktuPraktek] = useState<any>();
  const [statusAvailable, setstatusAvailable] = useState(99);
  const [show, setShow] = useState(false);
  const [reload, setReload] = useState(true);
  const [dataPegawai, setdataPegawai] = useState([]);
  const [chooseData, setChooseData] = useState<any>();
  const [dataSortedPegawai, setdataSortedPegawai] = useState<any>([]);
  const [search, setsearch] = useState<any>("");

  const { openFilePicker, filesContent, loading, errors, plainFiles, clear } =
    useFilePicker({
      readAs: "DataURL",
      accept: "image/*",
      multiple: false,
      onFilesSelected: ({ plainFiles, filesContent, errors }) => {
        // this callback is always called, even if there are errors
        console.log("onFilesSelected", plainFiles, filesContent, errors);
      },
      onFilesRejected: ({ errors }) => {
        // this callback is called when there were validation errors
        console.log("onFilesRejected", errors);
      },
      onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
        // this callback is called when there were no validation errors
        console.log("onFilesSuccessfullySelected", plainFiles, filesContent);
      },
    });

  const columns = [
    { name: "Nama Lengkap", uid: "nama" },
    { name: "NIP", uid: "NIP" },
    { name: "Jabatan", uid: "jabatan" },
    { name: "Jam", uid: "jamkerja" },
    { name: "Hari", uid: "harikerja" },
    { name: "Aksi", uid: "actions" },
  ];

  const body = [
    {
      id: 1,
      nomor: 1,
      name: "dr. Neng Ayu Rati Purwani",
      specialist: "pegawai",
      day: "Senin - Kamis",
      time: "08.00 - 14.30",
    },
  ];

  const handleSelectionChange = (e: any) => {
    setgender(e.target.value);
  };
  const handleSelectionChangeStartTime = (e: any) => {
    setstartTime(e.target.value);
  };
  const handleSelectionChangeEndTime = (e: any) => {
    setendTime(e.target.value);
  };
  const handleSelectionChangeDay = (e: any) => {
    sethari(e.target.value);
  };
  const handleSelectionStatus = (e: any) => {
    setstatusAvailable(e.target.value);
  };
  const handleSelectionStatusEdit = (e: any) => {
    setChooseData((prev: any) => {
      return { ...prev, status: Number(e.target.value) };
    });
  };
  const handleSelectionChangeEditGender = (e: any) => {
    setChooseData((prev: any) => {
      return { ...prev, gender: e.target.value };
    });
  };
  const timeOptionsPicker = [
    {
      value: "00.00",
    },
    {
      value: "00.30",
    },
    {
      value: "01.00",
    },
    {
      value: "01.30",
    },
    {
      value: "02.00",
    },
    {
      value: "02.30",
    },
    {
      value: "03.00",
    },
    {
      value: "03.30",
    },
    {
      value: "04.00",
    },
    {
      value: "04.30",
    },
    {
      value: "05.00",
    },
    {
      value: "05.30",
    },
    {
      value: "06.00",
    },
    {
      value: "06.30",
    },
    {
      value: "07.00",
    },
    {
      value: "07.30",
    },
    {
      value: "08.00",
    },
    {
      value: "08.30",
    },
    {
      value: "09.00",
    },
    {
      value: "09.30",
    },
    {
      value: "10.00",
    },
    {
      value: "10.30",
    },
    {
      value: "11.00",
    },
    {
      value: "11.30",
    },
    {
      value: "12.00",
    },
    {
      value: "12.30",
    },
    {
      value: "13.00",
    },
    {
      value: "13.30",
    },
    {
      value: "14.00",
    },
    {
      value: "14.30",
    },
    {
      value: "15.00",
    },
    {
      value: "15.30",
    },
    {
      value: "16.00",
    },
    {
      value: "16.30",
    },
    {
      value: "17.00",
    },
    {
      value: "17.30",
    },
    {
      value: "18.00",
    },
    {
      value: "18.30",
    },
    {
      value: "19.00",
    },
    {
      value: "19.30",
    },
    {
      value: "20.00",
    },
    {
      value: "20.30",
    },
    {
      value: "21.00",
    },
    {
      value: "21.30",
    },
    {
      value: "22.00",
    },
    {
      value: "22.30",
    },
    {
      value: "23.00",
    },
    {
      value: "23.30",
    },
  ];

  const hariOptions = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ];

  function tambahWaktuPraktek() {
    setwaktuPraktek((prev: any) => {
      var id = "id" + Math.random().toString(16).slice(2);
      let temp = { id: id, hari: hari, start: startTime, end: endTime };
      if (prev && prev.length > 0) {
        return [...prev, temp];
      } else {
        return [temp];
      }
    });
    sethari("");
    setstartTime("");
    setendTime("");
  }

  function tambahWaktuPraktekEdit() {
    var id = "id" + Math.random().toString(16).slice(2);
    let tempdata = chooseData.hariKerja;
    let temp = { id: id, hari: hari, start: startTime, end: endTime };
    tempdata.push(temp);
    setChooseData((prev: any) => {
      return { ...prev, hariKerja: tempdata };
    });
    sethari("");
    setstartTime("");
    setendTime("");
  }

  function hapusWaktuPraktek(value: any) {
    var filteredArray = waktuPraktek?.filter(
      (e: { id: any }) => e.id !== value
    );
    setwaktuPraktek(filteredArray);
  }
  function hapusWaktuPraktekEdit(value: any) {
    var filteredArray = chooseData?.hariKerja.filter(
      (e: { id: any }) => e.id !== value
    );
    setChooseData((prev: any) => {
      return { ...prev, hariKerja: filteredArray };
    });
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

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
    inputPlaceholderProp: "Pilih Tanggal Lahir",
    inputDateFormatProp: dateOptions,
  };
  const optionsEdit = {
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
    defaultDate: new Date(
      chooseData?.date_birth instanceof Date
        ? chooseData?.date_birth
        : chooseData?.date_birth?.toDate()
    ),
    language: "id",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Pilih Tanggal Lahir",
    inputDateFormatProp: dateOptions,
  };

  const handleChange = (selectedDate: Date) => {
    setdatebirth(selectedDate);
  };
  const handleChangeEditBirth = (selectedDate: Date) => {
    setChooseData((prev: any) => {
      return { ...prev, date_birth: selectedDate };
    });
    // setdatebirth(selectedDate);
  };

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  async function getDataPegawai() {
    const { result, error } = await getDataCollection("Pegawai");
    if (error) {
      toast("Error Get Employee Data !");
      return;
    }
    if (result) {
      setReload(false);
      setdataPegawai(result);
      setdataSortedPegawai(result);
      // console.log("result ", result);
    }
  }

  useEffect(() => {
    if (reload) {
      getDataPegawai();
    }
  }, [reload]);

  async function createPegawai() {
    const { result, error } = await uploadFoto(
      "Pegawai",
      plainFiles[0].name,
      filesContent[0].content
    );
    if (error) {
      console.log("error");
    }
    var link_photo = result;
    if (link_photo) {
      var data = {
        nama: pegawai,
        NIP: Nip,
        jabatan: jabatan,
        date_birth: datebirth,
        gender: gender,
        telepon: phone,
        alamat: alamat,
        email: email,
        alumni: alumni,
        hariKerja: waktuPraktek,
        photo: link_photo,
        status: Number(statusAvailable),
        visible: true,
        created_ad: new Date(),
      };
      const { result, error } = await createData("Pegawai", data);
      if (error) {
        console.log("error");
      }
      setReload(true);
    }
  }

  function modalHandler(value: number) {
    clear();
    setconditionModal(value);
    onOpen();
  }
  function openDetail(data: any) {
    sethari("");
    setstartTime("");
    setendTime("");
    setChooseData(data);
    modalHandler(4);
  }
  function onEdit(data: any) {
    setChooseData(data);
    modalHandler(2);
  }
  function openDelete(data: any) {
    setChooseData(data);
    modalHandler(3);
  }
  async function updateStatusAvailable(item: any) {
    let data = item;
    if (data) {
      if (data.status === 0) {
        data.status = 1;
      } else {
        data.status = 0;
      }
      let id = data.id;
      delete data.nomor;
      delete data.id;
      const { result, error } = await updateData("Pegawai", id, data);
      if (error) {
        toast(error);
        return console.log("error ", error);
      }
      toast("Update Berhasil");
      setReload(true);
      setChooseData([]);
      onClose();
    }
  }
  async function deleteDataPegawai(item: any) {
    let data = item;
    if (data) {
      data.visible = false;
      let id = data.id;
      delete data.nomor;
      delete data.id;
      const { result, error } = await updateData("Pegawai", id, data);
      if (error) {
        toast(error);
        return console.log("error ", error);
      }
      toast("Hapus Data Berhasil");
      setReload(true);
      setChooseData([]);
      onClose();
    }
  }
  // useEffect(() => {
  //   console.log("choose data", chooseData);
  // }, [chooseData]);

  async function updateEditPegawai() {
    if (filesContent[0]?.content) {
      const { result, error } = await uploadFoto(
        "Pegawai",
        plainFiles[0].name,
        filesContent[0].content
      );
      if (error) {
        console.log("error");
      }
      var link_photo = result;
      if (link_photo) {
        var data = { ...chooseData };
        var id = data.id;
        delete data.nomor;
        delete data.id;
        data.photo = link_photo;
        const { result, error } = await updateData("Pegawai", id, data);
        if (error) {
          console.log("error");
        }
        setReload(true);
      }
    } else {
      var data = { ...chooseData };
      var id = data.id;
      delete data.nomor;
      delete data.id;
      const { result, error } = await updateData("Pegawai", id, data);
      if (error) {
        console.log("error");
      }
      setReload(true);
    }
    onClose();
  }

  const sortedSearch = useMemo(() => {
    let sortData = dataPegawai
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

    setdataSortedPegawai(sortData);
  }, [dataPegawai, search]);

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
            {(onClose: any) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-black">
                  Tambah Pegawai
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    labelPlacement="outside"
                    type="text"
                    // type="email"
                    label="Nama Pegawai"
                    onValueChange={setpegawai}
                    value={pegawai}
                    variant="bordered"
                    // isInvalid={isInvalid}
                    // color={isInvalid ? "danger" : "success"}
                    // errorMessage={isInvalid && "Please enter a valid email"}
                  />
                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="NIP"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    value={Nip}
                    onValueChange={setNip}
                  />
                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Jabatan"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    value={jabatan}
                    onValueChange={setjabatan}
                  />
                  {/* <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Tanggal Lahir"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    value={datebirth}
                    onValueChange={setdatebirth}
                  /> */}
                  <div className="mt-4 bg-gray-100 text-black">
                    <p>Tanggal Lahir</p>
                    <Datepicker
                      options={options}
                      onChange={handleChange}
                      show={show}
                      setShow={handleClose}
                    />
                  </div>
                  <Select
                    labelPlacement="outside"
                    label="Jenis Kelamin"
                    classNames={{ base:"light" }}
                    placeholder="Select an Gender"
                    className="max-w-full bg-gray-100"
                    // value={role}
                    // onCha
                    selectedKeys={[gender]}
                    onChange={handleSelectionChange}
                  >
                    <SelectItem key={0} value={0} classNames={{ base: "light" }} className="text-white">
                      Pria
                    </SelectItem>
                    <SelectItem key={1} value={1} classNames={{ base: "light" }} className="text-white">
                      Wanita
                    </SelectItem>
                  </Select>
                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Nomor Telepon"
                    labelPlacement="outside"
                    type="text"
                    inputMode="numeric"
                    variant="bordered"
                    value={phone}
                    onValueChange={setphone}
                  />
                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Alamat"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    value={alamat}
                    onValueChange={setalamat}
                  />
                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Email"
                    labelPlacement="outside"
                    type="email"
                    variant="bordered"
                    value={email}
                    onValueChange={setemail}
                  />
                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Alumni"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    value={alumni}
                    onValueChange={setalumni}
                  />
                  <Select
                    labelPlacement="outside"
                    label="Hari Kerja"
                    classNames={{ base:"light" }}
                    placeholder="Select an Day"
                    className="max-w-full bg-gray-100"
                    // value={role}
                    // onCha
                    selectedKeys={[hari]}
                    onChange={handleSelectionChangeDay}
                  >
                    {hariOptions.map((hari) => (
                      <SelectItem key={hari} value={hari} classNames={{ base: "light" }} className="text-white">
                        {hari}
                      </SelectItem>
                    ))}
                  </Select>
                  <div className="flex justify-between items-center">
                    <Select
                      labelPlacement="outside"
                      label="Waktu Mulai"
                      classNames={{ base:"light" }}
                      placeholder="Select an Time"
                      className="max-w-full w-2/5 bg-gray-100"
                      // value={role}
                      // onCha
                      selectedKeys={[startTime]}
                      onChange={handleSelectionChangeStartTime}
                    >
                      {timeOptionsPicker.map((timeOptionsPicker) => (
                        <SelectItem
                          key={timeOptionsPicker.value}
                          value={timeOptionsPicker.value}
                          classNames={{ base: "light" }} className="text-white"
                        >
                          {timeOptionsPicker.value}
                        </SelectItem>
                      ))}
                    </Select>
                    <div className="flex items-center h-5 bg-red">
                      <p> - </p>
                    </div>
                    <Select
                      labelPlacement="outside"
                      label="Waktu Selesai"
                      classNames={{ base:"light" }}
                      placeholder="Select an Time"
                      className="max-w-full w-2/5 bg-gray-100"
                      // value={role}
                      // onCha
                      selectedKeys={[endTime]}
                      onChange={handleSelectionChangeEndTime}
                    >
                      {timeOptionsPicker.map((timeOptionsPicker) => (
                        <SelectItem
                          key={timeOptionsPicker.value}
                          value={timeOptionsPicker.value}
                          classNames={{ base: "light" }} className="text-white"
                        >
                          {timeOptionsPicker.value}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Button onClick={() => tambahWaktuPraktek()}>
                      Tambah Waktu Praktek
                    </Button>
                  </div>
                  <div>
                    {waktuPraktek?.map(
                      (
                        data: {
                          hari:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | PromiseLikeOfReactNode
                            | null
                            | undefined;
                          start:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | PromiseLikeOfReactNode
                            | null
                            | undefined;
                          end:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | PromiseLikeOfReactNode
                            | null
                            | undefined;
                          id: any;
                        },
                        index: Key | null | undefined
                      ) => {
                        return (
                          <div key={index} className="flex flex-row">
                            <div className="mr-2">{data.hari}</div>
                            <div className="mr-2">{data.start} -</div>
                            <div className="mr-2">{data.end}</div>
                            <Button onClick={() => hapusWaktuPraktek(data.id)}>
                              Hapus
                            </Button>
                          </div>
                        );
                      }
                    )}
                  </div>
                  {filesContent[0]?.content ? (
                    <Image
                      width={300}
                      alt="Foto Pegawai"
                      src={filesContent[0]?.content}
                    />
                  ) : null}
                  <div className="text-black">
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
                  <Select
                    labelPlacement="outside"
                    label="Status"
                    classNames={{ base:"light" }}
                    placeholder="Select an Status"
                    className="max-w-full bg-gray-100"
                    // value={role}
                    // onCha
                    selectedKeys={[statusAvailable]}
                    onChange={handleSelectionStatus}
                  >
                    <SelectItem key={0} value={0} classNames={{ base: "light" }} className="text-white">
                      Tersedia
                    </SelectItem>
                    <SelectItem key={1} value={1} classNames={{ base: "light" }} className="text-white">
                      Tidak Tersediia
                    </SelectItem>
                  </Select>
                  {/* <Input
                    isRequired
                    label="Password"
                    labelPlacement="outside"
                    // placeholder="Enter your password"
                    type={isVisible ? "text" : "password"}
                    className="mb-5 mt-2 bg-white rounded-xl"
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
                    onPress={createPegawai}
                    // isLoading={loadingButton}
                  >
                    Tambah Pegawai
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
            {(onClose: any) => (
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
                    onPress={() => deleteDataPegawai(chooseData)}
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
            {(onClose: any) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Ubah Status Ketersediaan
                </ModalHeader>
                <ModalBody>
                  <p>
                    Apakah Kamu Yakin Untuk Mengubah Status Ketersediaan ke{" "}
                    {chooseData?.status === 0 ? "Tidak Tersedia" : "Tersedia"}?
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Batal
                  </Button>
                  <Button
                    // isDisabled={submitCheck()}
                    color="primary"
                    variant="solid"
                    onPress={() => updateStatusAvailable(chooseData)}
                    // isLoading={loadingButton}
                  >
                    Ubah Status
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      );
    } else if (conditionModal === 4) {
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
            {(onClose: any) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Pegawai
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    labelPlacement="outside"
                    type="text"
                    // type="email"
                    label="Nama Pegawai"
                    onValueChange={(item: any) =>
                      setChooseData((prev: any) => {
                        return { ...prev, nama: item };
                      })
                    }
                    value={chooseData.nama}
                    variant="bordered"
                    // isInvalid={isInvalid}
                    // color={isInvalid ? "danger" : "success"}
                    // errorMessage={isInvalid && "Please enter a valid email"}
                  />
                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="NIP"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    onValueChange={(item: any) =>
                      setChooseData((prev: any) => {
                        return { ...prev, NIP: item };
                      })
                    }
                    value={chooseData.NIP}
                  />
                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Jabatan"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    onValueChange={(item: any) =>
                      setChooseData((prev: any) => {
                        return { ...prev, jabatan: item };
                      })
                    }
                    value={chooseData.jabatan}
                  />
                  {/* <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Tanggal Lahir"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    value={datebirth}
                    onValueChange={setdatebirth}
                  /> */}
                  <div className="mt-4 bg-gray-100">
                    <p>Tanggal Lahir</p>
                    <Datepicker
                      options={optionsEdit}
                      onChange={handleChangeEditBirth}
                      show={show}
                      setShow={handleClose}
                    />
                  </div>
                  <Select
                    labelPlacement="outside"
                    label="Jenis Kelamin"
                    classNames={{ base:"light" }}
                    placeholder="Select an Gender"
                    className="max-w-full bg-gray-100"
                    // value={role}
                    // onCha
                    selectedKeys={[chooseData.gender]}
                    onChange={handleSelectionChangeEditGender}
                  >
                    <SelectItem key={0} value={0} classNames={{ base: "light" }} className="text-white">
                      Pria
                    </SelectItem>
                    <SelectItem key={1} value={1} classNames={{ base: "light" }} className="text-white">
                      Wanita
                    </SelectItem>
                  </Select>
                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Nomor Telepon"
                    labelPlacement="outside"
                    type="text"
                    inputMode="numeric"
                    variant="bordered"
                    onValueChange={(item: any) =>
                      setChooseData((prev: any) => {
                        return { ...prev, telepon: item };
                      })
                    }
                    value={chooseData.telepon}
                  />
                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Alamat"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    onValueChange={(item: any) =>
                      setChooseData((prev: any) => {
                        return { ...prev, alamat: item };
                      })
                    }
                    value={chooseData.alamat}
                  />
                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Email"
                    labelPlacement="outside"
                    type="email"
                    variant="bordered"
                    onValueChange={(item: any) =>
                      setChooseData((prev: any) => {
                        return { ...prev, email: item };
                      })
                    }
                    value={chooseData.email}
                  />
                  <Input
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Alumni"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    onValueChange={(item: any) =>
                      setChooseData((prev: any) => {
                        return { ...prev, alumni: item };
                      })
                    }
                    value={chooseData.alumni}
                  />
                  <Select //belum di sesuaikan ke edit
                    labelPlacement="outside"
                    classNames={{ base:"light" }}
                    label="Hari Kerja"
                    placeholder="Select an Day"
                    className="max-w-full bg-gray-100"
                    // value={role}
                    // onCha
                    selectedKeys={[hari]}
                    onChange={handleSelectionChangeDay}
                  >
                    {hariOptions.map((hari) => (
                      <SelectItem key={hari} value={hari} classNames={{ base: "light" }} className="text-white">
                        {hari}
                      </SelectItem>
                    ))}
                  </Select>
                  <div className="flex justify-between items-center">
                    <Select
                      labelPlacement="outside"
                      label="Waktu Mulai"
                      classNames={{ base:"light" }}
                      placeholder="Select an Time"
                      className="max-w-full w-2/5 bg-gray-100"
                      // value={role}
                      // onCha
                      selectedKeys={[startTime]}
                      onChange={handleSelectionChangeStartTime}
                    >
                      {timeOptionsPicker.map((timeOptionsPicker) => (
                        <SelectItem
                          key={timeOptionsPicker.value}
                          value={timeOptionsPicker.value}
                          classNames={{ base: "light" }} className="text-white"
                        >
                          {timeOptionsPicker.value}
                        </SelectItem>
                      ))}
                    </Select>
                    <div className="flex items-center h-5 bg-red">
                      <p> - </p>
                    </div>
                    <Select
                      labelPlacement="outside"
                      classNames={{ base:"light" }}
                      label="Waktu Selesai"
                      placeholder="Select an Time"
                      className="max-w-full w-2/5 bg-gray-100"
                      // value={role}
                      // onCha
                      selectedKeys={[endTime]}
                      onChange={handleSelectionChangeEndTime}
                    >
                      {timeOptionsPicker.map((timeOptionsPicker) => (
                        <SelectItem
                          key={timeOptionsPicker.value}
                          value={timeOptionsPicker.value}
                          classNames={{ base: "light" }} className="text-white"
                        >
                          {timeOptionsPicker.value}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Button onClick={() => tambahWaktuPraktekEdit()}>
                      Tambah Waktu Praktek
                    </Button>
                  </div>
                  <div>
                    {chooseData.hariKerja?.map(
                      (
                        data: {
                          hari:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | PromiseLikeOfReactNode
                            | null
                            | undefined;
                          start:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | PromiseLikeOfReactNode
                            | null
                            | undefined;
                          end:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | PromiseLikeOfReactNode
                            | null
                            | undefined;
                          id: any;
                        },
                        index: Key | null | undefined
                      ) => {
                        return (
                          <div key={index} className="flex flex-row">
                            <div className="mr-2">{data.hari}</div>
                            <div className="mr-2">{data.start} -</div>
                            <div className="mr-2">{data.end}</div>
                            <Button
                              onClick={() => hapusWaktuPraktekEdit(data.id)}
                            >
                              Hapus
                            </Button>
                          </div>
                        );
                      }
                    )}
                  </div>
                  {filesContent[0]?.content ? (
                    <Image
                      width={300}
                      alt="Foto Peawai"
                      src={filesContent[0]?.content}
                    />
                  ) : chooseData?.photo !== "" ? (
                    <Image
                      width={300}
                      alt="Foto Pegawai"
                      src={chooseData?.photo}
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
                  <Select //belum di sesuaikan ke edit
                    labelPlacement="outside"
                    label="Status"
                    classNames={{ base:"light" }}
                    placeholder="Select an Status"
                    className="max-w-full bg-gray-100"
                    // value={role}
                    // onCha
                    selectedKeys={[chooseData.status.toString()]}
                    onChange={handleSelectionStatusEdit}
                  >
                    <SelectItem key={0} value={0} classNames={{ base: "light" }} className="text-white">
                      Tersedia
                    </SelectItem>
                    <SelectItem key={1} value={1} classNames={{ base: "light" }} className="text-white">
                      Tidak Tersedia
                    </SelectItem>
                  </Select>
                  {/* <Input
                    isRequired
                    label="Password"
                    labelPlacement="outside"
                    // placeholder="Enter your password"
                    type={isVisible ? "text" : "password"}
                    className="mb-5 mt-2 bg-white rounded-xl"
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
                    onPress={updateEditPegawai}
                    // isLoading={loadingButton}
                  >
                    Edit Pegawai
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
          <p>Manajemen Pegawai</p>
        </div>
        <div className="flex gap-4">
          <div>Sikes</div>
          <div>/</div>
          <div>Manajemen</div>
          <div>/</div>
          <div className="text-toscadb">Pegawai</div>
        </div>
      </div>
      <div className="flex flex-col bg-white m-5 p-5 gap-5 rounded-md">
        <div>DATA PEGAWAI</div>
        <div className="flex flex-row gap-5">
          <Button
            className="text-white bg-ungubt rounded-sm px-6 py-2"
            onClick={() => modalHandler(1)}
          >
            Tambah Pegawai
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
          body={dataSortedPegawai}
          pagination={dataSortedPegawai > 10 ? true : false}
          ondetail={(item: any) => openDetail(item)}
          onEdit={(item: any) => onEdit(item)}
          onPressDelete={(item: any) => openDelete(item)}
        />
      </div>
      <FooterDB />
    </div>
  );
}

export default PegawaiDB;
