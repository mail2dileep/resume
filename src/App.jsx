import React, { useState } from 'react'
import Hero from './components/Hero'
import Cards from './components/Cards'
import data from './data'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="w-full backdrop-blur-md" style={{backgroundColor: '#0b193a'}}>
        <div className="container mx-auto px-6 py-3 relative">
          <div className="flex justify-end items-center">
            {/* Desktop CTAs */}
            <div className="hidden md:inline-flex items-center gap-3 rounded-full px-3 py-2 shadow-lg">
              <a href={`mailto:${data.email}`} className="text-sm px-3 py-2 rounded-md bg-white text-slate-900 hover:bg-slate-100">Contact Me</a>
              <a href={data.resume} download className="text-sm px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 pr-6">Download CV</a>
            </div>

            {/* Mobile hamburger (toggles between hamburger and close) */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Menu"
              className="md:hidden ml-3 p-2 rounded-md bg-slate-900/60 text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

      </header>

      {/* Mobile left-to-right drawer placed outside header to avoid clipping */}
      <div className={`md:hidden fixed left-0 top-0 h-full w-full bg-white z-50 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div />
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="p-2 rounded-md text-slate-700">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="px-4 py-4">
          <a href={data.resume} download onClick={() => setMenuOpen(false)} className="block text-slate-900 px-3 py-3 rounded-md hover:bg-slate-100">Download CV</a>
          <a href={`mailto:${data.email}`} onClick={() => setMenuOpen(false)} className="block text-slate-900 px-3 py-3 rounded-md hover:bg-slate-100">Contact Me</a>
        </nav>
      </div>
      <main className="container mx-auto px-6 pb-12">
        <Hero />
        <section className="mt-10">
          <Cards />
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="container mx-auto p-6 text-sm text-center text-gray-600"></div>
      </footer>
    </div>
  )
}
