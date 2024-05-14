'use client'

import RegisterForm from '@/app/components/register/RegisterForm';
import Link from 'next/link';
import React from 'react'

const RegisterPage = () => {

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center py-8 sm:px-6 lg:px-8 lg:py-8 mb-20">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="px-6 py-12 sm:px-12">
                        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            สมัครสมาชิก
                        </h2>
                        <RegisterForm />
                        <div>
                            <p className="text-center my-0 mt-3">เป็นสมาชิกอยู่แล้ว
                                <Link href="/login" className="font-semibold leading-6 text-gray-900 ml-2 hover:text-someGreen">
                                    เข้าสู่ระบบ
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
