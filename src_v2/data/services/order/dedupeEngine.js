const recentOrderHashes = new Set();

export function buildOrderHash(data) {
  const userId = String(data?.userId ?? "anonymous");
  const items = Array.isArray(data?.items) ? data.items : [];
  const normalizedItems = items.map((item) => ({
    name: String(item?.name ?? ""),
    qty: Number(item?.qty ?? 0),
    price: Number(item?.price ?? 0),
  }));
  const minuteBucket = Math.floor(Date.now() / 60000);
  return `${userId}|${JSON.stringify(normalizedItems)}|${minuteBucket}`;
}

export function hasRecentOrderHash(orderHash) {
  return recentOrderHashes.has(orderHash);
}

export function rememberOrderHash(orderHash) {
  recentOrderHashes.add(orderHash);
  setTimeout(() => {
    recentOrderHashes.delete(orderHash);
  }, 70 * 1000);
}
