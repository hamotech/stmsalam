import React from 'react';
import { XCircle, RefreshCw } from 'lucide-react';

export default function CancelSandbox() {
  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-rose-100 flex flex-col items-center text-center max-w-sm w-full">
        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-6">
          <XCircle className="w-12 h-12 text-rose-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
        <p className="text-gray-500 mb-8">The transaction was cancelled. You can try again in the sandbox.</p>
        
        <button 
          onClick={() => window.location.href = "/sandbox/checkout"}
          className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <RefreshCw size={20} />
          Try Again
        </button>
      </div>
    </div>
  );
}
