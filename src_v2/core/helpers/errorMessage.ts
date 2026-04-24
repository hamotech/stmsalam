// core/helpers
// Shared utility helpers that can be reused by any layer.

export function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}
