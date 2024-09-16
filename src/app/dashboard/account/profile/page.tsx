"use client";
import { useCallback, useEffect, useState } from "react";
import FooterDB from "@/components/layout/dashboard/Footer";
import {
  Button,
  CircularProgress,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { EditIcon } from "@/components/assets/EditIcon";
import getDataCollection from "@/components/firebase/getDataCollection";
import { toast } from "react-toastify";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase_app from "@/components/firebase/config";
import Datepicker from "tailwind-datepicker-react";
import updateData from "@/components/firebase/updateData";

const auth = getAuth(firebase_app);

function ProfileAcountDB() {
  const [active, setActive] = useState(2);
  const [reload, setReload] = useState(true);
  const [dataAccount, setdataAccount] = useState([]);
  const [currentUser, setcurrentUser] = useState<any>();
  const [editStatus, seteditStatus] = useState(true);
  const [show, setShow] = useState(false);

  async function getDataRole() {
    const { result, error } = await getDataCollection("Role");
    if (error) {
      toast("Error Get Role Data !");
      return;
    }
    if (result) {
      setdataAccount(result);
    }
  }

  useEffect(() => {
    if (reload) {
      getDataRole();
    }
  }, [reload]);

  const userCheck = useCallback(
    async (user: { email: any }) => {
      let search: any = dataAccount.find((data: any) => {
        return user?.email === data?.email;
      });
      setcurrentUser(search);
      setReload(false);
    },
    [dataAccount]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        userCheck(user);
      }
      if (reload) {
        if (user) {
          userCheck(user);
        }
      }
    });

    return () => unsubscribe();
  }, [reload, userCheck]);

  // useEffect(() => {
  //   console.log(
  //     "current user ",
  //     currentUser?.tanggalLahir?.toDate() ?? currentUser?.tanggalLahir
  //   );
  // }, [currentUser?.tanggalLahir]);

  const handleSelectionChangeEdit = (e: any) => {
    setcurrentUser((prev: any) => {
      return {
        ...prev,
        gender: e.target.value,
      };
    });
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
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
      currentUser?.tanggalLahir instanceof Date
        ? currentUser?.tanggalLahir
        : currentUser?.tanggalLahir?.toDate() ?? "2000-01-01"
    ),
    language: "id",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Pilih Tanggal",
    inputDateFormatProp: dateOptions,
  };
  const handleChangeEdit = (selectedDate: Date) => {
    setcurrentUser((prev: any) => {
      return {
        ...prev,
        tanggalLahir: selectedDate,
      };
    });
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  const listing = [
    {
      title: "Nama Lengkap",
      body: currentUser?.nama,
      onChangeValue: (item: any) =>
        setcurrentUser((prev: any) => {
          return {
            ...prev,
            nama: item,
          };
        }),
    },
    {
      title: "NIP",
      body: currentUser?.nip,
      onChangeValue: (item: any) =>
        setcurrentUser((prev: any) => {
          return {
            ...prev,
            nip: item,
          };
        }),
    },
    {
      title: "Jenis Kelamin",
      body: currentUser?.gender,
      onChangeValue: handleSelectionChangeEdit,
    },
    {
      title: "Tanggal Lahir",
      body: "01 januari 2001",
    },
    {
      title: "Spesialis",
      body: currentUser?.spesialis,
      onChangeValue: (item: any) =>
        setcurrentUser((prev: any) => {
          return {
            ...prev,
            spesialis: item,
          };
        }),
    },
    {
      title: "Nomor Telepon",
      body: currentUser?.telepon,
      onChangeValue: (item: any) =>
        setcurrentUser((prev: any) => {
          return {
            ...prev,
            telepon: item,
          };
        }),
    },
    {
      title: "Nama Kota/Kabupaten",
      body: currentUser?.city,
      onChangeValue: (item: any) =>
        setcurrentUser((prev: any) => {
          return {
            ...prev,
            city: item,
          };
        }),
    },
    {
      title: "Email",
      body: currentUser?.email,
    },
    {
      title: "Alumni",
      body: currentUser?.alumni,
      onChangeValue: (item: any) =>
        setcurrentUser((prev: any) => {
          return {
            ...prev,
            alumni: item,
          };
        }),
    },
    {
      title: "Pekerjaan",
      body: currentUser?.pekerjaan,
      onChangeValue: (item: any) =>
        setcurrentUser((prev: any) => {
          return {
            ...prev,
            pekerjaan: item,
          };
        }),
    },
    {
      title: "Alamat",
      body: currentUser?.alamat,
      onChangeValue: (item: any) =>
        setcurrentUser((prev: any) => {
          return {
            ...prev,
            alamat: item,
          };
        }),
    },
  ];

  async function updateDatas() {
    let data = { ...currentUser };
    let id = data.id;
    delete data.id;
    delete data.nomor;
    // console.log('data ',data)
    const { result, error } = await updateData("Role", id, data);
    if (error) {
      toast("Error Update Data");
    }
    seteditStatus(true);
    setReload(true);
  }

  if (reload) {
    return <CircularProgress aria-label="Loading..." />;
  } else {
    return (
      <div className="flex 2xl:h-100v flex-col bg-gray-200 ">
        <div className="flex flex-col flex-1">
          <div className="flex justify-between px-5 p-4 bg-white ">
            <div className="flex text-gray-500 font-semibold ">
              <p>PROFIL</p>
            </div>
            <div className="flex gap-4">
              <div>Sikes</div>
              <div>/</div>
              <div>Akun</div>
              <div>/</div>
              <div className={`${active === 2 ? "text-toscadb" : ""}`}>
                Profil
              </div>
            </div>
          </div>
          <div className="flex flex-col p-6 w-full ">
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-row m-6 rounded-md w-50 lg:h-60v md:h-80v bg-white justify-center">
                <div className="flex flex-col justify-items-center p-6 gap-2 rounded-lg">
                  <Image
                    isZoomed
                    width={240}
                    alt="NextUI Fruit Image with Zoom"
                    src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
                  />
                  <div className="text-center font-bold w-full pt-9">
                    {currentUser?.role === 0
                      ? "Super Admin"
                      : currentUser?.role === 1
                      ? "Dokter"
                      : "Pegawai"}
                  </div>
                  <div className="text-center w-full ">
                    NIP. {currentUser?.nip}
                  </div>
                </div>
              </div>
              <div className="flex flex-row 8  rounded-md w-full h-full bg-white">
                <div className="flex flex-col w-full p-5 border-2 rounded-lg bg-gray-100">
                  {listing.map((data, index) => (
                    <div
                      className={`flex flex-row w-full gap-9 border-2 p-2 rounded-md ${
                        index % 2 !== 0 ? "bg-gray-100 " : "bg-white "
                      }`}
                      key={index}
                    >
                      <div className="w-1/2 border-r-2 ">{data.title}</div>
                      {/* <div className="w-1/2">{data.body}</div> */}
                      {data.title === "Jenis Kelamin" ? (
                        <Select
                          // label="Jenis Kelamin"
                          placeholder="Pilih Jenis Kelamin"
                          className="w-1/2"
                          classNames={{ base: "light" }}
                          selectedKeys={[data.body]}
                          isDisabled={editStatus}
                          onChange={data.onChangeValue ?? undefined}
                        >
                          <SelectItem key={"pria"} value={"Pria"} className="text-white">
                            Pria
                          </SelectItem>
                          <SelectItem key={"wanita"} value={"Perempuan"} className="text-white">
                            Perempuan
                          </SelectItem>
                        </Select>
                      ) : data.title === "Tanggal Lahir" ? (
                        <div className="w-1/2 bg-gray-100">
                          <Datepicker
                            classNames="text-white"
                            options={optionsEdit}
                            onChange={handleChangeEdit}
                            show={editStatus ? false : show}
                            setShow={handleClose}
                          />
                        </div>
                      ) : (
                        <Input
                          value={data.body}
                          classNames={{ base: "light" }}
                          className="w-1/2 text-white"
                          size="sm"
                          isReadOnly={data.body === "Email" ? true : editStatus}
                          onValueChange={data.onChangeValue ?? undefined}
                        />
                      )}
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-4 items-center pt-5 justify-end m-3">
                    <Button
                      color="success"
                      className="p-2 pl-3 text-white"
                      onPress={() => seteditStatus(!editStatus)}
                    >
                      <EditIcon />
                      {editStatus ? "Edit Profile" : "Batal"}
                    </Button>
                    {!editStatus && (
                      <Button
                        color={"primary"}
                        className="p-2 pl-3 text-white"
                        onPress={updateDatas}
                      >
                        Update Data
                      </Button>
                    )}
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

export default ProfileAcountDB;
