import Image from "next/image";
import { images } from "@/lib/images";

const destinations = [
  { name: "Paris", region: "France", img: images.paris },
  { name: "Taj Mahal", region: "Agra, India", img: images.tajMahal },
  { name: "Bali", region: "Indonesia", img: images.baliTemple },
  { name: "Venice", region: "Italy", img: images.venice },
  { name: "Ha Long Bay", region: "Vietnam", img: images.halong },
  { name: "Cappadocia", region: "Türkiye", img: images.cappadocia },
  { name: "Nusa Penida", region: "Indonesia", img: images.nusaPenida },
  { name: "Island Escapes", region: "Tropical getaways", img: images.island },
];

export function DestinationsMarquee() {
  return (
    <section aria-label="Destinations" className="overflow-hidden bg-sand pb-24">
      <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
        {[...destinations, ...destinations].map((d, i) => (
          <figure
            key={i}
            aria-hidden={i >= destinations.length}
            className="relative h-72 w-56 shrink-0 overflow-hidden rounded-3xl sm:h-80 sm:w-64"
          >
            <Image
              src={d.img}
              alt={d.name}
              fill
              sizes="256px"
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/80 via-transparent" />
            <figcaption className="pointer-events-none absolute bottom-5 left-5 text-white">
              <p className="font-display text-xl font-semibold">{d.name}</p>
              <p className="text-xs text-white/70">{d.region}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
