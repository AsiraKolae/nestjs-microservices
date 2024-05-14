import React, { useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { PaginationProps } from '../types/product/interfaces';
import { Button, IconButton } from "@material-tailwind/react";

const MAX_VISIBLE_PAGES = 5;

export function Pagination({ active, total, onClick }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(active);

  const getItemProps = (index: number) => ({
    variant: currentPage === index ? 'filled' : 'text',
    color: 'gray',
    onClick: () => handleClick(index),
    className: 'rounded-full',
  });

  const handleClick = (index: number) => {
    setCurrentPage(index);
    onClick(index);
  };

  const next = () => {
    if (currentPage === total) return;
    handleClick(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    handleClick(currentPage - 1);
  };

  const renderPageButtons = () => {
    const firstPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    const lastPage = Math.min(total, firstPage + MAX_VISIBLE_PAGES - 1);
    const pages = [];

    if (total > 1) {
      pages.push(
        <IconButton size="sm" placeholder="" key={1} {...getItemProps(1)}>
          1
        </IconButton>
      );
    }

    if (firstPage > 2) {
      pages.push(
        <IconButton size="sm" placeholder="" key="prevEllipsis" disabled={currentPage === 1} onClick={() => handleClick(firstPage - 1)}>
          ...
        </IconButton>
      );
    }
    for (let i = firstPage; i <= lastPage; i++) {
      if (i !== 1 && i !== total) {
        pages.push(
          <IconButton size="sm" placeholder="" key={i} {...getItemProps(i)}>
            {i}
          </IconButton>
        );
      }
    }
    if (lastPage < total - 1) {
      pages.push(
        <IconButton size="sm" key="nextEllipsis" disabled={currentPage === total} onClick={() => handleClick(lastPage + 1)} placeholder="">
          ...
        </IconButton>
      );
    }
    pages.push(
      <IconButton size="sm" placeholder="" key={total} {...getItemProps(total)}>
        {total}
      </IconButton>
    );

    return pages;
  };

  return (
    <div className="flex justify-center items-center py-3">
      <Button
        size="sm"
        placeholder=""
        variant="text"
        className="flex items-center rounded-full text-xs"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
      <div className="flex items-center rounded-full">
        {renderPageButtons()}
      </div>
      <Button
        size="sm"
        placeholder=""
        variant="text"
        className="flex items-center rounded-full text-xs"
        onClick={next}
        disabled={currentPage === total}
      >
        <ChevronRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
