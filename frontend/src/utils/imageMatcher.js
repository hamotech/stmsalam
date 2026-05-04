/**
 * imageMatcher.js
 *
 * Maps a product (by name + categoryId) to the best matching asset file
 * from the bundled `SMT FOOD` image library in /public.
 *
 * Used by the admin "Repair Images" tool and as a runtime fallback so
 * that products without a valid image URL still render a real photo.
 */
import dynamicMenu from '../data/dynamicMenu'

// The public folder uses the original casing — map the dynamicMenu keys
// back to their on-disk folder names.
const FOLDER_MAP = {
  'SNACKS': 'snacks',
  'BURGER KABABAB': 'BURGER KABABAB',
  'DINOSAUR': 'DINOSAUR',
  'DESERT': 'desert',
  'COLD DRINKS': 'cold drinks',
  'CAN DRINKS': 'CAN DRINKS',
  'INDIAN FOOD': 'indian food',
  'SUGARCANE': 'SUGARCANE',
  'HOT': 'HOT',
  'SIDES': 'sides',
}

const toSafeCategoryFolder = (folderName) => String(folderName || '').replace(/\s+/g, '_')

// Map the dynamicMenu category keys to our product categoryId slugs.
const CATEGORY_ID_MAP = {
  'SNACKS': 'snacks',
  'BURGER KABABAB': 'burgers-kebabs',
  'DINOSAUR': 'dinosaur',
  'DESERT': 'desserts',
  'COLD DRINKS': 'cold-drinks',
  'CAN DRINKS': 'can-drinks',
  'INDIAN FOOD': 'indian',
  'SUGARCANE': 'sugarcane',
  'HOT': 'hot-drinks',
  'SIDES': 'sides',
}

// Strip price markers like "SGD 2.70" / "(SGD 2.70)" / "$2.70"
const PRICE_RE = /(?:\(?SGD\s*\$?\s*\d+(?:\.\d+)?\)?|\$?\d+(?:\.\d+)?)/gi
const EXT_RE = /\.(png|jpe?g|webp|gif)$/i
const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'of', 'with', 'to', 'in', 'on', 'for',
  '1', '2', '3', '4', '5', '6', '8', '9', '10', 'piece', 'pieces', 'pc', 'pcs',
  'sgd', 'sdg', 'classic', 'original',
])

const normalize = (raw) =>
  (raw || '')
    .replace(EXT_RE, '')
    .replace(/_/g, ' ')
    .replace(PRICE_RE, ' ')
    .replace(/[()\[\]]/g, ' ')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

const tokenize = (raw) =>
  normalize(raw)
    .split(' ')
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))

const keyify = (raw) => tokenize(raw).join(' ')

// ── Build a flat searchable index of every asset we know about ──────────────
const IMAGE_INDEX = (() => {
  const list = []
  Object.keys(dynamicMenu).forEach((categoryKey) => {
    const folder = FOLDER_MAP[categoryKey] || categoryKey
    const categoryId = CATEGORY_ID_MAP[categoryKey] || categoryKey.toLowerCase()
    for (const filename of dynamicMenu[categoryKey] || []) {
      const cleanName = normalize(filename)
      list.push({
        filename,
        path: encodeURI(`/assets/SMT_FOOD/${toSafeCategoryFolder(folder)}/${filename}`),
        categoryId,
        cleanName,
        tokens: tokenize(filename),
        key: keyify(filename),
      })
    }
  })
  return list
})()

/**
 * Find the best matching asset for a product. Returns the URL (relative to
 * the site root), or `null` when nothing reasonable was found.
 */
export function findImageForProduct(product) {
  if (!product) return null
  const queryName = product.name || ''
  const queryTokens = tokenize(queryName)
  if (queryTokens.length === 0) return null
  const querySet = new Set(queryTokens)
  const queryKey = queryTokens.join(' ')

  const score = (entry) => {
    let overlap = 0
    for (const t of entry.tokens) if (querySet.has(t)) overlap += 1
    if (overlap === 0) return 0

    // Strong signal for direct phrase matches.
    const isExactPhrase = entry.key === queryKey
    const isPhraseContained =
      entry.key.includes(queryKey) || queryKey.includes(entry.key)

    // Jaccard-ish: reward overlap, penalise very long mismatches.
    const union = new Set([...querySet, ...entry.tokens]).size
    const base = (overlap / union) + (overlap / queryTokens.length) * 0.5
    if (isExactPhrase) return base + 2
    if (isPhraseContained) return base + 0.75
    return base
  }

  let best = null
  let bestScore = 0

  const scoped = product.categoryId
    ? IMAGE_INDEX.filter((e) => e.categoryId === product.categoryId)
    : IMAGE_INDEX
  for (const entry of scoped) {
    const s = score(entry)
    if (s > bestScore) { best = entry; bestScore = s }
  }

  // If category gave no hit, try the global pool.
  if (!best && product.categoryId) {
    for (const entry of IMAGE_INDEX) {
      const s = score(entry)
      if (s > bestScore) { best = entry; bestScore = s }
    }
  }

  // Require at least a small amount of overlap to avoid random matches.
  return best && bestScore >= 0.15 ? best.path : null
}

/**
 * Return true when a product's current image URL is missing or clearly
 * broken (empty, unsplash placeholder, or just whitespace).
 */
export function hasBrokenImage(product) {
  const url = (product?.image || product?.img || '').trim()
  if (!url) return true
  if (url.startsWith('https://images.unsplash.com')) return true
  if (url.startsWith('data:') && url.length < 80) return true // tiny/empty data URL
  // Treat plain filenames / metadata-like strings as broken; image should be a full URL
  // or rooted public path so frontend can resolve it reliably.
  const isValidPathLike =
    url.startsWith('/') ||
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('blob:') ||
    url.startsWith('data:') ||
    url.startsWith('gs://')
  if (!isValidPathLike) return true
  return false
}

/**
 * Walk a list of products and compute the repair actions required.
 * Returns an array of `{ id, image, oldImage, matchedName }` updates —
 * callers are responsible for actually persisting them.
 */
export function planImageRepair(products = []) {
  const updates = []
  for (const p of products) {
    if (!hasBrokenImage(p)) continue
    const found = findImageForProduct(p)
    if (!found) continue
    updates.push({
      id: p.id,
      image: found,
      oldImage: p.image || p.img || '',
      name: p.name,
    })
  }
  return updates
}

export default { findImageForProduct, hasBrokenImage, planImageRepair }
