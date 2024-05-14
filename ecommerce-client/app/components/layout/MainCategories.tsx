import React from 'react'
import { CategoryListProps } from './interfaces'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

const MainCategories = ({ categories, setActiveContentOnHover }: CategoryListProps) => {

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
      {categories.length > 0 && categories.map((item) =>
        item.parent_category_id == null ? (
          <a
            key={item.id}
            href={(item && item.name) ? generateCategoryUrl(item.name) : '#'}
            className="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-neutral-50 rounded-md"
            onMouseEnter={() =>
              setActiveContentOnHover(item.id)
            }
          >
            <ChevronRightIcon
              className="h-6 w-6 flex-none text-gray-400"
              aria-hidden="true"
            />
            {item.name}
          </a>
        ) : null
      )}
    </>
  )
}

export default MainCategories