"use client";
import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { Params, ProductResponse, Products } from "../types/product/interfaces";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type ProductContextType = {
  productAll: ProductResponse;
  paramAll: Params;
  paramFilter: Params;
  setProductAll: React.Dispatch<React.SetStateAction<ProductResponse>>;
  setParamAll: React.Dispatch<React.SetStateAction<Params>>;
  setParamFilter: React.Dispatch<React.SetStateAction<Params>>;
};

interface ProductProviderProps {
  children: ReactNode;
}

const ProductContext = createContext<ProductContextType>(null!);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProductContext must be used within a ProductProvider');
  return context;
};

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const [productAll, setProductAll] = useState<ProductResponse>({
    data: [],
    meta: {
      current_page: 1,
      from: 0,
      last_page: 1,
      links: [],
      path: '',
      per_page: 10,
      to: 0,
      total: 0
    }
  });

  const [paramFilter, setParamFilter] = useState<Params>({
    per_page: parseInt(searchParams?.getAll('per_page')?.toString()) || 24,
    page: parseInt(searchParams?.getAll('page')?.toString()) || 1,
    filters: searchParams?.getAll('filters')?.toString() ?? JSON.stringify({}),
    sorted: searchParams?.getAll('sorted')?.toString() ?? JSON.stringify({})
  });

  const [paramAll, setParamAll] = useState<Params>({
    per_page: 24,
    page: 1,
    filters: JSON.stringify({}),
    sorted: JSON.stringify({})
  });

  useEffect(() => {

    const paramsApi: Params = {};

    const perPage = parseInt(searchParams?.getAll('per_page')?.toString()) || 24;
    const pageNumber = parseInt(searchParams?.getAll('page')?.toString()) || 1;
    const filters = searchParams?.getAll('filters').map(filter => ({ ...JSON.parse(filter), status: 'enable' }))[0] ?? '';
    const sorted = searchParams?.getAll('sorted')?.toString() ?? '';
    paramsApi['per_page'] = perPage;
    paramsApi['page'] = pageNumber;
    paramsApi['filters'] = JSON.stringify(filters);
    paramsApi['sorted'] = sorted;

    fetchProducts(paramsApi);

  }, [searchParams]);

  const fetchProducts = async (paramsApi: Params) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/product`, {
        method: 'POST',
        body: JSON.stringify(paramsApi),
      });
      const resData = await response.json();
      const dataAll: ProductResponse = {
        data: resData.data.map((item: Products) => ({
          ...item,
          product_img: item.product_img[0] ?? []
        })),
        meta: resData.meta
      };
      setProductAll(dataAll);
      setParamAll(paramsApi);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <ProductContext.Provider value={{ productAll, paramAll, setParamAll, setProductAll, paramFilter, setParamFilter }}>{children}</ProductContext.Provider>
  );
};