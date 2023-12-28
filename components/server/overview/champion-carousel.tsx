"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChampionCarousel } from "@/constants/types";
import { cn } from "@/lib/utils";
import ProgressFilteredData from "./progress-filtered-data";
import Link from "next/link";

interface ChampionCarouselProps {
  champions: ChampionCarousel[];
}

export default function ChampionCarousel({ champions }: ChampionCarouselProps) {
  function getCardColor(resolution_rate: string, isBg: boolean): string {
    const resolutionRate = Number(resolution_rate);

    if (resolutionRate >= 50) {
      //Greeen
      return isBg ? "bg-[#DAFAE6]" : "text-[#4ADE80]";
    } else if (resolutionRate >= 30 && resolutionRate <= 49) {
      //Orange
      return isBg ? "bg-[#FEEAD5]" : "text-[#FB923C]";
    } else {
      //Red
      return isBg ? "bg-[#FEE4E4]" : "text-[#F87171]";
    }
  }

  return (
    <>
      <Carousel>
        <CarouselContent className="drop-shadow-md rounded-md py-2 px-8 space-x-5 w-full">
          {champions.map((champion) => (
            <CarouselItem
              className={cn(
                "md:basis-1/2 rounded-md lg:basis-1/3",
                getCardColor(champion.resolution_rate, true)
              )}
              key={champion.id}
            >
              <Link
                href={`/department/it/overview/${champion.champion_name}`}
                className="flex p-10 items-center justify-between min-h-[80px] cursor-pointer"
              >
                <span className="text-lg">{champion.champion_name}</span>
                <span
                  className={cn(
                    "text-4xl",
                    getCardColor(champion.resolution_rate, false)
                  )}
                >
                  {champion.resolution_rate}%
                </span>
              </Link>
            </CarouselItem>
          ))}
          {/* <CarouselItem className="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">...</CarouselItem> */}
        </CarouselContent>
        {/* <CarouselPrevious />
      <CarouselNext /> */}
      </Carousel>
    </>
  );
}
