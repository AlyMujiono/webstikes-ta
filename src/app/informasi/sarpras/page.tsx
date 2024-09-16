"use client";
import { useState } from "react";
import Navbar from "@/components/layout/homepage/navbar";
import Footer from "@/components/layout/homepage/footer";
import CustomTable from "@/components/layout/dashboard/CustomTable";

export default function sarprasPage() {
  // const [active, setActive] = useState(2);
  const columns1 = [
    { name: "No ", uid: "nomor" },
    { name: "jenis", uid: "names" },
    { name: "jumlah", uid: "amount" },
    { name: "kondisi", uid: "condition" },
  ];

  const body1 = [
    {
      id: 1,
      nomor: 1,
      name: "Puskesmas Induk",
      amount: "1",
      condition: "baik",
    },
    {
      id: 2,
      nomor: 2,
      name: "Puskesmas Pembantu",
      amount: "2",
      condition: "baik",
    },
    {
      id: 3,
      nomor: 3,
      name: "Perumahan Dokter",
      amount: "1",
      condition: "baik",
    },
    { id: 4, nomor: 4, name: "Poskesdes", amount: "1", condition: "baik" },
    {
      id: 5,
      nomor: 5,
      name: "Gedung Posyandu",
      amount: "4",
      condition: "baik",
    },
    {
      id: 6,
      nomor: 6,
      name: "Gedung Ruangan Isolasi",
      amount: "1",
      condition: "baik",
    },
  ];

  const columns2 = [
    { name: "No ", uid: "nomor" },
    { name: "Nama Ruang", uid: "names" },
    { name: "jumlah", uid: "amount" },
  ];

  const body2 = [
    { id: 1, nomor: 1, name: "Ruang Kepala Puskesmas", amount: "1" },
    { id: 2, nomor: 2, name: "Ruang Administrasi Kantor", amount: "1" },
  ];

  const columns3 = [
    { name: "No ", uid: "nomor" },
    { name: "Nama Ruang", uid: "names" },
    { name: "jumlah", uid: "amount" },
  ];

  const body3 = [
    {
      id: 1,
      nomor: 1,
      name: " Ruang Pendaftaran dan Rekam Medik ",
      amount: " 1 ",
    },
    { id: 2, nomor: 2, name: " Ruang Tunggu	", amount: " 2 " },
    { id: 3, nomor: 3, name: " Ruang Pemeriksaan Umum ", amount: " 1 " },
    { id: 4, nomor: 4, name: " Ruang Unit Gawat Darurat ", amount: " 1 " },
    { id: 5, nomor: 5, name: " Ruang Kesehatan Ibu dan KB ", amount: " 1 " },
    { id: 6, nomor: 6, name: " Ruang MTBS dan Imunisasi ", amount: " 1 " },
    {
      id: 7,
      nomor: 7,
      name: " Ruang Kesehatan Gigi dan Mulut ",
      amount: " 1 ",
    },
    { id: 8, nomor: 8, name: " Ruang Promosi Kesehatan ", amount: " 1 " },
    { id: 9, nomor: 9, name: " Ruang Farmasi ", amount: " 1 " },
    { id: 10, nomor: 10, name: " Ruang Menyusui / ASI ", amount: " 1 " },
    { id: 11, nomor: 11, name: " Ruang Laboratorium ", amount: " 1 " },
    { id: 12, nomor: 12, name: " Ruang Persalinan ", amount: " 1 " },
    {
      id: 13,
      nomor: 13,
      name: " Ruang Perawatan Pasca Persalinan ",
      amount: " 1 ",
    },
    { id: 14, nomor: 14, name: " Ruang Perawatan Laki-laki ", amount: " 1 " },
    { id: 15, nomor: 15, name: " Kamar Mandi Perawatan Pria ", amount: " 1 " },
    { id: 16, nomor: 16, name: " Ruang Perawatan Wanita ", amount: " 1 " },
    {
      id: 17,
      nomor: 17,
      name: " Kamar Mandi Perawatan Wanita ",
      amount: " 1 ",
    },
    { id: 18, nomor: 18, name: " Ruang Perawatan Anak-anak	", amount: " 1 " },
    {
      id: 19,
      nomor: 19,
      name: " Ruang Jaga Petugas Perawatan ",
      amount: " 1 ",
    },
    { id: 20, nomor: 20, name: " Kamar Mandi Petugas Jaga ", amount: " 1 " },
    { id: 21, nomor: 21, name: " Kamar Mandi Pria  ", amount: " 2 " },
    { id: 22, nomor: 22, name: " Kamar Mandi Wanita ", amount: " 2 " },
    { id: 23, nomor: 23, name: " Ruang Sterilisasi ", amount: " 1 " },
    {
      id: 24,
      nomor: 24,
      name: " Ruang Penyelenggaraan Makanan ",
      amount: " 1 ",
    },
    { id: 25, nomor: 25, name: " Ruang Beribadah / Mushola ", amount: " 1 " },
    { id: 26, nomor: 26, name: " Gudang Obat	", amount: " 1 " },
    { id: 27, nomor: 27, name: " Gudang Umum	", amount: " 1 " },
  ];

  const columns4 = [
    { name: "No ", uid: "nomor" },
    { name: "Jenis Sarana", uid: "names" },
    { name: "jumlah", uid: "amount" },
    { name: "Kondisi", uid: "condition" },
  ];

  const body4 = [
    { id: 1, nomor: 1, name: "Ambulance", amount: "1", condition: "1 Baik" },
    { id: 2, nomor: 2, name: "Puskesmas Keliling", amount: "1", condition: "1 Rusak Berat" },
    {
      id: 3,
      nomor: 3,
      name: "Motor",
      amount: "7",
      condition: "3 Baik, 2 Rusak Ringan, 2 Rusak Berat",
    },
  ];

  return (
    <div className="flex flex-col w-screen md:w-full">
      <Navbar>
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white md:w-full">
          <div className="flex flex-col bg-[url('/bg1.png')] m-5 p-5 gap-5 rounded-md w-screen md:w-full">
            <div className=" text-3xl font-bold justify-between items-center text-center w-screen md:w-full">
              {" "}
              SARANA DAN PRASARANA
            </div>
            <div className=" text-3xl font-bold justify-between items-center text-center w-screen md:w-full">
              {" "}
              PUSKESMAS KLUMBAYAN BARAT
            </div>
          </div>
          <div className="flex flex-col bg-gray-100 m-5 p-5 gap-5 rounded-md w-screen md:w-full">
            <div className="flex font-bold ">Sarana Bangunan Gedung</div>
            <CustomTable columns={columns1} body={body1} />
          </div>
          <div className="flex flex-col bg-gray-100 m-5 p-5 gap-5 rounded-md w-screen md:w-full">
            <div className="flex font-bold ">Jenis Ruang Pelayanan</div>
            <div className="flex ">A. Ruang Kantor</div>
            <CustomTable columns={columns2} body={body2} />
            <div className="flex ">B. Ruang Pelayanan</div>
            <CustomTable columns={columns3} body={body3} />
          </div>
          <div className="flex flex-col bg-gray-100 m-5 p-5 gap-5 rounded-md w-screen md:w-full">
            <div className="flex font-bold ">Sarana Kendaraan</div>
            <CustomTable columns={columns4} body={body4} />
          </div>
        </main>
      </Navbar>
      <Footer />
    </div>
  );
}
