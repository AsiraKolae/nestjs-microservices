import { create } from "zustand";
import { DataInfo, NewDataInfo, ResApiUpdate, ChagePassword } from "../types/profile/interfaces";
import {
  Action,
  AddressProfile,
  InfoAddress,
  initialState,
} from "../types/profile/interfaces";
import { Address } from "thai-address-autocomplete-react";
import { resolveResultByField } from "../thailand-address";

type ProfileInfoStore = {
  profileInfo: DataInfo;
  setProfileInfo: (data: DataInfo) => Promise<void>;
  getProfileInfo: () => Promise<void>;
  updateProfileInfo: (preparedData: NewDataInfo) => Promise<ResApiUpdate>;
  editAddress: boolean;
  setEditAddress: (value: boolean) => void; 
};

type PasswordStore = {
  // password: string;
  passwordChange: (datapassword: ChagePassword) => Promise<ResApiUpdate>;
};

type AddressStore = {
  address: AddressProfile;
  setAddress: (address: AddressProfile) => void;
  updateAddress: (scope: string, value: string) => boolean;
  infoAddress: InfoAddress;
  setInfoAddress: (infoAddress: InfoAddress) => void;
  updateInfoAddress: (name: string, value: string | boolean) => boolean;
  initialState: initialState;
  setInitialState: (initialState: initialState) => void;
  updateInitialState: (action: Action) => boolean;
  IsDefault: boolean;
  setIsDefault: (value: boolean) => void; 
};

type AddressTaxStore = {
  addressTax: Address;
  setAddressTax: (addressTax: Address) => void;
  updateAddressTax: (scope: string, value: string) => boolean;
  infoAddressTax: InfoAddress;
  setInfoAddressTax: (infoAddressTax: InfoAddress) => void;
  updateInfoAddressTax: (name: string, value: string) => boolean;
  initialStateTax: initialState;
  setInitialStateTax: (initialStateTax: initialState) => void;
  updateInitialStateTax: (action: Action) => boolean;
  IsDefaultTax: boolean;
  setIsDefaultTax: (value: boolean) => void; 
};

type ManageAccount = {
  selectedManageAccount: {};
  setSelectedManageAccount: (menu: string) => void;
};

const useProfileInfoStore = create<ProfileInfoStore>()((set) => ({
  profileInfo: {
    name: "",
    email: "",
    user_info: {
      phone: "",
      address: "",
    },
  },
  setProfileInfo: async (data: DataInfo) => {
    set({ profileInfo: data });
  },

  getProfileInfo: async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/profile`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (data?.status?.code == 200) {
        set({ profileInfo: data.data });
      }
      return data;
    } catch (error) {
      console.error("Error get data");
    }
  },
  updateProfileInfo: async (preparedData: NewDataInfo) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/profile`,
        {
          method: "POST",
          body: JSON.stringify(preparedData),
        }
      );
      const data = await response.json();
      if (data?.status?.code == 200) {
        set({ profileInfo: data.data });
      }
      return data;
    } catch (error) {
      console.error("Error updating data");
    }
  },
  editAddress: false,
  setEditAddress: (editAddress) => set(() => ({ editAddress })),
}));

const usePasswordStore = create<PasswordStore>()((set) => ({
  passwordChange: async (datapassword: ChagePassword) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/profile`,
        {
          method: "POST",
          body: JSON.stringify(datapassword),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating data");
    }
  }
  
  
}));

const useAddressStore = create<AddressStore>((set) => ({
  address: {
    district: "",
    amphoe: "",
    province: "",
    zipcode: "",
  },
  setAddress: (address) => set(() => ({ address: address })),
  updateAddress: (scope, value) => {
    set((state) => ({
      address: {
        ...state.address,
        [scope]: value,
      },
    }));
    return true;
  },
  infoAddress: {
    address: "",
    name: "",
    tel: "",
    default: false
  },
  setInfoAddress: (infoAddress) => set(() => ({ infoAddress: infoAddress })),
  updateInfoAddress: (name, value) => {
    set((state) => ({
      infoAddress: {
        ...state.infoAddress,
        [name]: value,
      },
    }));
    return true;
  },
  initialState: {
    entities: [],
    searchKey: "",
    search: "",
    address: {
      district: "",
      amphoe: "",
      province: "",
      zipcode: "",
    }
  },
  setInitialState: (initialState) => set(() => ({ initialState: initialState })),
  updateInitialState: (action) => {
    const { payload } = action;
    set((state) => ({
      ...state,
      entities: resolveResultByField(payload.type, payload.search),
      searchKey: payload.type,
      search: payload.search,
    }));
    return true;
  },
  IsDefault: true,
  setIsDefault: (IsDefault) => set(() => ({ IsDefault }))
}));

const useAddressTaxStore = create<AddressTaxStore>((set) => ({
  addressTax: {
    district: "",
    amphoe: "",
    province: "",
    zipcode: "",
  },
  setAddressTax: (addressTax) => set(() => ({ addressTax: addressTax })),
  updateAddressTax: (scope, value) => {
    set((state) => ({
      addressTax: {
        ...state.addressTax,
        [scope]: value,
      },
    }));
    return true;
  },
  infoAddressTax: {
    addressTax: "",
  },
  setInfoAddressTax: (infoAddressTax) =>
    set(() => ({ infoAddressTax: infoAddressTax })),
  updateInfoAddressTax: (name, value) => {
    set((state) => ({
      infoAddressTax: {
        ...state.infoAddressTax,
        [name]: value,
      },
    }));
    return true;
  },
  initialStateTax: {
    entities: [],
    searchKey: "",
    search: "",
  },
  setInitialStateTax: (initialStateTax) => set(() => ({ initialStateTax: initialStateTax })),
  updateInitialStateTax: (action) => {
    const { payload } = action;
    set((state) => ({
      ...state,
      entities: resolveResultByField(payload.type, payload.search),
      searchKey: payload.type,
      search: payload.search,
    }));
    return true;
  },
  IsDefaultTax: true,
  setIsDefaultTax: (IsDefaultTax) => set(() => ({ IsDefaultTax })),
}));

const useManageAccountStore = create<ManageAccount>((set) => ({
  selectedManageAccount: 'ข้อมูลส่วนตัว',
  setSelectedManageAccount: (selectedManageAccount) => set(() => ({ selectedManageAccount })),
}));

export { useProfileInfoStore, usePasswordStore, useAddressStore, useAddressTaxStore, useManageAccountStore };
