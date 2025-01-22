import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col gap-6 bg-bgLight-100 px-4 py-20 dark:bg-bgDark-300">
      <Image src={`/404.png`} alt="404 IMage" width={400} height={400} />
      <h1 className="text-5xl font-bold dark:text-white">Page not fount</h1>
      <Link
        href={"/"}
        className="ring-1 ring-bgLight-300 dark:text-white rounded-md px-4 py-2 hover:bg-bgLight-300 hover:text-white transition-all duration-500"
      >
        Back To Home
      </Link>
    </div>
  );
}
