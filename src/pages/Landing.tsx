import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";
import { Users, Trophy, Calendar, Zap } from "lucide-react";
import { useAuth } from "@/contexts/authContext";
import { useEffect, useState } from "react";
import { fetchRecentHackathons, fetchHackathonsByUser, deleteHackathon, type Hackathon } from "@/lib/hackathons";
import HackathonCard from "@/components/HackathonCard";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { user } = useAuth();
  const [recent, setRecent] = useState<Hackathon[]>([]);
  const [myHackathons, setMyHackathons] = useState<Hackathon[]>([]);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setRecent([]);
      setMyHackathons([]);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        setLoadingDashboard(true);
        const [recentRes, myRes] = await Promise.all([
          fetchRecentHackathons(6),
          fetchHackathonsByUser(user.id),
        ]);

        if (cancelled) return;
        setRecent(recentRes ?? []);
        setMyHackathons(myRes ?? []);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        if (!cancelled) setLoadingDashboard(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 md:space-y-8 animate-slide-up">
            <div className="inline-block border-4 border-black bg-orange px-3 py-1 md:px-4 md:py-2 shadow-brutal-sm">
              <p className="text-xs md:text-sm font-black uppercase text-off-white">Next-Gen Hackathon Platform</p>
            </div>

            {user ? (
              <>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight text-navy">Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""}!</h1>
                <p className="text-lg md:text-xl font-semibold text-navy/80 max-w-md">Explore hackathons, create new events, and manage your profile.</p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <Link to="/hackathons" className="w-full sm:w-auto">
                    <Button variant="hero" size="lg" className="w-full sm:w-auto">View Hackathons</Button>
                  </Link>
                  <Link to="/hackathons/create" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">Create Hackathon</Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight text-navy">COMPETE.<br />ORGANISE.<br /><span className="text-orange">WIN.</span></h1>
                <p className="text-lg md:text-xl font-semibold text-navy/80 max-w-md">The ultimate platform for organizing, managing, and participating in hackathons. Join thousands of innovators worldwide.</p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <Link to="/signup" className="w-full sm:w-auto">
                    <Button variant="hero" size="lg" className="w-full sm:w-auto">Get Started Free</Button>
                  </Link>
                </div>
              </>
            )}

            {/* stats placeholder (kept hidden for now) */}
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8 w-32 h-32 md:w-48 lg:w-64 h-32 md:h-48 lg:h-64 bg-orange border-4 border-black shadow-brutal-lg hidden lg:block" />
            <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 w-24 h-24 md:w-32 lg:w-48 h-24 md:h-32 lg:h-48 bg-green border-4 border-black shadow-brutal hidden lg:block" />
            <div className="relative bg-navy border-4 border-black shadow-brutal p-6 md:p-8 lg:p-12">
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4 bg-off-white border-4 border-black p-3 md:p-4 shadow-brutal-sm">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-orange border-2 border-black" />
                  <div className="flex-1">
                    <div className="h-2 md:h-3 bg-green border-2 border-black mb-1 md:mb-2" />
                    <div className="h-2 md:h-3 bg-green/50 border-2 border-black w-2/3" />
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4 bg-off-white border-4 border-black p-3 md:p-4 shadow-brutal-sm">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-green border-2 border-black" />
                  <div className="flex-1">
                    <div className="h-2 md:h-3 bg-orange border-2 border-black mb-1 md:mb-2" />
                    <div className="h-2 md:h-3 bg-orange/50 border-2 border-black w-3/4" />
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4 bg-off-white border-4 border-black p-3 md:p-4 shadow-brutal-sm">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-navy border-2 border-black" />
                  <div className="flex-1">
                    <div className="h-2 md:h-3 bg-navy border-2 border-black mb-1 md:mb-2" />
                    <div className="h-2 md:h-3 bg-navy/50 border-2 border-black w-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {user ? (
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats */}
            <div className="col-span-1 bg-off-white border-4 border-black p-6 rounded-lg shadow-brutal-sm">
              <h3 className="text-xl font-black text-navy mb-4">Your Dashboard</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-navy/80">Recent hackathons</span>
                  <span className="text-lg font-black">{recent.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-navy/80">Your hackathons</span>
                  <span className="text-lg font-black">{myHackathons.length}</span>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/hackathons" className="inline-block">
                  <Button variant="hero">Browse All</Button>
                </Link>
                <Link to="/hackathons/create" className="inline-block ml-3">
                  <Button variant="outline">Create</Button>
                </Link>
              </div>
            </div>

            {/* Recent Hackathons */}
            <div className="col-span-2">
              <h3 className="text-2xl font-black text-navy mb-4">Recent Hackathons</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recent.map((h) => (
                  <HackathonCard key={h.id} hackathon={h} />
                ))}
              </div>

              <h3 className="text-2xl font-black text-navy mt-8 mb-4">Your Events</h3>
              {myHackathons.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myHackathons.map((h) => (
                    <div key={h.id} className="space-y-2">
                      <HackathonCard hackathon={h} />
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => navigate(`/hackathons/edit/${h.id}`)}>Edit</Button>
                        <Button
                          variant="destructive"
                          onClick={async () => {
                            if (!h.id) return;
                            if (!confirm("Delete this hackathon? This action cannot be undone.")) return;
                            try {
                              setDeletingId(h.id);
                              await deleteHackathon(h.id);
                              setMyHackathons((prev) => prev.filter((x) => x.id !== h.id));
                              setRecent((prev) => prev.filter((x) => x.id !== h.id));
                            } catch (err) {
                              console.error("Delete failed", err);
                              alert("Failed to delete hackathon");
                            } finally {
                              setDeletingId(null);
                            }
                          }}
                          disabled={deletingId === h.id}
                        >
                          {deletingId === h.id ? "Deleting..." : "Delete"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-navy/70">You haven't created any hackathons yet.</p>
              )}
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Features Section */}
          <section className="bg-green border-y-4 border-black py-12 md:py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8 md:mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-navy mb-4 uppercase">Why Choose Us?</h2>
                <p className="text-lg md:text-xl font-semibold text-navy/80 max-w-2xl mx-auto">Everything you need to run successful hackathons in one powerful platform</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <FeatureCard icon={Users} title="Team Management" description="Build and manage your dream team with powerful collaboration tools" color="navy" />
                <FeatureCard icon={Calendar} title="Event Scheduling" description="Plan and track hackathon timelines with our intuitive calendar system" color="orange" />
                <FeatureCard icon={Trophy} title="Judging System" description="Fair and transparent evaluation process with real-time leaderboards" color="green" />
                <FeatureCard icon={Zap} title="Real-time Updates" description="Stay connected with instant notifications and live activity feeds" color="navy" />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-4 py-12 md:py-20 lg:py-32">
            <div className="bg-orange border-4 border-black shadow-brutal-lg p-6 md:p-8 lg:p-16 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-off-white mb-4 md:mb-6 uppercase">Ready to Start Building?</h2>
              <p className="text-lg md:text-xl font-semibold text-off-white/90 mb-6 md:mb-8 max-w-2xl mx-auto">Join the community of innovators and start your hackathon journey today. Sign up now and take the first step towards success!</p>
              <Link to="/signup">
                <Button variant="outline" size="lg" className="bg-off-white text-orange border-4 border-black shadow-brutal hover:bg-navy hover:text-off-white">Create Free Account</Button>
              </Link>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-navy border-t-4 border-black py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-off-white font-bold">
            © 2025 Foundation Stack. Built with <span className="text-orange">❤️</span> for students, innovators, universities and communities..
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
