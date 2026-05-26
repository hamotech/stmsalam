const ANDROID_EMULATOR_API_URL = 'http://10.0.2.2:5000/api';
const DEV_API_URL = 'http://localhost:5000/api';
const PROD_API_URL = 'https://teh-tarik-app-k4w4.onrender.com/api';

function isCapacitorRuntime() {
  if (typeof window === 'undefined') return false;
  return (
    window.location.protocol === 'capacitor:' ||
    window.location.hostname === '10.0.2.2' ||
    Boolean(window.Capacitor?.isNativePlatform?.())
  );
}

const DEFAULT_API_URL = isCapacitorRuntime()
  ? (import.meta.env.VITE_CAPACITOR_API_URL || ANDROID_EMULATOR_API_URL)
  : (import.meta.env.PROD ? PROD_API_URL : DEV_API_URL);

export const API_URL = import.meta.env.VITE_API_URL || DEFAULT_API_URL;
export const BASE_URL = API_URL.replace(/\/api\/?$/, '');
