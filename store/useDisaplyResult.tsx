import { create } from "zustand";
type ImageToShowType = "cup" | "disk" | "current"
interface FundasState {
    imageToShow: ImageToShowType
    setImage: (newImageToShow: ImageToShowType) => void
    remove: () => void;
}

const useDisplayResult = create<FundasState>()((set) => ({
    imageToShow: "cup",
    setImage: (newImageToShow) => set(() => ({ imageToShow: newImageToShow })),
    remove: () => set(() => ({ imageToShow: "cup" })),
}));

export default useDisplayResult;
