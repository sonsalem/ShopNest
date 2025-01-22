import Image from "next/image";
import { MoveRight } from "lucide-react";
import Link from "next/link";

const Landing = () => {
  return (
    <div className="landing py-5 overflow-hidden items-center z-[1] bg-bgLight-100 pt-5 relative justify-between flex flex-col sm:flex-row gap-4 sm:gap-0 px-4 md:px-8 xl:px-20">
      {/* TEXT */}
      <div className="texts self-center relative z-10 flex-1">
        <div className="strok-name text-5xl md:text-[90px] lg:text-[120px] xl:text-[140px] font-bold leading-[.8]">
          FASHION
        </div>
        <div className="text-5xl md:text-[90px] lg:text-[120px] xl:text-[160px] font-bold md:translate-x-36 lg:translate-x-44 md:leading-[.8]">
          NEVER
        </div>
        <div className="text-5xl md:text-[90px] lg:text-[120px] xl:text-[160px]  md:translate-x-56 lg:translate-x-80 md:leading-[.8]">
          SLEEP
        </div>
        <div className="md:ps-8 mt-8">
          <p className="text-xs md:text-sm max-w-[300px] ps-4 border-l-2 border-l-black">
            Discover exclusive deals and timeless fashion trends crafted just
            for you. Shop our unique collection and elevate your style today.
          </p>
          <Link href="/products" className="mt-10 underline flex">
            <div className="pe-4">READ MORE</div>
            <MoveRight />
          </Link>
        </div>
        {/* Circle */}
        <Image
          src="/landCircle.png"
          alt="landCircle"
          width={100}
          height={100}
          objectFit="contain"
          className="absolute bottom-40 lg:bottom-48 xl:bottom-52 hidden md:block animate-bounce"
        />
      </div>
      {/* Image */}
      <div className="image sm:w-1/2 bg-red relative h-full">
        <Image
          src="/landing.png"
          alt="landingPage"
          width={1200}
          height={1200}
          objectFit="cover"
          className="w-[80%] sm:w-[90%] h-[80%] sm:h-[90%] mx-auto"
        />
      </div>
    </div>
  );
};

export default Landing;
