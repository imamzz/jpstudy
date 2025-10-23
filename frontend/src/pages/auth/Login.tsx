import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/hooks";
import { login } from "@/features/profile/userSlice";
import { handleApiError } from "@/utils/handleApiError";
import { authService } from "@/services/authService";

import knowledge from "@/assets/undraw_knowledge.svg";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import clsx from "clsx";
import { useFormValidation } from "@/hooks/useFormValidation";

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
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
        const res = await authService.login(values.email, values.password);
        const { token, user } = res.data.data;
    
        // simpan Redux
        dispatch(login({ token, user }));
    
        // cek role dari user
        if (user.role === "admin") {
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
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              errorMessage={errors.email}
              className={clsx("bg-white", errors.email && "animate-shake")}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              errorMessage={errors.password}
              className={clsx("bg-white", errors.password && "animate-shake")}
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
