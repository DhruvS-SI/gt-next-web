'use client';

import { useState, useEffect } from 'react';
import { useSocialShare } from './useSocialShare';
import { API_BASE, API_ENDPOINTS } from '@/lib/apiConfig';

/**
 * Unified hook for fetching articles/photos/videos/gallery from JSON server
 * @param {'articles'|'photos'|'videos'|'gallery'} type - Content type to fetch
 * @returns {Object} Content data, loading state, and error
 */
export const useArticle = (type = 'articles') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const endpoint = API_ENDPOINTS[type.toUpperCase()] || API_ENDPOINTS.ARTICLES;
        const response = await fetch(`${API_BASE}${endpoint}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${type}: ${response.statusText}`);
        }
        const result = await response.json();
        setData(Array.isArray(result) ? result : []);
        setError(null);
      } catch (err) {
        console.error(`Error fetching ${type}:`, err);
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  return {
    data,
    articles: data, // Alias for backward compatibility
    loading,
    error,
  };
};


export const useArticleShare = (article) => {
  const { shareOnWhatsApp, shareOnTwitter, copyToClipboard } = useSocialShare(
    article?.url || '',
    article?.title || ''
  );

  return {
    shareOnWhatsApp,
    shareOnTwitter,
    copyToClipboard,
  };
};



