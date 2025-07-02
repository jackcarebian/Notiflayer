import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="font-bold text-xl mb-4">Notiflayer</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className="hover:underline">Dashboard</Link>
          <Link href="/admin/outlets" className="hover:underline">Outlets</Link>
          <Link href="/admin/campaign" className="hover:underline">Campaigns</Link>
          <Link href="/" className="hover:underline mt-4">Logout</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
