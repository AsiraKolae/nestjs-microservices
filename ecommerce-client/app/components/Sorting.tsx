import React from "react";
import { SortingProps } from "../types/product/interfaces";

const Sorting: React.FC<SortingProps> = ({productTotal, category, sorted, onChange}) => {
  
  return (
    <>
      <div className="flex items-center justify-between">

          <div className="mb-4 items-center">
            <h2 className="text-md lg:text-xl font-bold tracking-tight text-gray-900">{category}</h2>
            <p className="text-sm text-gray-500">
              {productTotal} รายการ
            </p>
          </div>
          <div className="mb-4 flex items-center">
              <label className="mr-2 text-md hidden sm:block">เรียงตาม : </label>
              <select
                  value={sorted}
                  onChange={onChange}
                  className="border p-2 rounded-lg cursor-pointer focus:outline-none"
              >
                  <option value="asc">ราคาต่ำ-สูง</option>
                  <option value="desc">ราคาสูง-ต่ำ</option>
              </select>
          </div>
      </div>
    </>
  );

};

export default Sorting;

