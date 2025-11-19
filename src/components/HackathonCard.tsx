import React from "react";
import type { Hackathon } from "@/lib/hackathons";

interface Props {
  hackathon: Hackathon;
}

export default function HackathonCard({ hackathon }: Props) {
  return (
    <article className="bg-off-white border-4 border-black p-4 rounded-lg shadow-brutal-sm">
      {hackathon.image_url && (
        <img src={hackathon.image_url} alt={hackathon.title} className="w-full h-40 object-cover rounded" />
      )}
      <h3 className="text-xl font-bold mt-3">{hackathon.title}</h3>
      {hackathon.location && <p className="text-sm text-navy/70">{hackathon.location}</p>}
      {hackathon.description && <p className="mt-2 text-sm">{hackathon.description}</p>}
      <div className="mt-3 text-xs text-navy/70">
        {hackathon.start_date ? new Date(hackathon.start_date).toLocaleString() : "TBD"}
        {" — "}
        {hackathon.end_date ? new Date(hackathon.end_date).toLocaleString() : "TBD"}
      </div>
    </article>
  );
}
