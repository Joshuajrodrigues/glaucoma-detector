import {create} from "zustand";

interface FundasState {
  image: File[] | [];
  setImage:(newImage:File[])=>void
  remove: () => void;
}

const useFundas = create<FundasState>()((set) => ({
  image: [],
  setImage:(newImage:File[])=>set(()=>({image:newImage})),
  remove: () => set(() => ({ image: [] })),
}));

export default useFundas;
