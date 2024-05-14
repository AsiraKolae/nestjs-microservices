"use clinet";
import React from "react";

import { ProductByIdProps } from "@/app/types/product/interfaces";

const Specification: React.FC<ProductByIdProps> = ({ product }) => {
  const attributes = product?.product_attr?.attributes;
  return (
    <div className="mt-8 sm:mt-3">
      <div className="px-4 sm:px-0">
        <h3 className="text-xl font-semibold leading-7 text-gray-900">
          คุณสมบัติสินค้า
        </h3>
      </div>
      <div className="mt-6 mb-16 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {Object.entries(attributes).map(([key, value]: any) => (
            <>
              <div className=" odd:bg-gray-100 even:bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {key}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {value}
                </dd>
              </div>
            </>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Specification;
