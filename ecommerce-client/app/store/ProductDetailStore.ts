import { create } from "zustand";

type ColorStore = {
  color: string;
  setColor: (color: string) => void;
};

type CapacityStore = {
  capacity: string;
  setCapacity: (capacity: string) => void;
};

const useColorStore = create<ColorStore>()((set) => ({
    color: "",
    setColor: (color) => set(() => ({ color: color })),
  }));
  

const useCapacityStore = create<CapacityStore>()((set) => ({
  capacity: "",
  setCapacity: (capacity) => set(() => ({ capacity: capacity })),
}));

export {
    useColorStore,
    useCapacityStore
}
