"use client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { ActualFileObject, FilePondFile, FilePondInitialFile } from "filepond";
import { InvoiceProps } from "@/app/types/invoice/interfaces";
import { useTransactionStore } from "@/app/store/TransactionStore";
import { toast } from "react-toastify";
import { useInvoiceStore } from "@/app/store/InvoiceStore";
import { Input } from "@material-tailwind/react";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UploadSlip: React.FC<InvoiceProps> = ({ invoiceNumber }) => {

  const { createTransaction, transaction, updateTransaction, files, setFiles } = useTransactionStore();
  const { invoice, showInvoice } = useInvoiceStore();
  

  const handleUploadFile = (files: FilePondFile[]) => {
    setFiles(files)
  };

  const handleChangeData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateTransaction(name, value)
  };

  const handleUpload = async () => {
    try {
      if (!files || files.length === 0 || !transaction) {
        return toast.error("ข้อมูลไม่ถูกต้อง", {
          position: "top-center",
          autoClose: 1500
        });
      };


      const reponse = await createTransaction({
        invoice_id: invoice.id
      });

      if (reponse?.status?.code == 200) {
        return toast.success("อัปโหลดข้อมูลสำเร็จ รอตรวจสอบความถูกต้อง", {
          position: "top-center",
          autoClose: 1500,
          onClose: async () => {
            window.location.href = "/profile";
          }
        });

      } else {
        let errorMessage = reponse?.error?.message;

        return toast.error(errorMessage, {
          position: "top-center",
          autoClose: 1500
        });
      }





    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    showInvoice(invoiceNumber);
  }, [invoiceNumber, showInvoice]);

  return (
    //แจ้งสลิปหลักฐานการโอน
    <div className="sm:mt-5">
      <div className="App">
        <FilePond
          files={files}
          onupdatefiles={handleUploadFile}
          onaddfile={(error, file) => {
          }}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
      </div>
      <div className="pt-2">
        <Input
          size="lg"
          color="gray"
          label="ยอดชำระ"
          crossOrigin=""
          placeholder="กรอก ยอดชำระ"
          id="amount"
          name="amount"
          aria-invalid="true"
          onChange={(e) => handleChangeData(e)}
          aria-describedby="amount-error"
          required
          className="w-full px-3 py-2 border rounded-md text-gray-700"
          data-popover-target="menu-1"
        />
      </div>
      <div className="pt-4">
        <Input
          label="เลือกวันที่ทำรายการ"
          type="datetime-local"
          size="lg"
          color="gray"
          crossOrigin=""
          placeholder="เลือกวันที่ทำรายการ"
          id="payment_datetime"
          name="payment_datetime"
          aria-invalid="true"
          onChange={(e) => handleChangeData(e)}
          aria-describedby="payment_datetime-error"
          required
        />
      </div>
      <div className="mt-5">
        <button
          type="button"
          onClick={handleUpload}
          className="items-center rounded-md bg-gradient-to-l from-gray-700 to-gray-600 hover:bg-gradient-to-r w-full py-2 sm:py-2 text-sm font-medium border border-gray-300 text-gray-100 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
        >
          อัพโหลดสลิป
        </button>
      </div>
    </div>
  );
};

export default UploadSlip;
