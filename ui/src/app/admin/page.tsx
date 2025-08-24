'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Center, Loader } from '@mantine/core';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if admin is authenticated
    // For now, redirect to admin login
    // Later you can add authentication check here
    // If authenticated, redirect to /admin/proposals
    // If not authenticated, redirect to /admin/login

    // Simulate authentication check
    const isAdminAuthenticated = false; // Change this based on actual auth state

    if (isAdminAuthenticated) {
      router.push('/admin/proposals');
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <Center style={{ minHeight: '100vh' }}>
      <Loader size="lg" />
    </Center>
  );
}
