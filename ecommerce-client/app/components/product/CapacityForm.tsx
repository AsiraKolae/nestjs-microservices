"use client";
import React, { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import {
  useColorStore,
  useCapacityStore,
} from "@/app/store/ProductDetailStore";
import { ProductByIdProps } from "@/app/types/product/interfaces";

interface GroupProductCapacity {
  capacity: string;
  items: any;
}

const CapacityForm: React.FC<ProductByIdProps> = ({
  product,
  productFilterName,
}) => {
  const [selectedCapacity, setSelectedCapacity] = useState(
    product.product_attr.capacity
  );
  const [groupedByCapacity, setGroupedByCapacity] = useState<
    GroupProductCapacity[]
  >([]);

  useEffect(() => {
    const groupedData = productFilterName.reduce((groups: any, item: any) => {
      const key = item.product_attr.capacity;

      // Create a new group if it doesn't exist
      if (!groups[key]) {
        groups[key] = [];
      }

      // Add the current item to the group
      groups[key].push(item);

      return groups;
    }, {});

    // Convert the grouped data into an array
    const resultArray = Object.entries(groupedData).map(([key, value]) => ({
      capacity: key,
      items: value,
    }));

    setGroupedByCapacity(resultArray);
  }, []);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const setCapacity = useCapacityStore((state) => state.setCapacity);

  const color = useColorStore((state) => state.color);

  useEffect(() => {
    setCapacity(selectedCapacity);
  }, [selectedCapacity]);

  if (selectedCapacity == null || selectedCapacity.length <= 0) {
    return <></>;
  }

  return (
    <>
      <form className="mt-6">
        {/* Capacity */}
        <h3 className="text-sm text-gray-500">Capacity</h3>
        <RadioGroup
          value={selectedCapacity}
          onChange={setSelectedCapacity}
          className="mt-4"
        >
          <RadioGroup.Label className="sr-only">
            Choose a capacity
          </RadioGroup.Label>

          <div className="flex items-center space-x-3">
            {groupedByCapacity?.map((item: any, key: number) =>
              item.items.find((item: any) => item.product_attr.color === color)
                ?.id ? (
                <RadioGroup.Option
                  key={key}
                  disabled={
                    item.items.find(
                      (item: any) => item.product_attr.color === color
                    )?.id
                  }
                  value={item.capacity}
                  className={({ active, checked }) =>
                    classNames(
                      // item.colorHex.selectedColor,
                      active && checked
                        ? "ring ring-offset-1 text-white bg-gray-800"
                        : "",
                      !active && checked ? "ring-2 text-white bg-gray-800" : "",
                      "ring-gray-800 text-gray-400 relative -m-0.5 flex cursor-pointer items-center justify-center rounded-md p-1 border border-gray-300 focus:outline-none"
                    )
                  }
                >
                  <a
                    href={item.items
                      .find((item: any) => item.product_attr.color === color)
                      ?.id?.toString()}
                  >
                    {item.capacity}
                  </a>
                </RadioGroup.Option>
              ) : null
            )}
          </div>
        </RadioGroup>
      </form>
    </>
  );
};

export default CapacityForm;
