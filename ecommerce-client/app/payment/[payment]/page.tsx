import { WalletIcon } from "@heroicons/react/24/outline";
import Container from "../../components/Container";
import PriceSummary from "../../components/PriceSummary";
import UploadSlip from "../../components/payment/UploadSlip";
import Image from "next/image";
import PaymentPriceSummary from "@/app/components/payment/PriceSummary";

export default async function PaymentPage({
  params,
}: {
  params: { payment: string };
}) { 
  
  return (
    <>
      <Container>
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="inline-flex items-center space-x-2">
            <WalletIcon className="h-6 w-6" />
            <h1 className="text-2xl font-semibold leading-7 text-gray-900">
              ชำระเงิน
            </h1>
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div className="mt-6 sm:mt-10">
              <div className="rounded-lg bg-white">
                <div className="border-b w-full inline-flex items-center space-x-2 py-1">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-500">
                    <span className="text-xs font-medium leading-none text-white">
                      1
                    </span>
                  </span>
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">
                    สแกนเพื่อชำระเงิน
                  </h3>
                </div>
                <div className="px-4 py-5 sm:px-6 flex justify-center">
                  {/* QR CODE */}
                  <Image
                    className="rounded-md w-full sm:w-9/12"
                    src="/kh-qr.jpg"
                    alt="qr-code"
                    width={500}
                    height={500}
                    priority
                  />
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="border-b w-full inline-flex items-center space-x-2 py-1">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-500">
                      <span className="text-xs font-medium leading-none text-white">
                        2
                      </span>
                    </span>
                    <h3 className="text-lg font-semibold leading-7 text-gray-900">
                      แจ้งสลิปหลักฐานการโอน
                    </h3>
                  </div>
                  {/* Upload slip form */}
                  <UploadSlip invoiceNumber={params.payment} />
                </div>
              </div>
            </div>
            <div className="sm:mt-12 mt-10">
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
              >
                <PaymentPriceSummary />
              </section>            
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
