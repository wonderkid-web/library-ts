"use client";
import {
  arrayUnion,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

const TambahBuku = ({ blur }: any) => {
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");
  const [listJenis, setListJenis] = useState([]);

  const handleAddData = async (e: any) => {
    e.preventDefault();
    try {
      updateDoc(doc(db, "buku", "rakBuku"), {
        details: arrayUnion({
          nama,
          jenis,
        }),
      });
      setNama("");
      alert("data berhasil di tambah!");
    } catch (e) {
      console.error(e);
    }
  };

  // Mengambil list jenis buku

  const getList = async () => {
    try {
      const buku: any = await getDoc(doc(db, "buku", "jenis"));
      const boxJenis: any = [];
      buku.data().jenis.forEach((j: string) => {
        boxJenis.push(j);
      });
      setListJenis(boxJenis);
      setNama("");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className={blur ? "blur-sm" : "blur-none"}>
      <form className="border p-4 flex gap-4 w-fit mx-auto my-10">
        <input
          className="border rounded-md p-2"
          placeholder="Nama buku"
          type="text"
          onChange={(e) => setNama(e.target.value)}
          value={nama}
        />
        <select
          className="p-2 rounded-md"
          onClick={(e) => setJenis(e.target.value)}
        >
          {listJenis.map((l, i) => {
            return (
              <option key={i} value={l}>
                {l}
              </option>
            );
          })}
        </select>
        <button
          className="bg-indigo-700 text-white p-2 rounded-md font-bold"
          type="submit"
          onClick={handleAddData}
        >
          Tambah Buku
        </button>
      </form>
    </div>
  );
};

export default TambahBuku;
