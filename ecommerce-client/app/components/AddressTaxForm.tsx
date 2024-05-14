"use client";

import { Address, CreateInput } from "thai-address-autocomplete-react";
import { useAddressTaxStore } from "../store/ProfileStore";
import { useEffect, useState } from "react";
import { AddressObject, InfoAddress, InputProps, initialState } from "../types/profile/interfaces";
import { resolveResultByField } from "../thailand-address";
import { Input } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { Combobox } from "@headlessui/react";
import { ArrowLeftIcon, CheckIcon, ChevronUpDownIcon, PlusIcon } from "@heroicons/react/24/outline";


const InputThaiAddress = CreateInput();

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const AddressTaxForm = () => {
    const { data: session, update } = useSession();
    const { addressTax, updateAddressTax, setAddressTax, setInitialStateTax, initialStateTax, updateInfoAddressTax, infoAddressTax, setInfoAddressTax, IsDefaultTax, setIsDefaultTax } = useAddressTaxStore();
    const [open, setOpen] = useState<boolean>(false);

    const handleChangeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        updateInfoAddressTax(name, value)
    };

    const handleTabClick = (id: number) => {
        const foundAddress = session?.user?.address.find(item => item.id === id);

        setInfoAddressTax({
            ...infoAddressTax,
            addressTax: foundAddress ? foundAddress?.address : ""
        });
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
        setInitialStateTax(initialStateData)
    }

    const handlerClick = (obj: any) => {
        setAddressTax(obj)
        const initialStateData: initialState = {
            'entities': '',
            'searchKey': '',
            'search': '',
            'address': {
                ...obj
            }
        };
        setInitialStateTax(initialStateData)
        setOpen(false)
    }

    useEffect(() => {
        if (!IsDefaultTax) {
            setInfoAddressTax({
                ...infoAddressTax,
                name: '',
                addressTax: '',
                phone: '',
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

            setInitialStateTax(initialStateData);
        }

    }, [IsDefaultTax]);  
    
    return (
        <>
            <div className="mt-10">
                <h2 className="text-lg font-medium text-gray-900">
                    ที่อยู่ใบกำกับภาษี
                </h2>
                <div className="mt-5 border-t border-gray-200 pt-5">
                    {session?.user?.address ? (
                        <div>
                            {IsDefaultTax ? (
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
                                                                setIsDefaultTax(true)
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
                                                setIsDefaultTax(false)
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
                                                setIsDefaultTax(true)
                                                handleTabClick(session?.user?.address[0].id)
                                            }}
                                        >
                                            <ArrowLeftIcon
                                                className="mr-1 h-4 w-4 flex-none"
                                                aria-hidden="true"

                                            />
                                            <span className="text-sm">เลือกที่อยู่จากข้อมูลส่วนตัว</span>
                                        </button>
                                    </div>
                                </>
                            )}

                            {!IsDefaultTax ? (
                                <>
                                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 mt-4">
                                        <div className="sm:col-span-2">
                                            <div className="mt-1">
                                                <Input
                                                    size="lg"
                                                    color="gray"
                                                    label="บ้านเลขที่/หมู่บ้าน/อาคาร/ซอย"
                                                    name="addressTax"
                                                    crossOrigin=""
                                                    placeholder="กรอกบ้านเลขที่/หมู่บ้าน/อาคาร/ซอย"
                                                    id="addressTax"
                                                    aria-invalid="true"
                                                    aria-describedby="addressTax-error"
                                                    required
                                                    onChange={handleChangeInfo}
                                                    className="w-full px-3 py-2 border rounded-md text-gray-700"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mt-1">
                                                <Input
                                                    size="lg"
                                                    color="gray"
                                                    label="รหัสไปรษณีย์"
                                                    name="zipcode"
                                                    crossOrigin=""
                                                    placeholder="กรอกรหัสไปรษณีย์"
                                                    id="zipcode"
                                                    aria-invalid="true"
                                                    aria-describedby="zipcode-error"
                                                    required
                                                    value={initialStateTax?.address?.zipcode}
                                                    onChange={handlerFormChange}
                                                    className="w-full px-3 py-2 border rounded-md text-gray-700"
                                                    data-popover-target="menu-1"
                                                />
                                                {open && initialStateTax.searchKey === "zipcode" && initialStateTax.entities.length > 0 && (
                                                    <ul role="menu" data-popover="menu" data-popover-placement="bottom"
                                                        className="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                                                        {initialStateTax?.entities.map((x: AddressObject, idx: number) => (
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
                                                    name="province"
                                                    crossOrigin=""
                                                    placeholder="กรอกจังหวัด"
                                                    id="province"
                                                    aria-invalid="true"
                                                    aria-describedby="province-error"
                                                    required
                                                    defaultValue={initialStateTax?.address?.province}
                                                    onChange={handlerFormChange}
                                                    className="w-full px-3 py-2 border rounded-md text-gray-700"
                                                />
                                                {open && initialStateTax.searchKey === "province" && initialStateTax.entities.length > 0 && (
                                                    <ul role="menu" data-popover="menu" data-popover-placement="bottom"
                                                        className="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                                                        {initialStateTax?.entities.map((x: AddressObject, idx: number) => (
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
                                                    name="amphoe"
                                                    crossOrigin=""
                                                    placeholder="กรอกอำเภอ"
                                                    id="amphoe"
                                                    aria-invalid="true"
                                                    aria-describedby="amphoe-error"
                                                    required
                                                    defaultValue={initialStateTax?.address?.amphoe}
                                                    onChange={handlerFormChange}
                                                    className="w-full px-3 py-2 border rounded-md text-gray-700"
                                                />
                                                {open && initialStateTax.searchKey === "amphoe" && initialStateTax.entities.length > 0 && (
                                                    <ul role="menu" data-popover="menu" data-popover-placement="bottom"
                                                        className="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                                                        {initialStateTax?.entities.map((x: AddressObject, idx: number) => (
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
                                                    name="district"
                                                    crossOrigin=""
                                                    placeholder="กรอกตำบล"
                                                    id="district"
                                                    aria-invalid="true"
                                                    aria-describedby="district-error"
                                                    required
                                                    defaultValue={initialStateTax?.address?.district}
                                                    onChange={handlerFormChange}
                                                    className="w-full px-3 py-2 border rounded-md text-gray-700"
                                                />
                                                {open && initialStateTax.searchKey === "district" && initialStateTax.entities.length > 0 && (
                                                    <ul role="menu" data-popover="menu" data-popover-placement="bottom"
                                                        className="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                                                        {initialStateTax?.entities.map((x: AddressObject, idx: number) => (
                                                            <li role="menuitem" key={idx} onClick={() => handlerClick(x)}
                                                                className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                                                {x.district} {'>'} {x.amphoe} {'>'} {x.province} {'>'} {x.zipcode}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <div className="mt-4 border-t border-gray-100">
                                            <dl className="divide-y divide-gray-100">
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                                        ที่อยู่
                                                    </dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                        {infoAddressTax.addressTax}
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
                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 mt-4">
                                <div className="sm:col-span-2">
                                    <div className="mt-1">
                                        <Input
                                            size="lg"
                                            color="gray"
                                            label="บ้านเลขที่/หมู่บ้าน/อาคาร/ซอย"
                                            name="addressTax"
                                            crossOrigin=""
                                            placeholder="กรอกบ้านเลขที่/หมู่บ้าน/อาคาร/ซอย"
                                            id="addressTax"
                                            aria-invalid="true"
                                            aria-describedby="addressTax-error"
                                            required
                                            onChange={handleChangeInfo}
                                            className="w-full px-3 py-2 border rounded-md text-gray-700"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="mt-1">
                                        <Input
                                            size="lg"
                                            color="gray"
                                            label="รหัสไปรษณีย์"
                                            name="zipcode"
                                            crossOrigin=""
                                            placeholder="กรอกรหัสไปรษณีย์"
                                            id="zipcode"
                                            aria-invalid="true"
                                            aria-describedby="zipcode-error"
                                            required
                                            defaultValue={addressTax.zipcode}
                                            onChange={handlerFormChange}
                                            className="w-full px-3 py-2 border rounded-md text-gray-700"
                                            data-popover-target="menu-1"
                                        />
                                        {open && initialStateTax.searchKey === "zipcode" && initialStateTax.entities.length > 0 && (
                                            <ul role="menu" data-popover="menu" data-popover-placement="bottom"
                                                className="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                                                {initialStateTax?.entities.map((x: AddressObject, idx: number) => (
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
                                            name="province"
                                            crossOrigin=""
                                            placeholder="กรอกจังหวัด"
                                            id="province"
                                            aria-invalid="true"
                                            aria-describedby="province-error"
                                            required
                                            defaultValue={addressTax.province}
                                            onChange={handlerFormChange}
                                            className="w-full px-3 py-2 border rounded-md text-gray-700"
                                        />
                                        {open && initialStateTax.searchKey === "province" && initialStateTax.entities.length > 0 && (
                                            <ul role="menu" data-popover="menu" data-popover-placement="bottom"
                                                className="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                                                {initialStateTax?.entities.map((x: AddressObject, idx: number) => (
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
                                            name="amphoe"
                                            crossOrigin=""
                                            placeholder="กรอกอำเภอ"
                                            id="amphoe"
                                            aria-invalid="true"
                                            aria-describedby="amphoe-error"
                                            required
                                            defaultValue={addressTax.amphoe}
                                            onChange={handlerFormChange}
                                            className="w-full px-3 py-2 border rounded-md text-gray-700"
                                        />
                                        {open && initialStateTax.searchKey === "amphoe" && initialStateTax.entities.length > 0 && (
                                            <ul role="menu" data-popover="menu" data-popover-placement="bottom"
                                                className="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                                                {initialStateTax?.entities.map((x: AddressObject, idx: number) => (
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
                                            name="district"
                                            crossOrigin=""
                                            placeholder="กรอกตำบล"
                                            id="district"
                                            aria-invalid="true"
                                            aria-describedby="district-error"
                                            required
                                            defaultValue={addressTax.district}
                                            onChange={handlerFormChange}
                                            className="w-full px-3 py-2 border rounded-md text-gray-700"
                                        />
                                        {open && initialStateTax.searchKey === "district" && initialStateTax.entities.length > 0 && (
                                            <ul role="menu" data-popover="menu" data-popover-placement="bottom"
                                                className="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                                                {initialStateTax?.entities.map((x: AddressObject, idx: number) => (
                                                    <li role="menuitem" key={idx} onClick={() => handlerClick(x)}
                                                        className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                                        {x.district} {'>'} {x.amphoe} {'>'} {x.province} {'>'} {x.zipcode}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </>
    );
};

export default AddressTaxForm;