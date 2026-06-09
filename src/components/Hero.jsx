import React from 'react'
import data from '../data'

export default function Hero(){
  const bg = data.heroBackground || ''
  const style = bg ? {backgroundImage: `linear-gradient(rgba(79,70,229,0.85), rgba(59,130,246,0.85)), url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'} : {}
  return (
    <section className="rounded-xl p-8 text-white" style={style}>
      <div className="md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold">{data.name}</h1>
          <p className="mt-2 text-lg opacity-90">{data.designation}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={data.resume} download className="px-4 py-2 bg-white text-indigo-700 rounded-md font-semibold">Download Resume</a>
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="px-4 py-2 border border-white/40 rounded-md">LinkedIn</a>
            <a href={`mailto:${data.email}`} className="px-4 py-2 border border-white/40 rounded-md">Contact Me</a>
          </div>
        </div>
        <div className="mt-6 md:mt-0 md:ml-6">
          <div className="w-40 h-40 bg-white/20 rounded-full overflow-hidden">
            <img src={data.photo} alt="avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
