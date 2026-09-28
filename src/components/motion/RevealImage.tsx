import Image from "next/image";

type RevealImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  delayIndex?: number;
  zoomOnHover?: boolean;
};

/** Photo that opens outward from a horizon line through its middle, once, on scroll. */
export function RevealImage({ src, alt, sizes, className = "", priority, delayIndex = 0, zoomOnHover }: RevealImageProps) {
  return (
    <div
      data-reveal="horizon"
      className={`media ${zoomOnHover ? "zoom-on-hover" : ""} ${className}`}
      style={{ ["--i" as string]: delayIndex }}
    >
      <div className="reveal-media">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    </div>
  );
}
