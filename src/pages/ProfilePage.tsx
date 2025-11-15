// src/pages/ProfilePage.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { useAuth } from "@/contexts/authContext";
import ProfileEditor from "@/components/ProfileEditor";

export interface Profile {
  id: string;
  full_name: string;
  username: string;
  bio: string;
  country: string;
  avatar_url: string;
  updated_at?: string;
}

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) console.error("Profile fetch error:", error);
    else setProfile(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  if (!user) return <p className="text-center mt-10">Please sign in</p>;
  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mx-auto py-10">
      <ProfileEditor profile={profile} onProfileUpdated={fetchProfile} />
    </div>
  );
};

export default ProfilePage;
