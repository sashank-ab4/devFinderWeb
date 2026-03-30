import axios from "axios";
import { useState } from "react";
import { BASE_BACKEND_URL } from "../utils/mockData";
export default function PhotoUploadSection({ setPhotoUrl, setPreviewUrl }) {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    const formData = new FormData();
    formData.append("photo", file);
    try {
      setUploading(true);
      setUploaded(false);
      const res = await axios.post(BASE_BACKEND_URL + "/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setPhotoUrl(res?.data?.url);
    } catch (err) {
      console.error(err);
    } finally {
      setUploaded(true);
      setUploading(false);
      setTimeout(() => {
        setUploaded(false);
      }, 2000);
    }
  };
  return (
    <div className="space-y-3">
      <div className="flex justify-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full"
        />
        {uploading && (
          <span className="loading loading-spinner loading-md  ml-1.5 pt-1"></span>
        )}
        {!uploading && uploaded && (
          <span className="text-md text-green-600 ml-1.5 pt-1 uppercase">
            Uploaded!
          </span>
        )}
      </div>
    </div>
  );
}
