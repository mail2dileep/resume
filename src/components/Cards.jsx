import React, { useState, useEffect, useRef } from 'react'
import data from '../data'

function renderContent(content){
  if (Array.isArray(content)){
    return (
      <ul className="mt-3 text-base text-gray-700 list-disc pl-5 space-y-2 leading-relaxed">
        {content.map((item, idx) => (
          <li key={idx} className="break-words">{item}</li>
        ))}
      </ul>
    )
  }
  return <p className="mt-3 text-base text-gray-700 leading-relaxed">{content}</p>
}

function Card({title, children, accentClass='', accentIcon=null}){
  return (
    <div className={`bg-white rounded-lg shadow p-6 flex-1 transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl border border-transparent hover:border-gray-100`}>
      <div className="flex items-start gap-3">
        {accentClass && (
          <div className={`${accentClass} shrink-0 w-10 h-10 rounded-full flex items-center justify-center`}>{accentIcon}</div>
        )}
        <h3 className="font-semibold text-xl">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  )
}

function SkillChips({items, compact=false}){
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {items.map(it => (
        <span key={it} className={compact ? "inline-flex items-center px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium" : "inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-base font-medium"}>{it}</span>
      ))}
    </div>
  )
}

function Carousel({slides, visibleCount=3, interval=5000, renderSlide}){
  const [index, setIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const paused = useRef(false)
  const containerRef = useRef(null)

  // create clones at end to allow smooth infinite scroll
  const extended = [...slides, ...slides.slice(0, visibleCount)]

  useEffect(() => {
    if (!slides || slides.length === 0) return
    const id = setInterval(() => {
      if (!paused.current) setIndex(i => i + 1)
    }, interval)
    return () => clearInterval(id)
  }, [slides, interval, visibleCount])

  // reset when we've advanced past original slides
  useEffect(() => {
    if (index === slides.length) {
      // after transition ends, snap back to 0
      const t = setTimeout(() => {
        setIsTransitioning(false)
        setIndex(0)
        // force reflow then re-enable transition
        requestAnimationFrame(() => requestAnimationFrame(() => setIsTransitioning(true)))
      }, 300) // match CSS transition duration
      return () => clearTimeout(t)
    }
  }, [index, slides.length])

  const percent = 100 / visibleCount
  const translate = -index * percent

  function prev(){ setIndex(i => (i - 1 + slides.length) % slides.length) }
  function next(){ setIndex(i => i + 1) }

  return (
    <div className="relative" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
      <div className="overflow-hidden">
        <div ref={containerRef} className="flex transition-transform duration-300" style={{transform: `translateX(${translate}%)`, width: `${(extended.length * 100) / visibleCount}%`, transitionProperty: isTransitioning ? 'transform' : 'none'}}>
          {extended.map((s, i) => (
            <div key={i} style={{flex: `0 0 ${percent}%`}} className="px-2">
              {renderSlide(s, i % slides.length)}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden sm:block pointer-events-auto">
          <button aria-label="Previous" onClick={prev} className="absolute -left-8 top-1/2 transform -translate-y-1/2 p-4 bg-transparent text-gray-600 rounded-full hover:text-gray-800 text-3xl">‹</button>
          <button aria-label="Next" onClick={next} className="absolute -right-8 top-1/2 transform -translate-y-1/2 p-4 bg-transparent text-gray-600 rounded-full hover:text-gray-800 text-3xl">›</button>
        </div>
      </div>

      <div className="flex gap-2 justify-center mt-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full ${i=== (index % slides.length) ? 'bg-gray-800':'bg-gray-300'}`} aria-label={`Go to ${i+1}`} />
        ))}
      </div>
    </div>
  )
}

export default function Cards(){
  const slides = [
    { type: 'career', title: 'Career Snapshot', content: data.careerSnapshot },
    { type: 'ai', title: 'AI Innovations', content: data.aiInnovations },
    { type: 'skills', title: 'Skills Snapshot', content: data.skills },
    { type: 'leadership', title: 'Leadership Snapshot', content: data.leadershipText }
  ]
  
  function getAccent(type){
    switch(type){
      case 'career':
        return { cls: 'bg-blue-100 text-blue-700', icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 11V7m0 4v6m0-6H8m4 0h4M6 7h12v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7z"/></svg>
        )}
      case 'ai':
        return { cls: 'bg-yellow-100 text-yellow-700', icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/></svg>
        )}
      case 'skills':
        return { cls: 'bg-indigo-100 text-indigo-700', icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
        )}
      case 'leadership':
        return { cls: 'bg-green-100 text-green-700', icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.09 6.26L20 9l-5 3.64L16.18 20 12 16.9 7.82 20 9 12.64 4 9l5.91-.74L12 2z"/></svg>
        )}
      default:
        return { cls: 'bg-gray-100 text-gray-700', icon: null }
    }
  }
  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-center">Overview</h3>
        <Carousel
          slides={slides}
          interval={5000}
          renderSlide={(slide) => {
            const accent = getAccent(slide.type)
            return (
              <div className="p-2">
                <Card title={slide.title} accentClass={accent.cls} accentIcon={accent.icon}>
                  {slide.type === 'skills' ? (
                    <div className="space-y-3">
                      {Object.entries(slide.content).map(([cat, items]) => (
                        <div key={cat}>
                          <div className="text-base font-medium text-gray-600">{cat}</div>
                          <SkillChips items={items} compact />
                        </div>
                      ))}
                    </div>
                  ) : (
                    renderContent(slide.content)
                  )}
                </Card>
              </div>
            )
          }}
        />
      </div>
    </div>
  )
}
