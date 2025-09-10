import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { handleApiError } from "../../utils/handleApiError";

import knowledge from "../../assets/undraw_knowledge.svg";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setErrorMessage("");
    setSuccessMessage("");

    // Basic validation
    if (!username) {
      setUsernameError("Username is required");
      return;
    }
    if (!email.includes("@")) {
      setEmailError("Email tidak valid");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password minimal 6 karakter");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      setSuccessMessage(response.data.message || "Registration successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      const message = handleApiError(
        error,
        "Registration failed, please try again."
      );
      setErrorMessage(message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side illustration */}
      <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center">
        <img src={knowledge} alt="Register Illustration" className="max-w-md" />
      </div>

      {/* Right side (register form) */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-500">Join us and start your journey 🚀</p>
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm text-center bg-red-50 py-2 rounded">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="text-green-600 text-sm text-center bg-green-50 py-2 rounded">
              {successMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Username"
              variant={usernameError ? "error" : "default"}
              errorMessage={usernameError}
              required
            />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant={emailError ? "error" : "default"}
              errorMessage={emailError}
              required
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant={passwordError ? "error" : "default"}
              errorMessage={passwordError}
              required
            />

            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant={confirmPasswordError ? "error" : "default"}
              errorMessage={confirmPasswordError}
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
