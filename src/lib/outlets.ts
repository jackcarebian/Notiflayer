
import type { Outlet } from './types';

export const outlets: Outlet[] = [
  { id: '1', name: 'Madhang Enak', slug: 'madhang-enak' },
  { id: '2', name: 'Ayu Aksesoris', slug: 'ayu-aksesoris' },
  { id: '3', name: 'Cafe Inyong', slug: 'cafe-inyong' },
  { id: '4', name: 'Kedai Kopi Inyong', slug: 'kedai-kopi-inyong' },
];

export const interests = ['Cafe', 'Kedai', 'Resto', 'Aksesoris'];

export const promoInterests = {
  "🍽️ Cafe / Resto / Foodcourt": ["Promo Makanan", "Promo Minuman", "Menu Baru", "Diskon Hari Tertentu"],
  "👗 Butik & Aksesoris": ["Promo Pakaian", "Promo Aksesoris", "Koleksi Terbaru", "Flash Sale"],
  "💄 Kosmetik & Skincare": ["Promo Makeup", "Promo Skincare", "Produk Baru", "Tutorial Singkat"],
  "📱 Elektronik & Gadget": ["Promo HP", "Promo Laptop", "Tips Penggunaan", "Barang Bekas Bagus"],
  "🏠 Furnitur & Dekorasi": ["Promo Perabot", "Dekor Diskon", "Produk Custom", "Tips Dekor"],
  "🧁 Toko Kue & Snack": ["Promo Kue Ultah", "Snack Kekinian", "PO Spesial", "Uji Coba Rasa"],
  "💇 Salon & Perawatan": ["Diskon Potong", "Creambath/Spa", "Jadwal Member", "Tips Rambut"]
};
