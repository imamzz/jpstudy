import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { handleApiError } from "../../utils/handleApiError";
import { useAuth } from "../../hooks/useAuth";
import { useFormValidation } from "../../hooks/useFormValidation";

import knowledge from "../../assets/undraw_knowledge.svg";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const { values, errors, handleChange, validateForm } =
    useFormValidation<LoginForm>(
      { email: "", password: "" },
      (values) => {
        const newErrors: Partial<Record<keyof LoginForm, string>> = {};
        if (!values.email) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
          newErrors.email = "Invalid email format";
        }
        if (!values.password) newErrors.password = "Password is required";
        return newErrors;
      }
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    try {
      const res = await api.post("/auth/login", {
        email: values.email,
        password: values.password,
      });

      login(res.data.token, res.data.role, res.data.user);

      if (res.data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error: unknown) {
      const msg = handleApiError(error, "Login failed, please try again.");
      setServerError(msg);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left illustration */}
      <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center">
        <img src={knowledge} alt="Login Illustration" className="max-w-md" />
      </div>

      {/* Right form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500">Login to continue your journey 🚀</p>
          </div>

          {serverError && (
            <p className="text-red-600 text-sm text-center bg-red-50 py-2 rounded">
              {serverError}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="email"
              type="email"
              placeholder="Email address"
              value={values.email}
              onChange={handleChange}
              errorMessage={errors.email}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              errorMessage={errors.password}
              required
            />
            <Button type="submit">Login</Button>
          </form>

          <p className="text-sm text-gray-500 text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
