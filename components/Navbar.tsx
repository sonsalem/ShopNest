"use client";

import { NAV_LINKS, BRAND_NAME } from "@/constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Menu, ShoppingCart, LogIn } from "lucide-react";
import SearchBar from "./SearchBar";
import MenuSmall from "./MenuSmall";
import { useEffect, useRef, useState } from "react";
import Cart from "./Cart";

const Navbar = () => {
  // Path Name For Active Class
  const pathName = usePathname();
  const router = useRouter();

  // Menu Small
  const [open, setOpen] = useState<boolean>(false);

  // Check Sing in
  let isLogededIn = true;
  if (typeof window !== "undefined") {
    isLogededIn = localStorage.getItem("userToken") !== null;
    if (!isLogededIn) router.push("/login");
  }

  // Get Cart Length
  const [numOfCart, setNumOfCart] = useState<number>(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartLength = localStorage.getItem("cartLength");
      if (cartLength !== null) {
        setNumOfCart(JSON.parse(cartLength));
      }
    }
  }, []);

  // Cart Open
  const [isCartOpen, setIsCartOpen] = useState(false);
  const iconCartRef = useRef<SVGSVGElement>(null);
  const menuCartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuCartRef.current &&
        !menuCartRef.current.contains(e.target as Node) &&
        iconCartRef.current !== e.target
      ) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen]);

  return (
    <div className="">
      <div
        className="h-20 shadow-md px-4 md:px-8 xl:px-40 justify-between md:justify-start
    flex items-center bg-white relative z-30 dark:shadow-slate-900 dark:shadow-2xl dark:bg-bgDark-400 gap-2 dark:text-white transition-all"
      >
        {/* Logo */}
        <Link
          href="/"
          className="logo me-8 flex flex-col items-center h-20 justify-center pt-5"
        >
          <span className="font-bold text-2xl" style={{ lineHeight: ".5" }}>
            {BRAND_NAME}
          </span>
          <span>STORE</span>
        </Link>
        {/* Large Devices */}
        <div className="links lg:flex gap-8 me-4 hidden">
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              className={`flex items-center gap-2 h-20 px-2 xl:px-4 border-b-[1px] border-b-main
              ${
                // pathName.includes(link.href)
                link.href === "/" && pathName == "/"
                  ? "text-main !border-b-[6px] transition-all"
                  : link.href !== "/" && pathName.includes(link.href)
                  ? "text-main !border-b-[6px] transition-all"
                  : ""
              }
              `}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
        <div className="hidden md:block ms-auto me-6">
          <SearchBar />
        </div>
        {isLogededIn ? (
          <>
            <Link
              href="/profile"
              className={`hidden lg:flex items-center gap-2 h-20 px-2 xl:px-4 border-b-[1px] border-b-main
                    ${
                      pathName == "/profile"
                        ? "text-main border-b-[6px] transition-all"
                        : ""
                    }
                    `}
            >
              <span>
                <User />
              </span>
              <span className="font-semibold">Profile</span>
            </Link>
            <div className="relative">
              <div className="absolute -top-[6px] -right-[6px] bg-main text-white w-[16px] h-[16px] rounded-full text-xs flex justify-center items-center cursor-pointer">
                {numOfCart}
              </div>
              <ShoppingCart
                ref={iconCartRef}
                onClick={() => setIsCartOpen((prev) => !prev)}
                className="hidden lg:block cursor-pointer"
              />
              {isCartOpen && (
                <div
                  ref={menuCartRef}
                  className="absolute w-[450px] p-6 rounded-md top-12 -right-0 text-sm bg-white dark:bg-bgDark-300
              shadow-md z-20 flex-col gap-6"
                >
                  <div className="text-lg mb-6">Shooping...</div>
                  <Cart />
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={`hidden lg:flex items-center gap-2 h-20 px-2 xl:px-4 border-b-[1px] border-b-main
                    ${
                      pathName == "/login"
                        ? "text-main border-b-[6px] transition-all"
                        : ""
                    }
                    `}
            >
              <span>
                <LogIn />
              </span>
              <span className="font-semibold">Log in</span>
            </Link>
          </>
        )}
        <div className="lg:hidden">
          <Menu
            className="cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
      </div>
      {/* Small Devices */}
      <div className="lg:hidden">
        <MenuSmall
          open={open}
          isLogededIn={isLogededIn}
          numOfCart={numOfCart}
        />
      </div>
    </div>
  );
};

export default Navbar;
