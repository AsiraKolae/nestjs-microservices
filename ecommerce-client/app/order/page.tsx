import { TruckIcon } from "@heroicons/react/24/outline";
import PriceSummary from "../components/PriceSummary";
import OrderForm from "../components/order/OrderForm";
import Container from "../components/Container";
import CashbackCheckOut from "../components/cashback/CashbackCheckOut";

export default async function orderPage() {
  return (
    <>
      <Container>
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="inline-flex items-center space-x-2">
            <TruckIcon className="h-6 w-6" />
            <h1 className="text-2xl font-semibold leading-7 text-gray-900">
              คำสั่งซื้อสินค้า
            </h1>
          </div>
          <h2 className="sr-only">Checkout</h2>
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div className="-mt-10 sm:mt-12">
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
              >
                <CashbackCheckOut/>
                <PriceSummary />
              </section>
            </div>

            {/* Order summary */}
            <div className="sm:mt-12 mt-10">
              <OrderForm />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
