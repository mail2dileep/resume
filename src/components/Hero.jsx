import React from 'react'
import data from '../data'

export default function Hero(){
  const bg = data.heroBackground || ''
  // Render the hero image as an <img> so the full image height is displayed (object-contain)
  // Use full-bleed image (remove rounded container) and no fixed viewport height so image shows fully.
  return (
    <section className="w-full p-0 bg-transparent">
      {bg && (
        <>
          {/* Mobile: full-bleed image */}
          <div className="block md:hidden -mx-6">
            {/* use viewport-width on mobile to ensure full-bleed */}
            <img src="/Resume_Image_mobile.png" alt="hero" className="w-screen h-auto object-contain block" />
          </div>
          {/* Desktop: constrained to container so it aligns with carousel (no full-bleed) */}
          <div className="hidden md:block">
            <div className="container mx-auto px-6">
              <img src={bg || '/Resume_Image.png'} alt="hero" className="w-full h-auto object-contain block mx-auto" />
            </div>
          </div>
        </>
      )}
    </section>
  )
}
