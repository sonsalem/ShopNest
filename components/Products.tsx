"use client";

import { ProductProps } from "@/types";
import axios from "axios";
import Image from "next/image";
import { Search, Star, X } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PaginationItems from "./PaginationItems";
import Link from "next/link";
import ZoomImage from "./ZoomImage";
import QuickView from "./QuickView";
import Loader from "./Loader";

const Products = ({
  limit,
  sort,
  name,
  slider,
  pagination,
  perPage,
}: {
  limit?: number;
  sort?: string;
  name?: string;
  slider?: boolean;
  pagination?: boolean;
  perPage?: number;
}) => {
  if (typeof window !== "undefined") {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState(true);

    const searchParams = () => new URLSearchParams(window.location.search);
    const limitItems = searchParams().get("limit")
      ? searchParams().get("limit")
      : limit;
    const page = searchParams().get("page") ? +searchParams().get("page")! : 1;
    const category = searchParams().get("cat");
    const min = searchParams().get("min");
    const max = searchParams().get("max");
    const sortItems = searchParams().get("sort")
      ? searchParams().get("sort")
      : sort;
    const [numOfProducts, setNumOfProducts] = useState<number>(0);
    const headName = searchParams().get("title")
      ? searchParams().get("title")
      : category
      ? category
      : name;

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          let pathApi = "https://fakestoreapi.com/products";

          const title = searchParams().get("title");

          if (category && category != "All Products") {
            pathApi = `https://fakestoreapi.com/products/category/${category}`;
          }
          if (sortItems) {
            pathApi +=
              (pathApi.includes("?") ? "&" : "?") + `sort=${sortItems}`;
          }
          if (limitItems) {
            pathApi +=
              (pathApi.includes("?") ? "&" : "?") + `limit=${limitItems}`;
          }

          const { data } = await axios.get<ProductProps[]>(pathApi);

          let result;

          const filters = data.filter((item) => {
            const titleMatch = title
              ? item.title.toLowerCase().includes(title.toLowerCase())
              : true;
            const minMatch = min ? item.price > +min : true;
            const maxMatch = max ? item.price < +max : true;

            return titleMatch && minMatch && maxMatch;
          });

          // Handle pagination
          if (pagination && perPage) {
            result = filters.filter(
              (_, i) => i + 1 > (page - 1) * perPage && i + 1 <= page * perPage
            );
          } else {
            result = filters;
          }

          setProducts(result);
          setNumOfProducts(filters.length);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }, [searchParams]);

    const [openQuick, setOpenQuick] = useState<boolean>(false);
    const [idQuick, setIdQuick] = useState<string>("0");

    const handleQuickView = (id: string) => {
      setIdQuick(id);
      setOpenQuick(true);
      document.body.classList.add("overflow-hidden");
    };

    const handleClose = () => {
      setOpenQuick(false);
      document.body.classList.remove("overflow-hidden");
    };

    if (loading) {
      return <Loader />;
    }

    if (slider) {
      return (
        <div className="py-5 px-4 md:px-8 xl:px-40 ">
          <h1 className="dark:text-white text-3xl mb-10 font-bold text-center">
            {headName}
          </h1>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            breakpoints={{
              1024: {
                slidesPerView: 4,
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
            {products.map((product: ProductProps) => (
              <SwiperSlide key={product.id}>
                <div
                  className={`text-center flex flex-col items-center justify-center`}
                  key={product.id}
                >
                  <div className="relative overflow-hidden imageZoom w-full h-[200px] mb-2">
                    <ZoomImage
                      id={product.id}
                      src={product.image}
                      dimensions={150}
                    />
                    {/* QUICK VIEW */}
                    <div
                      onClick={() => handleQuickView(`${product.id}`)}
                      className="view w-8 h-8 hidden md:grid place-items-center absolute rounded-full -right-16 top-2 bg-white shadow-md
                cursor-pointer hover:text-bgLight-200 transition-all duration-500"
                    >
                      <Search size={18} />
                    </div>
                    {/* RATING */}
                    <div
                      className={`rating flex items-center text-sm shadow-md gap-1 transition-all duration-500 bg-white w-fit px-2 py-1 absolute top-2 -left-16 rounded-full`}
                    >
                      {product.rating.rate}
                      <Star
                        size={16}
                        style={{
                          color: `rgba(255,215,0,${product.rating.rate / 5})`,
                          fill: `rgba(255,215,0,${product.rating.rate / 5})`,
                        }}
                      />
                    </div>
                    {/* BUTTON */}
                    <button
                      className=" w-[80%] py-2 rounded-full bg-white shadow-md absolute -bottom-10 left-[50%] translate-x-[-50%]
              hover:bg-bgLight-200 hover:text-white transition-all duration-500"
                    >
                      Add To Cart
                    </button>
                  </div>
                  {/* TEXTS */}
                  <div className="texts w-full px-3">
                    <div className="text-sm mb-4 text-gray-500">
                      {product.category}
                    </div>
                    <div className="colors flex justify-center items-center gap-[6px] mb-2">
                      <div className="w-[15px] h-[15px] rounded-full bg-[#b0c4de] border-[2px] border-[#efefef]"></div>
                      <div className="w-[15px] h-[15px] rounded-full bg-bgLight-200 border-[2px] border-[#efefef]"></div>
                      <div className="w-[15px] h-[15px] rounded-full bg-[#808080] border-[2px] border-[#efefef]"></div>
                      <div className="w-[15px] h-[15px] rounded-full bg-[#964B00] border-[2px] border-[#efefef]"></div>
                    </div>
                    <Link
                      href={`/products/${product.id}`}
                      className="text-ellipsis dark:text-white overflow-hidden whitespace-nowrap max-w-full mb-1 dark:hover:text-bgLight-200 block
                      hover:text-bgLight-200 transition-all duration-500"
                    >
                      {product.title}
                    </Link>
                    <div className="flex items-center gap-1 justify-center text-bgLight-200">
                      ${product.price}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className={`fixed bg-white dark:bg-bgDark-400 scrollbar-hide shadow-2xl transition-all duration-500 left-1/2  -translate-x-1/2 -translate-y-1/2
            w-[calc(90vw)] h-[calc(90vh)] lg:w-[calc(70vw)] rounded-lg overflow-scroll scroll-smooth hidden md:block
          ${
            openQuick
              ? "z-[10000] opacity-100 top-1/2"
              : " opacity-0 top-0 -z-10"
          }
          `}
          >
            <X
              onClick={handleClose}
              className="fixed top-5 right-4 ms-auto bg-white rounded-md cursor-pointer dark:bg-bgDark-300 text-red-500 p-1 shadow-lg"
            />
            {openQuick && <QuickView id={`${idQuick}`} />}
          </div>
        </div>
      );
    }

    return (
      <div className="py-5 px-4 md:px-8 xl:px-40">
        <h1 className="dark:text-white text-3xl mb-10 font-bold text-center">
          {headName}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 products gap-x-4 gap-y-8">
          {products.map((product: ProductProps) => (
            <div
              className={`text-center flex flex-col items-center justify-center`}
              key={product.id}
            >
              <div className="relative overflow-hidden imageZoom w-full h-[200px] mb-2">
                <ZoomImage
                  id={product.id}
                  src={product.image}
                  dimensions={150}
                />
                {/* QUICK VIEW */}
                <div
                  onClick={() => handleQuickView(`${product.id}`)}
                  className="view w-8 h-8 hidden md:grid place-items-center absolute rounded-full -right-16 top-2 bg-white shadow-md
                cursor-pointer hover:text-bgLight-200 transition-all duration-500"
                >
                  <Search size={18} />
                </div>
                {/* RATING */}
                <div
                  className={`rating flex items-center text-sm shadow-md gap-1 transition-all duration-500 bg-white w-fit px-2 py-1 absolute top-2 -left-16 rounded-full`}
                >
                  {product.rating.rate}
                  <Star
                    size={16}
                    style={{
                      color: `rgba(255,215,0,${product.rating.rate / 5})`,
                      fill: `rgba(255,215,0,${product.rating.rate / 5})`,
                    }}
                  />
                </div>
                {/* BUTTON */}
                <button
                  className=" w-[80%] py-2 rounded-full bg-white shadow-md absolute -bottom-10 left-[50%] translate-x-[-50%]
              hover:bg-bgLight-200 hover:text-white transition-all duration-500"
                >
                  Add To Cart
                </button>
              </div>
              {/* TEXTS */}
              <div className="texts w-full px-3">
                <div className="text-sm mb-4 text-gray-500">
                  {product.category}
                </div>
                <div className="colors flex justify-center items-center gap-[6px] mb-2">
                  <div className="w-[15px] h-[15px] rounded-full bg-[#b0c4de] border-[2px] border-[#efefef]"></div>
                  <div className="w-[15px] h-[15px] rounded-full bg-bgLight-200 border-[2px] border-[#efefef]"></div>
                  <div className="w-[15px] h-[15px] rounded-full bg-[#808080] border-[2px] border-[#efefef]"></div>
                  <div className="w-[15px] h-[15px] rounded-full bg-[#964B00] border-[2px] border-[#efefef]"></div>
                </div>
                <Link
                  href={`/products/${product.id}`}
                  className="text-ellipsis dark:text-white overflow-hidden whitespace-nowrap max-w-full mb-1 dark:hover:text-bgLight-200 block
                  hover:text-bgLight-200 transition-all duration-500"
                >
                  {product.title}
                </Link>
                <div className="flex items-center gap-1 justify-center text-bgLight-200">
                  ${product.price}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`fixed bg-white dark:bg-bgDark-400 scrollbar-hide shadow-2xl transition-all duration-500 left-1/2  -translate-x-1/2 -translate-y-1/2
            w-[calc(90vw)] h-[calc(90vh)] lg:w-[calc(70vw)] rounded-lg overflow-scroll scroll-smooth hidden md:block
          ${
            openQuick
              ? "z-[10000] opacity-100 top-1/2"
              : " opacity-0 top-0 -z-10"
          }
          `}
        >
          <X
            onClick={handleClose}
            className="fixed top-5 right-4 ms-auto bg-white rounded-md cursor-pointer dark:bg-bgDark-300 text-red-500 p-1 shadow-lg"
          />
          {openQuick && <QuickView id={`${idQuick}`} />}
        </div>
        {pagination && (
          <PaginationItems numOfProducts={numOfProducts} perPage={perPage} />
        )}
      </div>
    );
  }

  return <></>;
};

export default Products;
