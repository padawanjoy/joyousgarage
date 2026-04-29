import Link from "next/link";

interface LogoProps {
  href?: string;
  size?: string;
}

export function Logo({ href = "/", size }: LogoProps) {
  return (
    <Link href={href} className="logo" aria-label="JoyousGarage" style={size ? { fontSize: size } : undefined}>
      <span className="dot" />Joyous<em>Garage</em>
    </Link>
  );
}
