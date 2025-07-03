import { db } from '@/lib/firebase-admin';
import type { Outlet } from '@/lib/types';
import { notFound } from 'next/navigation';
import { PrintClientComponent } from './print-client';

async function getOutlet(slug: string): Promise<Outlet | null> {
    try {
        const outletSnapshot = await db.collection('outlets').where('slug', '==', slug).limit(1).get();
        if (outletSnapshot.empty) {
            return null;
        }
        const doc = outletSnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as Outlet;
    } catch (e) {
        console.error("Failed to fetch outlet by slug:", e);
        return null;
    }
}

export default async function PrintQrPage({ params }: { params: { slug: string } }) {
    const outlet = await getOutlet(params.slug);
    
    if (!outlet) {
        notFound();
    }
    
    return <PrintClientComponent outlet={outlet} />;
}
