import React, { useState, useEffect, useRef } from 'react'
import data from '../data'

function SkillChips({items, color='indigo'}){
  const bg = color === 'indigo' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-800'
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(item => (
        <span key={item} className={`inline-flex items-center px-3 py-1 rounded-full ${bg} text-sm font-medium`}>{item}</span>
      ))}
    </div>
  )
}

function Carousel({slides, interval = 10000, renderSlide}){
  const [index, setIndex] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    if (!slides || slides.length === 0) return
    const id = setInterval(() => {
      if (!paused.current) setIndex(i => (i + 1) % slides.length)
    }, interval)
    return () => clearInterval(id)
  }, [slides, interval])

  function prev(){ setIndex(i => (i - 1 + slides.length) % slides.length) }
  function next(){ setIndex(i => (i + 1) % slides.length) }

  return (
    <div className="relative" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
      <div className="min-h-[64px]">
        {slides.map((s, i) => (
          <div key={i} className={`transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {renderSlide(s, i)}
          </div>
        ))}
      </div>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
        <button aria-label="Previous" onClick={prev} className="p-1 bg-white/80 rounded-full shadow">‹</button>
        <button aria-label="Next" onClick={next} className="p-1 bg-white/80 rounded-full shadow">›</button>
      </div>
      <div className="flex gap-2 justify-center mt-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full ${i===index? 'bg-gray-800':'bg-gray-300'}`} aria-label={`Go to slide ${i+1}`}></button>
        ))}
      </div>
    </div>
  )
}

export default function Badges(){
  const skills = data.skills
  const leadership = data.leadership
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-semibold mb-3">Skills</h4>
        {Array.isArray(skills) ? (
          <SkillChips items={skills} />
        ) : (
          <Carousel
            slides={Object.entries(skills)}
            interval={10000}
            renderSlide={([cat, items]) => (
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">{cat}</div>
                <SkillChips items={items} />
              </div>
            )}
          />
        )}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-semibold mb-3">Leadership</h4>
        <Carousel
          slides={(() => {
            const chunk = []
            for (let i=0;i<leadership.length;i+=2) chunk.push(leadership.slice(i,i+2))
            return chunk
          })()}
          interval={10000}
          renderSlide={(items) => (
            <div className="flex flex-wrap gap-2">
              {items.map(item => (
                <span key={item} className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">{item}</span>
              ))}
            </div>
          )}
        />
      </div>
    </div>
  )
}
