import type { Outlet } from './types';

// This mock data is no longer used as outlets are now stored in Firestore.
// The array is kept to prevent breaking imports, but it should be empty.
export const outlets: Outlet[] = [];

export const promoInterests = {
    "Cafe / Resto / Foodcourt": [
        "Promo Makanan",
        "Promo Minuman",
        "Menu Baru",
        "Diskon Spesial Hari Tertentu"
    ],
    "Butik & Aksesoris": [
        "Promo Pakaian",
        "Promo Tas, Sepatu, Sandal",
        "Koleksi Terbaru",
        "Flash Sale"
    ],
    "Kosmetik & Skincare": [
        "Promo Makeup",
        "Promo Skincare",
        "Produk Baru",
        "Tips & Cara Pakai"
    ],
    "Elektronik & Gadget": [
        "Promo HP & Aksesoris",
        "Promo Laptop / Gadget",
        "Tips Perawatan / Penggunaan",
        "Barang Second Berkualitas"
    ],
    "Furnitur & Dekorasi": [
        "Promo Perabot Rumah",
        "Diskon Dekorasi Rumah Minimalis",
        "Produk Custom / Limited",
        "Tips Dekor Rumah"
    ],
    "Toko Kue & Snack": [
        "Promo Kue Ulang Tahun",
        "Snack Kekinian",
        "PO (Pre Order) Spesial",
        "Event Uji Coba Rasa Baru"
    ],
    "Salon & Perawatan": [
        "Diskon Potong Rambut",
        "Promo Creambath / Spa",
        "Jadwal Khusus Member",
        "Tips Perawatan Rambut di Rumah"
    ]
};
