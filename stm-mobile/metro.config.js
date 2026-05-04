// Learn more: https://docs.expo.dev/guides/customizing-metro/
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '..');
const config = getDefaultConfig(projectRoot);

// `src_v2` lives next to `stm-mobile/`; Metro must watch the parent or sibling resolution fails.
config.watchFolders = [...new Set([...(config.watchFolders ?? []), monorepoRoot])];

// `src_v2` is outside `projectRoot`; Metro otherwise only walks ancestor `node_modules` from that file
// (repo root). Pin app deps used by `src_v2` so Metro loads them from `stm-mobile/node_modules`.
const appNm = (pkg) => path.join(projectRoot, 'node_modules', pkg);
config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules ?? {}),
  react: appNm('react'),
  'react-native': appNm('react-native'),
  'react-native-gesture-handler': appNm('react-native-gesture-handler'),
  'react-native-reanimated': appNm('react-native-reanimated'),
  'react-native-safe-area-context': appNm('react-native-safe-area-context'),
  'react-native-screens': appNm('react-native-screens'),
  '@react-navigation/native': appNm('@react-navigation/native'),
  '@react-navigation/native-stack': appNm('@react-navigation/native-stack'),
  'expo-status-bar': appNm('expo-status-bar'),
};

const STRIPE_PKG = '@stripe/stripe-react-native';
const stripeStub = path.resolve(projectRoot, 'src/stubs/stripe-react-native-web.js');

function isStripePkg(moduleName) {
  if (typeof moduleName !== 'string') return false;
  if (moduleName === STRIPE_PKG || moduleName.startsWith(`${STRIPE_PKG}/`)) return true;
  const norm = moduleName.replace(/\\/g, '/');
  return norm.includes('/@stripe/stripe-react-native');
}

const appNodeModules = path.join(projectRoot, 'node_modules');

function isBareModuleRequest(moduleName) {
  if (typeof moduleName !== 'string') return false;
  if (moduleName.length === 0 || moduleName.startsWith('.') || moduleName.startsWith('/')) return false;
  if (path.isAbsolute(moduleName)) return false;
  if (moduleName.startsWith('\0')) return false;
  return true;
}

function isFromSrcV2(originModulePath) {
  if (!originModulePath) return false;
  const norm = originModulePath.replace(/\\/g, '/');
  return norm.includes('/src_v2/');
}

const origResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Firebase: use the React Native Auth entry on native — otherwise `firebase/auth` can pull the
  // browser Auth implementation and `initializeAuth` + persistence silently mis-initializes.
  if (platform && platform !== 'web' && moduleName === '@firebase/auth') {
    const rnAuth = path.join(appNodeModules, '@firebase', 'auth', 'dist', 'rn', 'index.js');
    return { type: 'sourceFile', filePath: rnAuth };
  }

  if (platform === 'web' && isStripePkg(moduleName)) {
    return { type: 'sourceFile', filePath: stripeStub };
  }

  // Files under repo `src_v2/` are outside `projectRoot`; `extraNodeModules` alone is not always
  // honored. Resolve bare imports from the Expo app's `node_modules` first (fixes e.g. expo-status-bar).
  if (isBareModuleRequest(moduleName) && isFromSrcV2(context.originModulePath)) {
    try {
      const filePath = require.resolve(moduleName, { paths: [appNodeModules] });
      return { type: 'sourceFile', filePath };
    } catch {
      /* fall through */
    }
  }

  if (origResolveRequest) {
    return origResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
