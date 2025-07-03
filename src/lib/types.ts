export type Outlet = {
  id: string; // doc id from firestore
  name: string;
  slug: string;
  address: string;
  category: string;
  memberId: string; // The ID of the member this outlet belongs to
};

export type Member = {
  id: string; // doc id from firestore
  businessName: string;
  owner: string;
  email: string;
  status: 'Active' | 'Trial' | 'Upgrade Pending' | 'Expired';
  plan: 'Satu Cabang' | 'Banyak Cabang' | 'Multi Bisnis' | 'Demo';
  joined: string; // ISO date string
  address?: string;
  postalCode?: string;
  businessType?: string;
  whatsappNumber?: string;
  planId?: string;
};
