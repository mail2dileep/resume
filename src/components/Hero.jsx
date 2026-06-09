import React from 'react'
import data from '../data'

export default function Hero(){
  const bg = data.heroBackground || ''
  // Render the hero image as an <img> so the full image height is displayed (object-contain)
  // Use full-bleed image (remove rounded container) and no fixed viewport height so image shows fully.
  return (
    <section className="w-full p-0 bg-transparent">
      {bg && (
        <picture>
          <source media="(max-width: 767px)" srcSet="/Resume_Image_mobile.png" />
          <img src={bg} alt="hero" className="w-full h-auto object-contain block" />
        </picture>
      )}
    </section>
  )
}
