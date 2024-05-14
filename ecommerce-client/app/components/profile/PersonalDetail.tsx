"use client";
import { useProfileInfoStore } from "@/app/store/ProfileStore";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import Button from "../Button";
import { toast } from "react-toastify";
import { Input } from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import validator from "validator";
import { NewDataInfo } from "@/app/types/profile/interfaces";

const FormSchema = z.object({
  email: z.string().min(1, "กรุณาใส่อีเมล").email("กรุณาใส่อีเมลที่ถูกต้อง"),
  phone: z.string().refine(value => validator.isMobilePhone(value, 'any'), { message: "กรุณาใส่เบอร์โทรศัพท์ที่ถูกต้อง" })
    .refine(value => value.length === 10, { message: "กรุณาใส่เบอร์โทรศัพท์ที่มี 10 หลัก" }),
  name: z
    .string()
    .min(1, "ชื่อ-สกุล ต้องมีอย่างน้อย 1 ตัวอักษร")
    .max(100, "ชื่อ-สกุล ต้องมีไม่เกิน 100 ตัวอักษร")
    .regex(new RegExp("^[a-zA-Zก-๏เ ]+$"), "ชื่อ-สกุล ต้องประกอบด้วยตัวอักษรและช่องว่างเท่านั้น")
});

type InputType = z.infer<typeof FormSchema>;

const PersonalDetail = () => {
  const { data: session, update } = useSession();
  const { profileInfo, updateProfileInfo, getProfileInfo } = useProfileInfoStore();

  const { register, handleSubmit, formState: { errors } } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const UpdateUser: SubmitHandler<InputType> = async (data) => {
    try {
      const dataToUpdate: NewDataInfo = {
          name: data.name ?? profileInfo.name,
          email: data.email ?? profileInfo.email,
          phone: data.phone ?? profileInfo.user_info?.phone,
      };
      const dataProfileInfo: NewDataInfo = {
          name: profileInfo.name,
          email: profileInfo.email,
          phone: profileInfo.user_info?.phone,
      };
      const preparedData: NewDataInfo = Object.fromEntries(
          Object.entries(dataToUpdate).filter(([key, value]) => dataProfileInfo[key] !== value)
      );
      const response = await updateProfileInfo(preparedData);
      console.log(response);
      
      if (response?.status?.code == 200) {
        const Newdata = response?.data;
        await update({
          user: Newdata,
        });
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
    } catch (error) {
      toast.error("บางอย่างผิดพลาด");
    }
  }

  useEffect(() => {
    getProfileInfo();
  }, [getProfileInfo]);

  return (
    <>
      <div>
        <div className="inline-flex items-center space-x-2">
          <UserCircleIcon className="h-6 w-6" />
          <h2 className="text-xl font-semibold leading-7 text-gray-900 py-4">
            จัดการข้อมูลส่วนตัว
          </h2>
        </div>
        <div className="space-y-6 divide-y divide-gray-100 text-sm leading-6 bg-gray-50 py-5 px-10 rounded-lg">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            ข้อมูลส่วนตัว
          </h2>
          <form onSubmit={handleSubmit(UpdateUser)}>
            <div className="w-full">
              <Input
                size="lg"
                color="gray"
                label="ชื่อ-สกุล"
                crossOrigin=""
                placeholder="กรอกชื่อ-นามสกุล"
                type="text"
                maxLength={50}
                id="name"
                required
                defaultValue={profileInfo.name}
                {...register("name")}
                className="w-full px-3 py-2 border rounded-md text-gray-900 bg-white"
              />
              {errors.name && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.name?.message}</p>}
            </div>
            <div className="pt-8 sm:flex">
              <div className="w-full">
                <Input
                  size="lg"
                  color="gray"
                  label="อีเมล"
                  crossOrigin=""
                  placeholder="กรอกอีเมล"
                  type="email"
                  id="email"
                  defaultValue={profileInfo.email}
                  {...register("email")}
                  className="w-full px-3 py-2 border rounded-md text-gray-900 bg-white"
                />
                {errors.email && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.email?.message}</p>}
              </div>
              <div className="sm:ml-3 sm:mt-0 mt-8 w-full">
                <Input
                  size="lg"
                  color="gray"
                  label="เบอร์โทรศัพท์"
                  placeholder="กรอกเบอร์โทรศัพท์"
                  crossOrigin=""
                  type="text"
                  maxLength={10}
                  id="phone"
                  defaultValue={profileInfo.user_info?.phone}
                  {...register("phone")}
                  className="w-full px-3 py-2 border rounded-md text-gray-900 bg-white"
                />
                {errors.phone && <p className="block text-xs font-normal leading-6 text-gray-700">{errors.phone?.message}</p>}
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
      </div>
    </>
  );
};
export default PersonalDetail;
