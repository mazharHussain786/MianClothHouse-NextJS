"use client";
import React, { useState } from "react";
import { SEASONS } from "@/lib/seasons";

const inputClass =
  "w-full border border-border bg-background px-4 py-3 outline-none focus:border-primary";

const AddClothComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [discountPrice, setDiscountPrice] = useState<number | "">("");
  const [category, setCategory] = useState("women");
  const [season, setSeason] = useState("all");
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
      setImages(Array.from(e.target.files));
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
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price.toString());
      if (discountPrice) formData.append("discountPrice", discountPrice.toString());
      formData.append("category", category);
      formData.append("season", season);
      formData.append("featured", featured.toString());
      formData.append("colors", colors.join(","));
      images.forEach((file) => {
        formData.append("images", file);
      });

      const res = await fetch("/api/cloths", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add cloth");

      setSuccess("Cloth added successfully.");
      setTitle("");
      setDescription("");
      setPrice("");
      setDiscountPrice("");
      setCategory("women");
      setSeason("all");
      setFeatured(false);
      setColors([]);
      setImages([]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="bg-card p-5 shadow-sm sm:p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-gold">Admin</p>
        <h2 className="font-display mt-2 text-3xl text-primary sm:text-4xl">Add New Cloth</h2>
        <div className="gold-rule mt-4" />

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
        {success && <p className="mt-4 text-sm text-green-700">{success}</p>}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" encType="multipart/form-data">
          <div>
            <label className="mb-1 block text-sm">Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputClass}
              rows={4}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm">Price *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm">Discount Price</label>
              <input
                type="number"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(Number(e.target.value))}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm">Season *</label>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className={inputClass}
            >
              {SEASONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured on homepage
          </label>

          <div>
            <label className="mb-1 block text-sm">Colors</label>
            <div className="flex gap-2">
              <input
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                className={inputClass}
                placeholder="Add color"
              />
              <button
                type="button"
                onClick={addColor}
                className="border border-primary px-4 text-sm text-primary"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {colors.map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-1 bg-secondary px-3 py-1 text-sm"
                >
                  {c}
                  <button type="button" onClick={() => removeColor(c)} className="text-destructive">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm">Images *</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className={inputClass}
              required
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {images.map((file, index) => (
                <div key={index} className="relative h-20 w-20 overflow-hidden border border-border">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary py-3 text-sm uppercase tracking-[0.16em] text-primary-foreground disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Cloth"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClothComponent;
