export const DEFAULT_FALLBACK_IMAGE = '/bg1.jpeg';

const ABSOLUTE_PROTOCOL_RE = /^(?:https?:)?\/\//i;

export function resolveImageUrl(rawSrc) {
  const src = typeof rawSrc === 'string' ? rawSrc.trim() : '';
  if (!src) return DEFAULT_FALLBACK_IMAGE;
  if (src.startsWith('data:') || src.startsWith('blob:') || ABSOLUTE_PROTOCOL_RE.test(src)) {
    return src;
  }

  const normalized = src
    .replace(/\\/g, '/')
    .replace(/^\.\/+/, '/')
    .replace(/^\/aboutusimages\//i, '/aboutusimage/')
    .replace(/^aboutusimage\//i, '/aboutusimage/')
    .replace(/^aboutusimages\//i, '/aboutusimage/')
    .replace(/\/{2,}/g, '/');

  const rooted = normalized.startsWith('/') ? normalized : `/${normalized}`;
  return encodeURI(rooted);
}
