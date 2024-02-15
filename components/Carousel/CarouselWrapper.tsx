import { getDiscoverMovies } from "@/lib/getMovies";
import CarouselBanner from "./CarouselBanner";

type Props = {
  id?: string;
  keywords?: string;
};

async function CarouselWrapper({ id, keywords }: Props) {
  const movies = await getDiscoverMovies(id, keywords);
  return <CarouselBanner movies={movies} />;
}

export default CarouselWrapper;
