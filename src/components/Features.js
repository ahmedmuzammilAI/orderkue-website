export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-extrabold tracking-tight">Everything stays simple for the business</h2>
        <p className="mt-3 text-slate-600">
          You don't need to learn a complicated tool. You get a clean Live Orders Dashboard and KueBot does the chat work.
        </p>
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-3xl bg-white/75 glass ring-soft shadow-soft p-6">
          <div className="text-lg font-bold">Live Orders Dashboard</div>
          <ul className="mt-3 text-sm text-slate-600 space-y-2">
            <li>All new orders/requests in one place</li>
            <li>Accept / reject in one tap</li>
            <li>Clear customer details and notes</li>
            <li>Status tracking from start to finish</li>
          </ul>
        </div>

        <div className="rounded-3xl bg-white/75 glass ring-soft shadow-soft p-6">
          <div className="text-lg font-bold">Easy setup</div>
          <ul className="mt-3 text-sm text-slate-600 space-y-2">
            <li>Share your WhatsApp number</li>
            <li>Share your product list/menu/catalog</li>
            <li>We set KueBot up for your business</li>
            <li>Edit anytime</li>
          </ul>
        </div>

        <div className="rounded-3xl bg-white/75 glass ring-soft shadow-soft p-6">
          <div className="text-lg font-bold">Delivery / Pickup (optional)</div>
          <ul className="mt-3 text-sm text-slate-600 space-y-2">
            <li>Delivery or pickup supported</li>
            <li>Address + notes collected by KueBot</li>
            <li>Simple customer updates</li>
            <li>No extra customer apps</li>
          </ul>
        </div>
      </div>
    </section>
  );
}