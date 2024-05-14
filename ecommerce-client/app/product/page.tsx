import React from 'react';
import Container from '../components/Container';
import ProductList from '../components/product/ProductList';
import { ProductProvider } from '../context/product.context';
import FilterProduct from '../components/product/FilterProduct';
import LoadingIndicator from '../components/LoadingIndicator';
import dynamic from 'next/dynamic';
import MobileFilter from '../components/product/MobileFilter';
const LoadingComponent = dynamic(
  () => import('../components/LoadingPage'),
  {
    loading: () => <LoadingIndicator />,
  }
);
const Product: React.FC = () => {
  return (
    <>
      <ProductProvider>
        <MobileFilter />
        <Container>
          <div>
            <div className="py-10 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
              <aside className="hidden lg:block">
                <h2 className="sr-only">Filters</h2>
                <FilterProduct />
              </aside>
              <section aria-labelledby="product-heading" className="lg:col-span-2 lg:mt-0 xl:col-span-3">
                <h2 id="product-heading" className="sr-only">
                  Products
                </h2>
                <ProductList classNameImage='rounded-md h-80 w-80' />
                <LoadingComponent />
              </section>
            </div>
          </div>
        </Container>
      </ProductProvider>
    </>
  );
};

export default Product;

