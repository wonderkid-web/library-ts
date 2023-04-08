"use client";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { Console } from "console";

interface ListBukuProps {
  blur: boolean;
  setBlur: Function;
  updateData: Function;
}

const ListBuku = ({ blur, setBlur, updateData }: ListBukuProps) => {
  const [listJenis, setListJenis] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBuku = async () => {
    const unsub = onSnapshot(doc(db, "buku", "rakBuku"), (doc: any) => {
      const boxBuku: any = [];
      doc.data().details.forEach((d: any) => {
        boxBuku.push({ ...d });
      });
      setLoading(true);
      setListJenis(boxBuku);
    });
  };

  const handleDelete = async (nama, jenis) => {
    try {
      updateDoc(doc(db, "buku", "rakBuku"), {
        details: arrayRemove({
          nama,
          jenis,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getBuku();
  }, []);

  if (!loading) return <p>Fetching data...</p>;

  return (
    <div className={blur ? "blur-sm" : "blur-none"}>
      <div className="overflow-x-auto w-1/2 mx-auto">
        <table className="table w-full">
          {/* head*/}
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Nama Buku</th>
              <th>Jenis</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listJenis.map((list: any, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{list.nama}</td>
                  <td>{list.jenis}</td>
                  <td className="flex justify-center">
                    <button
                      onClick={() => {
                        setBlur(true);
                        updateData([`${list.nama}`, `${list.jenis}`]);
                      }}
                      className="btn btn-success text-white font-bold rounded-md p-2 mx-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(list.nama, list.jenis)}
                      className="btn btn-warning text-rose-800 font-bold rounded-md p-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBuku;
