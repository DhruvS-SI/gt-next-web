import FixtureStrip from "@/components/reusable/FixtureStrip";
import { FIXTURE_API_CONFIG } from "@/lib/apiConfig";

export default function Home() {
  return (
    <div className="flex-1">
      {/* Fixture Strip Section - Uses API by default */}
      <FixtureStrip config={FIXTURE_API_CONFIG.fixtures} />
    </div>
  );
}

