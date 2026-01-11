export default function UseCases() {
  return (
    <section id="usecases" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-extrabold tracking-tight">Works for any business</h2>
        <p className="mt-3 text-slate-600">If customers message you on WhatsApp, KueBot can help.</p>
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          ["Retail stores", "Help customers find the right product and order fast."],
          ["Services", "Collect requests, details, and bookings in chat."],
          ["Home businesses", "Turn WhatsApp customers into structured orders."],
          ["Restaurants & cafés", "Take dine-in and at-home orders through the same WhatsApp agent."],
        ].map(([title, desc]) => (
          <div key={title} className="rounded-3xl bg-white/75 glass ring-soft shadow-soft p-6">
            <div className="font-bold">{title}</div>
            <p className="mt-2 text-sm text-slate-600">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}