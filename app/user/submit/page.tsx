'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Redirect old submit page to new rent page
export default function SubmitJobPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/user/rent');
  }, [router]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">Redirecting to GPU rental page...</p>
      </div>
    </div>
  );
}
