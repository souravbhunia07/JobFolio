import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import React from 'react'
import { Link } from 'react-router-dom'
import companies from "../data/companies.json"

const LandingPage = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      <section className='text-center'>
        <h1 className='flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4'>
          Find your Dream Job {" "}
          <span className='flex items-center gap-2 sm:gap-6'>
            and get Hired {" "}
          </span>
        </h1>

        <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl'>
          Explore thousands of job listings or find the perfect candidate for your team.
        </p>
      </section>
      <div className='flex gap-6 justify-center'>
        {/* buttons */}
        <Link to='/jobs'>
          <Button variant="blue" size="xl">Find Jobs</Button>
        </Link>
        <Link to='/post-job'>
          <Button size="xl" variant="destructive">Post a Job</Button>
        </Link>
      </div>

      {/* carousal */}
      <Carousel
        className="w-full py-10"
      >
        <CarouselContent>
          {companies}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>

      {/* banner */}

      <section>
        {/* cards */}
      </section>

      {/* Accordion */}
    </main>
  )
}

export default LandingPage