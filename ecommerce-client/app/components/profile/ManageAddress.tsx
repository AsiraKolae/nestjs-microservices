import React, { useEffect, useState } from "react";
import { MapPinIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useManageAccountStore, useProfileInfoStore } from "@/app/store/ProfileStore";
import { AddressList } from "@/app/types/profile/interfaces";
import Address from "./Address";
import Link from "next/link";

const ManageAddress = () => {

    const { setProfileInfo, profileInfo, getProfileInfo, editAddress, setEditAddress } = useProfileInfoStore();
    const { setSelectedManageAccount } = useManageAccountStore();

    const [id, setId] = useState<number | null>();
    const initCategory = async () => {
        try {
            const result: any = await getProfileInfo();
            setProfileInfo(result.data);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        initCategory();
    }, []);

    return (
        <>
            <div>
                <div className="-mt-2 mb-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="inline-flex items-center space-x-2">
                        <MapPinIcon className="h-6 w-6" />
                        <h2 className="text-xl font-semibold leading-7 text-gray-900 py-4">
                            จัดการที่อยู่จัดส่ง
                        </h2>
                    </div>
                    <div className="ml-4 mt-2 flex-shrink-0" >
                        {!editAddress && (
                            <button
                                onClick={() => {
                                    setEditAddress(true);
                                    setId(null)
                                }}
                                className="w-md items-end justify-end rounded-md border border-gray-800 bg-gray-900 hover:bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-gray-50">
                                เพิ่มที่อยู่ใหม่
                            </button>
                        )}
                    </div>
                </div>
                {!editAddress ?
                    profileInfo?.address?.length > 0 ? (
                        profileInfo?.address?.map((x: AddressList, idx: number) => (
                            <div key={x?.id + 1} className="space-y-4 text-sm leading-6 bg-gray-50 py-5 px-10 rounded-lg mb-2">
                                <div key={x?.id + idx} className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                                    <div className="ml-4 mt-2">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                                            ที่อยู่จัดส่ง {idx + 1}
                                        </h2>
                                    </div>
                                    <div className="ml-4 mt-2 flex-shrink-0" >
                                        <button
                                            onClick={() => {
                                                setEditAddress(true);
                                                setId(x?.id ?? null)
                                            }}
                                            type="button"
                                            className="flex w-full items-end justify-end rounded-md text-sm font-normal text-gray-900 hover:text-coolGreen focus:outline-none sm:w-full sm:flex-grow-0"
                                        >
                                            <PencilSquareIcon className="h-6 w-6 mr-1" />
                                            แก้ไข
                                        </button>
                                    </div>
                                </div>
                                {/* ส่วน info */}
                                <dl>
                                    <div className="sm:grid grid-flow-row-dense grid-cols-5 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-normal leading-6 text-gray-500">
                                            ชื่อผู้รับ :
                                        </dt>
                                        <dd className="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-0 col-span-3">
                                            {x?.name}
                                        </dd>
                                    </div>
                                    <div className="sm:grid grid-flow-row-dense grid-cols-5 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-normal leading-6 text-gray-500">
                                            เบอร์โทรศัพท์ :
                                        </dt>
                                        <dd className="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-0 col-span-3">
                                            {x?.phone}
                                        </dd>
                                    </div>
                                    <div className="sm:grid grid-flow-row-dense grid-cols-5 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-normal leading-6 text-gray-500">
                                            ที่อยู่จัดส่ง :
                                        </dt>
                                        <dd className="mt-1 text-sm font-medium leading-6 text-gray-900 sm:mt-0 col-span-3">
                                            {x?.address}
                                        </dd>
                                    </div>
                                    <div className="sm:grid grid-flow-row-dense grid-cols-5 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-normal leading-6 text-gray-500">
                                            {(x?.default === true) ? (
                                                <>
                                                    <div className="bg-green-100 text-green-800 inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0']">
                                                        <MapPinIcon className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center" aria-hidden="true" />
                                                        ค่าเริ่มต้น
                                                    </div>
                                                </>
                                            ) : null}
                                        </dt>
                                    </div>
                                </dl >
                            </div>
                        ))
                    ) : (
                        <div className="space-y-4 text-sm leading-6 bg-gray-50 py-5 px-10 rounded-lg mb-2">
                            <div className="-ml-4 mt-2 flex flex-wrap items-center justify-center sm:flex-nowrap">
                                ไม่มีข้อมูล
                            </div>
                        </div>
                    ) : null}
                {editAddress && (
                    <>
                        <Address id={id} />
                    </>
                )}

            </div >
        </>
    );
};

export default ManageAddress;