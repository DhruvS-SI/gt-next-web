import { buttonStyles } from "@/lib/variants/button";

export default function Home() {
  return (
    <main className="min-h-screen p-24 bg-slate-50">
      <h1 className="text-4xl font-bold text-sky-600 mb-8">Gujarat Titans</h1>

      <div className="flex flex-col gap-6">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Gradient Buttons (via Tailwind Variants)</h2>
          <div className="flex gap-4 flex-wrap">
            <button className={buttonStyles({ intent: "gradient1", size: "lg" })}>
              Primary Gradient
            </button>
            <button className={buttonStyles({ intent: "gradient2", size: "lg" })}>
              Secondary Gradient
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Standard Variants</h2>
          <div className="flex gap-4 flex-wrap">
            <button className={buttonStyles({ intent: "primary" })}>
              Primary
            </button>
            <button className={buttonStyles({ intent: "secondary" })}>
              Secondary
            </button>
          </div>
        </section>
      </div>

      <p className="mt-12 text-sm text-slate-500 italic">
        Testing Tailwind v4 + Tailwind Variants setup
      </p>
    </main>
  );
}

