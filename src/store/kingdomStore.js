import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { KINGDOM_BANNER_OPTIONS } from '../utils/constants';

const DEFAULT_KINGDOM_NAME = 'Fort Savings';
const DEFAULT_BANNER_COLOR = KINGDOM_BANNER_OPTIONS.find((option) => option.key === 'gold')?.key ?? 'gold';

export const useKingdomStore = create(
  persist(
    (set) => ({
      kingdomName: DEFAULT_KINGDOM_NAME,
      bannerColor: DEFAULT_BANNER_COLOR,
      hasCompletedOnboarding: false,

      setKingdomName(kingdomName) {
        set({
          kingdomName: kingdomName.trim() || DEFAULT_KINGDOM_NAME,
        });
      },

      setBannerColor(bannerColor) {
        set({ bannerColor });
      },

      updateKingdomSettings({ kingdomName, bannerColor }) {
        set({
          kingdomName: kingdomName.trim() || DEFAULT_KINGDOM_NAME,
          bannerColor: bannerColor || DEFAULT_BANNER_COLOR,
        });
      },

      completeOnboarding() {
        set({ hasCompletedOnboarding: true });
      },

      reopenOnboarding() {
        set({ hasCompletedOnboarding: false });
      },
    }),
    {
      name: 'payday-kingdom-identity',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { DEFAULT_BANNER_COLOR, DEFAULT_KINGDOM_NAME };
