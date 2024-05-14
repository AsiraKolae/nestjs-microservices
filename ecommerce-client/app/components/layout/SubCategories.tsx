import React from "react";
import { Categories, SubCategoryListProps } from "./interfaces";
import ChildrenCategories from "./ChildrenCategories";

const SubCategories = ({ categories, activeContent }: SubCategoryListProps) => {
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
      {categories
        .filter((item) => item.id === activeContent)
        .map((filteredItem) =>
          filteredItem.children &&
          filteredItem.children.length > 0
            ? filteredItem.children.map((child: Categories) => (
                <div key={child.id}>
                  <a
                    href={(child && child.name) ? generateCategoryUrl(child.name) : '#'}
                    className="flex gap-x-4 px-4 py-1 text-sm font-semibold leading-12 text-gray-900 hover:bg-neutral-50 rounded-md"
                  >
                    {child.name}
                  </a>
                  <ChildrenCategories child={child} />
                </div>
              ))
            : null
        )}
    </>
  );
};

export default SubCategories;
