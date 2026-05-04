/**
 * Home — featured menu, categories, offers (gallery), order tracking search, STM Help.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StatusBar,
  FlatList,
  Animated,
  useWindowDimensions,
  type ImageSourcePropType,
  type ListRenderItem,
} from 'react-native';
import { Image } from 'expo-image';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { navPush } from '@/src/navigation/appNavigation';
import { useAppRole } from '@/src/auth/useAppRole';
import { useAuth } from '@/src/context/AuthContext';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { subscribeCategories, subscribeProducts, Category, Product } from '@/src/services/menuService';
import SupportFloatingButtons from '../components/SupportFloatingButtons';
import { useTabBarBottomInset } from '@/src/navigation/useTabBarBottomInset';
import SearchBar from '@/src/components/stm/SearchBar';
import CategoryCard from '@/src/components/stm/CategoryCard';
import { images } from '@/assets/images.js';
import StmLogo from '@/src/components/stm/StmLogo';
import { useCart } from '@/src/context/CartContext';
import {
  ProductOptionsBottomSheet,
  type ProductOptionsSheetProduct,
  type ProductOptionsPayload,
  type ProductOptionsSheetRef,
} from '@/src/components/ProductOptionsBottomSheet';

const GREEN = '#013220';
const GOLD = '#D4AF37';

function getNumColumns(screenWidth: number): number {
  if (screenWidth < 360) return 2;
  if (screenWidth < 768) return 3;
  return 4;
}

const MARQUEE_SEGMENT =
  'MINIMUM ORDER SGD 10.00 FOR ALL DELIVERIES AND PICKUPS   ✨   ENJOY AUTHENTIC STM SALAM FLAVORS   ✨   MINIMUM ORDER SGD 10.00   ✨   ';

/** Curated STM Salam favorites — juices first, then mains. */
const CURATED_FAVORITES: readonly { key: string; display: string; fallbackPrice: number }[] = [
  { key: 'fresh juice', display: 'Fresh Juice', fallbackPrice: 4.2 },
  { key: 'mango juice', display: 'Mango Juice', fallbackPrice: 4.8 },
  { key: 'avocado juice', display: 'Avocado Juice', fallbackPrice: 5.5 },
  { key: 'chicken biryani', display: 'Chicken Biryani', fallbackPrice: 11.9 },
  { key: 'shawarma', display: 'Shawarma', fallbackPrice: 8.9 },
];

const RATING_DISPLAY = '4.5';
const DELIVERY_WINDOW = '25–40 min';

type QuickCategoryKind = 'food' | 'drinks' | 'snacks';

function findCategoryForKind(list: Category[], kind: QuickCategoryKind): Category | undefined {
  const n = (s: string) => s.toLowerCase();
  for (const c of list) {
    const name = n(c.name);
    if (kind === 'food' && (name.includes('food') || name.includes('main') || name.includes('rice') || name.includes('makan'))) {
      return c;
    }
    if (
      kind === 'drinks' &&
      (name.includes('drink') || name.includes('beverage') || name.includes('tea') || name.includes('juice') || name.includes('teh'))
    ) {
      return c;
    }
    if (kind === 'snacks' && (name.includes('snack') || name.includes('side') || name.includes('dessert'))) {
      return c;
    }
  }
  return undefined;
}

/** Bundled-in sample clips (no app backend). Short MP4s suitable for preview tiles. */
const EXPLORE_CLIPS: readonly { id: string; uri: string; caption: string }[] = [
  {
    id: '1',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    caption: 'Fresh from the kitchen',
  },
  {
    id: '2',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    caption: 'Cold-pressed juices',
  },
  {
    id: '3',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    caption: 'Straight to your door',
  },
];

const ABOUT_COPY =
  'STM Salam is a trusted halal delivery platform in Singapore, bringing fresh food, groceries, and daily essentials to your doorstep. We focus on quality, speed, and authentic taste.';

const HOME_IMAGE_BY_CURATED_KEY: Record<string, ImageSourcePropType> = {
  'fresh juice': images.freshJuice,
  'mango juice': images.mangoJuice,
  'avocado juice': images.avocadoJuice,
  'chicken biryani': images.chickenBiryani,
  shawarma: images.shawarma,
};

const HERO_LOCAL_SLIDES: ImageSourcePropType[] = [
  images.heroBurger,
  images.heroKebab,
  images.chickenBiryani,
  images.heroTehTarik,
];

