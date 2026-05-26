// stmapp/services/maps.js
'use strict';

// Default Shop Outlet Location (Blk 50A Marine Terrace, Singapore)
const OUTLET_COORDS = { lat: 1.3048, lng: 103.9130 };

/**
  * Calculate straight-line distance in kilometers using the Haversine formula
  */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

/**
  * Mock route computation. 
  * Returns travel duration and delivery fee evaluation based on distance from Marine Terrace outlet.
  */
export const computeDeliveryRouting = (customerAddress) => {
  console.log(`🗺️ [Maps Service] Computing route for destination: ${customerAddress}`);
  
  // Create static mock coordinates for testing based on address matching
  // S440055 is approx 1.2km away
  let dist = 1.8; // default mock km
  if (customerAddress.includes('441050') || customerAddress.includes('50A')) dist = 0.1;
  else if (customerAddress.includes('440055')) dist = 1.2;
  else if (customerAddress.includes('Bedok')) dist = 4.5;
  else if (customerAddress.includes('Jurong')) dist = 18.5; // too far!

  const prepTime = 15; // standard kitchen cooking mins
  const deliveryTimePerKm = 3.5; // minutes per km
  const duration = Math.round(prepTime + (dist * deliveryTimePerKm));

  // Eligibility evaluation: STM Salam delivery radius is 5km
  const eligible = dist <= 5.0;

  return {
    success: true,
    distanceKm: dist,
    estimatedDurationMins: duration,
    eligibleForDelivery: eligible,
    outletLocation: OUTLET_COORDS
  };
};
