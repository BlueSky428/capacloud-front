'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { notifications } from '@/lib/notifications';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    notifications.success('Copied to clipboard', { duration: 2000 });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 dark:bg-black rounded-lg p-4 my-4 relative group">
      <code className="text-sm text-green-400 font-mono block break-all pr-10 whitespace-pre-wrap">
        {code}
      </code>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-white transition-colors rounded"
        title="Copy command"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