function homeImageForCuratedKey(key: string): ImageSourcePropType {
  return HOME_IMAGE_BY_CURATED_KEY[key] ?? images.storeFront;
}

function normName(s: string) {
  return s.toLowerCase().replace(/\s+/g, ' ').trim();
}

type CuratedFavoriteItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  img?: string;
  fromCatalog: boolean;
  curatedKey: string;
  type?: string;
  category?: string;
  categoryId?: string;
};

function buildCuratedFavorites(products: Product[]): CuratedFavoriteItem[] {
  return CURATED_FAVORITES.map(({ key, display, fallbackPrice }) => {
    const p = products.find((x) => normName(x.name).includes(key));
    if (p) {
      return {
        id: p.id,
        name: p.name,
        price: Number(p.price),
        image: p.image,
        img: p.img,
        fromCatalog: true,
        curatedKey: key,
        type: p.type,
        category: p.category,
        categoryId: p.categoryId,
      };
    }
    return {
      id: `virtual-${key.replace(/\s+/g, '-')}`,
      name: display,
      price: fallbackPrice,
      fromCatalog: false,
      curatedKey: key,
    };
  });
}

function MinOrderMarquee() {
  const translateX = useRef(new Animated.Value(0)).current;
  const segmentWidth = useRef(0);
  const loopRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    return () => {
      loopRef.current?.stop();
      translateX.stopAnimation();
    };
  }, [translateX]);

  const startIfNeeded = (w: number) => {
    if (!w || Math.abs(w - segmentWidth.current) < 2) return;
    segmentWidth.current = w;
    loopRef.current?.stop();
    translateX.setValue(0);
    loopRef.current = Animated.loop(
      Animated.timing(translateX, {
        toValue: -w,
        duration: Math.min(28000, Math.max(12000, w * 28)),
        useNativeDriver: true,
      })
    );
    loopRef.current.start();
  };

  return (
    <View style={styles.marqueeOuter}>
      <View style={styles.marqueeClip}>
        <Animated.View style={[styles.marqueeTrack, { transform: [{ translateX }] }]}>
          <Text style={styles.marqueeText} numberOfLines={1} onLayout={(e) => startIfNeeded(e.nativeEvent.layout.width)}>
            {MARQUEE_SEGMENT}
          </Text>
          <Text style={styles.marqueeText} numberOfLines={1}>
            {MARQUEE_SEGMENT}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}

type ExploreClipCardProps = {
  uri: string;
  caption: string;
  /** Horizontal carousel: fixed tile width. Omit for flex row (tablet) — tile fills column. */
  tileWidth?: number;
};

/**
 * One layout for all breakpoints: 16:9 box + cover video + caption.
 * Avoids fixed video heights that break RN Web / small widths.
 */
