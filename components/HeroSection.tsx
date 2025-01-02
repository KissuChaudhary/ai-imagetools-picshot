'use client'

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ChevronRight, Sparkle } from 'lucide-react';
import Image from "next/image";
import Marquee from "./ui/marquee";
import AnimatedGradientText from "./ui/animated-gradient-text";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl'

const avatars = [
  {
    src: "/avatars/avatar1.jpg",
    fallback: "CN",
  },
  {
    src: "/avatars/avatar2.jpg",
    fallback: "AB",
  },
  {
    src: "/avatars/avatar3.jpg",
    fallback: "FG",
  },
  {
    src: "/avatars/avatar4.jpg",
    fallback: "PW",
  },
  {
    src: "/avatars/avatar5.jpg",
    fallback: "RC",
  },
  {
    src: "/avatars/avatar6.jpg",
    fallback: "RB",
  },
];

const initialImages = [
  "/hero-images/image1.jpeg",
  "/hero-images/image2.jpeg",
  "/hero-images/image3.jpeg",
  "/hero-images/image4.jpeg",
  "/hero-images/image5.jpeg",
  "/hero-images/image6.jpeg",
  "/hero-images/image7.jpeg",
  "/hero-images/image8.jpeg",
  "/hero-images/image9.jpeg",
  "/hero-images/image10.jpeg",
  "/hero-images/image11.jpeg",
];

const MarqueeColumn = ({
  reverse,
  duration,
  className,
}: {
  reverse: boolean;
  duration: string;
  className?: string;
}) => {
  const [images, setImages] = useState(initialImages);

  useEffect(() => {
    // Only shuffle images on the client side
    setImages([...initialImages].sort(() => Math.random() - 0.5));
  }, []);

  return (
    <Marquee
      reverse={reverse}
      pauseOnHover
      vertical
      className={cn(
        "w-full relative h-full flex flex-col justify-center items-center",
        className
      )}
      style={{ "--duration": duration } as React.CSSProperties}
    >
      {images.map((image, index) => (
        <Image
          key={`${image}-${index}`}
          src={image}
          alt="AI generated image"
          width={300}
          height={400}
          priority={index < 4}
          className="w-full h-full object-cover rounded opacity-[.25] hover:opacity-100 transition-opacity duration-300 ease-in-out"
          sizes="(max-width: 768px) 40vw, (max-width: 1200px) 50vw, 33vw"
        />
      ))}
    </Marquee>
  );
};

const HeroSection = () => {
  const t = useTranslations('Index.hero')

  return (
    <section className="w-full relative overflow-hidden min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="relative w-fit px-6 xs:px-8 sm:px-0 sm:mx-8 lg:mx-auto flex flex-col items-center justify-center space-y-4 text-center z-40 backdrop-blur-[2px]">
        <AnimatedGradientText className="bg-background backdrop-blur-0">
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-muted" />{" "}
          <span className="inline animate-gradient bg-gradient-to-r from-primary via-secondary to-primary bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
            {t('newFeature')}
          </span>
          <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedGradientText>
        <h1 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
          {t('title')} 
        </h1>

        <p className="mx-auto max-w-3xl text-gray-700 text-sm xs:text-base sm:text-lg md:text-xl mb-8">
          {t('description')}
        </p>
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center -space-x-5 sm:-space-x-4 overflow-hidden">
            {avatars.map((avatar, index) => (
              <Avatar
                key={index}
                className="inline-block border-2 border-background"
              >
                <AvatarImage src={avatar.src} />
                <AvatarFallback>{avatar.fallback}</AvatarFallback>
              </Avatar>
            ))}
          </div>{" "}
          <span className="text-sm font-medium text-muted-foreground">{t('lovedBy')}</span>
        </div>
        <Link href="/login?state=signup">
          <Button className="rounded-md text-base h-12">
            <Sparkle /> {t('cta')} <Sparkle />
          </Button>
        </Link>
      </div>
      <div className="absolute top-0 w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 z-10">
        <MarqueeColumn reverse={false} duration="120s" />
        <MarqueeColumn reverse={true} duration="120s" />
        <MarqueeColumn reverse={false} duration="120s" />
        <MarqueeColumn
          reverse={true}
          duration="120s"
          className="hidden md:flex"
        />
        <MarqueeColumn
          reverse={false}
          duration="120s"
          className="hidden lg:flex"
        />
        <MarqueeColumn
          reverse={true}
          duration="120s"
          className="hidden lg:flex"
        />
      </div>
    </section>
  );
};

export default HeroSection;

