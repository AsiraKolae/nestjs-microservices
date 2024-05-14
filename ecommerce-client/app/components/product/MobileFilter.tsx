'use client'

import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import FilterProduct from "./FilterProduct";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    IconButton,
} from "@material-tailwind/react";


export default function MobileFilter() {
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };
    return (
        <aside className="lg:hidden">
            <div className="flex bg-blue-gray-50 justify-center items-center py-3 cursor-pointer" onClick={toggleFilter}>
                <FunnelIcon className="h-4 w-4 mr-1" />
                <p>กรองข้อมูลสินค้า</p>
            </div>
            {isFilterOpen &&
                <Dialog className="lg:hidden" size="xxl" open={isFilterOpen} handler={toggleFilter} placeholder="">
                    <DialogHeader className="bg-blue-gray-50 flex justify-between" placeholder="">
                        <div className="flex justify-center items-center text-base">
                            <FunnelIcon className="h-4 w-4 mr-1" />
                            <p className="font-normal">กรองข้อมูลสินค้า</p>
                        </div>
                        <IconButton
                            color="black"
                            size="sm"
                            variant="text"
                            onClick={toggleFilter} placeholder="">
                            <XMarkIcon className="h-8 w-8 text-right cursor-pointer" />
                        </IconButton>
                    </DialogHeader>
                    <DialogBody className="p-0" placeholder="">
                        <FilterProduct />
                    </DialogBody>
                </Dialog>
            }
        </aside>
    );
}