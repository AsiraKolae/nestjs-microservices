"use client";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Container from "../components/Container";
import CartItems from "../components/cart/CartItems";
import LoadingIndicator from "../components/LoadingIndicator";
import dynamic from "next/dynamic";
const LoadingComponent = dynamic(
  () => import('../components/LoadingPage'),
  {
    loading: () => <LoadingIndicator />,
  }
);
export default function CartPage() {
  return (
    <Container>
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <ShoppingCartIcon className="h-6 w-6" />
          <h1 className="text-2xl font-semibold leading-7 text-gray-900">
            ตะกร้าสินค้า
          </h1>
        </div>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <CartItems />
          <LoadingComponent />
        </form>
      </div>
    </Container>
  );
}
