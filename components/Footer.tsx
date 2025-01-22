"use client";

import { BRAND_NAME } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="content dark:text-white">
      <div className="py-20 px-4 md:px-8 xl:px-40 border-t-4 border-t-bgLight-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="box">
            {/* Logo */}
            <Link
              href="/"
              className="blogo flex flex-col w-fit mb-2 justify-center"
            >
              <span className="font-bold text-2xl" style={{ lineHeight: ".5" }}>
                {BRAND_NAME}
              </span>
              <span className="text-center">STORE</span>
            </Link>
            <div className="max-w-[200px]">
              Stay up to date! We send out a newsletter twice a week with our
              latest news.
            </div>
            <div className="box mt-6">
              <h1 className="text-xl font-bold mb-4">Keep in Touch!</h1>
              <ul className="flex flex-wrap gap-4">
                <Link href="https://www.facebook.com/profile.php?id=61553863762148">
                  <Image
                    width={35}
                    height={35}
                    src="/FaceBook.png"
                    alt="image"
                  />
                </Link>
                <Link href="https://www.instagram.com/salemmamdouh77/">
                  <Image width={35} height={35} src="/insta.webp" alt="image" />
                </Link>
                <Link href="https://wa.me/201556617801">
                  <Image
                    width={40}
                    height={40}
                    src="/Whatsapp.png"
                    alt="image"
                  />
                </Link>
                <Link href="mailto:salemmamdouh77777@gmail.com">
                  <Image width={35} height={35} src="/Google.png" alt="image" />
                </Link>
                <Link href="https://github.com/sonsalem">
                  <Image width={35} height={35} src="/github.png" alt="image" />
                </Link>
              </ul>
            </div>
          </div>
          <div className="box">
            <h1 className="text-xl font-bold mb-4">Master Pages</h1>
            <Link href="/" className="block mb-2 w-fit linkunder relative pb-1">
              Home Page
            </Link>
            <Link
              href="/about"
              className="block mb-2 w-fit linkunder relative pb-1"
            >
              About Page
            </Link>
            <Link
              href="/products"
              className="block mb-2 w-fit linkunder relative pb-1"
            >
              Products Page
            </Link>
          </div>
          <div className="box">
            <h1 className="text-xl font-bold mb-4">Master Pages</h1>
            <Link href="" className="block mb-2 w-fit">
              Customer Service
            </Link>
            <Link href="" className="block mb-2 w-fit">
              My Account
            </Link>
            <Link href="" className="block mb-2 w-fit">
              Find a Store
            </Link>
            <Link href="" className="block mb-2 w-fit">
              Legal & Privacy
            </Link>
            <Link href="" className="block mb-2 w-fit">
              Gift Card
            </Link>
          </div>
          <div className="box">
            <h1 className="text-xl font-bold mb-4">SUBSCRIBE</h1>
            <p className="mb-8">
              Be the first to get the latest news about trends, promotions, and
              much more!
            </p>
            <div className="flex mb-4 rounded-md overflow-hidden border-[1px] border-bgLight-200">
              <input
                type="text"
                placeholder="Email address"
                className="p-[10px] w-3/4 focus:outline-none bg-transparent"
              />
              <button className="w-1/4 bg-bgLight-200 text-white">JOIN</button>
            </div>
            <span className="font-semibold">Secure Payments</span>
            <div className="flex justify-between mt-4">
              <Image src="/discover.png" alt="" width={40} height={20} />
              <Image src="/skrill.png" alt="" width={40} height={20} />
              <Image src="/paypal.png" alt="" width={40} height={20} />
              <Image src="/mastercard.png" alt="" width={40} height={20} />
              <Image src="/visa.png" alt="" width={40} height={20} />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
          <div className="">
            © {year} {BRAND_NAME} Store
          </div>
          <div className="flex gap-8">
            <div className="">
              <span className="text-gray-500 mr-4">Language</span>
              <span className="font-medium">United States | English</span>
            </div>
            <div className="">
              <span className="text-gray-500 mr-4">Currency</span>
              <span className="font-medium">$ USD</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black py-5 px-3 text-center text-white">
        Copyright © {year} All Rights Reserved. Designed by
        <span className="text-bgLight-100 ms-1">SonSalem</span>
      </div>
    </div>
  );
};

export default Footer;
