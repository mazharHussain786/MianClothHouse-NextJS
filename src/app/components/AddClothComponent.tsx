"use client";
import React, { useState } from "react";

const AddClothComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [discountPrice, setDiscountPrice] = useState<number | "">("");
  const [category, setCategory] = useState("men");
  const [featured, setFeatured] = useState(false);
  const [colors, setColors] = useState<string[]>([]);
  const [colorInput, setColorInput] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const addColor = () => {
    if (colorInput && !colors.includes(colorInput)) {
      setColors([...colors, colorInput]);
      setColorInput("");
    }
  };

  const removeColor = (color: string) => {
    setColors(colors.filter((c) => c !== color));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !price || images.length === 0) {
      setError("Title, price and at least one image are required");
      return;
    }

    setLoading(true);
    try {
      // Create FormData instead of JSON
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price.toString());
      if (discountPrice) formData.append("discountPrice", discountPrice.toString());
      formData.append("category", category);
      formData.append("featured", featured.toString());
      formData.append("colors", colors.join(","));
      
      // Append each image file
      images.forEach((file) => {
        formData.append("images", file);
      });

      const res = await fetch("/api/cloths", {
        method: "POST",
        // Don't set Content-Type header - let browser set it automatically with boundary
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add cloth");

      setSuccess("Cloth added successfully!");
      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setDiscountPrice("");
      setCategory("men");
      setFeatured(false);
      setColors([]);
      setImages([]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto  p-6 rounded shadow-2xl mt-3">
      <h2 className="text-xl font-bold mb-4">Add New Cloth</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        {/* Title */}
        <div>
          <label className="block font-medium">Title *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium">Price *</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Discount Price */}
        <div>
          <label className="block font-medium">Discount Price</label>
          <input
            type="number"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(Number(e.target.value))}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium">Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>

        {/* Featured */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          <label>Featured</label>
        </div>

        {/* Colors */}
        <div>
          <label className="block font-medium">Colors</label>
          <div className="flex gap-2">
            <input
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              className="border p-2 rounded flex-1"
              placeholder="Add color"
            />
            <button
              type="button"
              onClick={addColor}
              className="bg-blue-500 text-white px-3 rounded"
            >
              Add
            </button>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {colors.map((c) => (
              <span
                key={c}
                className="bg-gray-200 px-3 py-1 rounded flex items-center gap-1"
              >
                {c}
                <button
                  type="button"
                  onClick={() => removeColor(c)}
                  className="text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block font-medium">Images *</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded w-full"
            required
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {images.map((file, index) => (
              <div
                key={index}
                className="relative w-20 h-20 border rounded overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
        >
          {loading ? "Adding..." : "Add Cloth"}
        </button>
      </form>
    </div>
  );
};

export default AddClothComponent;