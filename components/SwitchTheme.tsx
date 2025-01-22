"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const SwitchTheme = () => {
  const [theme, setTheme] = useState<string>("");

  const handleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      {theme === "dark" ? (
        <div
          onClick={handleTheme}
          className="bg-gray-300 text-black px-5 fixed right-4 bottom-4 z-[100000] w-[55px] h-[55px] rounded-full
        flex items-center justify-center cursor-pointer"
        >
          <div>
            <Moon size={25} />
          </div>
        </div>
      ) : (
        <div
          onClick={handleTheme}
          className="bg-white shadow-md px-5 fixed right-4 bottom-4 z-[100000] w-[55px] h-[55px] rounded-full
        flex items-center justify-center cursor-pointer"
        >
          <div>
            <Sun size={25} />
          </div>
        </div>
      )}
    </>
  );
};

export default SwitchTheme;
