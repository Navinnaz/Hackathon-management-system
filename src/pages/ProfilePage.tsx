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
  if (!user) {
    setLoading(false);
    return;
  }
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .limit(1);

    if (error) {
      // Treat "no rows" from PostgREST (PGRST116 / 406) as an empty profile
      if ((error as any)?.code === "PGRST116" || (error as any)?.status === 406) {
        setProfile(null);
      } else {
        console.error("Profile fetch error:", error);
        setProfile(null);
      }
    } else {
      // `.limit(1)` returns an array; pick the first item or null
      const profileData = Array.isArray(data) ? data[0] ?? null : data ?? null;
      setProfile(profileData);
    }
  } catch (err) {
    console.error("Unexpected fetchProfile error:", err);
    setProfile(null);
  } finally {
    setLoading(false);
  }
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
