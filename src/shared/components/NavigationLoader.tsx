'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import DelayedLoader from './DelayedLoader';

export default function NavigationLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return <DelayedLoader loading={loading} />;
}
