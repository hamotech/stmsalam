importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

// You must initialize Firebase in the SW as well
const firebaseConfig = {
  // We'll read these from URL params injected during SW registration, or hardcode generic placeholders.
  // Actually, V9/V10 compat allows initialization without full keys if only messaging is used, but it's best to have them.
  // For production, the builder injects it, but here we can just define an empty shell and let the SDK handle it.
};

firebase.initializeApp({
  apiKey: "PLACEHOLDER", // This will be ignored mostly by the SW but needed for init
  projectId: "teh-tarik-app-my-own",
  messagingSenderId: "1234567890", // User must provide this in reality or it fails. We'll leave dummy.
  appId: "1:1234567890:web:abc"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
