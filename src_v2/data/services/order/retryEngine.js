const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAYS_MS = [500, 1000, 2000];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isNetworkLikeError(error) {
  const code = String(error?.code ?? "").toLowerCase();
  const message = String(error?.message ?? "").toLowerCase();
  return (
    code.includes("unavailable") ||
    code.includes("deadline-exceeded") ||
    code.includes("network-request-failed") ||
    code.includes("aborted") ||
    message.includes("network") ||
    message.includes("offline") ||
    message.includes("timed out") ||
    message.includes("unavailable")
  );
}

export async function withRetry(fn) {
  let attempt = 0;
  while (attempt < MAX_RETRY_ATTEMPTS) {
    try {
      return await fn();
    } catch (error) {
      attempt += 1;
      const canRetry = isNetworkLikeError(error) && attempt < MAX_RETRY_ATTEMPTS;
      if (!canRetry) throw error;
      await sleep(RETRY_DELAYS_MS[attempt - 1] ?? RETRY_DELAYS_MS[RETRY_DELAYS_MS.length - 1]);
    }
  }
  throw new Error("Retry attempts exhausted.");
}
