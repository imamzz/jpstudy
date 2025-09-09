import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";
import knowledge from "../assets/undraw_knowledge.svg";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("🔑 Submit jalan dengan:", { email, password });
    e.preventDefault();
    setError("");
  
    try {
      const res = await api.post("/auth/login", { email, password });
      console.log("API response:", res.data); // 👈 cek di console
      login(res.data.token, res.data.role, res.data.user);
    
      if (res.data.role === "admin") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/home";
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Login gagal");
    }
    
  };
  

  return (
    <div className="min-h-screen flex">
      {/* Bagian kiri (gambar ilustrasi) */}
      <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center">
        <img
          src={knowledge}
          alt="Login Illustration"
          className="max-w-md"
        />
      </div>

      {/* Bagian kanan (form login) */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500">Login to continue your journey 🚀</p>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center bg-red-50 py-2 rounded">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full transition text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center">
            Belum punya akun?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Daftar sekarang
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
