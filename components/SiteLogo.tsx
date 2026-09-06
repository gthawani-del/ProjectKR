import Image from 'next/image';
import Link from 'next/link';

export default function SiteLogo({ className = '' }: { className?: string }) {
  return (
    <Link className={`siteLogo ${className}`} href="/" aria-label="Krida Legal home">
      <Image
        src="/images/brand/krida-legal-logo.png"
        alt="Krida Legal"
        width={560}
        height={137}
        sizes="(max-width: 768px) 180px, 240px"
        priority
      />
    </Link>
  );
}
