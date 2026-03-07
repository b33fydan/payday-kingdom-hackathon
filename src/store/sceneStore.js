import { create } from 'zustand';

export const useSceneStore = create((set) => ({
  captureScene: null,

  setCaptureScene(captureScene) {
    set({ captureScene });
  },
}));
