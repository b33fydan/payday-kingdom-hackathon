import { KINGDOM_BANNER_OPTIONS } from '../../utils/constants';

export default function BannerColorSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {KINGDOM_BANNER_OPTIONS.map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() => onChange(option.key)}
          className={`rounded-2xl border px-3 py-3 text-left transition ${
            value === option.key
              ? 'border-white/50 bg-white/12'
              : 'border-white/10 bg-black/20 hover:border-white/20'
          }`}
        >
          <span
            className="block h-8 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
            style={{
              background: `linear-gradient(135deg, ${option.color} 0%, ${option.darkColor} 100%)`,
            }}
          />
          <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-100">
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}
