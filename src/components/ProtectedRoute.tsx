import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  // still checking session
  if (loading) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  // user is NOT logged in → redirect
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // authenticated → render protected page
  return children;
}
