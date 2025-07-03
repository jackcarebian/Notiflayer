export type Outlet = {
  id: number;
  name: string;
  slug: string;
  address: string;
  category: string;
};

export type Member = {
  id: string; // doc id from firestore
  businessName: string;
  owner: string;
  email: string;
  status: 'Active' | 'Trial' | 'Upgrade Pending' | 'Expired';
  plan: 'Satu Cabang' | 'Banyak Cabang' | 'Multi Bisnis' | 'Demo';
  joined: string; // ISO date string
};
