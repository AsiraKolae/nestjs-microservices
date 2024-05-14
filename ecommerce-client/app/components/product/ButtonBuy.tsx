"use client";
import React from "react";
import { ProductByIdProps } from "@/app/types/product/interfaces";
import { addToCart } from "@/app/store/CartStore";
import { useRouter } from "next/navigation";

const ButtonBuy: React.FC<ProductByIdProps> = ({ product }) => {
  const router = useRouter();
  return (
    <div>
      <button
        type="button"
        className="ml-3 inline-flex items-center rounded-md bg-gradient-to-l from-coolGreen to-softCool hover:bg-gradient-to-r px-6 py-2 sm:py-4 text-md font-medium border border-coolGreen text-Emerald-800 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
        onClick={() => {
          addToCart({ product }).then((response) => {
            if (response.status.code === 200) {
              router.push("/cart");
            }
          });
        }}
      >
        ซื้อสินค้า
      </button>
    </div>
  );
};

export default ButtonBuy;
