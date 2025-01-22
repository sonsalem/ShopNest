"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import VanillaTilt from "vanilla-tilt";
import Link from "next/link";
import axios from "axios";
import Loader from "./Loader";

const images = [
  {
    src: "https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    src: "https://images.pexels.com/photos/266621/pexels-photo-266621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    src: "https://images.pexels.com/photos/6764925/pexels-photo-6764925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    src: "https://images.pexels.com/photos/12945027/pexels-photo-12945027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const Categories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get<string[]>(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    cardRefs.current.forEach((card) => {
      if (card) {
        VanillaTilt.init(card, {
          max: 25,
          speed: 400,
          scale: 1.05,
          glare: true,
        });
      }
    });
  }, [categories]);

  return (
    <div className="pt-10 w-full h-full backdrop-blur-[5px] px-4 md:px-8 xl:px-40">
      {isLoading ? (
        <Loader />
      ) : (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 2,
            },
            320: {
              slidesPerView: 1,
            },
          }}
          loop={true}
          navigation
          initialSlide={1}
          pagination={{ clickable: true }}
        >
          {categories && (
            <>
              {categories.map((cat, index) => (
                <SwiperSlide key={index}>
                  <Link
                    href={`/products?cat=${cat}`}
                    className="p-3 block rounded-md backdrop-blur-[100px] border-[1px] border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]"
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                  >
                    <Image
                      src={images[index % images.length].src}
                      alt={cat}
                      width={300}
                      height={300}
                      className="w-full rounded-md aspect-[1.6] "
                    />
                    <p className="mb-0 mt-2 text-xl text-center dark:text-white">
                      {cat}
                    </p>
                  </Link>
                </SwiperSlide>
              ))}
              {categories.map((cat, index) => (
                <SwiperSlide key={index}>
                  <Link
                    href={`/products?cat=${cat}`}
                    className="p-3 block rounded-md backdrop-blur-[100px] border-[1px] border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]"
                    ref={(el) => {
                      cardRefs.current[index + 4] = el;
                    }}
                  >
                    <Image
                      src={images[index % images.length].src}
                      alt={cat}
                      width={300}
                      height={300}
                      className="w-full rounded-md aspect-[1.6] "
                    />
                    <p className="mb-0 mt-2 text-xl text-center dark:text-white">
                      {cat}
                    </p>
                  </Link>
                </SwiperSlide>
              ))}
            </>
          )}
        </Swiper>
      )}
    </div>
  );
};

export default Categories;
