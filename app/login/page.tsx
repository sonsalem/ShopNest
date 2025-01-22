"use client";
import { BRAND_NAME } from "@/constants";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const [username, setUsername] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (typeof window !== "undefined") {
    if (localStorage.getItem("userToken")) router.push("/");
  }

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      setIsLoading(false);

      if (!response.ok) {
        throw new Error("Failed to login. Please check your credentials.");
      }

      const data = await response.json();
      localStorage.setItem("userToken", data.token);

      setSuccessMessage("Login successful!");
      setErrorMessage("");
      router.push("/");
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred.");
      setSuccessMessage("");
    } finally {
      setIsLoading(false); // Ensure loading state is reset after request
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="flex flex-col-reverse md:grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
        <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="mb-8">
              <div className="logo flex flex-col items-center justify-center pt-5">
                <span
                  className="font-bold text-2xl"
                  style={{ lineHeight: ".5" }}
                >
                  {BRAND_NAME}
                </span>
                <span>STORE</span>
              </div>
              <p className="text-gray-500 text-sm mt-4 leading-relaxed text-center">
                Sign in with the default password and username. It's a fake API,
                so don't change it.
              </p>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                User name
              </label>
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-bgLight-200"
                  placeholder="Enter user name"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-bgLight-200"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm">{successMessage}</p>
            )}

            <div className="!mt-8">
              <button
                disabled={isLoading}
                type="submit"
                className="w-full disabled:opacity-70 disabled:hover:bg-bgLight-200 shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white transition-all duration-500 bg-bgLight-200 hover:bg-bgLight-300 focus:outline-none"
              >
                {isLoading ? "Loading..." : "Sign in"}
              </button>
            </div>

            <p className="text-sm !mt-8 text-center">
              Don't have an account{" "}
              <a
                href="#"
                className="text-bgLight-300 font-semibold hover:underline ml-1 whitespace-nowrap"
              >
                Register here
              </a>
            </p>
          </form>
        </div>
        <div className="max-md:mt-8">
          <img
            src="/login.jpg"
            className="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover"
            alt="Dining Experience"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
