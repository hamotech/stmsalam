import React, { createContext, useContext, useState, useEffect } from 'react';
import { subscribeCategories, subscribeGallery } from '../admin/services/dataService';
import { galleryMedia } from '../data/galleryData';
import { findImageForProduct, hasBrokenImage } from '../utils/imageMatcher';
import { useProducts } from '../hooks/useProducts';

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

const filterActiveProducts = (products = []) => {
  return products.filter((p) => p.isActive !== false);
};

const DataContext = createContext();

export function DataProvider({ children }) {
  const { products: liveProducts, loading: productsLoading } = useProducts({ orderByCreatedDesc: true });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [catsLoaded, setCatsLoaded] = useState(false);
  const [galleryLoaded, setGalleryLoaded] = useState(false);

  useEffect(() => {
    const unsubCategories = subscribeCategories((data) => {
      setCategories((prev) => {
        if (data.length === 0 && prev.length > 0) return prev;
        return data;
      });
      setCatsLoaded(true);
    });

    const unsubGallery = subscribeGallery((data) => {
      const nextGallery = data;
      setGallery((prev) => {
        if (nextGallery.length === 0 && prev.length > 0) return prev;
        return nextGallery;
      });
      setGalleryLoaded(true);
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
      setGallery((prev) => (prev.length > 0 ? prev : buildFallbackGallery()));
      setLoading(false);
    };

    // Timeout failsafe to stop loading spinner if something hangs
    const timeout = setTimeout(() => {
      applyFallbackData();
    }, 5000);

    return () => {
      unsubCategories();
      unsubGallery();
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const enriched = enrichProductImages(liveProducts);
    const activeProducts = filterActiveProducts(enriched);
    setProducts(activeProducts);
  }, [liveProducts]);

  useEffect(() => {
    if (!productsLoading && catsLoaded && galleryLoaded) {
      setLoading(false);
    }
  }, [productsLoading, catsLoaded, galleryLoaded]);

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
