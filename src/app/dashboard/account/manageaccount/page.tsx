"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import FooterDB from "@/components/layout/dashboard/Footer";
import CustomTable from "@/components/layout/dashboard/CustomTable";
import { PlusIcon } from "@heroicons/react/20/solid";
import getDataCollection from "@/components/firebase/getDataCollection";
import updateData from "@/components/firebase/updateData";
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
  Checkbox,
} from "@nextui-org/react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/components/firebase/config";
import { useRouter } from "next/navigation";
import signUp from "@/components/firebase/signup";
import createData from "@/components/firebase/createData";
import signIn from "@/components/firebase/signin";
import { toast } from "react-toastify";

const auth = getAuth(firebase_app);

function ManageaccountDB() {
  const router = useRouter();
  const [active, setActive] = useState(2);
  const [reload, setReload] = useState(true);
  const [dataAccount, setdataAccount] = useState([]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [deleteUser, setdeleteUser] = useState<any>();
  const [conditionModal, setconditionModal] = useState(0);
  const [email, setEmail] = useState("");
  const [nama, setnama] = useState("");
  const [role, setrole] = useState(5);
  const [password, setpassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loadingButton, setloadingButton] = useState(false);
  const [tempCurrentUser, setTempCurrentUser] = useState();

  async function getDataRole() {
    const { result, error } = await getDataCollection("Role");
    if (error) {
      toast("Error Get Role Data !");
      return;
    }
    if (result) {
      setReload(false);
      setdataAccount(result);
    }
  }

  useEffect(() => {
    if (reload) {
      getDataRole();
    }
  }, [reload]);

  const roleCheck = useCallback(
    async (user: { email: any }) => {
      let search: any = dataAccount.find((data: any) => {
        return user?.email === data?.email;
      });
      if (search?.role === 0) {
        setTempCurrentUser(search);
        return;
      } else if (search === undefined) {
        setTempCurrentUser(search);
        return;
      } else {
        return router.push("/dashboard/beranda");
      }
    },
    [dataAccount, router]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        roleCheck(user);
      }
    });

    return () => unsubscribe();
  }, [roleCheck]);

  const columns = [
    { name: "No ", uid: "nomor" },
    { name: "Nama", uid: "nama" },
    { name: "Role", uid: "role" },
    { name: "Action", uid: "manageprofile" },
  ];

  const body = [
    { id: 1, nomor: 1, name: "John Doe", role: "Superadmin" },
    { id: 2, nomor: 2, name: "John Doe", role: "Pegawai" },
  ];

  async function hideUser() {
    onClose();
    let databaru = {
      email: deleteUser?.email,
      name: deleteUser?.nama,
      role: deleteUser?.role,
      visible: false,
    };
    const { result, error } = await updateData(
      "Role",
      deleteUser?.id,
      databaru
    );
    if (error) {
      toast("Error Delete Data !");
      return;
    }
  }
  function openModal() {
    onOpen();
  }

  function deleteAccount(user: any) {
    setconditionModal(1);
    openModal();
    setdeleteUser(user);
  }
  function addUser() {
    setconditionModal(2);
    openModal();
  }
  const roles = [
    {
      value: 0,
      label: "Super Admin",
    },
    {
      value: 1,
      label: "Dokter",
    },
    {
      value: 2,
      label: "Pegawai",
    },
  ];
  const handleSelectionChange = (e: any) => {
    setrole(e.target.value);
  };

  async function createAccount() {
    setloadingButton(true);
    let tempdata: any = tempCurrentUser;
    const { result, error } = await signUp(email, password);
    if (error) {
      setloadingButton(false);
      toast("Error Create Account, Make Sure Email Not Registered!");
      return;
    }
    if (result) {
      var data = {
        email: email,
        nama: nama,
        password: password,
        role: Number(role),
        visible: true,
      };
      const { result, error } = await createData("Role", data);
      if (error) {
        setloadingButton(false);
        toast("Error Create Role Data !");
        return;
      }
      if (result) {
        setEmail("");
        setnama("");
        setpassword("");
        setrole(5);
        onClose();
        console.log("temp data ", tempdata);
        const { result, error } = await signIn(
          tempdata?.email,
          tempdata?.password
        );
        setloadingButton(false);
        setReload(true);
        if (error) {
          toast("Error Get  !");
          return;
        }
      }
    }
  }

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const submitCheck = useCallback(() => {
    if (!isInvalid && password.length > 8 && role !== 5 && nama.length > 0) {
      return false;
    } else {
      return true;
    }
  }, [isInvalid, nama.length, password.length, role]);

  function renderModel() {
    if (conditionModal === 1) {
      return (
        <Modal isOpen={isOpen} placement={"center"} onOpenChange={onOpenChange} classNames={{ base: "light" }}>
          <ModalContent>
            {(onClose: any) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-black">
                  Konfirmasi
                </ModalHeader>
                <ModalBody className="text-black">
                  <p>Yakin Hapus Account?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="light" onPress={onClose}>
                    Batal
                  </Button>
                  <Button color="danger" variant="solid" onPress={hideUser}>
                    Hapus
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      );
    } else if (conditionModal === 2) {
      return (
        <Modal isOpen={isOpen} placement={"center"} onOpenChange={onOpenChange} classNames={{ base:"light" }}>
          <ModalContent>
            {(onClose: any) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-black">
                  Tambah Akun Baru
                </ModalHeader>
                <ModalBody>
                  <Input
                    labelPlacement="outside"
                    type="email"
                    label="Email"
                    name="email"
                    onValueChange={setEmail}
                    value={email}
                    isInvalid={isInvalid}
                    color={isInvalid ? "danger" : "success"}
                    errorMessage={isInvalid && "Please enter a valid email"}
                  />
                  <Input
                    autoFocus
                    // endContent={
                    //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    label="Nama Pengguna"
                    name="nama"
                    labelPlacement="outside"
                    type="text"
                    variant="bordered"
                    value={nama}
                    onValueChange={setnama}
                  />
                  <Select
                    labelPlacement="outside"
                    label="Role"
                    id="role"
                    placeholder="Select an Role"
                    className="max-w-ful bg-gray-100"
                    // value={role}
                    // onCha
                    selectedKeys={[role]}
                    onChange={handleSelectionChange}
                  >
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value} classNames={{ base: "light" }} className="text-white">
                        {role.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    isRequired
                    label="Password"
                    name="password"
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
                  </Checkbox>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Batal
                  </Button>
                  <Button
                    isDisabled={submitCheck()}
                    color="primary"
                    id="submit-akun"
                    variant="solid"
                    onPress={createAccount}
                    isLoading={loadingButton}
                  >
                    Simpan
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
    <div className="flex h-95v flex-col  justify-between bg-gray-200">
      {renderModel()}
      <div>
        <div className="flex justify-between px-4 bg-white py-5">
          <div className="flex text-gray-500 font-semibold ">
            <p>MANAJEMEN AKUN</p>
          </div>
          <div className="flex gap-4">
            <div>Sikes</div>
            <div>/</div>
            <div className={`${active === 2 ? "text-toscadb" : ""}`}>
              Manajemen Akun
            </div>
          </div>
        </div>
        <div className="flex flex-col p-6 ">
          <div className="flex flex-row ">
            <div className="flex flex-col p-6  rounded-md w-full h-full">
              <div className="bg-white rounded-2xl">
                <div className="flex flex-row items-center p-6 gap-2 border-b-2 ">
                  <Button
                    className="bg-ungubt py-2 "
                    onPress={addUser}
                    id="tambah-akun"
                  >
                    <PlusIcon
                      className="h-5 w-5 text-white font-bold hover:text-violet-100"
                      aria-hidden="true"
                    />
                    <p id="tambah_akun" className="text-white">
                      Akun Baru
                    </p>
                  </Button>
                </div>
              </div>
              <CustomTable
                columns={columns}
                body={dataAccount}
                onPressDelete={(user: any) => deleteAccount(user)}
              />
              <div className="bg-white rounded-2xl">
                <div className="flex flex-row items-center p-3 gap-2 border-b-2 "></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterDB />
    </div>
  );
}
export default ManageaccountDB;
