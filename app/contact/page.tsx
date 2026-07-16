export default function ContactPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 md:px-12 py-16">
      <div className="max-w-2xl">
        <p className="text-sky-500 font-bold uppercase tracking-wide">
          Get in touch
        </p>

        <h1 className="text-4xl md:text-5xl font-black mt-3">
          Contact Sole Hub
        </h1>

        <p className="text-gray-600 mt-5 leading-8">
          Need help choosing a product, checking your order or understanding
          delivery? Contact Sole Hub using any of the options below.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <a
          href="https://instagram.com/solehub_store"
          target="_blank"
          rel="noreferrer"
          className="border border-gray-200 rounded-3xl p-7 hover:shadow-lg transition"
        >
          <p className="text-sm text-gray-500">Instagram</p>
          <h2 className="text-xl font-black mt-2">
            @solehub_store
          </h2>
          <p className="text-gray-600 mt-3">
            Send us a direct message for product and order assistance.
          </p>
        </a>

        <a
          href="mailto:solehubstore@gmail.com"
          className="border border-gray-200 rounded-3xl p-7 hover:shadow-lg transition"
        >
          <p className="text-sm text-gray-500">Email</p>
          <h2 className="text-xl font-black mt-2 break-all">
            solehubstore@gmail.com
          </h2>
          <p className="text-gray-600 mt-3">
            Email us about orders, delivery, returns or general questions.
          </p>
        </a>

        <a
  href="https://wa.me/26775489442"
  target="_blank"
  rel="noreferrer"
  className="border border-gray-200 rounded-3xl p-7 hover:shadow-lg transition"
>
  <p className="text-sm text-gray-500">WhatsApp</p>

  <h2 className="text-xl font-black mt-2">
    Message Sole Hub
  </h2>

  <p className="text-gray-600 mt-3">
    Chat with us on WhatsApp for product, order and delivery assistance.
  </p>
</a>
      </div>

      <div className="bg-gray-50 rounded-3xl p-8 mt-10">
        <h2 className="text-2xl font-black">
          Before contacting us
        </h2>

        <p className="text-gray-600 mt-3 leading-7">
          For order questions, include your order number, full name and a short
          explanation of what you need help with. Orders sourced from China
          normally take approximately 10–12 business days to arrive in
          Botswana.
        </p>
      </div>
    </main>
  );
}