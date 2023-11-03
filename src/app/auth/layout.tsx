'use client';

import type { ReactNode } from 'react';
import { GuestGuard } from '@/guards/guest-guard';

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
      <GuestGuard>
          {children}
      </GuestGuard>
  );
};

export default Layout;
