import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { login, logout } from "@/features/profile/userSlice";
import api from "@/base/api";
import LoadingSpinner from "@/components/atoms/LoaderSpinner";

function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await api.post("/auth/refresh");
        const { accessToken, token, user } = res.data.data;

        // ✅ gunakan salah satu, tergantung struktur respons API
        const jwt = accessToken || token;
        if (!jwt) throw new Error("No token in refresh response");

        dispatch(login({ token: jwt, user }));
      } catch (err) {
        console.warn("⚠️ Auth refresh failed:", err);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  return <>{children}</>;
}

export default AppInitializer;
