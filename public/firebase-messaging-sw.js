
// This file MUST be in the /public directory
// This file is required for Firebase Cloud Messaging to work in the background.

// Use the compat libraries for easier use in a service worker without a build step
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

// =================================================================
// PENTING: Ganti dengan konfigurasi project Firebase Anda!
// Anda bisa menemukannya di Project settings > General di Firebase Console.
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
// =================================================================


if (firebaseConfig.apiKey !== "YOUR_API_KEY_HERE") {
  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );

    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "/android-chrome-192x192.png", // Optional: pastikan ada file icon
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} else {
  console.log("Firebase messaging service worker not initialized. Missing config.");
}
