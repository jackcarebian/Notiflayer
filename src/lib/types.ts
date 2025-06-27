export type Outlet = {
  id: string;
  name: string;
  slug: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  interests: string[];
  registeredAt: string;
  outlet: string;
  redeemed: boolean;
};
