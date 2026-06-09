import React, { useState, useEffect, useRef } from 'react'
import data from '../data'

function renderContent(content){
  if (Array.isArray(content)){
    return (
      <ul className="mt-3 text-sm text-gray-700 list-disc pl-5 space-y-2 leading-relaxed">
        {content.map((item, idx) => (
          <li key={idx} className="break-words">{item}</li>
        ))}
      </ul>
    )
  }
  return <p className="mt-3 text-sm text-gray-700 leading-relaxed">{content}</p>
}

function Card({title, children, accentClass=''}){
  return (
    <div className={`bg-white rounded-lg shadow p-6 flex-1 transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl border border-transparent hover:border-gray-100`}>
      <div className="flex items-start gap-3">
        {accentClass && <div className={`${accentClass} shrink-0 w-10 h-10 rounded-full`} />}
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  )
}

function SkillChips({items}){
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {items.map(it => (
        <span key={it} className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">{it}</span>
      ))}
    </div>
  )
}

function Carousel({slides, interval=10000, renderSlide}){
  const [index, setIndex] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    if (!slides || slides.length === 0) return
    const id = setInterval(() => { if(!paused.current) setIndex(i => (i + 1) % slides.length) }, interval)
    return () => clearInterval(id)
  }, [slides, interval])

  return (
    <div className="relative" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
      <div className="min-h-[140px]">
        {slides.map((s, i) => (
          <div key={i} className={`transition-opacity duration-700 ${i===index? 'opacity-100':'opacity-0 pointer-events-none'}`}>
            {renderSlide(s, i)}
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-center mt-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full ${i===index? 'bg-gray-800':'bg-gray-300'}`} aria-label={`Go to ${i+1}`} />
        ))}
      </div>
    </div>
  )
}

export default function Cards(){
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Career Snapshot">
          {renderContent(data.careerSnapshot)}
        </Card>
        <Card title="AI Innovations">
          {renderContent(data.aiInnovations)}
        </Card>
        <Card title="Leadership Snapshot">
          {renderContent(data.leadershipText)}
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Skills & Leadership</h3>
        <Carousel
          slides={[
            { type: 'skills' },
            { type: 'leadership' }
          ]}
          interval={10000}
          renderSlide={(slide) => (
            slide.type === 'skills' ? (
              <Card title="Skills">
                <div className="space-y-4">
                  {Object.entries(data.skills).map(([cat, items]) => (
                    <div key={cat}>
                      <div className="text-sm font-medium text-gray-600">{cat}</div>
                      <SkillChips items={items} />
                    </div>
                  ))}
                </div>
              </Card>
            ) : (
              <Card title="Leadership">
                {renderContent(data.leadership)}
              </Card>
            )
          )}
        />
      </div>
    </div>
  )
}
