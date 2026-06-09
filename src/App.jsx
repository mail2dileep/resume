import React from 'react'
import Hero from './components/Hero'
import Cards from './components/Cards'
import data from './data'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="container mx-auto p-6">
          <nav className="flex justify-end gap-4">
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
          </nav>
      </header>
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
