"use client";
import { useState } from "react";
import Navbar from "@/components/layout/homepage/navbar";
import Footer from "@/components/layout/homepage/footer";

export default function kepegawaian() {
  // const [section, setSection] = useState(1);

  return (
    <div>
      <Navbar>
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white ">
          <div className="flex flex-col bg-gray-100 m-5 p-5 gap-5 rounded-md w-full ">
            <div className=" text-3xl font-bold justify-between items-center text-center w-full">
              {" "}
              BERITA
            </div>
            <div className=" text-3xl font-bold justify-between items-center text-center w-full">
              {" "}
              PUSKESMAS KLUMBAYAN BARAT
            </div>
          </div>
        </main>
      </Navbar>
      <Footer />
    </div>
  );
}
