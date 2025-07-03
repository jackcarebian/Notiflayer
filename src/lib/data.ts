
// Mock data, in a real app this would come from a database.
export const members = [
    { id: 'usr_001', businessName: 'Cafe Inyong', owner: 'Budi Santoso', email: 'budi.s@example.com', status: 'Active', plan: 'Satu Cabang', joined: '2024-07-20' },
    { id: 'usr_002', businessName: 'Kedai Kopi Anyar', owner: 'Siti Aminah', email: 'siti.a@example.com', status: 'Trial', plan: 'Demo', joined: '2024-07-28' },
    { id: 'usr_003', businessName: 'Butik Elegan', owner: 'Dewi Lestari', email: 'dewi.l@example.com', status: 'Upgrade Pending', plan: 'Banyak Cabang', joined: '2024-06-15' },
    { id: 'usr_004', businessName: 'Toko Roti Lezat', owner: 'Ahmad Dahlan', email: 'ahmad.d@example.com', status: 'Expired', plan: 'Demo', joined: '2024-05-10' },
    { id: 'usr_005', businessName: 'Eka Galeri', owner: 'Eka Putri', email: 'ekagaleri@gmail.com', status: 'Active', plan: 'Satu Cabang', joined: '2024-08-01' },
    { id: 'usr_006', businessName: "Dita's Demo Shop", owner: 'Dita', email: 'dita.demo@example.com', status: 'Trial', plan: 'Demo', joined: new Date().toISOString().split('T')[0] },
];

export const memberAnalytics = [
  { id: 'usr_001', businessName: 'Cafe Inyong', overallRating: 'Sangat Baik', conversionRate: '18.5%', activeCampaigns: 2, totalCustomers: 85, aiSuggestion: 'Optimalkan kampanye "Promo Makanan" pada jam makan siang.' },
  { id: 'usr_002', businessName: 'Kedai Kopi Anyar', overallRating: 'Cukup Baik', conversionRate: '7.2%', activeCampaigns: 0, totalCustomers: 23, aiSuggestion: 'Luncurkan kampanye "Menu Baru" untuk menarik minat.' },
  { id: 'usr_003', businessName: 'Butik Elegan', overallRating: 'Baik', conversionRate: '12.8%', activeCampaigns: 4, totalCustomers: 150, aiSuggestion: 'Gunakan "Flash Sale" untuk item koleksi lama.' },
  { id: 'usr_004', businessName: 'Toko Roti Lezat', overallRating: 'Kurang Baik', conversionRate: '3.1%', activeCampaigns: 1, totalCustomers: 45, aiSuggestion: 'Tawarkan "Diskon Spesial" untuk pembelian di atas Rp 50.000.' },
  { id: 'usr_005', businessName: 'Eka Galeri', overallRating: 'Sangat Buruk', conversionRate: '0.5%', activeCampaigns: 0, totalCustomers: 12, aiSuggestion: 'Fokus pada pendaftaran pelanggan baru dengan promo selamat datang.' },
  { id: 'usr_006', businessName: "Dita's Demo Shop", overallRating: 'Cukup Baik', conversionRate: '0%', activeCampaigns: 0, totalCustomers: 0, aiSuggestion: 'Mulai dengan membuat kampanye selamat datang untuk pelanggan pertama.' },
];

export const allCustomers = [
    { customerId: 'cust_101', memberId: 'usr_001', name: 'Ahmad Dahlan', email: 'ahmad.d@example.com', outlet: 'Cafe Inyong', interests: ["Promo Makanan", "Diskon Spesial Hari Tertentu"] },
    { customerId: 'cust_102', memberId: 'usr_001', name: 'Siti Aminah', email: 'siti.a@example.com', outlet: 'Cafe Inyong', interests: ["Promo Minuman", "Menu Baru"] },
    { customerId: 'cust_103', memberId: 'usr_002', name: 'Charlie', email: 'charlie@example.com', outlet: 'Kedai Kopi Anyar', interests: ["Promo Minuman"] },
];

export const allCampaigns = [
    { campaignId: 'camp_abc', memberId: 'usr_001', name: 'Promo Nonton Bola Bareng', status: 'Sedang Berlangsung' },
    { campaignId: 'camp_def', memberId: 'usr_001', name: 'Diskon Liburan Sekolah Ceria', status: 'Akan Datang' },
    { campaignId: 'camp_ghi', memberId: 'usr_002', name: 'Flash Sale Kopi 7.7', status: 'Berakhir' },
];

export type Member = typeof members[0];
