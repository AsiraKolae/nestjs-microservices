"use client";

import { useAddressStore } from "../store/ProfileStore";
import { AddressObject, InputProps, initialState } from "../types/profile/interfaces";
import { resolveResultByField } from "../thailand-address";
import { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import { ArrowLeftIcon, CheckIcon, ChevronUpDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { Combobox } from "@headlessui/react";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const AddressForm = () => {

    const { data: session } = useSession();

    const { infoAddress, setAddress, setInitialState, updateInfoAddress, initialState, setInfoAddress, IsDefault, setIsDefault } = useAddressStore();
    const [open, setOpen] = useState<boolean>(false);

    const handleTabClick = (id: number) => {
        const foundAddress = session?.user?.address.find(item => item.id === id);

        setInfoAddress({
            ...infoAddress,
            name: foundAddress ? foundAddress?.name : "",
            address: foundAddress ? foundAddress?.address : "",
            tel: foundAddress ? foundAddress?.phone : "",
        });
    };

    const handleChangeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        updateInfoAddress(name, value)
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

    useEffect(() => {
        if (!IsDefault) {
            setInfoAddress({
                ...infoAddress,
                name: '',
                address: '',
                tel: '',
            });

            const initialStateData: initialState = {
                'entities': '',
                'searchKey': '',
                'search': '',
                'address': {
                    'district': '',
                    'amphoe': '',
                    'province': '',
                    'zipcode': ''
                }
            };

            setInitialState(initialStateData);
        }

    }, [IsDefault]);

    return (
        <>
            <div>
                <h2 className="text-lg font-medium text-gray-900">ที่อยู่จัดส่ง</h2>
                {session?.user?.address ? (
                    <div className="mt-5 border-t border-gray-200 pt-5">
                        {IsDefault ? (
                            <>
                                <Combobox as="div" value={session?.user?.address?.find(item => item.default === true) ? session?.user?.address?.find(item => item.default === true)?.name : session?.user?.address[0].name}>
                                    <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">ที่อยู่เริ่มต้น</Combobox.Label>
                                    <div className="relative mt-2">
                                        <Combobox.Input
                                            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            displayValue={session?.user?.address?.find(item => item.default === true)?.name}
                                            readOnly
                                        />
                                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </Combobox.Button>
                                        {session?.user?.address?.length > 0 && (
                                            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {session?.user?.address.map((address) => (
                                                    <Combobox.Option
                                                        key={address.id}
                                                        value={address}
                                                        className={({ active }) =>
                                                            classNames(
                                                                'relative cursor-default select-none py-2 pl-3 pr-9',
                                                                active ? 'bg-gray-600 text-white' : 'text-gray-900'
                                                            )
                                                        }
                                                        onClick={() => {
                                                            handleTabClick(address.id)
                                                            setIsDefault(true)
                                                        }}
                                                    >
                                                        {({ active, selected }) => (
                                                            <>
                                                                <span className={classNames('block truncate', selected && 'font-semibold')}>{address.name}</span>

                                                                {selected && (
                                                                    <span
                                                                        className={classNames(
                                                                            'absolute inset-y-0 right-0 flex items-center pr-4',
                                                                            active ? 'text-white' : 'text-gray-400'
                                                                        )}
                                                                    >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                )}
                                                            </>
                                                        )}
                                                    </Combobox.Option>
                                                ))}
                                            </Combobox.Options>
                                        )}
                                    </div>
                                </Combobox>
                                <div className="flex justify-end">
                                    <button className="flex mt-3 items-center text-gray-500 hover:text-gray-900"
                                        onClick={() => {
                                            setIsDefault(false)
                                        }}
                                    >
                                        <PlusIcon
                                            className="mr-1 h-4 w-4 flex-none"
                                            aria-hidden="true"
                                        />
                                        <span className="text-sm">เพิ่มที่อยู่ใหม่</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-end">
                                    <button className="flex items-center text-gray-500 hover:text-gray-900"
                                        onClick={() => {
                                            setIsDefault(true)
                                            handleTabClick(session?.user?.address[0].id)
                                        }}>
                                        <ArrowLeftIcon
                                            className="mr-1 h-4 w-4 flex-none"
                                            aria-hidden="true"

                                        />
                                        <span className="text-sm">เลือกที่อยู่จากข้อมูลส่วนตัว</span>
                                    </button>
                                </div>
                            </>
                        )}

                        {!IsDefault ? (
                            <>
                                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 mb-5 mt-2">
                                    <div className="sm:col-span-2">
                                        <div className="mt-1">
                                            <Input
                                                size="lg"
                                                color="gray"
                                                label="ชื่อ-สกุล"
                                                crossOrigin=""
                                                placeholder="กรอก ชื่อ-สกุล"
                                                id="name"
                                                name="name"
                                                aria-invalid="true"
                                                aria-describedby="name-error"
                                                required
                                                onChange={(e) => handleChangeInfo(e)}
                                                className="w-full px-3 py-2 border rounded-md text-gray-700"
                                                data-popover-target="menu-1"
                                            />
                                            {/* {errors?.name && typeof errors.name === 'string' && (<p className="block text-xs font-normal leading-6 text-gray-700">{errors.name?.message}</p>)} */}
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
                                                className="w-full px-3 py-2 border rounded-md text-gray-700"
                                                data-popover-target="menu-1"
                                            />
                                            {/* {errors?.phone && typeof errors.phone === 'string' && (<p className="block text-xs font-normal leading-6 text-gray-700">{errors.phone?.message}</p>)} */}
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
                                            {/* {errors?.address && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.address?.message}</p>} */}
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
                                            {/* {errors?.zipcode && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.zipcode?.message}</p>} */}
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
                                            {/* {errors?.province && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.province?.message}</p>} */}
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
                                            {/* {errors?.amphoe && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.amphoe?.message}</p>} */}
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
                                            {/* {errors?.district && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.district?.message}</p>} */}
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
                            </>
                        ) : (
                            <>
                                <div>
                                    <div className="mt-4 border-t border-gray-100">
                                        <dl className="divide-y divide-gray-100">
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                                    ชื่อ-สกุล
                                                </dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                    {infoAddress.name}
                                                </dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                                    ที่อยู่
                                                </dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                    {infoAddress.address}
                                                </dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                                    เบอร์โทรศัพท์
                                                </dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                    {infoAddress.tel}
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 mb-5 mt-2">
                            <div className="sm:col-span-2">
                                <div className="mt-1">
                                    <Input
                                        size="lg"
                                        color="gray"
                                        label="ชื่อ-สกุล"
                                        crossOrigin=""
                                        placeholder="กรอก ชื่อ-สกุล"
                                        id="name"
                                        name="name"
                                        aria-invalid="true"
                                        aria-describedby="name-error"
                                        required
                                        onChange={(e) => handleChangeInfo(e)}
                                        className="w-full px-3 py-2 border rounded-md text-gray-700"
                                        data-popover-target="menu-1"
                                    />
                                    {/* {errors?.name && typeof errors.name === 'string' && (<p className="block text-xs font-normal leading-6 text-gray-700">{errors.name?.message}</p>)} */}
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
                                        className="w-full px-3 py-2 border rounded-md text-gray-700"
                                        data-popover-target="menu-1"
                                    />
                                    {/* {errors?.phone && typeof errors.phone === 'string' && (<p className="block text-xs font-normal leading-6 text-gray-700">{errors.phone?.message}</p>)} */}
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
                                    {/* {errors?.address && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.address?.message}</p>} */}
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
                                    {/* {errors?.zipcode && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.zipcode?.message}</p>} */}
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
                                    {/* {errors?.province && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.province?.message}</p>} */}
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
                                    {/* {errors?.amphoe && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.amphoe?.message}</p>} */}
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
                                    {/* {errors?.district && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.district?.message}</p>} */}
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
                    </>
                )}
            </div>

        </>
    );
};

export default AddressForm;