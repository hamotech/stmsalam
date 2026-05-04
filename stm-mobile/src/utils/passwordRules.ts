/** STM / Amazon-style rules for new passwords (Firebase still enforces its own minimum). */

export type PasswordValidation = { ok: boolean; errors: string[] };

export function validateEmailFormat(email: string): boolean {
  const s = email.trim();
  if (s.length < 5) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

/**
 * Sign-up password: min 8 chars, upper, lower, digit (matches common e-commerce policy).
 */
export function validateSignupPassword(password: string): PasswordValidation {
  const errors: string[] = [];
  if (password.length < 8) errors.push('At least 8 characters');
  if (!/[a-z]/.test(password)) errors.push('One lowercase letter (a–z)');
  if (!/[A-Z]/.test(password)) errors.push('One uppercase letter (A–Z)');
  if (!/[0-9]/.test(password)) errors.push('One number (0–9)');
  return { ok: errors.length === 0, errors };
}

export function passwordRulesSummary(): string {
  return '8+ characters with uppercase, lowercase, and a number.';
}
