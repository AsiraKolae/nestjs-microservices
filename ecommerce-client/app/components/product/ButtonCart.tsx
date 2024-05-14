"use client"
import { addToCart } from "@/app/store/CartStore";
import { ProductByIdProps } from "@/app/types/product/interfaces";
import React from "react";

const ButtonCart: React.FC<ProductByIdProps> = ({ product }) => {
  return (
    <div>
    <button
      type="button"
      className="inline-flex items-center rounded-md bg-gradient-to-l from-gray-300 to-gray-100 hover:bg-gradient-to-r px-6 py-2 sm:py-4 text-md font-medium border border-gray-300 text-Emerald-800 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
      onClick={() => addToCart({product})}
    >
      หยิบใส่ตะกร้า
    </button>
    </div>
  );
};

export default ButtonCart;
