import { PixelCrop } from "react-image-crop";
import {create} from "zustand";

interface CropState {
  cropImageProperties: PixelCrop;
  setCropImageProperties: (newImage: PixelCrop) => void
  resetCropImageProperties: () => void;
  croppedImage: File[] | [];
  setCroppedImage: (newImage: File[]) => void
}

export interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
  unit: 'px' | '%';
}

const defaultImage:PixelCrop = {x:0,y:0,width:0,height:0,unit:"px"}
const useCropComplete = create<CropState>()((set) => ({
  cropImageProperties: defaultImage,
  setCropImageProperties: (newImage: PixelCrop) => set(() => ({ cropImageProperties: newImage })),
  resetCropImageProperties: () => set(() => ({ cropImageProperties: defaultImage })),
  croppedImage: [],
  setCroppedImage: (newImage: File[]) => set(() => ({ croppedImage: newImage })),
}));

export default useCropComplete;
