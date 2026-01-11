export default function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-extrabold tracking-tight">FAQ</h2>
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        {[
          ["Do customers need an app?", "No. Customers stay on WhatsApp. KueBot chats with them there."],
          ["What do I need to start?", "Just your WhatsApp number and your catalog/menu. We set KueBot up."],
          ["Do I still control the order?", "Yes. KueBot collects details and suggests options. You confirm on the dashboard."],
          ["Can KueBot suggest products?", "Yes. KueBot can recommend items from your catalog based on what the customer needs."],
        ].map(([q, a]) => (
          <details key={q} className="rounded-3xl bg-white/75 glass ring-soft shadow-soft p-6">
            <summary className="cursor-pointer font-bold">{q}</summary>
            <p className="mt-3 text-sm text-slate-600">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}