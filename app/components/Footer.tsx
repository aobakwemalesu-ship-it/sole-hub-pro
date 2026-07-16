export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black">
              SOLE <span className="text-sky-500">HUB</span>
            </h2>

            <p className="text-gray-400 mt-4 leading-7 max-w-md">
              Botswana’s destination for standout sneakers, trusted service,
              and effortless shopping.
            </p>

            <p className="font-bold mt-5">
              Rock it. Run it. Repeat.
            </p>
          </div>

          <div className="md:text-right">
            <h3 className="font-black text-lg mb-4">
              Stay Connected
            </h3>

            <p className="text-gray-400 leading-7">
              Follow Sole Hub for new arrivals, sneaker drops, and store
              updates.
            </p>

            <div className="mt-5 space-y-2 text-gray-300">
              <p>Instagram: @solehub</p>
              <p>Email: support@solehub.com</p>
              <p>Phone: +267 75 489 442</p>

              <a
  href="/delivery"
  className="block mt-4 text-gray-400 hover:text-white"
>
  Delivery Information
</a>

<a
  href="/returns"
  className="block text-gray-400 hover:text-white"
>
  Returns and Refunds
</a>

<a
  href="/privacy"
  className="block text-gray-400 hover:text-white"
>
  Privacy Policy
</a>

<a
  href="/terms"
  className="block text-gray-400 hover:text-white"
>
  Terms and Conditions
</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Sole Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}