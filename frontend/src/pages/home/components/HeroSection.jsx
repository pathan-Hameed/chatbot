import { Link } from "react-router-dom"
import { APP_NAME } from "@lib/constants"

export default function HeroSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">
        Welcome to {APP_NAME}
      </h1>
      <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 font-light leading-relaxed">
        A production-ready React boilerplate with routing, axios, auth context, and responsive layout built in.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          to="/about"
          className="bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors"
        >
          Get Started
        </Link>
        <Link
          to="/contact"
          className="border border-gray-300 text-gray-700 px-8 py-3 font-medium hover:border-gray-900 hover:text-gray-900 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </section>
  )
}