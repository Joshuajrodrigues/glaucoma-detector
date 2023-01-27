import {create} from "zustand";

interface IProcessedData {
  imageData: HTMLImageElement|undefined;
  cupImageData: ImageData|undefined;
  diskImageData: ImageData|undefined;
  setImageData:(key:string,newImageData:ImageData|HTMLImageElement)=>void
  remove: () => void;
}

const useProcessedData = create<IProcessedData>()((set) => ({
  imageData:undefined,
  cupImageData:undefined,
  diskImageData:undefined,
  setImageData:(key,newImage)=>set(()=>({[key]:newImage})),
  remove: () => set(() => ({ imageData: undefined })),
}));

export default useProcessedData;