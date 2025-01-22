import Breadcrumb from "@/components/BreadCrumb";
import { BRAND_NAME } from "@/constants";
import Image from "next/image";

const page = () => {
  return (
    <>
      <Breadcrumb />
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-44 my-12 dark:text-white">
        <h1 className="text-2xl font-semibold text-center mb-2">
          Welcom To {BRAND_NAME}
        </h1>
        <h3 className="max-w-[350px] text-center mx-auto text-sm text-gray-800 dark:text-gray-400">
          No matter what industry you’re in, you could use an About Us page on
          your site.
        </h3>
        <div className="relative h-80 mt-10">
          <Image
            src="/about.jpg"
            alt="aboutImage"
            fill
            sizes="100%"
            objectFit="cover"
            className="rounded-t-3xl rounded-r-3xl"
          />
        </div>
      </div>
    </>
  );
};

export default page;
