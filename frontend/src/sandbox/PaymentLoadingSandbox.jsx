import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function PaymentLoadingSandbox() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/sandbox/success";
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center text-center space-y-6">
        <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Redirecting to payment...</h2>
          <p className="text-gray-500">Please wait while we process your request in the sandbox.</p>
        </div>
      </div>
    </div>
  );
}
