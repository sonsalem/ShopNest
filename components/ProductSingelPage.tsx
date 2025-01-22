"use client";

import { ProductProps } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import ZoomImage from "./ZoomImage";
import Link from "next/link";
import { Minus, Plus, Star } from "lucide-react";
import Loader from "./Loader";

const ProductSingelPage = ({ id, cn }: { id: string; cn: string }) => {
  const [productData, setProductData] = useState<ProductProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [starFull, setStarFull] = useState<number | undefined | string>(0);
  const [starEmpty, setStarEmpty] = useState<number | undefined | string>(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<ProductProps>(
          `https://fakestoreapi.com/products/${id}`
        );
        setProductData(data);
        setStarFull(Math.floor(Number(data.rating.rate)));
        setStarEmpty(5 - Math.floor(Number(data.rating.rate)));
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const [counter, setCounter] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const handlePlus = (count: number, price: number): void => {
    if (count && count > counter) {
      setTotal((counter + 1) * price);
      setCounter((prevCounter) => ++prevCounter);
    }
  };

  const handleMinus = (price: number): void => {
    if (counter > 0) {
      setTotal((counter - 1) * price);
      setCounter((prevCounter) => --prevCounter);
    }
  };

  return (
    <div className={`py-10 px-4 md:px-8 ${cn} my-10`}>
      <div className="flex gap-6 flex-col md:flex-row">
        {/* IMAGE */}
        {productData?.image ? (
          <div className="md:w-1/2 w-full h-[400px] bg-[#f8f8f8] p-4 rounded-lg overflow-hidden md:sticky top-[20px]">
            <ZoomImage
              id={productData.id}
              src={productData.image}
              dimensions={400}
            />
          </div>
        ) : (
          <Loader />
        )}
        {/* Text */}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="texts md:w-1/2 dark:text-white">
            <Link
              href={`/products?cat=${productData?.category}`}
              className="text-lg mb-6 text-gray-400 hover:text-bgLight-200 transition-all duration-500"
            >
              {productData?.category}
            </Link>
            <div className="text-3xl mb-6">{productData?.title}</div>
            <div className="rating flex items-center gap-1 mb-6">
              {Array(starFull)
                .fill(0)
                .map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    // style={{
                    //   color: `rgba(255,215,0)`,
                    //   fill: `rgba(255,215,0)`,
                    // }}
                    className="text-bgLight-200 fill-bgLight-200"
                  />
                ))}
              {Array(starEmpty)
                .fill(0)
                .map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="text-gray-200 fill-gray-200"
                  />
                ))}
            </div>
            <div className="flex justify-between gap-8 mb-3">
              <div className="box">
                <div className="text-gray-300 text-sm mb-3">PRICE</div>
                <div className="text-3xl text-bgLight-200">
                  ${productData?.price}
                </div>
              </div>
              <div className="counter">
                <div className="text-gray-300 text-sm mb-3">QUANTINTY</div>
                <div className="flex flex-1 bg-gray-100 dark:bg-gray-800 px-[7px] py-[7px] rounded-full justify-between min-w-[180px]">
                  <div
                    className="minus bg-white dark:bg-gray-700 rounded-full cursor-pointer hover:text-black dark:hover:text-white text-gray-400 transition-all duration-300"
                    onClick={() => handleMinus(productData?.price || 0)}
                  >
                    <Minus className="w-[28px] h-[28px] p-1" />
                  </div>
                  <div className="counter">{counter}</div>
                  <div
                    className="plus bg-white dark:bg-gray-700 rounded-full cursor-pointer hover:text-black dark:hover:text-white text-gray-400 transition-all duration-300"
                    onClick={() =>
                      handlePlus(
                        productData?.rating?.count || 0,
                        productData?.price || 0
                      )
                    }
                  >
                    <Plus className="w-[28px] h-[28px] p-1" />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-sm text-gra-200">
              Only have{" "}
              <span className="text-main"> {productData?.rating?.count}</span>{" "}
              on stock
            </div>
            <div className="dec mt-16 mb-10">
              <div className="border-b-2 mb-2 border-gray-200 pb-1 uppercase">
                Descrpition
              </div>
              <div className="text-sm text-gray-600 leading-6">
                {productData?.description}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="box">
                <div className="text-gray-300 text-sm mb-2 uppercase">
                  Total Price
                </div>
                <div className="text-3xl text-gray-600">${total}</div>
              </div>
              <button className="px-6 py-[10px] bg-bgLight-200 text-white rounded-full ring-1 ring-bgLight-200 hover:bg-bgLight-100 hover:text-black transition-all duration-500">
                Add To Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSingelPage;
