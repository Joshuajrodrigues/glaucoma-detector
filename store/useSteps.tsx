import { create } from "zustand";

interface StepsState {
    steps: number[];
    setSteps: (newImage: number[]) => void
}

const useSteps = create<StepsState>()((set) => ({
    steps: [],
    setSteps: (newStepArray) => set(() => ({ steps: newStepArray })),

}));

export default useSteps;
