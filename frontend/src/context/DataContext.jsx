import React, { createContext, useContext, useState, useEffect } from 'react';
import { subscribeProducts, subscribeCategories, subscribeGallery } from '../admin/services/dataService';
import { API_URL } from '../config/api';
import { galleryMedia } from '../data/galleryData';
import { findImageForProduct, hasBrokenImage } from '../utils/imageMatcher';

// Non-destructive runtime enrichment: if a product arrives without an image,
// (or with an obvious placeholder) fall back to a real photo from the
// SMT FOOD library so the UI never shows an empty tile.
const enrichProductImages = (products = []) => {
  return products.map((p) => {
    // Keep both fields aligned because some UI reads `img` first.
    const primary = p.image || p.img || '';
    const base = { ...p, image: primary, img: primary };

    if (!hasBrokenImage(base)) return base;
    const match = findImageForProduct(p);
    if (!match) return base;
    return { ...base, image: match, img: match };
  });
};

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
      const nextProducts = enrichProductImages(data.filter((p) => p.active !== false));
      setProducts((prev) => {
        if (nextProducts.length === 0 && prev.length > 0) return prev;
        return nextProducts;
      });
      prodsLoaded = true;
      checkLoading();
    });

    const unsubCategories = subscribeCategories((data) => {
      setCategories((prev) => {
        if (data.length === 0 && prev.length > 0) return prev;
        return data;
      });
      catsLoaded = true;
      checkLoading();
    });

    const unsubGallery = subscribeGallery((data) => {
      const nextGallery = data.filter((i) => i.active !== false);
      setGallery((prev) => {
        if (nextGallery.length === 0 && prev.length > 0) return prev;
        return nextGallery;
      });
      galleryLoaded = true;
      checkLoading();
    });

    const buildFallbackGallery = () => {
      return galleryMedia.map((file, index) => {
        const isVideo = file.toLowerCase().endsWith('.mp4') || file.toLowerCase().endsWith('.mov');
        return {
          id: `fallback-gallery-${index}`,
          url: `/aboutusimage/${file}`,
          type: isVideo ? 'video' : 'image',
          name: file,
          active: true,
        };
      });
    };

    const applyFallbackData = async () => {
      try {
        const [menuRes, categoriesRes] = await Promise.all([
          fetch(`${API_URL}/menu`),
          fetch(`${API_URL}/categories`),
        ]);

        if (menuRes.ok) {
          const menuData = await menuRes.json();
          if (Array.isArray(menuData) && menuData.length > 0) {
            const enriched = enrichProductImages(menuData.filter((p) => p.active !== false));
            setProducts((prev) => (prev.length > 0 ? prev : enriched));
          }
        }

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          if (Array.isArray(categoriesData) && categoriesData.length > 0) {
            setCategories((prev) => (prev.length > 0 ? prev : categoriesData));
          }
        }
      } catch (fallbackErr) {
        console.warn('Fallback API load failed:', fallbackErr);
      }

      setGallery((prev) => (prev.length > 0 ? prev : buildFallbackGallery()));
      setLoading(false);
    };

    // Timeout failsafe to stop loading spinner if something hangs
    const timeout = setTimeout(() => {
      applyFallbackData();
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
