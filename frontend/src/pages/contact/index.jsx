import { useState } from "react"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", form)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="max-w-lg mx-auto px-4 sm:px-6 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
        <p className="text-gray-500">We'll get back to you shortly.</p>
      </section>
    )
  }

  return (
    <section className="max-w-lg mx-auto px-4 sm:px-6 py-24">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Contact</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">Name</label>
          <input
            type="text"
            required
            className="border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">Email</label>
          <input
            type="email"
            required
            className="border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">Message</label>
          <textarea
            required
            rows={5}
            className="border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors resize-none"
            placeholder="Your message..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white py-3 text-sm font-semibold tracking-wider uppercase hover:bg-gray-800 transition-colors mt-2"
        >
          Send Message
        </button>
      </form>
    </section>
  )
}