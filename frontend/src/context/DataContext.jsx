import React, { createContext, useContext, useState, useEffect } from 'react';
import { subscribeProducts, subscribeCategories, subscribeGallery } from '../admin/services/dataService';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let prodsLoaded = false;
    let catsLoaded = false;
    let galleryLoaded = false;

    const checkLoading = () => {
      if (prodsLoaded && catsLoaded && galleryLoaded) {
        setLoading(false);
      }
    };

    const unsubProducts = subscribeProducts((data) => {
      setProducts(data.filter(p => p.active !== false));
      prodsLoaded = true;
      checkLoading();
    });

    const unsubCategories = subscribeCategories((data) => {
      setCategories(data);
      catsLoaded = true;
      checkLoading();
    });

    const unsubGallery = subscribeGallery((data) => {
      setGallery(data.filter(i => i.active !== false));
      galleryLoaded = true;
      checkLoading();
    });

    // Timeout failsafe to stop loading spinner if something hangs
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      unsubProducts();
      unsubCategories();
      unsubGallery();
      clearTimeout(timeout);
    };
  }, []);

  const value = {
    products,
    categories,
    gallery,
    loading,
    error,
    refreshData: () => {
      // Re-triggering would happen via onSnapshot, but we can add manual fetch if needed
    }
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
