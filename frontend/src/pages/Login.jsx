import { useState } from "react";
import { loginUser } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);

      localStorage.setItem("token", data.token);

      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-6">
      
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        
        {/* Logo / Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-cyan-600 md:text-4xl">
            FinTrack
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your income & expenses easily
          </p>
        </div>

        {/* Login Heading */}
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 md:text-3xl">
          Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Email
            </label>

            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="h-12 w-full rounded-xl border px-4 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Password
            </label>

            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="h-12 w-full rounded-xl border px-4 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-cyan-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="h-12 w-full rounded-xl bg-cyan-600 font-semibold text-white transition hover:bg-cyan-700"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          
          <span
            onClick={() => navigate("/register")}
            className="cursor-pointer font-medium text-cyan-600 hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;