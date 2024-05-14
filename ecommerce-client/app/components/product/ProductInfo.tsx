"use client";
import { PlusIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import React from "react";
import { ProductByIdProps } from "@/app/types/product/interfaces";
import { useSession } from "next-auth/react";

const ProductInfo: React.FC<ProductByIdProps> = ({ product }) => {

  const { data: session } = useSession();

  return (
    <>
      <h1 className="mt-5 text-2xl font-bold tracking-tight text-gray-900">
        {product.name}
      </h1>
      <div className="flex flex-row text-sm">
        <div className="text-gray-500 p-2">แบรนด์: {product?.brand?.name}</div>
        <div className="text-gray-300 p-2"> | </div>
        <div className="text-gray-500 p-2">
          {" "}
          SKU: {product?.product_attr?.sku}
        </div>
        {/* <p>แบรนด์: {product.brand.name}</p> */}
      </div>
      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-2xl tracking-tight font-semibold text-gray-800">
          {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(product?.product_attr?.price) ?? '฿0.00'}
        </p>
        {(session?.user.user_role === "employee" && product?.product_attr?.price && product?.product_attr?.price_npd_in_vat)
          ? 
          <div className="py-2 flex flex-row text-xs text-gray-400">
            <div className="text-sm text-yellow-800 text-center">
              <div className="inline-flex">
                <PlusIcon className="h-4 w-4 stroke-2" />
                <p>&copy;</p>
                <p className="text-sm">{(product?.product_attr?.price - product?.product_attr?.price_npd_in_vat).toLocaleString("th-TH",{ minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
              <p className="text-xs -mt-1">Cashback</p>
            </div>
          </div>
        : " "}
        <div className="flex flex-row text-xs text-gray-400">
          <ShieldCheckIcon
            className="mr-1 h-4 w-4 flex-none text-gray-400"
            aria-hidden="true"
          />
          Warranty {product?.warranty}
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <h3 className="sr-only">Description</h3>

        <div className="space-y-6 text-sm text-gray-500">
          {product?.description}
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
