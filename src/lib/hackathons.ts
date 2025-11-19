import { supabase } from "@/supabaseClient";

export interface Hackathon {
  id?: string;
  title: string;
  description?: string;
  start_date?: string | null;
  end_date?: string | null;
  location?: string;
  prize?: string;
  image_url?: string;
  created_by?: string;
  created_at?: string;
}

export const fetchHackathons = async (): Promise<Hackathon[]> => {
  const { data, error } = await supabase
    .from("hackathons")
    .select("*")
    .order("start_date", { ascending: true });

  if (error) throw error;
  return (data as Hackathon[] | null) ?? [];
};

export const createHackathon = async (payload: Hackathon) => {
  const { data, error } = await supabase
    .from("hackathons")
    .insert([payload])
    .select();

  if (error) throw error;
  return (data && (data as Hackathon[])[0]) ?? null;
};

export const fetchRecentHackathons = async (limit = 6): Promise<Hackathon[]> => {
  const { data, error } = await supabase
    .from("hackathons")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data as Hackathon[] | null) ?? [];
};

export const fetchHackathonsByUser = async (userId: string): Promise<Hackathon[]> => {
  const { data, error } = await supabase
    .from("hackathons")
    .select("*")
    .eq("created_by", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as Hackathon[] | null) ?? [];
};

export const getHackathonById = async (id: string): Promise<Hackathon | null> => {
  const { data, error } = await supabase
    .from("hackathons")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if ((error as any)?.code === "PGRST116") return null;
    throw error;
  }
  return (data as Hackathon) ?? null;
};

export const updateHackathon = async (payload: Hackathon) => {
  if (!payload.id) throw new Error("Missing id for update");
  const { data, error } = await supabase
    .from("hackathons")
    .update(payload)
    .eq("id", payload.id)
    .select();

  if (error) throw error;
  return (data && (data as Hackathon[])[0]) ?? null;
};

export const deleteHackathon = async (id: string) => {
  const { error } = await supabase.from("hackathons").delete().eq("id", id);
  if (error) throw error;
  return true;
};
