"use client";
import { usePasswordStore } from "@/app/store/ProfileStore";
import React, { useState } from "react";
import Button from "../Button";
import { toast } from "react-toastify";
import { Input } from "@material-tailwind/react";
import { KeyIcon } from "@heroicons/react/24/outline";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

const FormSchema = z.object({
    password: z.string().min(5, "รหัสผ่าน ต้องมีอย่างน้อย 5 ตัวอักษร")
        .max(50, "รหัสผ่าน ต้องมีไม่เกิน 50 ตัวอักษร")
        .regex(new RegExp("^[^\\s]*$"), "รหัสผ่าน ห้ามมีช่องว่าง"),
    c_password: z.string().min(5, "ยืนยันรหัสผ่าน ต้องมีอย่างน้อย 5 ตัวอักษร")
        .max(50, "ยืนยันรหัสผ่าน ต้องมีไม่เกิน 50 ตัวอักษร")
        .regex(new RegExp("^[^\\s]*$"), "ยืนยันรหัสผ่าน ห้ามมีช่องว่าง")
}).refine(data => data.password == data.c_password, {
    message: "รหัสผ่านไม่ตรงกัน!",
    path: ["c_password"]
});

type InputType = z.infer<typeof FormSchema>;

const ChangePassword = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
    const { passwordChange } = usePasswordStore();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<InputType>({
        resolver: zodResolver(FormSchema),
    });

    const updatePassword: SubmitHandler<InputType> = async (data) => {
        reset();
        const response = await passwordChange({
            password: data.password,
            c_password: data.c_password,
        });

        if (response?.status?.code == 200) {
            const Newdata = response?.data;
            return toast.success("อัปเดตข้อมูลสำเร็จ", {
                position: "top-center",
                autoClose: 1500,
            });
        } else {
            let errorMessage = "";
            const dataErrors = response?.error?.errors;
            for (const key in dataErrors) {
                if (Object.prototype.hasOwnProperty.call(dataErrors, key)) {
                    const errors = dataErrors[key];
                    errorMessage += `${errors.join(", ")}\n`;
                }
            }
            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 1500,
            });
        }
    };

    return (
        <>
            <div>
                <div className="inline-flex items-center space-x-2">
                    <KeyIcon className="h-6 w-6" />
                    <h2 className="text-xl font-semibold leading-7 text-gray-900 py-4">
                        เปลี่ยนรหัสผ่าน
                    </h2>
                </div>
                <div className="space-y-6 divide-y divide-gray-100 text-sm leading-6 bg-gray-50 py-5 px-10 rounded-lg">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        แก้ไขรหัสผ่าน
                    </h2>

                    <form onSubmit={handleSubmit(updatePassword)}>
                        <div className="w-full relative">
                            <Input
                                size="lg"
                                color="gray"
                                label="รหัสผ่านใหม่"
                                crossOrigin=""
                                placeholder="กรอกรหัสผ่านใหม่"
                                type={isPasswordVisible ? "text" : "password"}
                                maxLength={50}
                                id="password"
                                required
                                {...register("password")}
                                className="w-full px-3 py-2 border rounded-md text-gray-700 bg-white"
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                {isPasswordVisible ?
                                    <EyeIcon className="h-4 w-4 text-gray-400" onClick={(e: any) => setIsPasswordVisible(false)} />
                                    : <EyeSlashIcon className="h-4 w-4 text-gray-400" onClick={(e: any) => setIsPasswordVisible(true)} />
                                }
                            </span>
                        </div>
                        {errors.password && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.password?.message}</p>}
                        <div className="w-full relative mt-5">
                            <Input
                                size="lg"
                                color="gray"
                                label="ยืนยันรหัสผ่าน"
                                crossOrigin=""
                                placeholder="ยืนยันรหัสผ่าน"
                                type={isPasswordVisible2 ? "text" : "password"}
                                maxLength={50}
                                id="c_password"
                                required
                                {...register("c_password")}
                                className="w-full px-3 py-2 border rounded-md text-gray-700 bg-white"
                            />
                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                {isPasswordVisible2 ?
                                    <EyeIcon className="h-4 w-4 text-gray-400" onClick={(e: any) => setIsPasswordVisible2(false)} />
                                    : <EyeSlashIcon className="h-4 w-4 text-gray-400" onClick={(e: any) => setIsPasswordVisible2(true)} />
                                }
                            </span>
                        </div>
                        {errors.c_password && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.c_password?.message}</p>}

                        <div className="pt-8 flex justify-end">
                            <Button
                                type="submit"
                                variant="success"
                                className="px-8 py-2 items-center rounded-md"
                            >
                                บันทึก
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default ChangePassword;
