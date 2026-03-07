import { createPortal } from 'react-dom';
import {
  ACHIEVEMENT_DEFINITIONS,
  formatAchievementDate,
} from '../../utils/achievements';

export default function AchievementsDialog({
  open,
  onClose,
  unlocked,
  onShare,
  shareInFlightId,
  shareDisabled,
}) {
  if (!open) {
    return null;
  }

  const unlockedCount = Object.keys(unlocked).length;

  return createPortal(
    <div className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-black/65 px-4 py-4 backdrop-blur-sm sm:items-center sm:py-6">
      <div className="my-auto w-full max-w-4xl rounded-[32px] border border-white/10 bg-slate-950/95 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <p className="font-['Press_Start_2P'] text-[0.6rem] uppercase tracking-[0.28em] text-amber-200">
              Kingdom Achievements
            </p>
            <h2 className="mt-3 text-xl font-semibold text-stone-50 sm:text-2xl">
              {unlockedCount} of {ACHIEVEMENT_DEFINITIONS.length} trophies unlocked
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:bg-white/10 sm:w-auto"
          >
            Close
          </button>
        </div>

        <div className="mt-6 grid max-h-[calc(100vh-15rem)] gap-3 overflow-y-auto pr-1 md:grid-cols-2">
          {ACHIEVEMENT_DEFINITIONS.map((achievement) => {
            const unlockedEntry = unlocked[achievement.id];
            const isUnlocked = Boolean(unlockedEntry);

            return (
              <article
                key={achievement.id}
                className={`rounded-[28px] border p-4 shadow-[0_18px_40px_rgba(0,0,0,0.24)] ${
                  isUnlocked
                    ? 'border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(0,0,0,0.18))]'
                    : 'border-white/6 bg-black/22'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] ${
                      isUnlocked ? '' : 'grayscale'
                    }`}
                    style={{
                      background: isUnlocked
                        ? `linear-gradient(180deg, ${achievement.accentColor}, ${achievement.accentDarkColor})`
                        : 'linear-gradient(180deg, rgba(51,65,85,0.8), rgba(15,23,42,0.9))',
                      filter: isUnlocked ? 'none' : 'blur(1px)',
                    }}
                  >
                    {achievement.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-['Press_Start_2P'] text-[0.58rem] uppercase tracking-[0.24em] text-stone-50/90">
                          {isUnlocked ? achievement.label : 'Locked Achievement'}
                        </p>
                        <p className="mt-3 text-sm leading-6 text-slate-300">
                          {isUnlocked ? achievement.description : 'Silhouette only until earned.'}
                        </p>
                      </div>
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                        {isUnlocked ? formatAchievementDate(unlockedEntry.unlockedAt) : '???'}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                        {isUnlocked ? 'Unlocked and ready to share.' : 'Keep playing to reveal it.'}
                      </p>
                      <button
                        type="button"
                        disabled={!isUnlocked || shareDisabled}
                        onClick={() => onShare(achievement)}
                        className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {shareInFlightId === achievement.id ? 'Generating...' : 'Share Card'}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
}
