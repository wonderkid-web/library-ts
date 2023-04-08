"use client";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

const ListBuku = () => {
  const [listJenis, setListJenis] = useState([]);

  const bukuRef = collection(db, "buku");

  const getBuku = async () => {
    onSnapshot(bukuRef, (docs) => {
      const boxBuku: any = [];
      docs.forEach((d) => {
        boxBuku.push({ ...d.data(), id: d.id });
      });
      setListJenis(boxBuku);
      console.log(setListJenis);
    });
  };

  useEffect(() => {
    getBuku();
  }, []);

  return (
    <div>
      <div className="overflow-x-auto w-1/2 mx-auto">
        <table className="table w-full">
          {/* head*/}
          <thead>
            <tr>
              <th></th>
              <th>Nama Buku</th>
              <th>Jenis</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBuku;
