import React from "react";
import { useRouter } from "next/navigation";

const ChildrenCategories = ({ child }: any) => {
  const generateCategoryUrl = (categoryName: string) => {
    const perPage = 24;
    const page = 1;
    const category = encodeURIComponent(categoryName);
    const sortedColumn = 'price';
    const sortOrder = 'desc';
    return `/product?per_page=${perPage}&page=${page}&filters={"category":"${category}"}&sorted={"column":"${sortedColumn}","order":"${sortOrder}"}`;
  };

  return (
    <>
      {child.children.length > 0 && child.children.map((children: any) =>
        <a
          key={children.id}
          href={(children && children.name) ? generateCategoryUrl(children.name) : '#'}
          className="flex gap-x-4 px-4 py-1 mb-4 -mt-1 text-sm leading-5 text-gray-900 hover:bg-neutral-50 rounded-md"
        >
          {children.name}
        </a>
      )}
    </>
  );
};

export default ChildrenCategories;
