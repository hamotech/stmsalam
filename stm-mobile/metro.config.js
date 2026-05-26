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

// All @react-navigation/* packages MUST resolve to the same module instances
// that expo-router bundles internally.  If any one of them (e.g. elements) is
// loaded from a different copy of @react-navigation/core, the ThemeContext
// React object differs and useTheme() throws "Couldn't find a theme".
const expoRouterNm = (pkg) =>
  path.join(projectRoot, 'node_modules', 'expo-router', 'node_modules', pkg);

config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules ?? {}),
  react: appNm('react'),
  'react-native': appNm('react-native'),
  'react-native-gesture-handler': appNm('react-native-gesture-handler'),
  'react-native-reanimated': appNm('react-native-reanimated'),
  'react-native-safe-area-context': appNm('react-native-safe-area-context'),
  'react-native-screens': appNm('react-native-screens'),
  // Singleton: all navigation packages → expo-router's own copies
  '@react-navigation/core':         expoRouterNm('@react-navigation/core'),
  '@react-navigation/native':       expoRouterNm('@react-navigation/native'),
  '@react-navigation/native-stack': expoRouterNm('@react-navigation/native-stack'),
  '@react-navigation/elements':     expoRouterNm('@react-navigation/elements'),
  '@react-navigation/bottom-tabs':  expoRouterNm('@react-navigation/bottom-tabs'),
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
  // Belt-and-suspenders for extraNodeModules: catch ANY @react-navigation/* import
  // that slips through (e.g. deep transitive imports inside node_modules) and force
  // it to resolve from expo-router's own bundled copies.  This guarantees a single
  // ThemeContext React object throughout the bundle and prevents the web crash:
  // "Couldn't find a theme. Is your component inside NavigationContainer?"
  if (
    typeof moduleName === 'string' &&
    moduleName.startsWith('@react-navigation/')
  ) {
    const pkgDir = expoRouterNm(moduleName);
    try {
      const filePath = require.resolve(pkgDir);
      return { type: 'sourceFile', filePath };
    } catch {
      /* package not bundled by expo-router — fall through to default */
    }
  }

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
