import React, { useEffect, useState } from "react";
import { fetchHackathons, type Hackathon } from "@/lib/hackathons";
import HackathonCard from "@/components/HackathonCard";

export default function HackathonsList() {
  const [list, setList] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchHackathons();
        setList(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading hackathons...</p>;
  if (!list.length) return <p className="text-center mt-10">No hackathons posted yet.</p>;

  return (
    <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {list.map((h) => (
        <HackathonCard key={h.id} hackathon={h} />
      ))}
    </div>
  );
}
