import React, { useState } from 'react';
import { ShoppingBag, User, Phone, MapPin, CreditCard } from 'lucide-react';

export default function CheckoutSandbox() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const dummyItems = [
    { id: 1, name: 'Premium Teh Tarik', qty: 2, price: 3.50 },
    { id: 2, name: 'Nasi Lemak Ayam Goreng', qty: 1, price: 8.90 },
    { id: 3, name: 'Roti Prata Plain', qty: 3, price: 1.20 }
  ];

  const subtotal = dummyItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const isFormValid = formData.name.trim() !== '' && 
                      formData.phone.trim() !== '' && 
                      formData.address.trim() !== '';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayNow = () => {
    if (isFormValid) {
      window.location.href = "/sandbox/payment-loading";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Customer Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <User className="text-indigo-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">Customer Details</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="+65 1234 5678"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Delivery Address</label>
              <textarea 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Your full address..."
              />
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <ShoppingBag className="text-indigo-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
          </div>

          <div className="flex-1 space-y-4 mb-6">
            {dummyItems.map(item => (
              <div key={item.id} className="flex justify-between items-center pb-4 border-b border-gray-50">
                <div>
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>
                <p className="font-bold text-gray-900">${(item.price * item.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t-2 border-dashed border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-gray-900">Total Amount</span>
              <span className="text-3xl font-black text-indigo-600">${subtotal.toFixed(2)}</span>
            </div>

            <button 
              onClick={handlePayNow}
              disabled={!isFormValid}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                isFormValid 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <CreditCard size={20} />
              Pay Now
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto mt-8 text-center text-gray-400 text-sm">
        <p>Sandbox Mode • Safe & Isolated Environment</p>
      </div>
    </div>
  );
}
