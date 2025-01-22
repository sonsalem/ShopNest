"use client";

import { CartProps, ProductProps } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import Link from "next/link";

const Cart = () => {
  const [products, setProducts] = useState<CartProps>();
  const [productsData, setProductsData] = useState<ProductProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fecthCart = async () => {
      try {
        setIsLoading(true);

        // Fetch Cart
        const { data: cartProducts } = await axios.get<CartProps>(
          "https://fakestoreapi.com/carts/1"
        );
        setProducts(cartProducts);

        const num = cartProducts.products.reduce(
          (acc, cur) => acc + cur.quantity,
          0
        );

        if (window !== undefined) {
          localStorage.setItem("cartLength", JSON.stringify(num));
        }

        // Fetch Products

        let productsList: any[] = [];

        for (let i = 0; i < cartProducts.products.length; i++) {
          const { data: product } = await axios.get<ProductProps>(
            `https://fakestoreapi.com/products/${cartProducts.products[i].productId}`
          );

          productsList.push(product);
        }

        setProductsData(productsList);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fecthCart();
  }, []);

  console.log(productsData);

  return (
    <>
      <div className="flex flex-col gap-6">
        {products?.products.map((product, i) => (
          <div className="flex gap-6 dark:text-white pe-3 relative" key={i}>
            {/* Image & Data */}
            {productsData ? (
              // Image
              <>
                <div className=" bg-[#f8f8f8] p-4 rounded-md">
                  <Image
                    src={productsData[i].image}
                    alt="image"
                    width={80}
                    height={80}
                    className="mix-blend-multiply"
                  />
                </div>
                <div className="texts flex-1">
                  <div className="flex justify-between items-start">
                    <Link
                      href={`products/${productsData[i].id}`}
                      className="md:text-lg transition-all duration-500 hover:text-main"
                    >
                      {productsData[i].title}
                    </Link>
                    <div className="p-1 rounded-md bg-white shadow-sm dark:bg-bgDark-300">
                      <span className="text-green-400 text-xs me-1">
                        {products.products[i].quantity}x
                      </span>
                      <span className="text-xs">${productsData[i].price}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {productsData[i].category}
                  </div>
                </div>
              </>
            ) : (
              <Loader />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm mt-5">
        <Link
          href="/cart"
          className="rounded-md py-3 px-4 ring-1 ring-gray-300 dark:ring-gray-600 dark:text-white"
        >
          View Cart
        </Link>
        <button
          className="rounded-md py-3 px-4 bg-black dark:bg-white dark:text-black text-white disabled:cursor-not-allowed disabled:opacity-75"
          disabled={isLoading}
        >
          Checkout
        </button>
      </div>
    </>
  );
};

export default Cart;
