export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-3xl bg-white/75 glass ring-soft shadow-soft p-6 sm:p-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight">How it works</h2>
          <p className="mt-3 text-slate-600">A simple setup process — then KueBot starts handling chats.</p>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            ["STEP 1", "Send your WhatsApp + catalog", "Share your number and product list/menu (PDF, images, CSV, or text)."],
            ["STEP 2", "We deploy KueBot", "KueBot learns your catalog + rules (timings, delivery, pickup, etc.)."],
            ["STEP 3", "You approve orders", "Customers chat → KueBot collects details → you accept/reject on the dashboard."],
          ].map(([step, title, desc]) => (
            <div key={step} className="rounded-3xl bg-white ring-soft p-6">
              <div className="text-sm font-extrabold text-slate-500">{step}</div>
              <div className="mt-2 font-bold text-lg">{title}</div>
              <p className="mt-2 text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}