const ExploreClipCard = React.memo(function ExploreClipCard({ uri, caption, tileWidth }: ExploreClipCardProps) {
  const playIconSize = useMemo(
    () =>
      tileWidth != null
        ? Math.min(52, Math.max(36, Math.round(tileWidth * 0.2)))
        : 44,
    [tileWidth]
  );

  const player = useVideoPlayer(uri, (p) => {
    p.muted = true;
    p.loop = true;
  });
  const [showPlay, setShowPlay] = useState(true);

  const toggle = useCallback(() => {
    if (player.playing) {
      player.pause();
      setShowPlay(true);
    } else {
      player.play();
      setShowPlay(false);
    }
  }, [player]);

  const outerStyle =
    tileWidth != null
      ? [styles.exploreCard, { width: tileWidth, maxWidth: '100%' as const }]
      : [styles.exploreCard, styles.exploreCardFlex];

  return (
    <TouchableOpacity
      style={outerStyle}
      onPress={toggle}
      activeOpacity={0.92}
      accessibilityRole="button"
    >
      <View style={styles.exploreVideoAspectBox}>
        <VideoView
          player={player}
          style={styles.exploreVideoFill}
          contentFit="cover"
          nativeControls={false}
        />
        {showPlay ? (
          <View style={styles.explorePlayOverlayFill} pointerEvents="none">
            <Ionicons name="play-circle" size={playIconSize} color="rgba(255,255,255,0.95)" />
          </View>
        ) : null}
      </View>
      <View style={styles.exploreCaptionFlex}>
        <Text style={styles.exploreCaptionText} numberOfLines={2}>
          {caption}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const LAYOUT_TABLET_MIN = 600;
const LAYOUT_WIDE_MIN = 768;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const tabBarBottomInset = useTabBarBottomInset(16);
  const { width: windowWidth } = useWindowDimensions();
  const isWide = windowWidth >= LAYOUT_WIDE_MIN;
  const isRelaxed = windowWidth >= LAYOUT_TABLET_MIN;
  const numColumns = useMemo(() => getNumColumns(windowWidth), [windowWidth]);
  /** Hero inner padding only (status bar handled by SafeAreaView). */
  const heroTopPad = isWide ? 28 : isRelaxed && !isWide ? 24 : 20;

  const sectionPad = useMemo(() => {
    if (windowWidth >= LAYOUT_WIDE_MIN) return 24;
    if (windowWidth >= LAYOUT_TABLET_MIN) return 20;
    return Math.max(14, Math.min(20, Math.round(windowWidth * 0.045)));
  }, [windowWidth]);

  const contentMaxW = useMemo(() => {
    if (windowWidth >= LAYOUT_WIDE_MIN) return 960;
    if (windowWidth >= LAYOUT_TABLET_MIN) return 720;
    return undefined;
  }, [windowWidth]);

  /** Width of the centered home column (matches FlatList content). */
  const layoutColumnWidth = useMemo(
    () => Math.min(windowWidth, contentMaxW ?? windowWidth),
    [windowWidth, contentMaxW]
  );

  const contentHorizontalPad = contentMaxW != null ? (isWide ? 12 : 8) : 0;

  /** Usable width for the Explore block (titles + clips). */
  const exploreInnerWidth = useMemo(
    () =>
      Math.max(
        160,
        layoutColumnWidth - 2 * contentHorizontalPad - 2 * sectionPad
      ),
    [layoutColumnWidth, contentHorizontalPad, sectionPad]
  );

  /** Tablet / desktop: show all clips in one row with flex columns. */
  const exploreUseRowLayout = exploreInnerWidth >= 520;

  /** Phone / narrow: horizontal peek carousel sized to the column. */
  const exploreScrollTileWidth = useMemo(() => {
    const target = exploreInnerWidth * 0.86;
    return Math.round(Math.min(Math.max(target, 200), exploreInnerWidth - 4));
  }, [exploreInnerWidth]);

  const categoryColStyle = useMemo(() => {
    if (windowWidth >= LAYOUT_WIDE_MIN) return { width: '31%' as const };
    return { width: '48%' as const };
  }, [windowWidth]);

  const router = useRouter();
  const { user, profile } = useAuth();
  const navRole = useAppRole();
  const sheetRef = useRef<ProductOptionsSheetRef>(null);
  const { addProduct } = useCart();
  const [sheetProduct, setSheetProduct] = useState<ProductOptionsSheetProduct | null>(null);
  const [orderId, setOrderId] = useState('');
  const [homeSearch, setHomeSearch] = useState('');

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [menuLoading, setMenuLoading] = useState(true);

  useEffect(() => {
    const u = subscribeCategories((c) => {
      setCategories(c.filter((x) => x.active !== false).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    });
    return u;
  }, []);

  useEffect(() => {
    setMenuLoading(true);
    const u = subscribeProducts(
      (p) => {
        setProducts(p);
        setMenuLoading(false);
      },
      () => setMenuLoading(false)
    );
    return u;
  }, []);

  const curatedFavorites = useMemo(() => buildCuratedFavorites(products), [products]);
  const seasonalSpotlight = useMemo(() => curatedFavorites.slice(0, 2), [curatedFavorites]);

  const handleTrack = useCallback(() => {
    const clean = orderId.trim();
    if (!clean) return;
    navPush(router, { kind: 'legacyOrderTracking', orderId: clean }, navRole);
  }, [orderId, router, navRole]);

  const openOptions = (p: CuratedFavoriteItem) => {
    if (!p.fromCatalog) {
      navPush(router, { kind: 'tabsMenu' }, navRole);
      return;
    }
    const categoryLabel =
      p.category ?? (p.categoryId ? categories.find((c) => c.id === p.categoryId)?.name : undefined);
    setSheetProduct({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      image: p.image || p.img,
      type: p.type,
      category: categoryLabel,
    });
    sheetRef.current?.present();
  };

  const openProductOrMenu = (item: CuratedFavoriteItem) => {
    if (item.fromCatalog) {
      navPush(router, { kind: 'product', productId: item.id }, navRole);
    } else {
      navPush(router, { kind: 'tabsMenu' }, navRole);
    }
  };

  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    if (HERO_LOCAL_SLIDES.length < 2) return;
    const t = setInterval(() => setHeroSlide((i) => (i + 1) % HERO_LOCAL_SLIDES.length), 8000);
    return () => clearInterval(t);
  }, []);

  const scrollContentStyle = useMemo(
    () => [
      styles.content,
      {
        paddingBottom: 28 + tabBarBottomInset,
      },
      contentMaxW != null && {
        maxWidth: contentMaxW,
        width: '100%' as const,
        alignSelf: 'center' as const,
        paddingHorizontal: isWide ? 12 : 8,
      },
    ],
    [contentMaxW, isWide, tabBarBottomInset]
  );

  const favoritesData = useMemo(
    () => (menuLoading ? [] : curatedFavorites),
    [menuLoading, curatedFavorites]
  );

  const favoriteKeyExtractor = useCallback((item: CuratedFavoriteItem) => item.id, []);

  const renderFavoriteItem = useCallback<ListRenderItem<CuratedFavoriteItem>>(
    ({ item }) => {
      const price = Number(item.price);
      return (
        <View style={styles.favGridCell}>
          <View style={styles.favGridCard}>
            <TouchableOpacity
              onPress={() => openProductOrMenu(item)}
              activeOpacity={0.9}
              style={styles.favGridCardPressable}
            >
              <View style={styles.favGridImageBox}>
                <Image
                  source={homeImageForCuratedKey(item.curatedKey)}
                  style={styles.favGridImage}
                  contentFit="cover"
                />
              </View>
              <Text style={styles.favGridName} numberOfLines={2} ellipsizeMode="tail">
                {item.name}
              </Text>
              <Text style={styles.favGridPrice}>
                ${Number.isFinite(price) ? price.toFixed(2) : '—'}
              </Text>
              <View style={styles.favGridMeta}>
                <Text style={styles.favGridRating}>⭐ {RATING_DISPLAY}+</Text>
                <Text style={styles.favGridDot}>·</Text>
                <Ionicons name="time-outline" size={14} color="#64748B" />
                <Text style={styles.favGridTime}>{DELIVERY_WINDOW}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.favGridTray}
              onPress={() => openOptions(item)}
              activeOpacity={0.88}
            >
              <Text style={styles.favGridTrayText}>Add to Tray</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    [openProductOrMenu, openOptions]
  );

  const listHeader = useMemo(
    () => (
      <>
        <StatusBar barStyle="light-content" />

        <View style={[styles.homeTop, { paddingHorizontal: sectionPad }]}>
          <SearchBar
            value={homeSearch}
            onChangeText={setHomeSearch}
            placeholder="Search food, drinks, snacks…"
            wrapStyle={{ marginHorizontal: 0 }}
            onSubmitEditing={() => {
              const query = homeSearch.trim();
              if (query) {
                navPush(router, { kind: 'tabsMenu', q: query }, navRole);
              }
            }}
          />
          <View style={styles.quickCats}>
            {(
              [
                { kind: 'food' as const, label: 'Food' },
                { kind: 'drinks' as const, label: 'Drinks' },
                { kind: 'snacks' as const, label: 'Snacks' },
              ] as const
            ).map((row) => {
              const catMatch = findCategoryForKind(categories, row.kind);
              return (
                <TouchableOpacity
                  key={row.kind}
                  style={styles.quickCat}
                  onPress={() =>
                    navPush(
                      router,
                      catMatch ? { kind: 'tabsMenu', cat: catMatch.id } : { kind: 'tabsMenu' },
                      navRole
                    )
                  }
                  activeOpacity={0.88}
                >
                  <Text style={styles.quickCatLabel}>{row.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View
          style={[
            styles.hero,
            isWide && styles.heroWide,
            isRelaxed && !isWide && styles.heroTablet,
            { paddingTop: heroTopPad },
          ]}
        >
          <Image
            source={HERO_LOCAL_SLIDES[heroSlide % HERO_LOCAL_SLIDES.length]}
            style={styles.heroBgImage}
            contentFit="cover"
          />
          <View style={styles.heroDim} />
          <View style={[styles.heroInner, isWide && styles.heroInnerWide]}>
            <TouchableOpacity
              style={styles.profileLink}
              onPress={() => navPush(router, { kind: 'tabsProfile' }, navRole)}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Profile and help"
            >
              <Text style={styles.profileLinkText}>Profile</Text>
            </TouchableOpacity>
            <StmLogo size={isWide ? 58 : isRelaxed ? 52 : 48} style={styles.heroLogo} />
            <View style={styles.heroKickerRow}>
              <View style={styles.heroKickerLine} />
              <Text style={styles.heroKicker}>EST. 1988 · SINGAPORE</Text>
            </View>
            <Text style={[styles.heroHeadline, isWide && styles.heroHeadlineWide]}>
              Teh Tarik, kebab &amp; more
            </Text>
            <Text style={[styles.heroSub, isWide && styles.heroSubWide]}>
              Same spirit as stmsalam.sg
            </Text>
            <View style={styles.heroTagRow}>
              <Text style={styles.heroTag}>Halal ✓</Text>
              <Text style={styles.heroTag}>Live tracking ✓</Text>
            </View>
            <TouchableOpacity
              style={styles.chatAdmin}
              onPress={() => navPush(router, { kind: 'support' }, navRole)}
              activeOpacity={0.9}
            >
              <Ionicons name="chatbubbles-outline" size={18} color={GREEN} />
              <Text style={styles.chatAdminText}>Help Chat 💬</Text>
            </TouchableOpacity>
          </View>
        </View>

        <MinOrderMarquee />

        <View
          style={[
            styles.highlightsBlock,
            isWide && styles.highlightsBlockWide,
            !isWide && { marginHorizontal: sectionPad },
          ]}
        >
          <Text style={styles.seasonKicker}>Seasonal offer</Text>
          <Text style={styles.highlightsTitle}>Today&apos;s Highlights</Text>
          <Text style={styles.highlightsBody}>
            Enjoy selected favourites and seasonal specials, perfect for tea time, lunch, or evening cravings.
          </Text>
          {seasonalSpotlight.length > 0 ? (
            <View style={styles.seasonalRow}>
              {seasonalSpotlight.map((p) => (
                <TouchableOpacity
                  key={p.id}
                  style={styles.seasonCardFlex}
                  onPress={() => openProductOrMenu(p)}
                  activeOpacity={0.9}
                >
                  <View style={styles.seasonImageBox}>
                    <Image
                      source={homeImageForCuratedKey(p.curatedKey)}
                      style={styles.seasonImageFill}
                      contentFit="cover"
                    />
                  </View>
                  <Text style={styles.seasonCardName} numberOfLines={2} ellipsizeMode="tail">
                    {p.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}
          <TouchableOpacity
            style={styles.startOrderBtn}
            onPress={() => navPush(router, { kind: 'tabsMenu' }, navRole)}
            activeOpacity={0.9}
          >
            <Ionicons name="fast-food-outline" size={22} color={GREEN} />
            <Text style={styles.startOrderBtnText}>Start Your Order</Text>
            <Ionicons name="chevron-forward" size={20} color={GREEN} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.bannerWrap, { marginHorizontal: sectionPad }]}
          activeOpacity={0.92}
          onPress={() => navPush(router, { kind: 'tabsMenu' }, navRole)}
        >
          <Image source={images.bannerPromo} style={styles.bannerImg} contentFit="cover" />
          <View style={styles.bannerCap}>
            <Text style={styles.bannerTitle}>Seasonal &amp; gallery</Text>
            <Text style={styles.bannerSub}>Full menu lives on the Menu tab →</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { paddingHorizontal: sectionPad }]}>Customer Favorites</Text>
          <Text style={[styles.sectionSub, { paddingHorizontal: sectionPad }]}>
            Cold-pressed juices and chef favourites — rated by our regulars. Full menu on the Menu tab.
          </Text>
        </View>
      </>
    ),
    [
      heroSlide,
      isWide,
      isRelaxed,
      sectionPad,
      heroTopPad,
      seasonalSpotlight,
      router,
      openProductOrMenu,
    ]
  );

  const listFooter = useMemo(
    () => (
      <>
        <TouchableOpacity
          style={styles.menuTabHint}
          onPress={() => navPush(router, { kind: 'tabsMenu' }, navRole)}
          activeOpacity={0.85}
        >
          <Text style={styles.menuTabHintText}>Browse full menu</Text>
          <Ionicons name="arrow-forward-circle" size={22} color={GREEN} />
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { paddingHorizontal: sectionPad }]}>Explore STM Salam</Text>
          <Text style={[styles.sectionSub, { paddingHorizontal: sectionPad }]}>
            Tap a clip to play — a peek at how we prep and deliver.
          </Text>
          {exploreUseRowLayout ? (
            <View style={[styles.exploreRow, { paddingHorizontal: sectionPad }]}>
              {EXPLORE_CLIPS.map((c) => (
                <View key={c.id} style={styles.exploreRowCell}>
                  <ExploreClipCard uri={c.uri} caption={c.caption} />
                </View>
              ))}
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[styles.exploreHList, { paddingHorizontal: sectionPad }]}
            >
              {EXPLORE_CLIPS.map((c) => (
                <ExploreClipCard
                  key={c.id}
                  uri={c.uri}
                  caption={c.caption}
                  tileWidth={exploreScrollTileWidth}
                />
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.section}>
          <View style={[styles.aboutCard, { marginHorizontal: sectionPad }]}>
            <Image source={images.storeFront} style={styles.aboutThumb} contentFit="cover" />
            <View style={styles.aboutIconWrap}>
              <Ionicons name="storefront-outline" size={28} color={GREEN} />
            </View>
            <Text style={styles.aboutTitle}>About STM Salam</Text>
            <Text style={styles.aboutBody}>{ABOUT_COPY}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isWide && styles.sectionTitleWide, { paddingHorizontal: sectionPad }]}>
            Categories
          </Text>
          {isRelaxed ? (
            <View style={[styles.categoryGrid, { paddingHorizontal: sectionPad }]}>
              {menuLoading && categories.length === 0 ? (
                <ActivityIndicator color={GREEN} style={{ marginVertical: 16 }} />
              ) : null}
              {categories.map((item) => (
                <View key={item.id} style={categoryColStyle}>
                  <CategoryCard
                    category={item}
                    active={false}
                    variant="home"
                    style={styles.categoryCardFill}
                    onPress={() =>
                      navPush(router, { kind: 'tabsMenu', cat: item.id }, navRole)
                    }
                  />
                </View>
              ))}
            </View>
          ) : (
            <FlatList
              horizontal
              data={categories}
              keyExtractor={(c) => c.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[styles.hList, { paddingHorizontal: sectionPad }]}
              renderItem={({ item }) => (
                <CategoryCard
                  category={item}
                  active={false}
                  variant="home"
                  onPress={() =>
                    navPush(router, { kind: 'tabsMenu', cat: item.id }, navRole)
                  }
                />
              )}
              ListEmptyComponent={
                menuLoading ? <ActivityIndicator color={GREEN} style={{ marginLeft: 12 }} /> : null
              }
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { paddingHorizontal: sectionPad }]}>Track Your Order</Text>
          <Text style={[styles.sectionSub, { paddingHorizontal: sectionPad }]}>
            Enter your Order ID to see live status
          </Text>
          <View style={[styles.searchRow, { paddingHorizontal: sectionPad }]}>
            <SearchBar value={orderId} onChangeText={setOrderId} placeholder="e.g. STM-1713600000000" />
          </View>
          <TouchableOpacity
            style={[styles.trackGo, { marginHorizontal: sectionPad }, !orderId.trim() && styles.trackGoOff]}
            onPress={handleTrack}
            disabled={!orderId.trim()}
            activeOpacity={0.8}
          >
            <Text style={styles.trackGoText}>Track order</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.ctaBtn, { marginHorizontal: sectionPad }]}
            onPress={() => navPush(router, { kind: 'tabsOrders' }, navRole)}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaBtnText}>View All Orders</Text>
          </TouchableOpacity>
        </View>
      </>
    ),
    [
      sectionPad,
      exploreUseRowLayout,
      exploreScrollTileWidth,
      isWide,
      isRelaxed,
      menuLoading,
      categories,
      categoryColStyle,
      router,
      orderId,
      handleTrack,
      navRole,
    ]
  );

  const favoritesEmpty = useMemo(
    () =>
      menuLoading ? (
        <ActivityIndicator color={GREEN} style={{ marginTop: 16, marginBottom: 8 }} />
      ) : null,
    [menuLoading]
  );

  return (
    <SafeAreaView style={[styles.screen, Platform.OS === 'web' && styles.screenWeb]} edges={['top', 'left', 'right']}>
      <View style={styles.mainInner}>
        <FlatList
          key={numColumns}
          data={favoritesData}
          numColumns={numColumns}
          keyExtractor={favoriteKeyExtractor}
          renderItem={renderFavoriteItem}
          ListHeaderComponent={listHeader}
          ListFooterComponent={listFooter}
          ListEmptyComponent={favoritesEmpty}
          columnWrapperStyle={[styles.favColumnWrap, { paddingHorizontal: sectionPad }]}
          contentContainerStyle={scrollContentStyle}
          style={[styles.scroll, isWide && styles.scrollWide]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews
        />
      </View>
      <ProductOptionsBottomSheet
        ref={sheetRef}
        product={sheetProduct}
        onClose={() => setSheetProduct(null)}
        onAddToCart={({ quantity, unitPrice, options }: ProductOptionsPayload) => {
          if (!sheetProduct) return;
          addProduct(
            {
              id: sheetProduct.id,
              name: sheetProduct.name,
              price: unitPrice,
              image: sheetProduct.image,
              type: sheetProduct.type,
              category: sheetProduct.category,
            },
            quantity,
            options
          );
        }}
        onBuyNow={({ quantity, unitPrice, options }: ProductOptionsPayload) => {
          if (!sheetProduct) return;
          addProduct(
            {
              id: sheetProduct.id,
              name: sheetProduct.name,
              price: unitPrice,
              image: sheetProduct.image,
              type: sheetProduct.type,
              category: sheetProduct.category,
            },
            quantity,
            options
          );
          navPush(router, { kind: 'checkout' }, navRole);
        }}
      />
      <SupportFloatingButtons />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  screenWeb: {
    width: '100%',
    maxWidth: '100%',
    minHeight: 0,
  },
  mainInner: { flex: 1, minHeight: 0 },
  scroll: { flex: 1 },
  scrollWide: Platform.OS === 'web' ? { width: '100%' as const } : {},
  content: { flexGrow: 1 },

  homeTop: {
    paddingTop: 8,
    paddingBottom: 12,
    gap: 12,
  },
  quickCats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  quickCat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(1, 50, 32, 0.12)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
      },
      android: { elevation: 2 },
      web: { boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)' as unknown as never },
    }),
  },
  quickCatLabel: { fontSize: 14, fontWeight: '800', color: GREEN },

  favColumnWrap: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
  },
  favGridCell: {
    flex: 1,
    minWidth: 0,
    maxWidth: '100%',
    padding: 4,
  },
  favGridCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8EDF3',
    overflow: 'hidden',
    minWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  favGridCardPressable: { flex: 1 },
  favGridImageBox: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F1F5F9',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  favGridImage: { width: '100%', height: '100%' },
  favGridName: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 8,
    paddingHorizontal: 8,
    lineHeight: 18,
    minHeight: 36,
  },
  favGridPrice: {
    fontSize: 16,
    fontWeight: '900',
    color: GREEN,
    paddingHorizontal: 8,
    marginTop: 4,
  },
  favGridMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    paddingHorizontal: 8,
    marginTop: 6,
    marginBottom: 4,
  },
  favGridRating: { fontSize: 11, fontWeight: '800', color: '#0F172A' },
  favGridDot: { fontSize: 11, color: '#94A3B8', fontWeight: '700' },
  favGridTime: { fontSize: 11, fontWeight: '700', color: '#64748B' },
  favGridTray: {
    marginHorizontal: 8,
    marginBottom: 10,
    marginTop: 4,
    backgroundColor: 'rgba(1,50,32,0.1)',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  favGridTrayText: { color: GREEN, fontWeight: '900', fontSize: 12 },

  hero: {
    backgroundColor: GREEN,
    paddingBottom: 18,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  heroWide: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 26,
  },
  heroTablet: {
    paddingBottom: 20,
  },
  heroBgImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.35,
  },
  heroDim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(1,50,32,0.82)',
  },
  heroInner: {
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
    width: '100%',
    zIndex: 2,
  },
  heroInnerWide: { maxWidth: 720, alignSelf: 'center' },
  profileLink: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    zIndex: 2,
  },
  profileLinkText: { color: GOLD, fontWeight: '900', fontSize: 11 },
  heroLogo: { marginBottom: 4 },
  heroKickerRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2, marginBottom: 6 },
  heroKickerLine: { width: 22, height: 2, backgroundColor: GOLD },
  heroKicker: {
    color: GOLD,
    fontWeight: '800',
    letterSpacing: 1.6,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  heroHeadline: {
    fontSize: 22,
    fontWeight: '900',
    color: GOLD,
    letterSpacing: -0.5,
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: 8,
  },
  heroHeadlineWide: { fontSize: 28, lineHeight: 34, maxWidth: 560 },
  heroSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.78)',
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 12,
  },
  heroSubWide: { fontSize: 15, lineHeight: 22, maxWidth: 420 },
  heroTagRow: { flexDirection: 'row', gap: 8, marginTop: 12, flexWrap: 'wrap', justifyContent: 'center' },
  heroTag: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 4,
    color: GOLD,
    fontSize: 11,
    fontWeight: '700',
  },
  chatAdmin: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: GOLD,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 999,
  },
  chatAdminText: { color: GREEN, fontWeight: '900', fontSize: 12 },

  marqueeOuter: {
    backgroundColor: GOLD,
    marginTop: -14,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(1,50,32,0.15)',
  },
  marqueeClip: { overflow: 'hidden' },
  marqueeTrack: { flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap' },
  marqueeText: {
    color: GREEN,
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 0.2,
    flexShrink: 0,
  },

  highlightsBlock: {
    marginTop: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  highlightsBlockWide: { marginHorizontal: 0, padding: 28 },
  seasonKicker: {
    color: GOLD,
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  highlightsTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  highlightsBody: {
    color: '#64748B',
    lineHeight: 21,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  seasonalRow: { flexDirection: 'row', gap: 12, paddingVertical: 4 },
  seasonCardFlex: {
    flex: 1,
    minWidth: 0,
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  seasonImageBox: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#E2E8F0',
  },
  seasonImageFill: { width: '100%', height: '100%' },
  seasonCardName: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F172A',
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 44,
  },
  startOrderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: GOLD,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 6,
  },
  startOrderBtnText: { color: GREEN, fontWeight: '900', fontSize: 16 },

  exploreHList: { flexDirection: 'row', gap: 12, paddingVertical: 6, alignItems: 'flex-start' },
  exploreRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'stretch',
    paddingVertical: 6,
  },
  exploreRowCell: { flex: 1, minWidth: 0 },
  exploreCard: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  exploreCardFlex: {
    flex: 1,
    minWidth: 0,
    width: '100%',
  },
  exploreVideoAspectBox: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#0F172A',
    overflow: 'hidden',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    position: 'relative',
  },
  exploreVideoFill: {
    ...StyleSheet.absoluteFillObject,
  },
  explorePlayOverlayFill: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  exploreCaptionFlex: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    minHeight: 48,
  },
  exploreCaptionText: { fontSize: 13, fontWeight: '800', color: '#0F172A', lineHeight: 18 },

  aboutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E8EDF3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  aboutThumb: {
    width: '100%',
    height: 120,
    borderRadius: 14,
    marginBottom: 14,
    backgroundColor: '#F1F5F9',
  },
  aboutIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(1,50,32,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 10,
    letterSpacing: -0.2,
  },
  aboutBody: {
    fontSize: 14,
    lineHeight: 22,
    color: '#64748B',
    fontWeight: '600',
  },

  menuTabHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
    marginBottom: 8,
    paddingVertical: 8,
  },
  menuTabHintText: { color: GREEN, fontWeight: '800', fontSize: 15 },

  section: { marginTop: 24 },
  sectionTitle: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginBottom: 4 },
  sectionTitleWide: { fontSize: 22, marginBottom: 8 },
  sectionSub: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 14,
  },
  hList: { paddingVertical: 4 },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
    columnGap: 8,
    paddingVertical: 8,
  },
  categoryCardFill: { marginRight: 0, width: '100%' },
  bannerWrap: {
    marginTop: 8,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bannerImg: { width: '100%', aspectRatio: 2.05 },
  bannerCap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: 'rgba(1,50,32,0.55)',
  },
  bannerTitle: { color: '#fff', fontWeight: '900', fontSize: 18 },
  bannerSub: { color: GOLD, fontWeight: '800', fontSize: 13, marginTop: 4 },
  bannerFallback: {
    marginHorizontal: 20,
    padding: 18,
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bannerFallbackText: { textAlign: 'center', color: '#64748B', fontWeight: '700' },

  searchRow: { marginBottom: 10 },
  trackGo: {
    backgroundColor: GREEN,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  trackGoOff: { opacity: 0.4 },
  trackGoText: { color: '#fff', fontWeight: '900', fontSize: 15 },

  ctaBtn: {
    backgroundColor: GREEN,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: GREEN,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 5,
  },
  ctaBtnText: { color: '#FFFFFF', fontWeight: '900', fontSize: 16, letterSpacing: 0.3 },
});
