
import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import { useAuth } from "@/contexts/authContext";
import { Progress } from "@radix-ui/react-progress";
import type { Profile } from "@/pages/ProfilePage";

interface ProfileEditorProps {
  profile: Profile | null;
  onProfileUpdated: () => void;
}

export default function ProfileEditor({
  profile,
  onProfileUpdated,
}: ProfileEditorProps) {
  const { user } = useAuth();

  const [form, setForm] = useState<Profile>({
    id: "",
    full_name: "",
    username: "",
    bio: "",
    country: "",
    avatar_url: "",
    updated_at: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // --------------------
  // PROFILE PROGRESS %
  // --------------------
  const calculateProgress = (data: Profile) => {
    const required = ["full_name", "username", "bio", "country", "avatar_url"] as const;

    const filled = required.filter((field) => {
      const value = data[field];
      return value && value.trim() !== "";
    }).length;

    return Math.round((filled / required.length) * 100);
  };

  // --------------------
  // ON PROFILE LOAD
  // --------------------
  useEffect(() => {
    if (profile) {
      setForm(profile);
      setProgress(calculateProgress(profile));
    }
  }, [profile]);

  // --------------------
  // UPDATE PROFILE
  // --------------------
  const handleUpdate = async () => {
    if (!user) return;

    setLoading(true);

    const updates = {
      ...form,
      id: user.id,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id);

    setLoading(false);

    if (error) {
      alert("Update failed");
      console.error(error);
    } else {
      onProfileUpdated();
      alert("Profile updated successfully!");
    }
  };

  // --------------------
  // AVATAR UPLOAD
  // --------------------
  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file || !user) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      const updated = { ...form, avatar_url: data.publicUrl };

      setForm(updated);
      setProgress(calculateProgress(updated));
    } catch (err) {
      console.error(err);
      alert("Unable to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Edit Profile</h2>

      {/* Progress */}
      <div className="mb-5">
        <p className="text-sm text-gray-600 mb-1">
          Profile Completion: {progress}%
        </p>
        <Progress
          value={progress}
          className="h-2 w-full bg-gray-200 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </Progress>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-5">
        <img
          src={form.avatar_url || "https://via.placeholder.com/120"}
          className="w-20 h-20 rounded-full object-cover border"
        />
        <label className="cursor-pointer bg-gray-100 px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-200">
          {uploading ? "Uploading..." : "Change Photo"}
          <input type="file" hidden onChange={uploadAvatar} />
        </label>
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <input
          className="w-full p-3 border rounded-lg"
          placeholder="Full Name"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />

        <input
          className="w-full p-3 border rounded-lg"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <textarea
          className="w-full p-3 border rounded-lg"
          rows={3}
          placeholder="Bio"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />

        <input
          className="w-full p-3 border rounded-lg"
          placeholder="Country"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
        />
      </div>

      <button
        disabled={loading}
        onClick={handleUpdate}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
