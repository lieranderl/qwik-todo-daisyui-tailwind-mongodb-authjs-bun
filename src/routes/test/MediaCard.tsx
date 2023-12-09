import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

type MediaCardProps = {
    width: number;
    title: string;
    rating: number;
    year: number;
    poster: string;
}

export const MediaCard = component$(({title, rating, year, poster, width }:MediaCardProps) => {
  return (
    <div class="group w-[350px]">
      <div class="transition-scale scale-95 rounded-xl drop-shadow-lg duration-300 ease-in-out group-hover:scale-105">
        <Image
          objectFit="fill"
          width={width}
          height={width*9/16}
          src={
            "https://image.tmdb.org/t/p/w500"+poster
          }
          class="rounded-xl border-2 border-secondary-content"
        />
        <div class="badge badge-info font-bold absolute bottom-2 left-2">{rating}</div>
        <div class="badge badge-info font-bold absolute bottom-2 right-2">{year}</div>
      </div>
      <span class="transition-scale block truncate text-ellipsis py-2 text-sm font-normal duration-300 ease-in-out group-hover:font-extrabold">
        {title}
      </span>
    </div>
  );
});
