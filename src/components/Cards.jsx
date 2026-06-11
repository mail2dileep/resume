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
    <div className={`h-full flex flex-col bg-white rounded-lg shadow p-6 transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl border border-transparent hover:border-gray-100`}>
      <div className="flex flex-col items-center gap-3 text-center">
        {accentClass && (
          <div className={`${accentClass} shrink-0 w-10 h-10 rounded-full flex items-center justify-center`}>{accentIcon}</div>
        )}
        <h3 className="font-semibold text-xl">{title}</h3>
      </div>
      <div className="mt-3">{children}</div>
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

function Carousel({slides, visibleRatio=2.5, interval=10000, renderSlide}){
  const [index, setIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const paused = useRef(false)
  const slideRefs = useRef([])
  const [slideHeight, setSlideHeight] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const pointerStart = useRef(null)
  const pointerDelta = useRef(0)
  const isPointerDown = useRef(false)

  // detect mobile (below Tailwind `md` breakpoint 768px)
  useEffect(() => {
    function onResize(){
      if (typeof window === 'undefined') return
      setIsMobile(window.innerWidth < 768)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const effectiveVisibleRatio = isMobile ? 1 : visibleRatio
  const clones = Math.ceil(effectiveVisibleRatio)
  const prefix = slides.slice(-clones)
  const suffix = slides.slice(0, clones)
  const extended = [...prefix, ...slides, ...suffix]

  useEffect(() => {
    if (!slides || slides.length === 0) return
    const id = setInterval(() => {
      if (!paused.current) setIndex(i => i + 1)
    }, interval)
    return () => clearInterval(id)
  }, [slides, interval])

  // measure tallest slide (original slides) and set fixed height
  useEffect(() => {
    function measure(){
      // Only consider the original slides refs (ensure length matches slides)
      const refs = (slideRefs.current || []).slice(0, slides.length).filter(Boolean)
      const heights = refs.map(el => Math.round(el.getBoundingClientRect().height || 0))
      const max = heights.length ? Math.max(...heights) : 0
      if (max && max !== slideHeight) setSlideHeight(max)
    }
    // measure after render (allow layout/images to settle)
    requestAnimationFrame(() => measure())
    const ro = new ResizeObserver(measure)
    ;(slideRefs.current || []).forEach(el => { if (el) ro.observe(el) })
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [slides, slideHeight, effectiveVisibleRatio])

  // measure container width in px for reliable translate calculations
  useEffect(() => {
    function measureContainer(){
      const w = containerRef.current ? containerRef.current.offsetWidth : 0
      if (w && w !== containerWidth) setContainerWidth(w)
    }
    measureContainer()
    const ro = new ResizeObserver(measureContainer)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', measureContainer)
    return () => { ro.disconnect(); window.removeEventListener('resize', measureContainer) }
  }, [effectiveVisibleRatio, containerWidth])

  // reset when we've advanced past original slides (handle prefix/suffix clones)
  useEffect(() => {
    const start = clones
    const end = clones + slides.length
    if (index >= end) {
      const t = setTimeout(() => {
        setIsTransitioning(false)
        setIndex(start)
        requestAnimationFrame(() => requestAnimationFrame(() => setIsTransitioning(true)))
      }, 300)
      return () => clearTimeout(t)
    }
    if (index < start) {
      const t = setTimeout(() => {
        setIsTransitioning(false)
        setIndex(end - 1)
        requestAnimationFrame(() => requestAnimationFrame(() => setIsTransitioning(true)))
      }, 300)
      return () => clearTimeout(t)
    }
  }, [index, slides.length, clones])

  const slideWidth = 100 / effectiveVisibleRatio
  const trackWidth = extended.length * slideWidth
  const translate = -(index * slideWidth)
  // pixel-based widths for more reliable transforms
  const slideWidthPx = containerWidth ? Math.round(containerWidth / effectiveVisibleRatio) : 0
  const trackWidthPx = slideWidthPx ? Math.round(extended.length * slideWidthPx) : 0
  const translatePx = slideWidthPx ? Math.round(-index * slideWidthPx) : 0

  function prev(){ setIndex(i => (i - 1 + slides.length) % slides.length) }
  function next(){ setIndex(i => i + 1) }

  function handlePointerDown(e){
    // only handle touch/pen pointers for swipe on mobile
    if (e.pointerType && e.pointerType === 'mouse') return
    isPointerDown.current = true
    pointerStart.current = e.clientX
    pointerDelta.current = 0
    paused.current = true
    try { e.currentTarget.setPointerCapture && e.currentTarget.setPointerCapture(e.pointerId) } catch(_){}
  }
  function handlePointerMove(e){
    if (!isPointerDown.current) return
    pointerDelta.current = e.clientX - (pointerStart.current || 0)
  }
  function handlePointerUp(e){
    if (!isPointerDown.current) return
    isPointerDown.current = false
    paused.current = false
    const delta = pointerDelta.current || 0
    const threshold = Math.max(40, (containerWidth || 320) * 0.08)
    if (delta > threshold) prev()
    else if (delta < -threshold) next()
    pointerStart.current = null
    pointerDelta.current = 0
    try { e.currentTarget.releasePointerCapture && e.currentTarget.releasePointerCapture(e.pointerId) } catch(_){}
  }

  return (
    <div className="relative" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
      <div className="overflow-hidden" ref={containerRef} style={{touchAction: 'pan-y'}} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}>
        <div className="flex items-stretch transition-transform duration-300" style={{transform: containerWidth ? `translateX(${translatePx}px)` : `translateX(${translate}%)`, width: containerWidth ? `${trackWidthPx}px` : `${trackWidth}%`, transitionProperty: isTransitioning ? 'transform' : 'none'}}>
          {extended.map((s, i) => {
            // map refs only for original slides region
            const origIndex = i - clones
            const isOriginal = i >= clones && i < clones + slides.length
            const renderIdx = isOriginal ? origIndex : (i - clones + slides.length) % slides.length
            return (
              <div
                key={i}
                ref={el => { if (isOriginal) slideRefs.current[origIndex] = el }}
                style={containerWidth ? {width: `${slideWidthPx}px`, height: slideHeight ? `${slideHeight}px` : 'auto'} : {width: `${slideWidth}%`, height: slideHeight ? `${slideHeight}px` : 'auto'}}
                className="px-2 h-full"
              >
                {renderSlide(s, renderIdx)}
              </div>
            )
          })}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden md:block pointer-events-auto">
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
  const productSlides = [
    { src: '/AssureAccess.png', title: 'AssureAccess' },
    { src: '/AssureMatch.png', title: 'AssureMatch' },
    { src: '/RovoWorkflow.png', title: 'RovoWorkflow' }
  ]
  return (
    <div className="space-y-6">
      <div className="w-full">
        <h3 className="text-xl font-semibold mb-4 text-center">Career Summary</h3>
        <Carousel
          slides={slides}
          visibleRatio={3}
          interval={10000}
          renderSlide={(slide) => {
            const accent = getAccent(slide.type)
            return (
              <div className="p-2 h-full">
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
                    <>
                      {renderContent(slide.content)}
                      {slide.type === 'ai' && (
                        <div className="mt-6 flex justify-center">
                          <a
                            href="#product-carousel"
                            onClick={(e) => {
                              e.preventDefault()
                              const el = document.getElementById('product-carousel')
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }}
                            aria-label="View product carousel innovations"
                            className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            View Innovations
                          </a>
                        </div>
                      )}
                    </>
                  )}
                </Card>
              </div>
            )
          }}
        />
        
        {/* Banner after the carousel */}
        <div className="mt-6 flex justify-center">
          <div className="bg-gradient-to-r from-indigo-50 to-white border-l-4 border-indigo-500 rounded-md p-4 text-center w-full">
            <p className="text-sm md:text-base text-gray-800 font-medium">Innovation Lab — AI-Powered Quality Engineering Accelerators developed to improve quality, accessibility, migration validation, and team productivity.</p>
          </div>
        </div>

        {/* Product carousel (compact image carousel) */}
        <div id="product-carousel" className="mt-6 max-w-3xl mx-auto">
          <Carousel
            slides={productSlides}
            visibleRatio={1}
            interval={10000}
            renderSlide={(item) => (
              <div className="h-full">
                <div className="bg-white rounded-lg shadow overflow-hidden border border-transparent">
                  <div className="relative">
                    <img src={item.src} alt={item.title} className="w-full h-96 md:h-[520px] object-contain block bg-white" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    <div className="absolute left-4 right-4 bottom-3">
                      <h4 className="text-white text-sm md:text-base font-semibold bg-black/40 inline-block px-2 py-1 rounded">{item.title}</h4>
                    </div>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  )
}
