import React from 'react'
import Hero from './components/Hero'
import Cards from './components/Cards'
import data from './data'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="container mx-auto p-6">
      </header>
      <main className="container mx-auto px-6 pb-12">
        <Hero />
        <div className="container mx-auto px-6 mt-6 flex justify-center">
          <div className="flex flex-wrap gap-3">
            <a href={data.resume} download className="px-4 py-2 bg-white text-indigo-700 rounded-md font-semibold">Download Resume</a>
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="px-4 py-2 border border-gray-300 rounded-md">LinkedIn</a>
            <a href={`mailto:${data.email}`} className="px-4 py-2 border border-gray-300 rounded-md">Contact Me</a>
          </div>
        </div>
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
