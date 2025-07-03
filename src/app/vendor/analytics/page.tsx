
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, TrendingUp, TrendingDown, Meh, Smile, Frown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { memberAnalytics } from "@/lib/data";

type AnalyticsRating = 'Sangat Baik' | 'Baik' | 'Cukup Baik' | 'Kurang Baik' | 'Sangat Buruk';

const getPerformanceDetails = (rating: AnalyticsRating): { variant: "default" | "secondary" | "outline" | "destructive", icon: React.ReactNode, className?: string } => {
  switch (rating) {
    case 'Sangat Baik':
      return { variant: 'default', icon: <Smile className="h-4 w-4" /> };
    case 'Baik':
      return { variant: 'secondary', icon: <TrendingUp className="h-4 w-4" /> };
    case 'Cukup Baik':
      return { variant: 'outline', icon: <Meh className="h-4 w-4" /> };
    case 'Kurang Baik':
      return { variant: 'outline', icon: <TrendingDown className="h-4 w-4" />, className: "border-destructive/50 text-destructive" };
    case 'Sangat Buruk':
      return { variant: 'destructive', icon: <Frown className="h-4 w-4" /> };
    default:
      return { variant: 'outline', icon: <Meh className="h-4 w-4" /> };
  }
};

export default function VendorAnalyticsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                 <BarChart className="h-8 w-8 text-primary" />
                 <div>
                    <h1 className="text-2xl font-bold tracking-tight">Analitik Performa Member</h1>
                    <p className="text-muted-foreground">
                        Ringkasan performa kampanye dari semua member outlet Anda.
                    </p>
                 </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {memberAnalytics.map((member) => {
                    const { variant, icon, className } = getPerformanceDetails(member.overallRating as AnalyticsRating);
                    
                    return (
                        <Card key={member.id} className="flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start gap-2">
                                    <CardTitle className="flex-1">{member.businessName}</CardTitle>
                                    <Badge variant={variant} className={cn("flex items-center gap-1.5 whitespace-nowrap", className)}>
                                        {icon}
                                        <span>{member.overallRating}</span>
                                    </Badge>
                                </div>
                                <CardDescription>ID Member: {member.id}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm flex-grow">
                               <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tingkat Konversi</span>
                                    <span className="font-bold">{member.conversionRate}</span>
                               </div>
                               <div className="flex justify-between">
                                    <span className="text-muted-foreground">Kampanye Aktif</span>
                                    <span className="font-bold">{member.activeCampaigns}</span>
                               </div>
                               <div className="flex justify-between">
                                    <span className="text-muted-foreground">Total Pelanggan</span>
                                    <span className="font-bold">{member.totalCustomers}</span>
                               </div>
                            </CardContent>
                             <div className="p-6 pt-0 mt-2">
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 text-blue-800">
                                   <Sparkles className="h-5 w-5 mt-0.5 text-blue-600 flex-shrink-0" />
                                   <p className="text-xs">
                                     <span className="font-bold">Saran AI: </span>{member.aiSuggestion}
                                   </p>
                               </div>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}
