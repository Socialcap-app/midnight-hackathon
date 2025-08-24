'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Center, Loader } from '@mantine/core';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to admin proposals by default
    router.push('/admin/proposals');
  }, [router]);

  return (
    <Center style={{ minHeight: '100vh' }}>
      <Loader size="lg" />
    </Center>
  );
}
