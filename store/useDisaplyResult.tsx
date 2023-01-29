import { create } from "zustand";
type ImageToShowType = "cup" | "disk" | "current"
interface FundasState {
    imageToShow: ImageToShowType
    setImage: (newImageToShow: ImageToShowType) => void
    remove: () => void;
}

const useDisplayResult = create<FundasState>()((set) => ({
    imageToShow: "current",
    setImage: (newImageToShow) => set(() => ({ imageToShow: newImageToShow })),
    remove: () => set(() => ({ imageToShow: "current" })),
}));

export default useDisplayResult;
