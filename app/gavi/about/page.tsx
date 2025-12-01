import React from 'react'
import TestimonialsAndHowToOrder from '../comps/TestimonialsAndHowToOrder'
import FindGaviSection from '../comps/FindGaviSection'
import AboutSection from '../comps/AboutSection'
function page() {
  return (
    <>
<section
  className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center text-center px-6 py-20
    bg-[url('/gavism.png')] md:bg-[url('/gavibg.png')]"
>
          <div className="relative z-10 text-black max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
Freshly Baked. Warmly Served. Lovingly Nigerian.          </h1>
          <p className="text-gray-700 text-sm mb-8">
Welcome to GAVI – your neighborhood bakery dedicated to quality, freshness, and flavor.          </p>
          <div className="flex font-bold justify-center gap-4">
            
          </div>
        </div>
      </section>
      <AboutSection />
      <TestimonialsAndHowToOrder />
      <FindGaviSection />
    
    </>
  )
}

export default page