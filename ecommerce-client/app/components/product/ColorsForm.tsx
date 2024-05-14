"use client";
import React, { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import {
  useColorStore,
  useCapacityStore,
} from "@/app/store/ProductDetailStore";
import { ProductByIdProps } from "@/app/types/product/interfaces";

interface GroupProduct {
  color: string;
  colorHex: string;
  items: any;
}

const ColorsForm: React.FC<ProductByIdProps> = ({
  product,
  productFilterName,
}) => {
  const [selectedColor, setSelectedColor] = useState(
    product.product_attr.color
  );
  const [groupedByColor, setGroupedByColor] = useState<GroupProduct[]>([]);

  useEffect(() => {
    const groupedData = productFilterName.reduce((groups: any, item: any) => {
      const key = item.product_attr.color;

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
      color: key,
      colorHex: (value as any)[0].product_attr.colorHex,
      items: value,
    }));

    setGroupedByColor(resultArray);
  }, []);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const color = useColorStore((state) => state.color);
  const setColor = useColorStore((state) => state.setColor);

  const capacity = useCapacityStore((state) => state.capacity);

  useEffect(() => {
    setColor(selectedColor);
  }, [selectedColor]);

  if (selectedColor == null) {
    return <></>;
  }

  return (
    <>
      <form className="mt-6">
        {/* Colors */}
        <h3 className="text-sm text-gray-500">
          Color
          <span className="ml-5 text-gray-600 font-medium">
            {selectedColor}
          </span>
        </h3>
        <RadioGroup
          value={selectedColor}
          onChange={setSelectedColor}
          className="mt-4"
        >
          <RadioGroup.Label className="sr-only">
            Choose a color
          </RadioGroup.Label>
          <div className="flex items-center space-x-3">
            {groupedByColor?.map((item: any, key: number) =>
              item.items.find(
                (item: any) => item.product_attr.capacity === capacity
              )?.id ? (
                <RadioGroup.Option
                  key={key}
                  disabled={
                    item.items.find(
                      (item: any) => item.product_attr.capacity === capacity
                    )?.id
                  }
                  value={item.color}
                  className={({ active, checked }) =>
                    classNames(
                      // item.colorHex.selectedColor,
                      active && checked ? "ring ring-offset-1" : "",
                      !active && checked ? "ring-2" : "",
                      !checked ? "!ring-0" : "",
                      "group relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-1 focus:outline-none"
                    )
                  }
                  style={{ boxShadow: `0 0 0 3px ${item.colorHex} inset` }}
                >
                  <RadioGroup.Label as="span" className="sr-only">
                    {item.color}
                  </RadioGroup.Label>
                  <a
                    href={item.items
                      .find(
                        (item: any) => item.product_attr.capacity === capacity
                      )
                      ?.id?.toString()}
                    aria-hidden="true"
                    style={{ backgroundColor: item.colorHex }}
                    className={classNames(
                      "h-8 w-8 rounded-full border border-black border-opacity-10"
                    )}
                  />
                </RadioGroup.Option>
              ) : null
            )}
          </div>
        </RadioGroup>
      </form>
    </>
  );
};

export default ColorsForm;
