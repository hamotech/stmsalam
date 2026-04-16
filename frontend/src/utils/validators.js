export const validateRequired = (value, fieldName) => {
  if (!value || String(value).trim() === '') {
    return `${fieldName} is required.`;
  }
  return '';
};

export const validateEmail = (email) => {
  const reqError = validateRequired(email, 'Email');
  if (reqError) return reqError;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(String(email).trim().toLowerCase())) {
    return 'Enter a valid email address.';
  }
  return '';
};

export const validatePhone = (phone) => {
  const reqError = validateRequired(phone, 'Phone number');
  if (reqError) return reqError;
  const re = /^\d+$/; // Validates digits only, as requested
  if (!re.test(String(phone).trim())) {
    return 'Enter a valid phone number (digits only).';
  }
  if (String(phone).trim().length < 8) {
    return 'Phone number is too short.';
  }
  return '';
};

export const validatePasswordStrength = (password) => {
  const reqError = validateRequired(password, 'Password');
  if (reqError) return reqError;
  
  if (password.length < 6) {
    return 'Password must be at least 6 characters.';
  }
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  
  if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
    return 'Password must contain uppercase, lowercase, and number.';
  }
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  return '';
};

export const validateFullName = (name) => {
  const reqError = validateRequired(name, 'Full name');
  if (reqError) return reqError;
  
  if (String(name).trim().length < 3) {
    return 'Full name must be at least 3 characters.';
  }
  if (/^\d+$/.test(String(name).trim())) {
    return 'Full name cannot be only numbers.';
  }
  return '';
};

export const validateImageFile = (file) => {
  if (!file) return ''; // Optional
  
  if (!file.type.startsWith('image/')) {
    return 'Selected file must be an image.';
  }
  
  // 2MB max
  if (file.size > 2 * 1024 * 1024) {
    return 'Image file size must be less than 2MB.';
  }
  
  return '';
};
