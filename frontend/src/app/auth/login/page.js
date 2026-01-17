// frontend/src/app/auth/login/page.js
'use client';

import { useAuth } from '../../../lib/auth';
import ProfessionalLoginForm from '../../../components/auth/ProfessionalLoginForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login, isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is already authenticated, redirect to tasks
    if (isAuthenticated && user) {
      router.push('/tasks');
    }
  }, [isAuthenticated, user, router]);

  if (isAuthenticated && user) {
    return null; // Will redirect via useEffect
  }

  return (
    <ProfessionalLoginForm onLogin={login} />
  );
}