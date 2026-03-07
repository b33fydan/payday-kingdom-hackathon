import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import OnboardingFlow from '../components/ui/OnboardingFlow';
import SceneViewport from '../components/scene/SceneViewport';
import KingdomPanel from '../components/ui/KingdomPanel';
import { useKingdomStore } from '../store/kingdomStore';

export default function KingdomPage() {
  const reopenOnboarding = useKingdomStore((state) => state.reopenOnboarding);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('onboarding') !== '1') {
      return;
    }

    reopenOnboarding();
    setSearchParams({}, { replace: true });
  }, [reopenOnboarding, searchParams, setSearchParams]);

  return (
    <main
      className="min-h-screen bg-transparent px-3 py-3 text-stone-50 sm:px-4 sm:py-4 md:px-6 md:py-6"
      style={{
        paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
      }}
    >
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-7xl flex-col gap-4 lg:min-h-[calc(100vh-3rem)] lg:flex-row">
        <section className="order-2 lg:order-1 lg:w-2/5">
          <KingdomPanel />
        </section>
        <section className="order-1 lg:order-2 lg:w-3/5">
          <SceneViewport />
        </section>
      </div>
      <OnboardingFlow />
    </main>
  );
}
