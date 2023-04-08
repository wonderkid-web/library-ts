"use client";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";

interface JenisProps {
  listJenis: string[];
  getJenis: Function;
}

const Jenis = ({ listJenis, getJenis }: JenisProps) => {
  const handleDelete = async (name: string) => {
    updateDoc(doc(db, "buku", "jenis"), {
      jenis: arrayRemove(name),
    }).then((resolve) => {
      getJenis();
      console.log("data berhasil dihapus!");
    });
  };

  useEffect(() => {
    getJenis();
  }, []);

  if (!listJenis) return <p>Data lagi di fetching...</p>;

  return (
    <div>
      {listJenis &&
        listJenis.map((j, i) => (
          <p className="m-4" key={i}>
            {j}
            <span
              className="p-2 bg-red-600 font-bold rounded-md cursor-pointer text-white m-2"
              onClick={() => handleDelete(j)}
            >
              x
            </span>
          </p>
        ))}
    </div>
  );
};

export default Jenis;
