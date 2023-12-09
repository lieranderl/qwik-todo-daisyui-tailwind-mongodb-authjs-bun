import { component$ } from "@builder.io/qwik";
import { MediaCard } from "./MediaCard";

export default component$(() => {
  return (
    <div class="carousel-start carousel w-full rounded-box p-8">
      <div class="carousel-item ">
        <MediaCard 
        width={500}
        title="The Creator"
        rating={7.2}
        year={2023}
        poster="/nZQcowL2neIM5sMLiZiaUN0rPf1.jpg"
        />
      </div>
      <div class="carousel-item ">
        <MediaCard 
        width={500}
        title="The Creator"
        rating={7.2}
        year={2023}
        poster="/nZQcowL2neIM5sMLiZiaUN0rPf1.jpg"
        />
      </div>
      <div class="carousel-item ">
        <MediaCard 
        width={500}
        title="The Creator"
        rating={7.2}
        year={2023}
        poster="/nZQcowL2neIM5sMLiZiaUN0rPf1.jpg"
        />
      </div>
      <div class="carousel-item ">
        <MediaCard 
        width={500}
        title="The Creator"
        rating={7.2}
        year={2023}
        poster="/nZQcowL2neIM5sMLiZiaUN0rPf1.jpg"
        />
      </div>
      <div class="carousel-item ">
        <MediaCard 
        width={500}
        title="The Creator"
        rating={7.2}
        year={2023}
        poster="/nZQcowL2neIM5sMLiZiaUN0rPf1.jpg"
        />
      </div>
     
    </div>
  );
});
