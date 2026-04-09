import { Link } from "react-router-dom"
import { APP_NAME } from "@lib/constants"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-semibold text-gray-900">{APP_NAME}</p>
          <p className="text-sm text-gray-500 mt-1">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <nav className="flex gap-6 flex-wrap">
          {["About", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}