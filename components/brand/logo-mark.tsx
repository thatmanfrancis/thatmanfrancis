import Image from "next/image";

export const BRAND_MARK_PATH = "/brand/monoline-fku.png";

type BrandLockupProps = {
  className?: string;
  markClassName?: string;
  /** Invert mark for dark surfaces (splash). */
  invert?: boolean;
};

/** Header / footer brand — mark only, no wordmark. */
export function BrandLockup({
  className = "inline-flex items-center",
  markClassName = "h-12 w-auto sm:h-14",
  invert = false,
}: BrandLockupProps) {
  return (
    <span className={className}>
      <Image
        src={BRAND_MARK_PATH}
        alt="FKU"
        width={160}
        height={200}
        className={`shrink-0 object-contain ${invert ? "brightness-0 invert" : ""} ${markClassName}`}
        priority
      />
    </span>
  );
}

/** Mark only — for splash / compact spots. */
export function LogoMark({
  className = "h-14 w-auto",
  invert = false,
  title = "FKU",
}: {
  className?: string;
  invert?: boolean;
  title?: string;
}) {
  return (
    <Image
      src={BRAND_MARK_PATH}
      alt={title}
      width={160}
      height={200}
      className={`object-contain ${invert ? "brightness-0 invert" : ""} ${className}`}
      priority
    />
  );
}
