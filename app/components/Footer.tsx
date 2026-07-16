export default function Footer() {
  return (
    <footer className="bg-black text-white px-8 md:px-12 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-3xl font-black">SOLE <span className="text-sky-400">HUB</span></h2>
          <p className="text-gray-400 mt-3">Premium sneakers for Botswana and beyond.</p>
        </div>
        <div>
          <h3 className="font-bold mb-3">Store</h3>
          <p className="text-gray-400">Shop sneakers, checkout, and track your orders.</p>
        </div>
        <div>
          <h3 className="font-bold mb-3">Contact</h3>
          <p className="text-gray-400">support@solehub.com</p>
          <p className="text-gray-400">+267 75 489 442</p>
        </div>
      </div>
    </footer>
  );
}
