"use client";
import { ShoppingCart, User, LogIn } from "lucide-react";
import { NAV_LINKS } from "@/constants";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SearchBar from "./SearchBar";

const MenuSmall = ({
  open,
  isLogededIn,
  numOfCart,
}: {
  open: boolean;
  isLogededIn: boolean;
  numOfCart: number;
}) => {
  const pathName = usePathname();

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <aside
      className={`links z-50 fixed top-20 shadow-xl transition-all h-full w-[300px] max-w-full bg-white
          dark:bg-bgDark-400 dark:shadow-slate-900 dark:shadow-2xl dark:text-white ${
            open ? "left-0" : "-left-[300px]"
          }`}
    >
      <div className="md:hidden p-4">
        <SearchBar />
      </div>
      {NAV_LINKS.map((link) => (
        <Link
          href={link.href}
          key={link.key}
          className={`flex w-full items-center gap-2 h-20 px-5 border-b-[1px] border-b-main
              ${
                pathName == link.href
                  ? "text-main !border-b-[8px] transition-all"
                  : ""
              }
              `}
        >
          <span>{link.icon}</span>
          <span>{link.label}</span>
        </Link>
      ))}
      {isLogededIn ? (
        <>
          <Link
            href="/profile"
            className={`flex w-full items-center gap-2 h-20 px-5 border-b-[1px] border-b-main
              ${
                pathName == "/profile"
                  ? "text-main !border-b-[8px] transition-all"
                  : ""
              }
              `}
          >
            <span>
              <User />
            </span>
            <span className="font-semibold">Profile</span>
          </Link>
          <Link
            href="/cart"
            className={`flex w-full items-center gap-2 h-20 px-5 border-b-[1px] border-b-main
              ${
                pathName == "/cart"
                  ? "text-main !border-b-[8px] transition-all"
                  : ""
              }
              `}
          >
            <span>
              <ShoppingCart />
            </span>
            <span className="font-semibold">Cart ({numOfCart})</span>
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className={`flex w-full items-center gap-2 h-20 px-5 border-b-[1px] border-b-main
              ${
                pathName == "/login"
                  ? "text-main !border-b-[8px] transition-all"
                  : ""
              }
              `}
          >
            <span>
              <LogIn />
            </span>
            <span className="font-semibold">Login</span>
          </Link>
        </>
      )}
    </aside>
  );
};

export default MenuSmall;
