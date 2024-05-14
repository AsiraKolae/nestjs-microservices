import React from "react";
import ProductGallery from "@/app/components/product/ProductGallery";
import getProductById from "@/app/api/product/getProductById";
import Container from "@/app/components/Container";
import ProductInfo from "@/app/components/product/ProductInfo";
import IncreaseDecreaseForm from "@/app/components/product/IncreaseDecreaseForm";
import ColorsForm from "@/app/components/product/ColorsForm";
import getProductByName from "@/app/api/product/getProductByName";
import CapacityForm from "@/app/components/product/CapacityForm";
import ButtonCart from "@/app/components/product/ButtonCart";
import ButtonBuy from "@/app/components/product/ButtonBuy";
import Specification from "@/app/components/product/Specification";

export default async function Page({
  params,
}: {
  params: { productId: number };
}) {
  const getProduct = async (productId: number) => {
    try {
      const result = await getProductById(productId);
      return result;
    } catch (error) {
      console.log("error", error);
    }
  };

  const getProductFilterName = async (name: string) => {
    try {
      let escapedStr: string = name.replace(/"/g, '\\"');
      
      const result = await getProductByName(escapedStr);
      return result;
    } catch (error) {
      console.log("error", error);
    }
  };
  
  
  const product = await getProduct(params.productId);
  const productFilterName = await getProductFilterName(product.name);
  return (
    <Container>
      <div className="mx-auto sm:py-12 max-w-2xl lg:max-w-none">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            <div className="mx-auto sm:px-20 px-10 sm:pt-8 pt-12 w-full max-w-2xl block lg:max-w-none">
              <ProductGallery product={product} />
            </div>
          </div>
          <div className="mt-8 px-4 sm:mt-10 sm:px-0 lg:mt-5">

          {/* Product info */}
          <ProductInfo product={product} />

          {/* form for product details */}
          <CapacityForm product={product} productFilterName={productFilterName}/>
          <ColorsForm product={product} productFilterName={productFilterName}/>
          <IncreaseDecreaseForm/>

          <div className="mt-8 flex flex-shrink-0 sm:mt-4 md:mt-10">
            <ButtonCart product={product}/>
            <ButtonBuy product={product}/>
            </div>
          </div>
        </div>
      </div>
      <Specification product={product}/>
    </Container>
  );
}
