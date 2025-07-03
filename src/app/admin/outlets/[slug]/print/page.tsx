
'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { PrintClientComponent } from './print-client';
import { getOutletBySlugAction } from '@/app/actions';
import type { Outlet } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function PrintPageSkeleton() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="container mx-auto p-8 max-w-2xl text-center">
                <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
                <Skeleton className="h-6 w-1/2 mx-auto mb-16" />
                <Skeleton className="h-[316px] w-[316px] mx-auto rounded-2xl" />
                <Skeleton className="h-12 w-3/4 mx-auto mt-8" />
            </div>
        </div>
    );
}

export default function PrintQrPage({ params }: { params: { slug: string } }) {
    const [outlet, setOutlet] = useState<Outlet | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOutlet = async () => {
            const result = await getOutletBySlugAction(params.slug);
            if (result.success && result.outlet) {
                setOutlet(result.outlet);
            } else {
                notFound();
            }
            setLoading(false);
        };
        
        if (params.slug) {
            fetchOutlet();
        }
    }, [params.slug]);
    
    if (loading) {
        return <PrintPageSkeleton />;
    }
    
    if (!outlet) {
        return notFound();
    }
    
    return <PrintClientComponent outlet={outlet} />;
}
