"use client";

import {
  AddressList,
  AddressObject,
  AddressProfile,
  InfoAddress,
  initialState,
} from "@/app/types/profile/interfaces";
import AddressForm from "../AddressForm";
import { resolveResultByField } from "../../thailand-address";
import { useAddressStore, useManageAccountStore, useProfileInfoStore } from "@/app/store/ProfileStore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ArrowLeftIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Button from "../Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Checkbox, Input } from "@material-tailwind/react";
import validator from "validator";

const addressSchema = z.object({
  name: z.string().min(1, 'กรุณาเพิ่มชื่อ-สกุล'),
  phone: z.string().refine(value => validator.isMobilePhone(value, 'any'), { message: "กรุณาใส่เบอร์โทรศัพท์ที่ถูกต้อง" })
    .refine(value => value.length === 10, { message: "กรุณาใส่เบอร์โทรศัพท์ที่มี 10 หลัก" }),
  address: z.string().min(1, 'กรุณาเพิ่มที่อยู่'),
  zipcode: z.string().min(1, 'กรุณาเพิ่มรหัสไปรษณีย์'),
  province: z.string().min(1, 'กรุณาเพิ่มจังหวัด'),
  amphoe: z.string().min(1, 'กรุณาเพิ่มอำเภอ'),
  district: z.string().min(1, 'กรุณาเพิ่มตำบล'),
  default: z.boolean()
});

type InputType = z.infer<typeof addressSchema>;

