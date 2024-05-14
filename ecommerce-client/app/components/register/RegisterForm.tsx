import PasswordStrength from '@/app/components/register/PasswordStrength';
import { EyeIcon, EyeSlashIcon, KeyIcon } from '@heroicons/react/16/solid'
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordStrength } from 'check-password-strength';
import { signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import validator from 'validator';
import { z } from 'zod';

const FormSchema = z.object({
    name: z
        .string()
        .min(1, "ชื่อ-สกุล ต้องมีอย่างน้อย 1 ตัวอักษร")
        .max(100, "ชื่อ-สกุล ต้องมีไม่เกิน 100 ตัวอักษร")
        .regex(new RegExp("^[a-zA-Z\\sก-๏]+$"), "ไม่อนุญาตให้ใช้สัญลักษณ์พิเศษ"),
    email: z.string().email("กรุณาใส่อีเมลที่ถูกต้อง"),
    phone: z.string().refine(validator.isMobilePhone, "กรุณาใส่เบอร์โทรศัพท์ที่ถูกต้อง"),
    password: z.string().min(5, "รหัสผ่าน ต้องมีอย่างน้อย 5 ตัวอักษร")
        .max(50, "รหัสผ่าน ต้องมีไม่เกิน 50 ตัวอักษร")
        .regex(new RegExp("^[^\\s]*$"), "รหัสผ่าน ห้ามมีช่องว่าง"),
    c_password: z.string().min(6, "ยืนยันรหัสผ่าน ต้องมีอย่างน้อย 6 ตัวอักษร")
        .max(50, "ยืนยันรหัสผ่าน ต้องมีไม่เกิน 50 ตัวอักษร")
        .regex(new RegExp("^[^\\s]*$"), "ยืนยันรหัสผ่าน ห้ามมีช่องว่าง")
}).refine(data => data.password == data.c_password, {
    message: "รหัสผ่านไม่ตรงกัน!",
    path: ["c_password"]
});

type InputType = z.infer<typeof FormSchema>;

const RegisterForm = () => {

    const [isVisiblePass, setIsVisiblePass] = useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<InputType>({
        resolver: zodResolver(FormSchema),
    });

    const [passStrength, setPassStrength] = useState(0);

    const saveUser: SubmitHandler<InputType> = async (data) => {

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
                method: 'POST',
                body: JSON.stringify(data)
            })

            const result = await res.json()
            const Message = () => {
                switch (true) {
                    case (result?.error?.errors.hasOwnProperty('name')):
                        return result?.error.errors.name[0];
                    case (result?.error?.errors.hasOwnProperty('email')):
                        return result?.error.errors.email[0];
                    case (result?.error?.errors.hasOwnProperty('phone')):
                        return result?.error.errors.phone[0];
                    case (result?.error?.errors.hasOwnProperty('password')):
                        return result?.error.errors.password[0];
                    case (result?.error?.errors.hasOwnProperty('c_password')):
                        return result?.error.errors.c_password[0];
                    case (result?.status?.message == 'OK'):
                        return "สมัครสมาชิกสำเร็จ!";
                    default:
                        return null;
                }
            }

            if (result?.error) {
                return toast.error(Message, {
                    position: "top-center",
                    autoClose: 1500
                });
            } else {
                toast.success(Message, {
                    position: "top-center",
                    autoClose: 1500,
                    onClose: async () => {
                        await signIn("credentials", {
                            email: data?.email,
                            password: data?.password,
                        })
                      },
                });
                
            }
  
        } catch (error) {
            toast.error("บางอย่างผิดพลาด");
        }

    }

    useEffect(() => {
        setPassStrength(passwordStrength(watch().password).id)
    }, [watch().password])

    return (
        <form className="space-y-6 text-gray-900" onSubmit={handleSubmit(saveUser)}>
            <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    ชื่อ-สกุล
                </label>
                <div className="mt-2">
                    <input
                        id="name"
                        type="name"
                        autoComplete="name"
                        {...register("name")}
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-someGreen sm:text-sm sm:leading-6 focus:outline-none"
                    />
                    {errors.name && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.name?.message}</p>}
                </div>
            </div>
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
                    {errors.email && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.email?.message}</p>}
                </div>
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                    เบอร์โทรศัพท์
                </label>
                <div className="mt-2">
                    <input
                        id="phone"
                        {...register("phone")}
                        type="text"
                        autoComplete="phone"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-someGreen sm:text-sm sm:leading-6 focus:outline-none"
                    />
                    {errors.phone && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.phone?.message}</p>}
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    รหัสผ่าน
                </label>

                <div className="relative">
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
                {errors.password && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.password?.message}</p>}
                <div className="mt-2">
                    <PasswordStrength passStrength={passStrength} />
                </div>
            </div>

            <div>
                <label htmlFor="ConfirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                    ยืนยันรหัสผ่าน
                </label>

                <div className="relative">
                    <input
                        id="ConfirmPassword"
                        {...register("c_password")}
                        type={isVisiblePass ? "text" : "password"}
                        autoComplete="ConfirmPassword"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-someGreen sm:text-sm sm:leading-6 focus:outline-none"
                    />
                    {errors.c_password && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.c_password?.message}</p>}
                </div>
            </div>


            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-whereGreen bg-gradient-to-r from-whereGreen to-someGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gradient-to-l focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coolGreen"
                >
                    สมัครสมาชิก
                </button>
            </div>
        </form>
    )
}

export default RegisterForm;