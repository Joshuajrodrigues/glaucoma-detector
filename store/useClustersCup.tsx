import { create } from "zustand";

interface ClusterState {
  original: Uint8ClampedArray | []
  cluster1: Uint8ClampedArray | [];
  cluster2: Uint8ClampedArray | [];
  cluster3: Uint8ClampedArray | [];
  setClusters: (clusterName: string, value: Uint8ClampedArray) => void
}

const useClustersCup = create<ClusterState>()((set) => ({
  original: [],
  cluster1: [],
  cluster2: [],
  cluster3: [],
  setClusters: (clusterName, value) => set(() => ({ [clusterName]: value })),

}));

export default useClustersCup;
