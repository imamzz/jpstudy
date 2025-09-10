import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";
import knowledge from "../../assets/undraw_knowledge.svg";

import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";
import { handleApiError } from "../../utils/handleApiError";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await api.post("/auth/login", { email, password });

      login(response.data.token, response.data.role, response.data.user);

      if (response.data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      const message = handleApiError(error, "Login failed, please try again.");
      setErrorMessage(message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side (illustration) */}
      <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center">
        <img src={knowledge} alt="Login Illustration" className="max-w-md" />
      </div>

      {/* Right side (login form) */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500">Login to continue your journey 🚀</p>
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm text-center bg-red-50 py-2 rounded">
              {errorMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
              required
            />
            <Button variant="primary" type="submit">Login</Button>
          </form>

          <p className="text-sm text-gray-500 text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
