// pages/admin/BannerUpload.jsx
// pages/admin/BannerUpload.jsx

import { useEffect, useState } from "react";
import {
  getAllBanners,
  uploadBanner,
  deleteBanner,
  setActiveBanner,
} from "../../services/banner";

const BannerUpload = () => {
  const [images, setImages] = useState([]); // multiple files
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const loadBanners = async () => {
    try {
      setLoading(true);
      const res = await getAllBanners();
      setBanners(res.data);
    } catch (err) {
      console.error("Error loading banners", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleUpload = async () => {
    if (images.length === 0) {
      alert("Please select at least one image");
      return;
    }

    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));

    try {
      setUploading(true);
      await uploadBanner(formData);
      alert("Upload successful");
      setImages([]);
      loadBanners();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this banner?")) return;
    await deleteBanner(id);
    loadBanners();
  };

  const handleSetActive = async (id) => {
    await setActiveBanner(id);
    loadBanners();
  };

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">
        Banner Upload
      </h2>

      {/* ===== Upload Section ===== */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-6">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files))}
          className="w-full sm:w-auto border rounded-md p-2"
        />

        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`px-4 py-2 rounded-md font-semibold text-white transition
            ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {uploading
            ? "Uploading..."
            : `⬆ Upload ${images.length} Image(s)`}
        </button>
      </div>

      {/* ===== Preview Selected Images ===== */}
      {images.length > 0 && (
        <div className="flex gap-3 mb-4 flex-wrap">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(img)}
              alt="preview"
              className="w-48 h-36 object-cover rounded-md"
            />
          ))}
        </div>
      )}

      {/* ===== Banners Grid ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading && <p className="text-gray-500">Loading banners...</p>}

        {!loading && banners.length === 0 && (
          <p className="text-gray-500">No banners uploaded</p>
        )}

        {!loading &&
          banners.map((b) => (
            <div
              key={b._id}
              className="bg-white border rounded-lg p-3 text-center shadow-sm"
            >
              <img
                src={b.url}
                alt="banner"
                className={`w-full h-36 object-cover rounded-md mb-3 ${
                  b.isActive ? "ring-4 ring-green-500" : "border"
                }`}
              />

              <div className="flex justify-center gap-2">
                <button
                  onClick={() => handleSetActive(b._id)}
                  disabled={b.isActive}
                  className={`px-3 py-1 text-sm rounded-md text-white
                    ${
                      b.isActive
                        ? "bg-green-600 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  {b.isActive ? "Active" : "Set Active"}
                </button>

                <button
                  onClick={() => handleDelete(b._id)}
                  className="px-3 py-1 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BannerUpload;

