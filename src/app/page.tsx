'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Adjust path if your supabase client is located elsewhere

interface Provider {
  id: string;
  full_name: string;
  primary_category: string;
  service_title: string;
  whatsapp_phone: string;
  location_area: string;
  years_experience: string;
  hourly_rate: string;
  avatar_url?: string;
}

export default function MarketplacePage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('providers')
        .select('*');

      if (error) {
        console.error('Error fetching providers:', error.message);
      } else if (data) {
        setProviders(data);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = async (provider: Provider) => {
    try {
      // 1. Save the booking record into your Supabase 'bookings' table
      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            provider_id: provider.id,
            service_title: provider.service_title || provider.primary_category,
            customer_name: 'Local Customer',
            status: 'pending',
          }
        ]);

      if (error) {
        console.error('Booking save failed:', error.message);
      }
    } catch (err) {
      console.error('Error recording booking:', err);
    }

    // 2. Open WhatsApp with pre-filled message
    const phone = provider.whatsapp_phone || '923000000000';
    const text = encodeURIComponent(`Hi, I'd like to book your service: ${provider.service_title} (${provider.primary_category})`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const filteredProviders = selectedCategory === 'All' 
    ? providers 
    : providers.filter(p => p.primary_category === selectedCategory);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Local Service Marketplace</h1>
        <p className="text-gray-600 mt-2">Find and book verified professionals across Karachi.</p>
        
        {/* Category Filter Pills */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {['All', 'Electrical', 'Plumbing', 'Cleaning', 'Carpentry', 'Appliance Repair'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat 
                  ? 'bg-amber-900 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading experts...</div>
      ) : filteredProviders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
          <p className="text-gray-500">No providers found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <div key={provider.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-900">
                    {provider.full_name ? provider.full_name.charAt(0).toUpperCase() : 'P'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{provider.full_name}</h3>
                    <span className="text-xs px-2 py-1 rounded bg-amber-50 text-amber-800 font-medium">
                      {provider.primary_category}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 font-medium mb-2">{provider.service_title}</p>
                
                <div className="space-y-1 text-sm text-gray-600 mb-6">
                  <p>📍 Area: {provider.location_area}</p>
                  <p>⏳ Experience: {provider.years_experience}</p>
                  <p className="font-semibold text-gray-900">💰 Rate: Rs. {provider.hourly_rate} / hr</p>
                </div>
              </div>

              <button
                onClick={() => handleBookNow(provider)}
                className="w-full bg-amber-900 hover:bg-amber-950 text-white py-2.5 rounded-lg font-medium transition-colors text-center shadow-sm"
              >
                Book Now (WhatsApp)
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}