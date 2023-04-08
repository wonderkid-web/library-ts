"use client";

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../config/firebase";
import Jenis from "../components/Jenis";
interface Dokumen {
  jenis?: string;
  agama?: string;
  id: string;
}

export default function Home() {
  const [jenis, setJenis] = useState("");
  const [jenisBaru, setJenisBaru] = useState([]);

  const inputRef = useRef(null);

  const getJenis = async () => {
    const jenisList: any = await getDoc(doc(db, "buku", "jenis"));

    const boxJenis: any = [];
    jenisList.data().jenis.forEach((j: string) => {
      boxJenis.push(j);
    });
    setJenisBaru(boxJenis);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!jenis) return;
    updateDoc(doc(db, "buku", "jenis"), {
      jenis: arrayUnion(jenis),
    })
      .then((solve) => {
        console.log("data berhasil di tambah");
        setJenis("");
        getJenis();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <main className="grid place-items-center">
      <form className="border m-8 flex gap-4 w-fit p-4">
        <input
          type="text"
          ref={inputRef}
          className="border p-1 rounded-md"
          placeholder="masukan jenis baru buku"
          onChange={(e: any) => setJenis(e.target.value)}
          value={jenis}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-indigo-500 text-white p-2 rounded-md "
        >
          Tambah jenis
        </button>
      </form>
      <Jenis getJenis={getJenis} listJenis={jenisBaru} />
    </main>
  );
}
