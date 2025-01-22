"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const Loader = () => {
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      setTheme(storedTheme || "");
    }
  }, []);

  return (
    <div className="loader mx-auto w-full flex justify-center flex-col items-center gap-4">
      {theme !== "dark" ? (
        <Image
          src="/loader.svg"
          alt="loader"
          width={50}
          height={50}
          className="animate-spin"
        />
      ) : (
        <Image
          src="/loader-white.svg"
          alt="loader"
          width={50}
          height={50}
          className="animate-spin"
        />
      )}
      Loading...
    </div>
  );
};

export default Loader;
