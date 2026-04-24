import React from 'react';
import { CheckCircle2, Home } from 'lucide-react';

export default function SuccessSandbox() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-green-100 flex flex-col items-center text-center max-w-sm w-full">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful</h1>
        <p className="text-gray-500 mb-8">Thank you for your order! This was a successful sandbox test.</p>
        
        <button 
          onClick={() => window.location.href = "/"}
          className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <Home size={20} />
          Back to Home
        </button>
      </div>
    </div>
  );
}
