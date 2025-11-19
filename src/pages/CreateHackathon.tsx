import React, { useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { createHackathon } from "@/lib/hackathons";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function CreateHackathonForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", start_date: "", end_date: "", location: "", prize: "", image_url: "" });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Please sign in");

    setSaving(true);
    try {
      await createHackathon({ ...form, created_by: user.id });
      navigate("/hackathons");
    } catch (err: any) {
      console.error("Create failed", err);
      alert(err.message || "Failed to create hackathon");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
          <input required placeholder="Title" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} className="input w-full" />
          <textarea placeholder="Description" value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})} className="textarea w-full" />
          <input type="datetime-local" value={form.start_date} onChange={(e)=>setForm({...form, start_date: e.target.value})} className="input w-full" />
          <input type="datetime-local" value={form.end_date} onChange={(e)=>setForm({...form, end_date: e.target.value})} className="input w-full" />
          <input placeholder="Location" value={form.location} onChange={(e)=>setForm({...form, location: e.target.value})} className="input w-full" />
          <input placeholder="Prize" value={form.prize} onChange={(e)=>setForm({...form, prize: e.target.value})} className="input w-full" />
          <input placeholder="Image URL (optional)" value={form.image_url} onChange={(e)=>setForm({...form, image_url: e.target.value})} className="input w-full" />
          <button type="submit" className="btn" disabled={saving}>{saving ? "Saving..." : "Create Hackathon"}</button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
