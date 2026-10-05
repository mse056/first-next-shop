"use client";
import Container from "@/components/container";
import axios, { AxiosError } from "axios";
import React, { ChangeEvent, useState } from "react";

function Dashboard() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleCreateNewProduct = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", String(price));
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/products/",
        formData,
      );
      alert("محصول با موفقیت ایجاد شد");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log("Django Validation Errors:", error.response?.data);
      } else {
        console.log("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="p-4 text-right rtl">
      <Container>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            name="title"
            placeholder="عنوان"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="قیمت"
            value={price}
            onChange={(e) => setPrice(e.target.valueAsNumber || "")}
            className="border p-2 rounded"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded"
          />
        </div>
        <textarea
          name="description"
          className="w-full mt-4 border p-2 rounded"
          placeholder="توضیحات"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          onClick={handleCreateNewProduct}
          className="bg-sky-500 text-white rounded px-4 py-2 mt-4"
        >
          ایجاد محصول جدید
        </button>
      </Container>
    </div>
  );
}

export default Dashboard;
