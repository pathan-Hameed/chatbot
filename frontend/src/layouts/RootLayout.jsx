import { Outlet, ScrollRestoration } from "react-router-dom"
import Navbar from "@components/shared/Navbar"
import Footer from "@components/shared/Footer"

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}