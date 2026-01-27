"use client";

import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/components/contexts/AuthContext";
import { useState } from "react";

interface SignUpInputs {
  name: string;
  email: string;
  password: string;
}

const SignUpPage = () => {
  const router = useRouter();
  const params = useParams();
  const { storeSlug } = params;
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignUpInputs) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const loginSuccess = await login(data.email, data.password);
        if (loginSuccess) {
          router.push(`/${storeSlug}/checkout`);
        } else {
          setError("Registration successful but login failed.");
        }
      } else {
        setError(result.errors?.[0]?.message as string || "Sign up failed.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
          {error && (
            <p className="text-red-500 text-xs italic text-center mb-4">
              {error}
            </p>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? "border-red-500" : ""
                }`}
              id="name"
              type="text"
              placeholder="Name"
              {...register("name", { required: "Please enter your name." })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message as string}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? "border-red-500" : ""
                }`}
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Please enter your email." })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message as string}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? "border-red-500" : ""
                }`}
              id="password"
              type="password"
              placeholder="******************"
              {...register("password", {
                required: "Please enter your password.",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message as string}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href={`/${storeSlug}/account/login`}
            >
              Or Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
