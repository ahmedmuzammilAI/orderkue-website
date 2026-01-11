export default function KueBot() {
  return (
    <section id="KueBot" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-3xl bg-white/75 glass ring-soft shadow-soft p-6 sm:p-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight">KueBot is your personalized AI for customers</h2>
          <p className="mt-3 text-slate-600">
            It's not just "order taking". KueBot helps customers choose the right thing — like a helpful staff member who never gets tired.
          </p>
        </div>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            ["Understands customer needs", "KueBot asks simple questions (budget, size, use-case) to guide people faster."],
            ["Suggests products/services", "Shows the best options from your catalog — with clear choices."],
            ["Answers questions instantly", "Stock, pricing, availability, timings, delivery/pickup — handled in chat."],
            ["Collects order details", "KueBot collects customer info, notes, address, and payment preference."],
            ["Keeps customers updated", "Automatic messages for confirmation and status updates."],
            ["At your customers' fingertips", "No fancy app, clear language, quick options, minimal steps — built for real businesses."],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-3xl bg-white ring-soft p-6">
              <div className="font-bold text-lg">{title}</div>
              <p className="mt-2 text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}