import { PixelCrop } from "react-image-crop";
import {create} from "zustand";

interface FundasState {
  image: PixelCrop;
  setImage:(newImage:PixelCrop)=>void
  remove: () => void;
}
export interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
  unit: 'px' | '%';
}
const defaultImage:PixelCrop = {x:0,y:0,width:0,height:0,unit:"px"}
const useCropComplete = create<FundasState>()((set) => ({
  image:defaultImage,
  setImage:(newImage:PixelCrop)=>set(()=>({image:newImage})),
  remove: () => set(() => ({ image: defaultImage })),
}));

export default useCropComplete;
