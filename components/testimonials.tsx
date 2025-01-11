'use client'

import * as React from 'react'
import { Star } from 'lucide-react'
import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Autoplay from "embla-carousel-autoplay"
import { useTranslations } from 'next-intl'

const testimonials = [
  {
    nameKey: 'testimonials.0.name',
    roleKey: 'testimonials.0.role',
    image: '/placeholder.svg?height=64&width=64',
    contentKey: 'testimonials.0.content',
    rating: 4
  },
  {
    nameKey: 'testimonials.1.name',
    roleKey: 'testimonials.1.role',
    image: '/placeholder.svg?height=64&width=64',
    contentKey: 'testimonials.1.content',
    rating: 4
  },
  {
    nameKey: 'testimonials.2.name',
    roleKey: 'testimonials.2.role',
    image: '/placeholder.svg?height=64&width=64',
    contentKey: 'testimonials.2.content',
    rating: 4.5
  },
  {
    nameKey: 'testimonials.3.name',
    roleKey: 'testimonials.3.role',
    image: '/placeholder.svg?height=64&width=64',
    contentKey: 'testimonials.3.content',
    rating: 5
  }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : star - rating <= 0.5
              ? 'fill-yellow-400/50 text-yellow-400'
              : 'fill-none text-yellow-400/30'
          }`}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const t = useTranslations('Index.TestimonialsSection')
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <section className="bg-[#1a1a1a] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          {t('title')}
        </h2>
        
        <div className="flex justify-center mb-4">
          <StarRating rating={4.5} />
        </div>
        
        <p className="text-gray-300 mb-12">
          {t('averageRating')}
        </p>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="bg-black border-gray-600 p-6 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} alt={t(testimonial.nameKey)} />
                      <AvatarFallback className="text-base">{t(testimonial.nameKey).split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <h3 className="font-semibold text-white">{t(testimonial.nameKey)}</h3>
                      <p className="text-sm text-gray-400">{t(testimonial.roleKey)}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-tight flex-grow text-justify">
                    "{t(testimonial.contentKey)}"
                  </p>
                  <div className="mt-4">
                    <StarRating rating={testimonial.rating} />
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 bg-white/5 hover:bg-white/10 border-0 text-white" />
          <CarouselNext className="hidden md:flex -right-4 bg-white/5 hover:bg-white/10 border-0 text-white" />
        </Carousel>
      </div>
    </section>
  )
}
