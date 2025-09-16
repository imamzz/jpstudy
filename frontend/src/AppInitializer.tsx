// AppInitializer.tsx
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { login, logout } from "@/features/user/userSlice";
import api from "@/base/api";
import LoadingSpinner from "@/components/atoms/LoaderSpinner";

function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // const hasRefresh = document.cookie.includes("refreshToken="); // contoh check cookie
        // if (!hasRefresh) {
        //   setLoading(false);
        //   return;
        // }
  
        const res = await api.post("/auth/refresh");
        const { token, user } = res.data.data;
  
        dispatch(login({ token, user }));
      } catch (err) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };
  
    initAuth();
  }, [dispatch]);
  

  if (loading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}

export default AppInitializer;
