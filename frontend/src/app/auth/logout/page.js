// frontend/src/app/auth/logout/page.js
'use client';

import { useAuth } from '../../../lib/auth';
import ProfessionalLogoutPage from '../../../components/auth/ProfessionalLogoutPage';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <ProfessionalLogoutPage />
  );
}