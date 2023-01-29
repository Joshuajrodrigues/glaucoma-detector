import {create} from "zustand";

interface ICodinates{
    x1?:number,
    y1?:number,
    x2?:number,
    y2?:number
}

interface IParameters{
    cup:ICodinates,
    disk:ICodinates
    setCup:(newCup:ICodinates)=>void
    setDisk:(newDisk:ICodinates)=>void
}

let defaultParameters:ICodinates={
    x1:0,
    x2:0,
    y1:0,
    y2:0
}


const useCdrCalculations = create<IParameters>()((set) => ({
    cup:defaultParameters,
    disk:defaultParameters,
    setCup:(newCup)=>set((state)=>({...state,cup:{...state.cup,...newCup}})),
    setDisk:(newDisk)=>set((state)=>({...state,disk:{...state.disk,...newDisk}}))
    
}));

export default useCdrCalculations;
