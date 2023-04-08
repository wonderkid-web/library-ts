"use client";
import { useState } from "react";
import ListBuku from "../components/ListBuku";
import TambahBuku from "../components/TambahBuku";
import UpdateBuku from "../components/UpdateBuku";

const page = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  return (
    <div>
      <TambahBuku blur={isUpdate} />
      {isUpdate && <UpdateBuku setBlur={setIsUpdate} updateData={updateData} />}
      <ListBuku
        blur={isUpdate}
        setBlur={setIsUpdate}
        updateData={setUpdateData}
      />
    </div>
  );
};

export default page;
