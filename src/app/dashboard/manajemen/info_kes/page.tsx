"use client";
import { SearchIcon } from "@/components/assets/SearchIcon";
import CustomTable from "@/components/layout/dashboard/CustomTable";
import FooterDB from "@/components/layout/dashboard/Footer";
import { useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
  Select,
  SelectItem,
  Textarea,
  Image,
} from "@nextui-org/react";
import { useFilePicker } from "use-file-picker";
import uploadFoto from "@/components/firebase/uploadFoto";
import createData from "@/components/firebase/createData";
import getDataCollection from "@/components/firebase/getDataCollection";
import { toast } from "react-toastify";
import updateData from "@/components/firebase/updateData";

function InfoKesDB() {
  const [active, setActive] = useState(2);
  const [conditionModal, setconditionModal] = useState(0);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [search, setsearch] = useState<any>("");
  const [judul, setjudul] = useState("");
  const [deskripsi, setdeskripsi] = useState("");
  const [kategori, setkategori] = useState("");
  const [reload, setReload] = useState(true);
  const [dataContent, setdataContent] = useState([]);
  const [dataContentDetail, setdataContentDetail] = useState<any>();
  const [dataSortedContent, setdataSortedContent] = useState<any>([]);
  const [dataKatagori, setdataKatagori] = useState<any>([]);
  const [disabledEdit, setdisabledEdit] = useState(true);
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
    { name: "Judul", uid: "judul" },
    { name: "Kategori", uid: "kategori" },
    { name: "Keterangan", uid: "deskripsi" },
    { name: "Gambar", uid: "foto" },
    { name: "Aksi", uid: "actions" },
  ];

  const body = [
    {
      id: 1,
      nomor: 1,
      name: "informasi Gizi",
      category: "Gizi",
      detail: "gizi seimbang sejak dini",
      url: "gambar.png",
    },
  ];

  async function getDataContent() {
    const { result, error } = await getDataCollection("Content");
    if (error) {
      toast("Error Get Content Data !");
      return;
    }
    if (result) {
      setReload(false);
      setdataContent(result);
      setdataSortedContent(result);
    }
  }
  async function getDataKategoriContent() {
    const { result, error } = await getDataCollection("KategoriContent");
    if (error) {
      toast("Error Get KategoriContent Data !");
      return;
    }
    if (result) {
      setReload(false);
      setdataKatagori(result);
    }
  }

  useEffect(() => {
    if (reload) {
      getDataContent();
      getDataKategoriContent();
    }
  }, [reload]);

  const handleSelectionChange = (e: any) => {
    setkategori(e.target.value);
  };
  const handleSelectionChangeDetail = (e: any) => {
    setdataContentDetail((prev: any) => {
      return {
        ...prev,
        kategori: Number(e.target.value),
      };
    });
  };

  function addInfoModal() {
    clear();
    setconditionModal(1);
    onOpen();
  }
 
  async function onCreateData() {
    const data: any = {
      judul: judul,
      kategori: Number(kategori),
      deskripsi: deskripsi,
      foto: "",
      update_at: new Date(),
      created_at: new Date(),
      visible: true,
    };
    if (filesContent[0]?.content) {
      const { result, error } = await uploadFoto(
        "Content",
        plainFiles[0].name,
        filesContent[0].content
      );
      if (error) {
        console.log("error");
      }
      data.foto = result;
    }
    const { result, error } = await createData("Content", data);
    if (error) {
      console.log("error");
    }
    clear();
    onClose();
    setReload(true);
  }
  function openDetailModal(item: any) {
    setdataContentDetail(item);
    clear();
    setconditionModal(2);
    onOpen();
  }
  function openDeleteModal(item: any) {
    setdataContentDetail(item);
    clear();
    setconditionModal(3);
    onOpen();
  }

  async function updateContent() {
    const data: any = dataContentDetail;
    if (filesContent[0]?.content) {
      const { result, error } = await uploadFoto(
        "Content",
        plainFiles[0].name,
        filesContent[0].content
      );
      if (error) {
        console.log("error");
      }
      data.foto = result;
    }
    let id = data.id;
    data.update_at = new Date();
    delete data.id;
    delete data.nomor;
    const { result, error } = await updateData("Content", id, data);
    if (error) {
      console.log("error");
    }
    onClose();
    setReload(true);
  }

  async function deleteData() {
    const data: any = dataContentDetail;
    let id = data.id;
    data.visible = false;
    delete data.id;
    delete data.nomor;
    const { result, error } = await updateData("Content", id, data);
    if (error) {
      console.log("error");
    }
    onClose();
    setReload(true);
  }

  useMemo(() => {
    let sortData = dataContent
      .filter((data: any) => {
        return data.judul.toLowerCase().includes(search.toLowerCase());
      })
      .sort((a: any, b: any) => {
        if (
          a.judul.toLowerCase().indexOf(search.toLowerCase()) >
          b.judul.toLowerCase().indexOf(search.toLowerCase())
        ) {
          return 1;
        } else if (
          a.judul.toLowerCase().indexOf(search.toLowerCase()) <
          b.judul.toLowerCase().indexOf(search.toLowerCase())
        ) {
          return -1;
        } else {
          if (a.judul > b.judul) return 1;
          else return -1;
        }
      });

    setdataSortedContent(sortData);
  }, [dataContent, search]);

  function renderModal() {
    if (conditionModal === 0) {
      return (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="md"
          classNames={{ base:"light text-black"  }}
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Failed Render Modal
                </ModalHeader>
                <ModalBody>
                  <p>Failed render Modal, Please Try Again</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      );
    } else if (conditionModal === 1) {
      return (
        <Modal
          isOpen={isOpen}
          classNames={{ base:"light text-black"  }}
          onOpenChange={onOpenChange}
          size="2xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-black">
                  <p>Informasi Kesehatan</p>
                  <p>Silahkan Isi Informasi Dibawah</p>
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    labelPlacement="outside-left"
                    type="text"
                    // type="email"
                    label="Judul"
                    onValueChange={setjudul}
                    value={judul}
                    variant="bordered"
                    size="lg"
                    classNames={{
                      mainWrapper: "w-full",
                      label: "w-1/4",
                      inputWrapper: "bg-gray-100",
                    }}
                    placeholder="Masukkan Judul"
                    // isInvalid={isInvalid}
                    // color={isInvalid ? "danger" : "success"}
                    // errorMessage={isInvalid && "Please enter a valid email"}
                  />
                  <Select
                    label="Kategori"
                    labelPlacement="outside-left"
                    placeholder="Select A Category"
                    classNames={{ label: "w-1/4 text-black" }}
                    // className="bg-gray-100"
                    selectedKeys={[kategori]}
                    onChange={handleSelectionChange}
                  >
                    {dataKatagori?.map((katagori: any) => (
                      <SelectItem key={katagori.value} value={katagori.value} classNames={{ base: "light" }} className="text-white">
                        {katagori.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Textarea
                    label="Keterangan"
                    labelPlacement="outside-left"
                    placeholder="Enter your description"
                    value={deskripsi}
                    onValueChange={setdeskripsi}
                    size="lg"
                    classNames={{ base: "items-start", label: "pt-1 w-1/5" }}
                  />

                  <div className="flex flex-row w-full">
                    <div className="w-1/5 text-black">Gambar</div>
                    <div className="">
                      <Button onClick={() => openFilePicker()}>
                        {plainFiles?.length > 0
                          ? "Choose Again"
                          : "Choose File"}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    {filesContent[0]?.content ? (
                      <Image
                        width={300}
                        alt="Foto Content"
                        src={filesContent[0]?.content}
                      />
                    ) : null}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    variant="solid"
                    onPress={onCreateData}
                    className="p-1"
                  >
                    Submit
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
          onOpenChange={onOpenChange}
          size="md"
          classNames={{ base:"light text-black"  }}
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Detail Content
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    labelPlacement="outside-left"
                    type="text"
                    // type="email"
                    isReadOnly={disabledEdit}
                    label="Judul"
                    onValueChange={(item) =>
                      setdataContentDetail((prev: any) => {
                        return {
                          ...prev,
                          judul: item,
                        };
                      })
                    }
                    value={dataContentDetail.judul}
                    variant="bordered"
                    size="lg"
                    classNames={{
                      mainWrapper: "w-full",
                      label: "w-1/4",
                      inputWrapper: "bg-gray-100",
                    }}
                    placeholder="Masukkan Judul"
                    // isInvalid={isInvalid}
                    // color={isInvalid ? "danger" : "success"}
                    // errorMessage={isInvalid && "Please enter a valid email"}
                  />
                  <Select
                    label="Kategori"
                    labelPlacement="outside-left"
                    isDisabled={disabledEdit}
                    placeholder="Select A Category"
                    classNames={{ label: "w-1/4 text-black" }}
                    // className="bg-gray-100"
                    selectedKeys={[dataContentDetail.kategori.toString()]}
                    onChange={handleSelectionChangeDetail}
                  >
                    {dataKatagori?.map((katagori: any) => (
                      <SelectItem key={katagori.value} value={katagori.value} classNames={{ base: "light" }} className="text-white">
                        {katagori.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Textarea
                    label="Keterangan"
                    labelPlacement="outside-left"
                    placeholder="Enter your description"
                    isReadOnly={disabledEdit}
                    onValueChange={(item) =>
                      setdataContentDetail((prev: any) => {
                        return {
                          ...prev,
                          deskripsi: item,
                        };
                      })
                    }
                    value={dataContentDetail.deskripsi}
                    size="lg"
                    classNames={{ base: "items-start", label: "pt-1 w-1/5" }}
                  />
                  <div className="flex flex-row w-full">
                    <div className="w-1/5">Gambar</div>
                    <div className="">
                      <Button
                        onClick={() => openFilePicker()}
                        isDisabled={disabledEdit}
                      >
                        {plainFiles?.length > 0
                          ? "Choose Again"
                          : "Choose File"}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    {filesContent[0]?.content ? (
                      <Image
                        width={300}
                        alt="Foto Content"
                        src={filesContent[0]?.content}
                      />
                    ) : dataContentDetail?.foto !== "" ? (
                      <Image
                        width={300}
                        alt="Foto Content"
                        src={dataContentDetail?.foto}
                      />
                    ) : null}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    variant="solid"
                    onPress={() => setdisabledEdit(!disabledEdit)}
                  >
                    {disabledEdit ? "Edit" : "Batal Edit"}
                  </Button>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={disabledEdit ? onClose : updateContent}
                  >
                    {disabledEdit ? "Close" : "Update"}
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
          classNames={{ base:"light text-black"  }}
          onOpenChange={onOpenChange}
          size="md"
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Apakah Kamu Yakin Delete Data {dataContentDetail.judul}?
                </ModalHeader>
                <ModalBody></ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="danger" variant="solid" onPress={deleteData}>
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
    <div className="flex flex-col bg-gray-200 w-full min-h[90vh]">
      {renderModal()}
      <div className="flex justify-between px-4 bg-white py-5">
        <div className="flex text-gray-500 font-semibold">
          <p>Manajemen Informasi Kesehatan</p>
        </div>
        <div className="flex gap-4">
          <div>Sikes</div>
          <div>/</div>
          <div>Manajemen</div>
          <div>/</div>
          <div className="text-toscadb">Informasi Kesehatan</div>
        </div>
      </div>
      <div className="flex flex-col bg-white m-5 p-5 gap-5 rounded-md">
        <div>DATA INFORMASI KESEHATAN</div>
        <div className="flex flex-row gap-5">
          <Button
            className="text-white bg-ungubt rounded-sm px-6 py-2"
            onPress={addInfoModal}
          >
            Tambah Informasi
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
          body={dataSortedContent}
          pagination={dataSortedContent > 10 ? true : false}
          ondetail={(item: any) => openDetailModal(item)}
          onPressDelete={(item: any) => openDeleteModal(item)}
          addtionalArrayItems={dataKatagori}
        />
      </div>
      <FooterDB />
    </div>
  );
}

export default InfoKesDB;
