import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-block border-4 border-black bg-orange px-4 py-2 shadow-brutal-sm mb-8">
              <p className="text-sm font-black uppercase text-off-white">
                Page Not Found
              </p>
            </div>

            <div className="mb-8">
              <AlertTriangle className="h-24 w-24 mx-auto text-orange mb-4" />
              <h1 className="text-6xl md:text-8xl font-black text-navy mb-4">404</h1>
              <h2 className="text-2xl md:text-4xl font-black text-navy uppercase mb-4">
                Oops! Page Not Found
              </h2>
              <p className="text-lg font-semibold text-navy/80 max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <div className="space-y-4">
              <Link to="/">
                <Button variant="hero" size="lg" className="mr-4">
                  <Home className="h-5 w-5 mr-2" />
                  Go Home
                </Button>
              </Link>
              <Button variant="outline" size="lg" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 right-4 w-24 h-24 bg-orange border-4 border-black shadow-brutal hidden lg:block -z-10" />
          <div className="absolute bottom-20 left-4 w-32 h-32 bg-green border-4 border-black shadow-brutal hidden lg:block -z-10" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
