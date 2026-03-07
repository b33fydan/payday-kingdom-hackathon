import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAudioStore = create(
  persist(
    (set) => ({
      muted: false,

      toggleMuted() {
        set((state) => ({ muted: !state.muted }));
      },

      setMuted(muted) {
        set({ muted: Boolean(muted) });
      },
    }),
    {
      name: 'payday-kingdom-audio',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
