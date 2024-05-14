"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

const FormSchema = z.object({
    email: z.string().email("กรุณาใส่อีเมลที่ถูกต้อง"),
    password: z.string().min(5, "รหัสผ่าน ต้องมีอย่างน้อย 5 ตัวอักษร")
        .regex(new RegExp("^[^\\s]*$"), "รหัสผ่าน ห้ามมีช่องว่าง")
});

type InputType = z.infer<typeof FormSchema>;

const LoginPage = () => {
    const [isVisiblePass, setIsVisiblePass] = useState(false)
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<InputType>({
        resolver: zodResolver(FormSchema),
    });

    
    const onSubmit: SubmitHandler<InputType> = async (data) => {
        await signIn("credentials", {
            email: data?.email,
            password: data?.password,
            redirect: false
        }).then((result) => {
            if (result?.status === 401) {
                return toast.error(result?.error, {
                    position: "top-center",
                    autoClose: 1500
                });
            } else if (result?.status === 200) {
                return toast.success('เข้าสู่ระบบสำเร็จ', {
                    position: "top-center",
                    autoClose: 1500,
                    onClose: async () => {
                        // window.location.href = '/'
                        router.back();
                    },
                });
            }

        });

    };
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-32 lg:px-8 lg:py-32 mb-20">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    เข้าสู่ระบบ
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            อีเมล
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                {...register("email")}
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-someGreen sm:text-sm sm:leading-6 focus:outline-none"
                            />
                            {errors.email && <p className="block text-xs font-medium leading-6 text-red-500">{errors.email?.message}</p>}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                รหัสผ่าน
                            </label>
                        </div>
                        <div className="mt-2 relative">
                            <input
                                id="password"
                                {...register("password")}
                                type={isVisiblePass ? "text" : "password"}
                                autoComplete="password"
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-someGreen sm:text-sm sm:leading-6 focus:outline-none"
                            />
                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                {isVisiblePass ?
                                    <EyeIcon className="h-4 w-4 text-gray-400" onClick={(e: any) => setIsVisiblePass(false)} />
                                    : <EyeSlashIcon className="h-4 w-4 text-gray-400" onClick={(e: any) => setIsVisiblePass(true)} />
                                }
                            </span>
                        </div>
                        {errors.password && <p className="block text-xs font-medium leading-6 text-red-500">{errors.password?.message}</p>}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md border border-whereGreen bg-gradient-to-r from-whereGreen to-someGreen hover:bg-gradient-to-l px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coolGreen"
                        >
                            เข้าสู่ระบบ
                        </button>
                    </div>
                </form>
                <div>
                    <p className="text-center my-0 mt-3">ไม่ใช่สมาชิก ?
                        <Link href="/register" className="font-semibold leading-6 text-gray-900 hover:text-someGreen ml-2">
                            สมัครสมาชิก
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
