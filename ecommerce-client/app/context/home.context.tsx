"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";
import { Images, Params, Products } from "../types/product/interfaces";

type HomeContextType = {
  imgUrlCategory: Images[];
  dataProducts: Products[];
  imgUrlBrand: Images[];
  setImgUrlCategory: React.Dispatch<React.SetStateAction<Images[]>>;
  setImgUrlBrand: React.Dispatch<React.SetStateAction<Images[]>>;
  setDataProducts: React.Dispatch<React.SetStateAction<Products[]>>;
  fetchCategories: (params?: Params) => void;
  fetchProducts: (params?: Params) => void;
  fetchBrands: (params?: Params) => void;
};

interface HomeProviderProps {
  children: ReactNode;
}

const HomeContext = createContext<HomeContextType>(null!);

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) throw new Error('useHomeContext must be used within a HomeProvider');
  return context;
};

export const HomeProvider: React.FC<HomeProviderProps> = ({ children }) => {

  const [imgUrlCategory, setImgUrlCategory] = useState<Images[]>([]);
  const [dataProducts, setDataProducts] = useState<Products[]>([]);
  const [imgUrlBrand, setImgUrlBrand] = useState<Images[]>([]);

  const fetchCategories = async (params?: Params) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/category`, {
        method: 'POST',
        body: JSON.stringify(params),
      });
      const dataAll = await response.json();
      const categoryImages = dataAll.data.map((item: Images) => item.category_img[0] ?? []);

      setImgUrlCategory(categoryImages);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async (params?: Params) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/product`, {
        method: 'POST',
        body: JSON.stringify(params),
      });
      const dataAll = await response.json();
      const productsData = dataAll.data.map((item: Products) => ({
        ...item,
        product_img: item.product_img[0] ?? []
      }));

      setDataProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchBrands = async (params?: Params) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/brand`, {
        method: 'POST',
        body: JSON.stringify(params),
      });
      const dataAll = await response.json();
      const brandImages = dataAll.data.map((item: Images) => item.brand_img[0] ?? []);

      setImgUrlBrand(brandImages);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  return (
    <HomeContext.Provider value={{
      imgUrlCategory,
      dataProducts,
      imgUrlBrand,
      setImgUrlCategory,
      setDataProducts,
      setImgUrlBrand,
      fetchCategories,
      fetchProducts,
      fetchBrands
    }}>{children}</HomeContext.Provider>
  );
};
