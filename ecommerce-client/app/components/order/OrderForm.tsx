"use client";

import { useEffect } from "react";
import { Order } from "@/app/types/order/interfaces";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useAmountItemsStore, useCartStore } from "@/app/store/CartStore";
import AddressForm from "../AddressForm";
import { useAddressStore, useAddressTaxStore } from "@/app/store/ProfileStore";
import AddressTaxForm from "../AddressTaxForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCashbackStore } from "@/app/store/CashbackStore";

const addressSchema = z.object({
  name: z.string().min(1, "กรุณาเพิ่มชื่อ-สกุล"),
  phone: z.string().min(1, "กรุณาเพิ่มเบอร์โทรศัพท์"),
  address: z.string().min(1, "กรุณาเพิ่มที่อยู่"),
  zipcode: z.string().min(1, "กรุณาเพิ่มรหัสไปรษณีย์"),
  province: z.string().min(1, "กรุณาเพิ่มจังหวัด"),
  amphoe: z.string().min(1, "กรุณาเพิ่มอำเภอ"),
  district: z.string().min(1, "กรุณาเพิ่มตำบล"),
});

type InputType = z.infer<typeof addressSchema>;

const OrderForm = () => {
  const { data: session } = useSession();

  const { fetchCartData } = useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(addressSchema),
  });

  const { address, infoAddress, setInfoAddress, IsDefault, setIsDefault } =
    useAddressStore();
  const { addressTax, infoAddressTax, setInfoAddressTax, IsDefaultTax, setIsDefaultTax } =
    useAddressTaxStore();

  const { exchangeCashback } =
    useCashbackStore();


  const saveAddress = async (e: any) => {
    e.preventDefault();

    const formData: Order = {};
    formData["shipping_name"] = infoAddress.name;
    formData["shipping_phone"] = infoAddress.tel;
    formData["shipping_address"] = IsDefault
      ? `${infoAddress.address}`
      : `${infoAddress.address}, ${address.district}, ${address.amphoe}, ${address.province} ${address.zipcode}`;
    formData["billing_address"] = IsDefaultTax
      ? `${infoAddressTax.addressTax}`
      : `${infoAddressTax.addressTax}, ${addressTax.district}, ${addressTax.amphoe}, ${addressTax.province} ${addressTax.zipcode}`;
    if (exchangeCashback > 0) {
      formData["cashback_amount"] = exchangeCashback;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/order`,
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      const res = await response.json();
      if (res.status.code == 200) {
        useAmountItemsStore.setState(() => ({
          amountItems: 0,
        }));
        return toast.success(
          "สร้างรายการคำสั่งซื้อสำเร็จ \n กรุณารอระบบตรวจสอบรายการ",
          {
            position: "top-center",
            autoClose: 1500,
            onClose: async () => {
              window.location.href = "/profile";
            },
          }
        );
      } else if (
        res.status.code == 422 &&
        res.error.message == "CART_IS_EMPTY"
      ) {
        return toast.error("ไม่มีสินค้าในตะกร้า", {
          position: "top-center",
          autoClose: 1500,
          onClose: async () => {
            window.location.href = "/";
          },
        });
      }
    } catch (error) {
      toast.error("บางอย่างผิดพลาด");
    }
  };

  const formMethods = useForm();

  useEffect(() => {
    fetchCartData();
    if (session?.user?.address) {
      const foundAddress = session?.user?.address.find(item => item.default === true);

      setInfoAddress({
        ...infoAddress,
        name: foundAddress ? foundAddress?.name : session?.user?.address[0].name,
        address: foundAddress ? foundAddress?.address : session?.user?.address[0].address,
        tel: foundAddress ? foundAddress?.phone : session?.user?.address[0].phone,
      });

      setInfoAddressTax({
        addressTax: foundAddress ? foundAddress?.address : session?.user?.address[0].address,
      });
    }

  }, [fetchCartData, session]);


  return (
    <>
      <form onSubmit={saveAddress}>
        <AddressForm />
        <AddressTaxForm />

        <div className="py-6">
          <button
            type="submit"
            disabled={(address && infoAddress && addressTax && infoAddressTax) ? false : true}
            className="items-center rounded-md bg-gradient-to-l from-coolGreen to-softCool hover:bg-gradient-to-r px-10 py-2 sm:px-24 sm:py-2 text-sm font-medium border border-coolGreen text-Emerald-800 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
          >
            ทำรายการ
          </button>
        </div>
      </form>
    </>
  );
};

export default OrderForm;