const Address: React.FC<{ id: number | undefined | null }> = ({ id }) => {
  const { data: session, update } = useSession();

  const [open, setOpen] = useState<boolean>(false);
  const { setAddress, setInfoAddress, infoAddress, address, setInitialState, updateInfoAddress, initialState} =
    useAddressStore();
  const { editAddress, setEditAddress, setProfileInfo } = useProfileInfoStore();

  const handleChangeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    updateInfoAddress(name, newValue)
  };

  const handlerClick = (obj: any) => {
    setAddress(obj)
    const initialStateData: initialState = {
        'entities': '',
        'searchKey': '',
        'search': '',
        'address': {
            ...obj
        }
    };

    setInitialState(initialStateData)
    setOpen(false)
}

  const parseAddress = (addressString: AddressList) => {
    const [, address, district, amphoe, province, zipcode] =
      addressString?.address?.match(/^(.*?), (.*?), (.*?), (.*?) (\d{5})$/) || [];
    const formAddress: AddressProfile = {
      district: district,
      amphoe: amphoe,
      province: province,
      zipcode: zipcode,
    };

    const formInfoAddress: InfoAddress = {
      address: address,
      name: addressString?.name,
      phone: addressString?.phone,
      default: addressString?.default
    };

    const initialStateData: initialState = {
      entities: "",
      searchKey: "",
      search: "",
      address: {
        ...formAddress,
      },
    };
    setAddress(formAddress);
    setInfoAddress(formInfoAddress);
    setInitialState(initialStateData);
  };

  const saveAddress = async (e: any) => {
    e.preventDefault();
    const formData: AddressList[] = [{
      id: id,
      name: `${infoAddress.name}`,
      phone: `${infoAddress.phone}`,
      address: `${infoAddress.address}, ${address.district}, ${address.amphoe}, ${address.province} ${address.zipcode}`,
      default: infoAddress.default,
    }];

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`,
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      const res = await response.json();
      if (res.status.code == 200) {
        await update({
          user: res.data,
        });
        
        setProfileInfo(res.data,)
        return toast.success("อัปเดตข้อมูลสำเร็จ", {
          position: "top-center",
          autoClose: 1500,
          onClose: async () => {
            setEditAddress(false)
          },
        });
        
      }
    } catch (error) {
      toast.error("บางอย่างผิดพลาด");
    }
  };
  

  const handlerFormChange = (event: any) => {
    setOpen(true)
    const initialStateData: initialState = {
      'entities': resolveResultByField(event.target.name, event.target.value),
      'searchKey': event.target.name,
      'search': event.target.value,
      'address': {
        'district': (event.target.name == 'district') ? event.target.value : '',
        'amphoe': (event.target.name == 'amphoe') ? event.target.value : '',
        'province': (event.target.name == 'province') ? event.target.value : '',
        'zipcode': (event.target.name == 'zipcode') ? event.target.value : ''
      }
    };
    setInitialState(initialStateData)
  }

  useEffect(() => {
    if (id && session) {
      const foundAddress = session?.user?.address.find(item => item.id === id);

      if (foundAddress) {
        parseAddress(foundAddress);
      }
    }

    if(!id){
      const formInfoAddress: InfoAddress = {
        address: '',
        name: '',
        phone: '',
        default: false
      };
      setInfoAddress(formInfoAddress);

      const initialStateData: initialState = {
        entities: "",
        searchKey: "",
        search: "",
        address: {
          district: '',
          amphoe: '',
          province: '',
          zipcode: '',
        },
      };
      setInitialState(initialStateData);
    }
  }, [id, session]);


  return (
    <>
      <div>
        <div className="space-y-6 divide-y divide-gray-100 text-sm leading-6 bg-gray-50 py-5 px-10 rounded-lg">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            ที่อยู่
          </h2>
          <form onSubmit={saveAddress}>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 mb-5">
              <div className="sm:col-span-2">
                <div className="mt-1">
                  <Input
                    size="lg"
                    color="gray"
                    label="ชื่อ-สกุล"
                    crossOrigin=""
                    placeholder="กรอก ชื่อ-สกุล"
                    id="name"
                    aria-invalid="true"
                    aria-describedby="name-error"
                    name="name"
                    onChange={(e) => handleChangeInfo(e)}
                    value={infoAddress.name}
                    required
                    className="w-full px-3 py-2 border rounded-md text-gray-900 bg-white"
                    data-popover-target="menu-1"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="mt-1">
                  <Input
                    size="lg"
                    color="gray"
                    label="เบอร์โทรศัพท์"
                    crossOrigin=""
                    placeholder="กรอกเบอร์โทรศัพท์"
                    id="phone"
                    aria-invalid="true"
                    aria-describedby="phone-error"
                    required
                    name="phone"
                    onChange={(e) => handleChangeInfo(e)}
                    value={infoAddress.phone}
                    className="w-full px-3 py-2 border rounded-md text-gray-900 bg-white"
                    data-popover-target="menu-1"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-4">
              <div className="sm:col-span-2">
                <div className="mt-1">
                  <Input
                    size="lg"
                    color="gray"
                    label="บ้านเลขที่/หมู่บ้าน/อาคาร/ซอย"
                    crossOrigin=""
                    placeholder="กรอกบ้านเลขที่/หมู่บ้าน/อาคาร/ซอย"
                    id="address"
                    aria-invalid="true"
                    required
                    name="address"
                    aria-describedby="address-error"
                    onChange={(e) => handleChangeInfo(e)}
                    value={infoAddress.address}
                    className="w-full px-3 py-2 border rounded-md text-gray-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="mt-1">
                  <Input
                    crossOrigin=""
                    size="lg"
                    label="รหัสไปรษณีย์"
                    placeholder="กรอกรหัสไปรษณีย์"
                    id="zipcode"
                    required
                    name="zipcode"
                    onChange={(e) => handlerFormChange(e)}
                    value={initialState.address?.zipcode}
                    className="w-full px-3 py-2 border rounded-md text-gray-900 bg-white"
                  />
                  {open && initialState.searchKey === "zipcode" && initialState.entities.length > 0 && (
                    <ul role="menu" data-popover="menu" data-popover-placement="bottom"
                      className="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                      {initialState?.entities.map((x: AddressObject, idx: number) => (
                        <li role="menuitem" key={idx} onClick={() => handlerClick(x)}
                          className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                          {x.district} {'>'} {x.amphoe} {'>'} {x.province} {'>'} {x.zipcode}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div>
                <div className="mt-1">
                  <Input
                    size="lg"
                    color="gray"
                    label="จังหวัด"
                    crossOrigin=""
                    placeholder="กรอกจังหวัด"
                    id="province"
                    aria-invalid="true"
                    aria-describedby="province-error"
                    name="province"
                    onChange={(e) => handlerFormChange(e)}
                    required
                    value={initialState.address?.province}
                    className="w-full px-3 py-2 border rounded-md text-gray-900 bg-white"
                  />
                  {open && initialState.searchKey === "province" && initialState.entities.length > 0 && (
                    <ul role="menu" data-popover="menu" data-popover-placement="bottom"
                      className="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                      {initialState?.entities.map((x: AddressObject, idx: number) => (
                        <li role="menuitem" key={idx} onClick={() => handlerClick(x)}
                          className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                          {x.district} {'>'} {x.amphoe} {'>'} {x.province} {'>'} {x.zipcode}
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
              </div>

              <div>
                <div className="mt-1">
                  <Input
                    size="lg"
                    color="gray"
                    label="อำเภอ"
                    crossOrigin=""
                    placeholder="กรอกอำเภอ"
                    id="amphoe"
                    aria-invalid="true"
                    aria-describedby="amphoe-error"
                    name="amphoe"
                    onChange={(e) => handlerFormChange(e)}
                    required
                    value={initialState.address?.amphoe}
                    className="w-full px-3 py-2 border rounded-md text-gray-900 bg-white"
                  />
                  {open && initialState.searchKey === "amphoe" && initialState.entities.length > 0 && (
                    <ul role="menu" data-popover="menu" data-popover-placement="bottom"
                      className="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                      {initialState?.entities.map((x: AddressObject, idx: number) => (
                        <li role="menuitem" key={idx} onClick={() => handlerClick(x)}
                          className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                          {x.district} {'>'} {x.amphoe} {'>'} {x.province} {'>'} {x.zipcode}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div>
                <div className="mt-1">
                  <Input
                    size="lg"
                    color="gray"
                    label="ตำบล"
                    crossOrigin=""
                    placeholder="กรอกตำบล"
                    id="district"
                    aria-invalid="true"
                    aria-describedby="district-error"
                    required
                    value={initialState.address?.district}
                    name="district"
                    onChange={(e) => handlerFormChange(e)}
                    className="w-full px-3 py-2 border rounded-md text-gray-900 bg-white"
                  />
                  {open && initialState.searchKey === "district" && initialState.entities.length > 0 && (
                    <ul role="menu" data-popover="menu" data-popover-placement="bottom"
                      className="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                      {initialState?.entities.map((x: AddressObject, idx: number) => (
                        <li role="menuitem" key={idx} onClick={() => handlerClick(x)}
                          className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                          {x.district} {'>'} {x.amphoe} {'>'} {x.province} {'>'} {x.zipcode}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

            </div >
            <div className="sm:col-span-2">
              <div className="mt-1">
                <Checkbox
                  color="light-green"
                  className="h-4 w-4"
                  checked={infoAddress.default}
                  name="default"
                  onChange={(e) => handleChangeInfo(e)} 
                  label={'ค่าเริ่มต้น'}
                />
              </div>
            </div>
            <div className="pt-8 flex justify-end">
              <Button
                variant="success"
                type="submit"
                className="px-8 py-2 items-center rounded-md"
              >
                บันทึก
              </Button>
            </div>
          </form>
        </div>
        <div className="mt-5">
          <button
            onClick={() => setEditAddress(false)}
            type="button"
            className="flex w-full items-start justify-start rounded-md text-sm font-normal text-gray-900 hover:text-coolGreen focus:outline-none sm:w-full sm:flex-grow-0"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            กลับ
          </button>
        </div>
      </div>
    </>
  );
};

export default Address;
