import create from 'zustand';

interface AboutStore {
  aboutData: string;
  setAboutData: (data: string) => void;
}

export const useAboutStore = create<AboutStore>((set) => ({
  aboutData: '',
  setAboutData: (data) => set({ aboutData: data }),
}));