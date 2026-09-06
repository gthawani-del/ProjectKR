import Image from 'next/image';
import Link from 'next/link';

export default function SiteLogo({ className = '' }: { className?: string }) {
  return (
    <Link className={`siteLogo ${className}`} href="/" aria-label="Krida Legal home">
      <Image src="/brand/krida-legal-logo.svg" alt="Krida Legal" width={560} height={137} priority />
    </Link>
  );
}
