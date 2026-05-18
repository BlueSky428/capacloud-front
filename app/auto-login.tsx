'use client';

import { useAutoLogin } from '@/lib/hooks/useAutoLogin';

export function AutoLogin() {
  useAutoLogin();
  return null;
}

