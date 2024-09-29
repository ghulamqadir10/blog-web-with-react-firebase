import React from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config";
import { useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Success! Logged in successfully.");
      navigate("/");
      // Redirect or perform additional actions
    } catch (error) {
      alert(`Error! ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center w-full max-w-4xl shadow-lg rounded-lg overflow-hidden m-auto">
      {/* Left Section */}
      <div className="w-1/2 bg-white p-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-blue-600">Log in</h1>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Welcome to Login page</h2>
        <p className="text-gray-600 mb-6">Sign into your account</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className={`w-full px-4 py-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className={`w-full px-4 py-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-200"
          >
            Log In
          </button>
          <a
            href="#"
            className="block text-blue-600 text-sm mt-4 hover:underline"
          >
            Forgot password?
          </a>
        </form>
      </div>
    </div>
  );
}

export default Login;
