import { create } from "zustand";

interface FundasState {
    load: boolean;
    setImage: (e: boolean) => void

}

const useSample = create<FundasState>()((set) => ({
    load: false,
    setImage: (e) => set(() => ({ load: e })),

}));

export default useSample;
