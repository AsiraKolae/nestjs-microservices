import { UseFormSetValue, useForm } from "react-hook-form";

interface DataInfo {
  [x: string]: any;
  name?: string;
  email?: string;
  user_info?: {
    phone?: string;
    address?: string;
  };
  address?: {
    name?: string;
    phone?: string;
    address?: string;
    default?: boolean;
  }[]
}

interface NewDataInfo {
  [x: string]: any;
  name?: string;
  email?: string;
  phone?: string;
}

interface ChagePassword{
  password?: string;
  c_password?: string;
}

interface ResApiUpdate {
  [x: string]: any;
  data: any;
  status: any;
}

interface InfoAddress {
    address?: string;
    name?: string | undefined;
    phone?: string | undefined; 
    tel?: string | undefined; 
    addressTax?: string;
    default?: boolean;
}

interface AddressList {
  [x: string]: any;
  id?: number | null | undefined;
  name?: string;
  phone?: string;
  address?: string | undefined;
  default?: boolean | undefined;
}

interface AddressProfile {
    address?: string;
    district?: string;
    amphoe: string;
    province: string;
    zipcode: string;
}

interface AddressObject {
    district: string,
    amphoe: string,
    province: string,
    zipcode: string,
}

interface Action {
    type: string,
    payload: any
}

interface initialState {
    entities?: any | undefined;
    searchKey?: string | undefined;
    search?: string | undefined;
    address?: {
        district?: string | undefined,
        amphoe?: string | undefined,
        province?: string | undefined,
        zipcode?: string | undefined,
      }
}

interface Tab {
  id: number,
  nameTH: string;
  nameEN: string;
  current: boolean;
}

interface InputProps {
  register: ReturnType<typeof useForm>['register'];
  errors: any; // Adjust this to be more specific if possible,
  setValue: UseFormSetValue<AddressList>;

}

export type {
    InfoAddress,
    AddressProfile,
    Action,
    AddressObject,
    initialState,
    DataInfo, 
    NewDataInfo, 
    ResApiUpdate,
    ChagePassword,
    Tab,
    InputProps,
    AddressList
};
