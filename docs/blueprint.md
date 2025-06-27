# **App Name**: Notiflayer

## Core Features:

- Outlet-Specific QR Codes: Generate QR codes, each directing to a registration page specific to one of these four local outlets: 'Madhang Enak', 'Ayu Aksesoris', 'Cafe Inyong', and 'Kedai Kopi Inyong'.
- Dashboard: The main dashboard will visualize customer data (new vs. returning), registration data (total sign-ups), and promo redemption rates, sortable per outlet and overall.
- Registration Form: Form that captures customer details and promo preferences.
- Web Push Notifications: Allow the use of Firebase Cloud Messaging (FCM) via a service worker, after the customer's express consent through a browser permission request. Persist the customer's FCM token for the delivery of push notifications.
- Promo Redemption System: Provide an interface, protected by role-based access controls, where cashiers can validate the QR code displayed on a customer's device.
- Enhanced Security Features: LLM tool to validate an email during registration and also the QR code before delivery notifications, improving security and filtering bot signups.

## Style Guidelines:

- Primary color: Blue (#2563EB) to inspire trust and signal technological sophistication, for buttons, links, and prominent accents.
- Background color: Light gray (#F9FAFB) for a clean, modern, and professional canvas, reducing visual fatigue.
- Accent color: Yellow (#F59E0B), used selectively for highlighting interactive elements such as the call-to-action button and form field outlines to draw the user's eye.
- Headline font: 'Space Grotesk' sans-serif, for headlines. This will give the app a tech-forward, bold feel that is appropriate for drawing users' attention in notification-based marketing.
- Body font: 'Inter' sans-serif, for body text. This combination ensures readability and modernity, improving user comprehension.
- Use a set of modern, flat icons in a consistent style, related to promotion, messaging, and local business themes.
- Employ a grid-based layout system with sufficient white space and clear visual hierarchy, adapting seamlessly to various screen sizes. The primary navigation should remain clearly visible at all times, ensuring straightforward access to key functions.