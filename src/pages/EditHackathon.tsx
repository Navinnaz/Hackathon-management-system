import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getHackathonById, updateHackathon, type Hackathon } from "@/lib/hackathons";
import { Button } from "@/components/ui/button";

export default function EditHackathon() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Hackathon>({ title: "", description: "" });

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      try {
        const h = await getHackathonById(id);
        if (!cancelled && h) setForm(h);
      } catch (err) {
        console.error(err);
        alert("Failed to load hackathon");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    try {
      await updateHackathon({ ...form, id });
      navigate("/hackathons");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-black mb-4">Edit Hackathon</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <input required placeholder="Title" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} className="input w-full" />
          <textarea placeholder="Description" value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})} className="textarea w-full" />
          <input type="datetime-local" value={form.start_date ?? ""} onChange={(e)=>setForm({...form, start_date: e.target.value})} className="input w-full" />
          <input type="datetime-local" value={form.end_date ?? ""} onChange={(e)=>setForm({...form, end_date: e.target.value})} className="input w-full" />
          <input placeholder="Location" value={form.location ?? ""} onChange={(e)=>setForm({...form, location: e.target.value})} className="input w-full" />
          <input placeholder="Prize" value={form.prize ?? ""} onChange={(e)=>setForm({...form, prize: e.target.value})} className="input w-full" />
          <input placeholder="Image URL (optional)" value={form.image_url ?? ""} onChange={(e)=>setForm({...form, image_url: e.target.value})} className="input w-full" />
          <div className="flex gap-3">
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
            <Button variant="outline" onClick={()=>navigate(-1)}>Cancel</Button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}
