// frontend/src/app/auth/signup/page.js
'use client';

import { useAuth } from '../../../lib/auth';
import ProfessionalSignupForm from '../../../components/auth/ProfessionalSignupForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const { register, isAuthenticated, user } = useAuth();
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
    <ProfessionalSignupForm onRegister={register} />
  );
}