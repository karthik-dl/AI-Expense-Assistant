import { useRef, useState } from "react";
import { Camera, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import Button from "../ui/Button";

import {
  uploadAvatar,
  deleteAvatar,
} from "../../services/profileService";

function AvatarUpload({ profile, onSuccess }) {
  const inputRef = useRef(null);

  const [preview, setPreview] = useState(
    profile.avatar || ""
  );

  const [loading, setLoading] = useState(false);

  const handleSelect = () => {
    inputRef.current?.click();
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);

    try {
      setLoading(true);

      await uploadAvatar(file);

      toast.success("Profile photo updated.");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload avatar.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteAvatar();

      setPreview("");

      toast.success("Avatar removed.");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove avatar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h2 className="mb-5 text-xl font-semibold text-slate-800">
        Profile Picture
      </h2>

      <div className="flex flex-col items-center gap-5">
        <img
          src={
            preview ||
            "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(profile.name || "User") +
              "&background=2563EB&color=fff&size=200"
          }
          alt="Profile"
          className="h-36 w-36 rounded-full border-4 border-blue-500 object-cover shadow-lg"
        />

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />

        <div className="flex gap-3">
          <Button
            type="button"
            onClick={handleSelect}
            disabled={loading}
          >
            <Camera size={18} className="mr-2" />
            {loading ? "Uploading..." : "Upload"}
          </Button>

          {preview && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700 disabled:opacity-60"
            >
              <Trash2 size={18} />
              Remove
            </button>
          )}
        </div>

        <p className="text-center text-sm text-slate-500">
          Supported formats: JPG, PNG, WEBP
          <br />
          Maximum file size: 5 MB
        </p>
      </div>
    </Card>
  );
}

export default AvatarUpload;