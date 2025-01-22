"use client";

import Cart from "@/components/Cart";
import Loader from "@/components/Loader";
import { UserType } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserType>();
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get("https://fakestoreapi.com/users/1");
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("userToken");
    router.push("/login");
  };

  return (
    <>
      <div
        className={`mb-20 bg-no-repeat bg-cover min-h-[400px] z-1 relative`}
        style={{ backgroundImage: "url(/profile-bg.jpg)" }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[#00000090]"></div>
      </div>
      <div className="-mt-44 mb-44 relative z-10 flex flex-col md:flex-row justify-center items-center gap-6 px-4 md:px-8 xl:px-40 dark:text-white md:justify-start md:items-start">
        <div className="detailes bg-white dark:bg-bgDark-400 rounded-lg p-4 min-w-[280px] text-center shadow-md">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Image
                src={"/profile-pic.png"}
                alt="profile Pic"
                width={80}
                height={80}
                className="rounded-full mx-auto -mt-[calc(1rem+40px)] shadow-lg"
              />
              <div className="data mb-6">
                <div className="text-2xl mb-3">#{userData?.username}</div>
                <div className="flex gap-3 mb-2">
                  <span className="font-semibold">Name :</span>
                  <span className="text-gray-600">
                    {userData?.name.firstname} {userData?.name.lastname}
                  </span>
                </div>
                <div className="flex gap-3 mb-2">
                  <span className="font-semibold">Email :</span>
                  <span className="text-gray-600">{userData?.email}</span>
                </div>
                <div className="flex gap-3 mb-2">
                  <span className="font-semibold">Phone :</span>
                  <span className="text-gray-600">{userData?.phone}</span>
                </div>
                <div className="flex gap-3 mb-2">
                  <span className="font-semibold">City :</span>
                  <span className="text-gray-600">
                    {userData?.address.city}
                  </span>
                </div>
                <div className="flex gap-3 mb-2">
                  <span className="font-semibold">Zip-Code :</span>
                  <span className="text-gray-600">
                    {userData?.address.zipcode}
                  </span>
                </div>
              </div>
              <div
                onClick={handleLogOut}
                className="cursor-pointer ring-1 ring-red-500 w-fit px-4 py-1 mx-auto rounded-sm text-red-500 hover:text-white hover:bg-red-500 transition-all duration-500"
              >
                Log Out
              </div>
            </>
          )}
        </div>
        <div className=" bg-white dark:bg-bgDark-400 flex-1 rounded-lg p-4 shadow-md">
          <div className="text-2xl mb-4">Cart Shooping</div>
          <Cart />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
