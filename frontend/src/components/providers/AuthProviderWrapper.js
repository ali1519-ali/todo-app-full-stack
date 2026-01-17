// frontend/src/components/providers/AuthProviderWrapper.js
'use client';

import { AuthProvider } from '@/lib/auth';

export default function AuthProviderWrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}