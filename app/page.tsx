import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BKTK INTL – Page en construction",
  description:
    "BKTK INTERNATIONAL, grossiste alimentaire indien, népalais et asiatique – Page en construction.",
};

export default function BktkIntlUnderConstructionPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4">
      <section className="max-w-xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          BKTK INTL
        </h1>

        <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500">
          Grossiste alimentaire – Import · Export · Distribution
        </p>

        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-10 shadow-sm">
          <p className="text-xl font-medium text-slate-800">
            Page en construction
          </p>

          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            Nous préparons actuellement cette section pour présenter nos
            activités de grossiste spécialisé dans les produits indiens,
            népalais et asiatiques, ainsi que nos solutions de distribution
            pour les professionnels de la restauration.
          </p>

          <div className="mt-6 text-sm text-slate-700">
            <p className="font-semibold">Nos entrepôts :</p>
            <ul className="mt-2 space-y-1">
              <li>• La Courneuve – 1 Avenue Louis Blériot, 93120</li>
              <li>...</li>
            </ul>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            BKTK INTERNATIONAL – SAS, commerce de gros alimentaire.
          </p>
        </div>

        <p className="mt-8 text-xs text-slate-500">
          Revenez bientôt pour découvrir notre catalogue, nos marques et nos
          services B2B.
        </p>
      </section>
    </main>
  );
}
