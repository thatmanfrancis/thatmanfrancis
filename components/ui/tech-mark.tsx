import { techFor } from "@/lib/tech";

type TechMarkProps = {
  name: string;
  className?: string;
  invert?: boolean;
};

export function TechMark({ name, className = "size-5", invert = false }: TechMarkProps) {
  const tech = techFor(name);

  if (tech) {
    return (
      // Local SVG marks — native img keeps this flexible
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={tech.src}
        alt=""
        width={20}
        height={20}
        className={`shrink-0 object-contain ${invert ? "brightness-0 invert" : ""} ${className}`}
      />
    );
  }

  return (
    <span
      className={`inline-flex size-5 shrink-0 items-center justify-center rounded-md bg-ink text-[10px] font-bold text-white ${invert ? "bg-white text-ink" : ""} ${className}`}
      aria-hidden="true"
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}
