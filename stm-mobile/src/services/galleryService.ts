import { collection, onSnapshot, orderBy, query, type Unsubscribe } from 'firebase/firestore';
import { db } from './firebase';

export interface GalleryItem {
  id: string;
  url?: string;
  title?: string;
  active?: boolean;
  createdAt?: unknown;
}

export function subscribeGallery(
  onData: (items: GalleryItem[]) => void,
  onError?: (e: Error) => void
): Unsubscribe {
  const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryItem));
      onData(items.filter((i) => i.active !== false));
    },
    (err) => {
      console.error('[galleryService]', err);
      onError?.(err as Error);
    }
  );
}
