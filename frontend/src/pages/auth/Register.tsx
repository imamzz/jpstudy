import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { handleApiError } from "../../utils/handleApiError";
import { useFormValidation } from "../../hooks/useFormValidation";

import knowledge from "../../assets/undraw_knowledge.svg";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { values, errors, handleChange, validateForm } =
    useFormValidation<RegisterForm>(
      {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      (values) => {
        const newErrors: Partial<Record<keyof RegisterForm, string>> = {};

        if (!values.username) newErrors.username = "Username is required";
        if (!values.email) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
          newErrors.email = "Invalid email format";
        }
        if (!values.password) {
          newErrors.password = "Password is required";
        } else if (values.password.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        }
        if (values.confirmPassword !== values.password) {
          newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
      }
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");

    if (!validateForm()) return;

    try {
      const res = await api.post("/auth/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      setSuccessMessage(res.data.message || "Registration successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: unknown) {
      const msg = handleApiError(error, "Registration failed, please try again.");
      setServerError(msg);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side illustration */}
      <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center">
        <img src={knowledge} alt="Register Illustration" className="max-w-md" />
      </div>

      {/* Right side (form) */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-500">Join us and start your journey 🚀</p>
          </div>

          {serverError && (
            <p className="text-red-600 text-sm text-center bg-red-50 py-2 rounded">
              {serverError}
            </p>
          )}

          {successMessage && (
            <p className="text-green-600 text-sm text-center bg-green-50 py-2 rounded">
              {successMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              name="username"
              type="text"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              errorMessage={errors.username}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Email address"
              value={values.email}
              onChange={handleChange}
              errorMessage={errors.email}
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              errorMessage={errors.password}
              required
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChange={handleChange}
              errorMessage={errors.confirmPassword}
              required
            />
            <Button type="submit">Register</Button>
          </form>

          <p className="text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
