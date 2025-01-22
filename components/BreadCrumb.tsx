"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, ChevronRight } from "lucide-react";

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();
  const pathSegments: string[] = pathname
    .split("/")
    .filter((segment) => segment);
  return (
    <nav
      className="flex px-4 md:px-8 xl:px-40 py-4 my-10 bg-bgLight-100 dark:bg-bgDark-300"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex gap-1 items-center font-medium hover:text-bgLight-200 transition-all duration-500 dark:text-gray-400 dark:hover:text-white"
          >
            <House />
            Home
          </Link>
        </li>

        {/* Dynamic Breadcrumb Links */}
        {pathSegments.map((segment, index) => {
          let linkPath = `/${pathSegments.slice(0, index + 1).join("/")}`;
          if (linkPath === "/products") {
            linkPath = "/products";
          }

          return (
            <li key={index}>
              <div className="flex items-center">
                <ChevronRight className="dark:text-white" />
                <Link
                  href={linkPath}
                  className="ms-1 text-sm font-medium hover:text-bgLight-200 transition-all duration-500 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  {/* Capitalize segment */}
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}{" "}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
