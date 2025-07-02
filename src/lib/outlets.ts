import type { Outlet } from './types';

export const outlets: Outlet[] = [
  {
    id: 1,
    name: 'Cafe Inyong',
    slug: 'cafe-inyong',
    address: 'Jl. Pahlawan No. 123, Kota Tegal',
    category: 'Cafe',
  },
];

export const promoInterests = {
    "🍽️ Cafe / Resto / Foodcourt": [
        "Promo Makanan",
        "Promo Minuman",
        "Menu Baru",
        "Diskon Spesial Hari Tertentu"
    ],
    "👗 Butik & Aksesoris": [
        "Promo Pakaian",
        "Promo Tas, Sepatu, Sandal",
        "Koleksi Terbaru",
        "Flash Sale"
    ],
    "💄 Kosmetik & Skincare": [
        "Promo Makeup",
        "Promo Skincare",
        "Produk Baru",
        "Tips & Cara Pakai"
    ],
    "📱 Elektronik & Gadget": [
        "Promo HP & Aksesoris",
        "Promo Laptop / Gadget",
        "Tips Perawatan / Penggunaan",
        "Barang Second Berkualitas"
    ],
    "🏠 Furnitur & Dekorasi": [
        "Promo Perabot Rumah",
        "Diskon Dekorasi Rumah Minimalis",
        "Produk Custom / Limited",
        "Tips Dekor Rumah"
    ],
    "🧁 Toko Kue & Snack": [
        "Promo Kue Ulang Tahun",
        "Snack Kekinian",
        "PO (Pre Order) Spesial",
        "Event Uji Coba Rasa Baru"
    ],
    "💇 Salon & Perawatan": [
        "Diskon Potong Rambut",
        "Promo Creambath / Spa",
        "Jadwal Khusus Member",
        "Tips Perawatan Rambut di Rumah"
    ]
};
