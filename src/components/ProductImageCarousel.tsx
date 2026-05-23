import { Link } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ProductImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  imageClassName?: string;
  linkTo?: string;
  ariaLabel?: string;
  showArrows?: boolean;
}

export default function ProductImageCarousel({
  images,
  alt,
  className,
  imageClassName,
  linkTo,
  ariaLabel,
  showArrows = true,
}: ProductImageCarouselProps) {
  const uniqueImages = Array.from(new Set(images.filter(Boolean)));

  if (uniqueImages.length === 0) return null;

  return (
    <Carousel opts={{ loop: true }} className={cn("relative h-full", className)}>
      <CarouselContent className="ml-0 h-full">
        {uniqueImages.map((src, index) => {
          const imageNode = (
            <img
              src={src}
              alt={`${alt} ${index + 1}`}
              className={cn("w-full h-full object-contain", imageClassName)}
            />
          );

          return (
            <CarouselItem key={`${src}-${index}`} className="pl-0 h-full">
              {linkTo ? (
                <Link to={linkTo} aria-label={ariaLabel ?? `View ${alt}`}>
                  {imageNode}
                </Link>
              ) : (
                imageNode
              )}
            </CarouselItem>
          );
        })}
      </CarouselContent>

      {showArrows && uniqueImages.length > 1 && (
        <>
          <CarouselPrevious
            variant="ghost"
            size="icon-sm"
            className="left-3 top-1/2 -translate-y-1/2 bg-white/90 border border-[#E9D8D2] shadow-md hover:bg-white"
          />
          <CarouselNext
            variant="ghost"
            size="icon-sm"
            className="right-3 top-1/2 -translate-y-1/2 bg-white/90 border border-[#E9D8D2] shadow-md hover:bg-white"
          />
        </>
      )}
    </Carousel>
  );
}
