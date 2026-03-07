import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAchievementStore = create(
  persist(
    (set, get) => ({
      unlocked: {},
      toastQueue: [],
      dialogOpen: false,

      unlockAchievement(id) {
        if (get().unlocked[id]) {
          return false;
        }

        const unlockedAt = new Date().toISOString();
        set((state) => ({
          unlocked: {
            ...state.unlocked,
            [id]: { unlockedAt },
          },
          toastQueue: [...state.toastQueue, id],
        }));

        if (typeof window !== 'undefined') {
          window.setTimeout(() => {
            get().dismissToast(id);
          }, 4200);
        }

        return true;
      },

      dismissToast(id) {
        set((state) => ({
          toastQueue: state.toastQueue.filter((toastId) => toastId !== id),
        }));
      },

      setDialogOpen(dialogOpen) {
        set({ dialogOpen: Boolean(dialogOpen) });
      },
    }),
    {
      name: 'payday-kingdom-achievements',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        unlocked: state.unlocked,
      }),
    },
  ),
);
