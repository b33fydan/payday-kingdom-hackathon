import { Link } from 'react-router-dom';
import LandingHeroScene from '../components/landing/LandingHeroScene';

export default function LandingPage() {
  const steps = [
    {
      index: '01',
      title: 'Enter income and bills',
      detail: 'Type your monthly income, add recurring bills, and watch each one become a themed monster.',
    },
    {
      index: '02',
      title: 'Trigger payday',
      detail: 'Summon your hero, hear the fanfare, and clear the island with a short, satisfying battle.',
    },
    {
      index: '03',
      title: 'Grow and share',
      detail: 'Earn XP, upgrade your champion, expand the island, then capture a screenshot built for social.',
    },
  ];

  const showcases = [
    {
      title: 'Month 1 · Barren',
      label: 'First monster',
      saved: '$3.4k saved',
      palette: 'from-[#103629] via-[#174433] to-[#245c42]',
      accent: '#ef4444',
    },
    {
      title: 'Month 3 · Village',
      label: 'Hero upgrade',
      saved: '$8.2k saved',
      palette: 'from-[#0f2d38] via-[#174250] to-[#236072]',
      accent: '#38bdf8',
    },
    {
      title: 'Month 8 · Castle',
      label: 'Share-worthy kingdom',
      saved: '$18k saved',
      palette: 'from-[#3b2212] via-[#5b341d] to-[#84501f]',
      accent: '#fbbf24',
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden px-3 py-3 text-stone-50 sm:px-4 sm:py-4 md:px-6 md:py-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-6rem] top-16 h-48 w-48 rounded-full bg-emerald-400/12 blur-3xl" />
        <div className="absolute right-[-7rem] top-28 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(8,17,9,0.94),rgba(18,39,24,0.9)_45%,rgba(58,39,18,0.82))] shadow-[0_36px_120px_rgba(0,0,0,0.32)]">
          <div className="grid gap-8 px-5 py-6 sm:px-6 sm:py-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-10">
            <div className="flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border border-emerald-300/15 bg-emerald-400/10 px-4 py-2 text-[0.62rem] uppercase tracking-[0.32em] text-emerald-200">
                  Payday Kingdom
                </div>
                <div className="max-w-3xl space-y-5">
                  <h1 className="font-['Press_Start_2P'] text-[2rem] leading-[1.45] text-stone-50 sm:text-[2.6rem] lg:text-[3.2rem]">
                    Your Budget.
                    <br />
                    Your Kingdom.
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-stone-200/80 sm:text-lg">
                    Turn boring bills into tiny bosses, let payday summon your champion, and grow a voxel
                    island that proves discipline can look legendary.
                  </p>
                </div>
                <div className="grid gap-3 sm:max-w-2xl sm:grid-cols-3">
                  <div className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/70">No bank sync</p>
                    <p className="mt-3 text-sm text-stone-100">Your data stays in the browser.</p>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-amber-200/70">Retro feedback</p>
                    <p className="mt-3 text-sm text-stone-100">Synth sounds, battles, screenshots.</p>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Share-first</p>
                    <p className="mt-3 text-sm text-stone-100">Made to look good on a phone.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/kingdom?onboarding=1"
                  className="inline-flex items-center justify-center rounded-[22px] bg-amber-300 px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-950 shadow-[0_20px_40px_rgba(245,158,11,0.28)] transition hover:-translate-y-0.5"
                >
                  Start Your Kingdom
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-[22px] border border-white/10 bg-white/6 px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-stone-100 transition hover:bg-white/10"
                >
                  See How It Works
                </a>
              </div>
            </div>

            <div className="relative rounded-[32px] border border-white/10 bg-black/28 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="absolute left-6 top-6 rounded-full border border-amber-200/20 bg-black/35 px-3 py-2 text-[0.54rem] uppercase tracking-[0.22em] text-amber-100">
                Slowly rotating live voxel island
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-10 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-sm">
                  <p className="text-[0.6rem] uppercase tracking-[0.24em] text-emerald-200/70">Hero</p>
                  <p className="mt-2 text-sm text-stone-100">Recruit → Legend</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-sm">
                  <p className="text-[0.6rem] uppercase tracking-[0.24em] text-cyan-200/70">Monsters</p>
                  <p className="mt-2 text-sm text-stone-100">Bills with actual personalities</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-sm">
                  <p className="text-[0.6rem] uppercase tracking-[0.24em] text-amber-200/70">Goal</p>
                  <p className="mt-2 text-sm text-stone-100">Build a screenshot-worthy kingdom</p>
                </div>
              </div>
              <div className="h-[420px] sm:h-[480px]">
                <LandingHeroScene />
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[32px] border border-white/10 bg-slate-950/82 p-5 shadow-[0_26px_80px_rgba(0,0,0,0.26)] sm:p-6">
            <p className="font-['Press_Start_2P'] text-[0.6rem] uppercase tracking-[0.32em] text-cyan-200">
              How It Works
            </p>
            <h2 className="mt-6 font-['Press_Start_2P'] text-xl leading-[1.7] text-stone-50 sm:text-2xl">
              Budgeting becomes a tiny fantasy loop.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-stone-200/75 sm:text-base">
              The core promise is simple: every useful financial action gives you an immediate visual payoff.
              You are never staring at a spreadsheet with no reward.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.index}
                className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(0,0,0,0.22))] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.22)]"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <p className="text-[0.65rem] uppercase tracking-[0.28em] text-amber-200/80">{step.index}</p>
                <h3 className="mt-5 font-['Press_Start_2P'] text-[0.95rem] leading-[1.8] text-stone-50">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-stone-200/75">{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
          <div className="rounded-[32px] border border-white/10 bg-slate-950/82 p-5 shadow-[0_26px_80px_rgba(0,0,0,0.26)] sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-['Press_Start_2P'] text-[0.58rem] uppercase tracking-[0.3em] text-emerald-200">
                  Screenshot Showcase
                </p>
                <h2 className="mt-4 font-['Press_Start_2P'] text-xl leading-[1.7] text-stone-50 sm:text-2xl">
                  From humble beginnings to legendary kingdoms
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-stone-200/70">
                The island grows month by month, which means the screenshot keeps getting better the longer you stay disciplined.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {showcases.map((card) => (
                <article key={card.title} className="overflow-hidden rounded-[28px] border border-white/10 bg-black/22">
                  <div className={`relative h-56 overflow-hidden bg-gradient-to-br ${card.palette}`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
                    <div className="absolute left-4 right-4 top-4 flex items-center justify-between text-[0.62rem] uppercase tracking-[0.24em] text-stone-100/75">
                      <span>{card.label}</span>
                      <span>{card.saved}</span>
                    </div>
                    <div className="absolute bottom-5 left-1/2 h-24 w-[78%] -translate-x-1/2 rounded-[24px] bg-[linear-gradient(180deg,rgba(34,197,94,0.95),rgba(22,163,74,0.95))] shadow-[0_18px_30px_rgba(0,0,0,0.28)]">
                      <div className="absolute inset-x-0 bottom-0 h-6 rounded-b-[24px] bg-[#4b3621]" />
                      <div className="absolute left-[14%] top-[-8%] h-10 w-10 rounded-[12px]" style={{ backgroundColor: card.accent }} />
                      <div className="absolute left-[42%] top-[-18%] h-14 w-14 rounded-[16px] bg-stone-100/85" />
                      <div className="absolute right-[16%] top-[-4%] h-9 w-9 rounded-[12px] bg-black/55" />
                      <div className="absolute left-[12%] top-[52%] h-4 w-4 rounded-[6px] bg-amber-300" />
                      <div className="absolute right-[18%] top-[48%] h-5 w-5 rounded-[7px]" style={{ backgroundColor: card.accent }} />
                    </div>
                  </div>
                  <div className="px-5 py-4">
                    <p className="font-['Press_Start_2P'] text-[0.64rem] uppercase tracking-[0.22em] text-stone-50/80">
                      {card.title}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(251,191,36,0.16),rgba(15,23,42,0.86))] p-5 shadow-[0_26px_80px_rgba(0,0,0,0.26)] sm:p-6">
              <p className="font-['Press_Start_2P'] text-[0.58rem] uppercase tracking-[0.3em] text-amber-200">
                Share Tease
              </p>
              <h2 className="mt-5 font-['Press_Start_2P'] text-xl leading-[1.7] text-stone-50 sm:text-2xl">
                Flex your kingdom on social.
              </h2>
              <div className="mt-6 rounded-[28px] border border-white/10 bg-black/35 p-4">
                <div className="flex items-center justify-between text-sm text-stone-100">
                  <div>
                    <p className="font-semibold">yourkingdom.eth</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-100/55">Kingdom Builder</p>
                  </div>
                  <div className="rounded-full border border-emerald-300/20 bg-emerald-400/12 px-3 py-2 text-[0.62rem] uppercase tracking-[0.22em] text-emerald-100">
                    Join 0 kingdom builders
                  </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-[24px] border border-white/10 bg-[#102218]">
                  <div className="h-40 bg-[linear-gradient(180deg,#173a26_0%,#0f1e15_100%)]">
                    <div className="mx-auto mt-6 h-24 w-[72%] rounded-[22px] bg-[linear-gradient(180deg,#4ade80_0%,#22c55e_100%)] shadow-[0_18px_30px_rgba(0,0,0,0.24)]" />
                  </div>
                  <div className="border-t border-white/10 px-4 py-3 text-sm leading-7 text-stone-100/80">
                    Month 8. Castle stage unlocked. Rent monster deleted. Treasury clean.
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[32px] border border-white/10 bg-slate-950/82 p-5 shadow-[0_26px_80px_rgba(0,0,0,0.26)] sm:p-6">
              <p className="font-['Press_Start_2P'] text-[0.58rem] uppercase tracking-[0.3em] text-cyan-200">
                Privacy
              </p>
              <p className="mt-5 text-base leading-8 text-stone-200/78">
                No bank access required. No Plaid. No account linking. This MVP keeps your budget in local
                browser storage and turns it into a game layer you control.
              </p>
            </section>
          </div>
        </section>

        <footer className="flex flex-col gap-4 rounded-[32px] border border-white/10 bg-slate-950/80 px-5 py-5 text-sm text-stone-200/72 shadow-[0_26px_80px_rgba(0,0,0,0.24)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>Built with steel by Skyframe Innovations.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              className="underline decoration-white/20 underline-offset-4"
              href="https://github.com/b33fydan/payday-kingdom-hackathon"
            >
              GitHub
            </a>
            <Link className="underline decoration-white/20 underline-offset-4" to="/kingdom?onboarding=1">
              Start Your Kingdom
            </Link>
            <span>No bank access required. Your data stays in your browser.</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
