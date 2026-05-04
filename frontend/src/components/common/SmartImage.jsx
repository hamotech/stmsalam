import React, { useMemo } from 'react';
import { DEFAULT_FALLBACK_IMAGE, resolveImageUrl } from '../../utils/imageUrl';

export default function SmartImage({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  style,
  onError,
  ...props
}) {
  const resolvedSrc = useMemo(() => resolveImageUrl(src), [src]);
  const resolvedFallback = useMemo(() => resolveImageUrl(fallbackSrc), [fallbackSrc]);

  const handleError = (event) => {
    const target = event.currentTarget;
    const attemptedSrc = target?.currentSrc || target?.src || resolvedSrc;

    if (target?.dataset?.fallbackApplied === '1') {
      console.error('[ImageLoadError] fallback failed', {
        attemptedSrc,
        fallbackSrc: resolvedFallback,
      });
      if (onError) onError(event);
      return;
    }

    console.warn('[ImageLoadError] image failed; switching to fallback', {
      attemptedSrc,
      originalSrc: src,
      fallbackSrc: resolvedFallback,
    });

    target.dataset.fallbackApplied = '1';
    target.src = resolvedFallback;
    if (onError) onError(event);
  };

  return (
    <img
      loading="lazy"
      src={resolvedSrc}
      alt={alt || 'Image'}
      onError={handleError}
      style={{
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        display: 'block',
        ...style,
      }}
      {...props}
    />
  );
}
