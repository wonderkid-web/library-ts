"use client";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

interface BukuProps {
  setBlur: Function;
  updateData: string;
}

const UpdateBuku = ({ setBlur, updateData }: BukuProps) => {
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");
  const [listJenis, setListJenis] = useState([]);

  const handleAddData = async (e: any) => {
    e.preventDefault();
    try {
      const raw = await getDoc(doc(db, "buku", "rakBuku"));

      updateDoc(doc(db, "buku", "rakBuku"), {
        details: arrayRemove({
          nama: updateData[0],
          jenis: updateData[1],
        }),
      });
      updateDoc(doc(db, "buku", "rakBuku"), {
        details: arrayUnion({
          nama,
          jenis,
        }),
      });
      setNama("");
      setBlur(false);
      console.log(updateData);
      alert("data berhasil di Ubah!");
    } catch (e) {
      console.error(e);
    }
  };
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

  // Mengambil list jenis buku

  return (
    <div>
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

export default UpdateBuku;
