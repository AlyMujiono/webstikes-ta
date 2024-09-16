import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
  Pagination,
  Spinner,
  Image,
} from "@nextui-org/react";
import { EditIcon } from "@/components/assets/EditIcon";
import { DeleteIcon } from "@/components/assets/DeleteIcon";
import { EyeIcon } from "@/components/assets/EyeIcon";
import { BellAlertIcon } from "@heroicons/react/20/solid";
// import {columns, users} from "./data";
import { useAsyncList } from "@react-stately/data";
import Link from "next/link";

const statusColorMap: any = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function CustomTable({
  columns,
  body,
  ondetail,
  onPressDelete,
  pagination,
  onEdit,
  isLoading,
  addtionalArrayItems,
}: {
  columns: any;
  body: any;
  ondetail?: any;
  onPressDelete?: any;
  onEdit?: any;
  pagination?: boolean;
  isLoading?: boolean;
  addtionalArrayItems?: any[];
}) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(body.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return body.slice(start, end);
  }, [body, page]);

  // const renderWarning= React.useCallback(()=>{},[])

  function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() + 14);
    return previous.valueOf();
  }

  const checkExpired = React.useCallback((date: any, stock: number) => {
    if (
      date.toDate().valueOf() < new Date().valueOf() ||
      (date.toDate().valueOf() < getPreviousDay() &&
        date.toDate().valueOf() > new Date().valueOf()) ||
      stock <= 20
    ) {
      // console.log('true ',a.expired_date.toDate())
      return true;
    } else {
      return false;
    }
  }, []);

  const renderCell = React.useCallback(
    (user: any, columnKey: any) => {
      let cellValue;
      if (columnKey === "harikerja") {
        cellValue = "Test";
      } else {
        cellValue = user[columnKey];
      }
      function renderRole(value: number) {
        if (value === 0) {
          return "Super Admin";
        } else if (value === 1) {
          return "Dokter";
        } else if (value === 2) {
          return "Pegawai";
        }
      }

      function renderDate(value: any) {
        const options: Intl.DateTimeFormatOptions = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        // console.log("value ", value);
        if (typeof value === "string") {
          return value;
        }
        let date = new Date(value.toDate());
        // console.log("date ", date);
        // return date.toString();
        return date.toLocaleDateString("id", options);
      }

      function renderKategori(items: any) {
        let kategori = addtionalArrayItems?.find((item) => {
          return item?.value === items;
        });
        return kategori?.name;
      }

      switch (columnKey) {
        case "nrk":
          return (
            <div>
              <p>
                {user.tanggalberobat
                  ? user.tanggalberobat.toDate().valueOf()
                  : null}
              </p>
            </div>
          );
        case "nrm":
          return (
            <div>
              <p>{user.nrm}</p>
            </div>
          );
        case "nomor":
          return (
            <div>
              <p>{user.nomor}</p>
            </div>
          );
        case "names":
          return (
            <div>
              <p>{user.name}</p>
            </div>
          );
        case "nameObat":
          return (
            <div
              className={`${
                checkExpired(user.expired_date, user.stock) ? "flex gap-2" : ""
              }`}
            >
              {checkExpired(user.expired_date, user.stock) && (
                <BellAlertIcon
                  className="h-5 w-5 text-red-500 font-bold"
                  aria-hidden="true"
                />
              )}
              <p>{user.nama}</p>
            </div>
          );
        case "dokter":
          return (
            <div>
              <p>{user.dokter}</p>
            </div>
          );
        case "deskripsi":
          return (
            <div className="w-48">
              <p className="truncate">{user.deskripsi}</p>
            </div>
          );
        case "expired_in":
          return (
            <div>
              <p>{renderDate(user.expired_in)}</p>
            </div>
          );
        case "expired_date":
          return (
            <div>
              <p>{renderDate(user.expired_date)}</p>
            </div>
          );
        case "stock":
          return (
            <div>
              <p>{user.stock.toString()}</p>
            </div>
          );
        case "foto":
          return <Image src={user.foto} alt="Foto Content" width={30} />;
        case "kategori":
          return (
            <div>
              <p>{renderKategori(user.kategori)}</p>
            </div>
          );
        case "statusPasien":
          return (
            <div>
              <Chip
                className="capitalize p-1"
                color={
                  user.statusProsesMedis === 0
                    ? "danger"
                    : user.statusProsesMedis === 1
                    ? "warning"
                    : "success"
                }
                size="sm"
                variant="flat"
              >
                {user.statusProsesMedis === 0
                  ? "belum di periksa"
                  : user.statusProsesMedis === 1
                  ? "sedang di periksa"
                  : "sudah di periksa"}
              </Chip>
            </div>
          );
        case "jamkerja":
          return (
            <div>
              {user.hariKerja.map((data: any) => {
                return (
                  <div key={data.id} className="flex flex-row gap-2">
                    <p>{data.start}</p>
                    <p>-</p>
                    <p>{data.end}</p>
                  </div>
                );
              })}
            </div>
          );
        case "harikerja":
          return (
            <div className="flex flex-col">
              {user.hariKerja.map((data: any, index: number) => {
                if (index !== user.hariKerja.length - 1) {
                  return (
                    <div key={data.id} className="flex flex-col">
                      <p>{data.hari}</p>
                    </div>
                  );
                } else {
                  return (
                    <div key={data.id} className="flex flex-row gap-2">
                      <p>{data.hari}</p>
                    </div>
                  );
                }
              })}
            </div>
          );
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: user.avatar }}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </User>
          );
        case "statusdokter":
          return (
            <Chip
              className="capitalize"
              color={user.status === 0 ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {user.status === 0 ? "Tersedia" : "Tidak Tersedia"}
            </Chip>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p
                className={`flex text-bold text-sm capitalize p-2 items-center justify-center ${
                  user.role === 0
                    ? "bg-red-700 text-white"
                    : user.role === 1
                    ? "bg-green-700 text-white"
                    : "bg-yellow-400 text-black"
                }`}
              >
                {renderRole(user.role)}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user?.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2 text-white">
              {ondetail ? (
                <Tooltip content="Details" className="text-white">
                  <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={() => ondetail(user)}
                  >
                    <EyeIcon />
                  </span>
                </Tooltip>
              ) : null}
              {onEdit ? (
                <Tooltip content="Edit Status" className="text-white">
                  <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={() => onEdit(user)}
                  >
                    <EditIcon />
                  </span>
                </Tooltip>
              ) : null}
              {onPressDelete ? (
                <Tooltip color="danger" content="Delete user">
                  <span
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                    onClick={() => onPressDelete(user)}
                  >
                    <DeleteIcon />
                  </span>
                </Tooltip>
              ) : null}
            </div>
          );
        case "antrian":
          return (
            <div className="relative flex items-center gap-2 text-white">
              {ondetail ? (
                <Tooltip content="Details" className="text-white">
                  <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={() => ondetail(user)}
                  >
                    <EyeIcon />
                  </span>
                </Tooltip>
              ) : (
                <Tooltip content="Details" className="text-white">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50 bg-white">
                    <EyeIcon />
                  </span>
                </Tooltip>
              )}
              <Tooltip color="danger" content="Delete">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        case "pasien":
          return (
            <div className="relative flex items-center gap-2 text-white">
              <Tooltip content="Details" className="text-white">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50 bg-white">
                  <EyeIcon />
                </span>
              </Tooltip>
            </div>
          );
        case "manageprofile":
          return (
            <div className="relative flex items-center gap-2">
              {onPressDelete ? (
                <Tooltip color="danger" content="Delete">
                  <span
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                    onClick={() => onPressDelete(user)}
                  >
                    <DeleteIcon />
                  </span>
                </Tooltip>
              ) : (
                <Tooltip color="danger" content="Delete">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                  </span>
                </Tooltip>
              )}
            </div>
          );

        case "antrianRekamMedis":
          return (
            <div className="relative flex items-center gap-2 text-white">
              <Tooltip content="Details" className="text-white">
                <Link
                  href={{
                    pathname:
                      user.statusProsesMedis === 0
                        ? "/dashboard/manajemen/rekamMedis/edit"
                        : user.statusProsesMedis === 2
                        ? "/dashboard/manajemen/rekamMedis/lihat"
                        : undefined,
                    query: {
                      data: user.id,
                    }, // the data
                  }}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50 bg-white"
                >
                  <EyeIcon />
                </Link>
              </Tooltip>
              {onPressDelete ? (
                <Tooltip color="danger" content="Delete">
                  <span
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                    onClick={() => onPressDelete(user)}
                  >
                    <DeleteIcon />
                  </span>
                </Tooltip>
              ) : null}
            </div>
          );
        default:
          return cellValue;
      }
    },
    [addtionalArrayItems, checkExpired, onEdit, onPressDelete, ondetail]
  );

  if (pagination) {
    return (
      <Table
        isStriped
        aria-label="Example table with custom cells"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page: any) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns} className="flex ">
          {/* <TableColumn key={1} align={"start"}>
							test
						</TableColumn> */}
          {(column: any) => (
            <TableColumn
              className="py-3"
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No Data found"}
          items={items}
          isLoading={isLoading ? isLoading : false}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey: any) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  } else {
    return (
      <Table
        isStriped
        aria-label="Example table with custom cells"
        classNames={{ wrapper: "light" }}
      >
        <TableHeader columns={columns} className="flex ">
          {/* <TableColumn key={1} align={"start"}>
							test
						</TableColumn> */}
          {(column: any) => (
            <TableColumn
              className="py-3"
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No Data found"} items={body}>
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey: any) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}
