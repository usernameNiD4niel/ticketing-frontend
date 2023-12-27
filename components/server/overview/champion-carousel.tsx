import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChampionCarousel } from "@/constants/types";

interface ChampionCarouselProps {
  champions: ChampionCarousel[];
}

export default function ChampionCarousel({ champions }: ChampionCarouselProps) {
  return (
    <Carousel>
      <CarouselContent>
        {champions.map((champion) => (
          <CarouselItem
            className="flex flex-col gap-3 md:basis-1/2 p-4 rounded-md lg:basis-1/3"
            key={champion.id}
          >
            <span className="text-lg">{champion.champion_name}</span>
            <span className="text-lg">{champion.resolution_rate}</span>
          </CarouselItem>
        ))}
        {/* <CarouselItem className="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">...</CarouselItem> */}
      </CarouselContent>
    </Carousel>
  );
}
