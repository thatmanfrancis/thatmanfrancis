import {
  mediaSlots,
  mediaUrl,
  type MediaFit,
  type MediaOptions,
  type MediaSlot,
} from "@/lib/media";

type MediaImageProps = {
  src: string;
  alt: string;
  className?: string;
  slot?: MediaSlot;
  width?: number;
  height?: number;
  fit?: MediaFit;
  quality?: number;
};

export function MediaImage({
  src,
  alt,
  className,
  slot,
  width,
  height,
  fit,
  quality,
}: MediaImageProps) {
  const preset: MediaOptions | undefined = slot ? mediaSlots[slot] : undefined;
  const w = width ?? preset?.width;
  const h = height ?? preset?.height;
  const crop = fit ?? preset?.fit ?? "cover";
  const href = mediaUrl(src, { width: w, height: h, fit: crop, quality });

  return (
    // Local uploads are resized via /img?... query params
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={href}
      alt={alt}
      width={w}
      height={h}
      className={className}
      loading="lazy"
    />
  );
}
