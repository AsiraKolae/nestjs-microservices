'use client'

import React, { useEffect, useState } from 'react'
import { Categories, brands } from '../layout/interfaces'
import { usePathname, useRouter } from "next/navigation"
import {
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Checkbox,
} from "@material-tailwind/react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useProductContext } from '@/app/context/product.context'
import getCategories from '@/app/api/util/navbar/route';

export default function FilterProduct() {

    const { paramFilter, setParamFilter } = useProductContext();
    const [categoryState, setCategoryState] = useState<Categories[]>([])
    const [checkedIndex, setCheckedIndex] = useState<number | null>(null);
    const [open, setOpen] = useState<number | null>(null);

    const path = usePathname();
    const router = useRouter();

    const initCategory = async () => {
        try {
            const result = await getCategories();

            setCategoryState(result);
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleCategory = (key: string, value: string) => {

        setParamFilter(prevState => {
            const filtersObject = prevState.filters ? JSON.parse(prevState.filters) : {}; // Parse filters only if it's defined
            if (filtersObject?.brand) {
                setCheckedIndex(null);
                return {
                    ...prevState,
                    filters: JSON.stringify({
                        [key]: value
                    }),
                    page: 1
                }
            } else {
                return {
                    ...prevState,
                    filters: JSON.stringify({
                        ...filtersObject,
                        [key]: value
                    }),
                    page: 1
                }
            }

        });
    }

    const handleBrand = (key: string, value: string, id: number) => {
        setCheckedIndex(id === checkedIndex ? null : id);
        setParamFilter(prevState => {
            const filtersObject = prevState.filters ? JSON.parse(prevState.filters) : {}; // Parse filters only if it's defined
            return {
                ...prevState,
                filters: JSON.stringify({
                    ...filtersObject,
                    [key]: value
                }),
                page: 1
            };
        });

    }

    useEffect(() => {
        if (categoryState.length == 0) {
            initCategory();
        }

        const queryString = new URLSearchParams(paramFilter).toString();
        router.replace(`${path}?${queryString}`)

        if (open === null && paramFilter.filters && categoryState.length > 0) {
            const filters = JSON.parse(paramFilter.filters);
            const index = categoryState.find(item => item.name === filters.category);
            const indexParent = index && index.parent_category_id !== null
                ? categoryState.findIndex(item => item.id === index.parent_category_id)
                : categoryState.findIndex(item => item.name === filters.category);
            setOpen(indexParent);
        }
        
        if (checkedIndex === null && paramFilter.filters && categoryState.length > 0) {
            const filters = JSON.parse(paramFilter.filters);
            const index = categoryState.find(item => item.name === filters.category);
            const indexBrand = index?.brands?.find((item: brands) => item.name === filters.brand)?.id;
            setCheckedIndex((index && indexBrand !== undefined) ? index.id + indexBrand : 0);
        }

    }, [paramFilter, open, path, router]);

    return (
        <div className="h-full w-full">
            <List>
                {categoryState.length > 0 && categoryState.map((section, Idx: number) => (
                    <React.Fragment key={Idx}>
                        {section?.parent_category_id == null && section?.children.length > 0 ? (
                            <>
                                <Accordion
                                    open={open === Idx}
                                    icon={
                                        <ChevronDownIcon
                                            strokeWidth={2.5}
                                            className={`mx-auto h-4 w-4 transition-transform ${open === Idx ? "rotate-180" : ""}`}
                                        />
                                    }
                                >
                                    <ListItem key={`listItem_${Idx}`} className="p-0" selected={open === Idx} onClick={() => handleCategory('category', section?.name)}>
                                        <AccordionHeader onClick={() => setOpen(Idx)} className="border-b-0 p-3">
                                            <Typography color="blue-gray" className="mr-auto font-normal text-sm">
                                                {section?.name}
                                            </Typography>
                                        </AccordionHeader>
                                    </ListItem>

                                    <AccordionBody className="py-1">
                                        <List className="p-0">
                                            {section?.children.length > 0 && section?.children?.map((option: Categories, optionIdx: number) => (
                                                <React.Fragment key={`option_${optionIdx}`}>
                                                    <ListItem key={`listItem_${optionIdx}`} className="text-sm" onClick={() => handleCategory('category', option.name)}>
                                                        <ListItemPrefix>
                                                            <ChevronRightIcon strokeWidth={3} className={`h-3 w-5 ${JSON.parse(paramFilter?.filters as string)?.category === option.name ? "rotate-90" : ""}`} />
                                                        </ListItemPrefix>
                                                        {option.name}
                                                    </ListItem>
                                                    {option?.brands.length > 0 && JSON.parse(paramFilter?.filters as string)?.category === option.name && (
                                                        <List className="p-0">
                                                            {option?.brands?.map((brand: brands, brandIdx: number) => (
                                                                <ListItem className="p-0 ml-2 text-sm">
                                                                    <Checkbox
                                                                        color="light-green"
                                                                        className="h-4 w-4"
                                                                        checked={checkedIndex === section?.id + brand?.id}
                                                                        onChange={() => handleBrand('brand', brand.name, section?.id + brand?.id)}
                                                                        label={brand?.name}
                                                                    />
                                                                </ListItem>
                                                            ))}
                                                        </List>
                                                    )}
                                                </React.Fragment>
                                            ))}

                                        </List>
                                    </AccordionBody>
                                </Accordion>
                            </>
                        ) : (section?.parent_category_id == null && section?.children.length <= 0 && section?.brands.length > 0 ? (
                            <>
                                <Accordion
                                    open={open === Idx}
                                    icon={
                                        <ChevronDownIcon
                                            strokeWidth={2.5}
                                            className={`mx-auto h-4 w-4 transition-transform ${open === Idx ? "rotate-180" : ""}`}
                                        />
                                    }
                                >
                                    <ListItem className="p-0" selected={open === Idx} onClick={() => handleCategory('category', section?.name)}>
                                        <AccordionHeader onClick={() => setOpen(Idx)} className="border-b-0 p-3">
                                            <Typography color="blue-gray" className="mr-auto font-normal text-sm">
                                                {section?.name}
                                            </Typography>
                                        </AccordionHeader>
                                    </ListItem>

                                    <AccordionBody className="py-1">
                                        <List className="p-0">
                                            {section?.brands?.map((brand: brands, brandIdx: number) => (
                                                <ListItem className="p-0 ml-2 text-sm">
                                                    <Checkbox
                                                        color="light-green"
                                                        className="h-4 w-4"
                                                        checked={checkedIndex === section?.id + brand?.id}
                                                        onChange={() => handleBrand('brand', brand.name, section?.id + brand?.id)}
                                                        label={brand?.name}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </AccordionBody>
                                </Accordion>
                            </>
                        ) : (section?.parent_category_id == null && section?.children.length <= 0 && section?.brands.length <= 0 ? (
                            <>
                                <ListItem className="text-sm" onClick={() => handleCategory('category', section?.name)}>
                                    {section?.name}
                                </ListItem>

                            </>
                        ) : null))}
                    </React.Fragment>
                ))}
            </List>
        </div>
    )
}