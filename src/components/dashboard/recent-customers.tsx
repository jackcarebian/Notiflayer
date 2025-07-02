import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"

  const customers = [
    { name: 'Olivia Martin', email: 'olivia.martin@email.com', interests: ['Cafe', 'Resto'], outlet: 'Cafe Inyong' },
    { name: 'Jackson Lee', email: 'jackson.lee@email.com', interests: ['Kedai'], outlet: 'Kedai Kopi Inyong' },
    { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', interests: ['Aksesoris'], outlet: 'Ayu Aksesoris' },
    { name: 'William Kim', email: 'will@email.com', interests: ['Resto'], outlet: 'Madhang Enak' },
    { name: 'Sofia Davis', email: 'sofia.davis@email.com', interests: ['Cafe'], outlet: 'Cafe Inyong' },
  ]
  
  export function RecentCustomers() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pelanggan Terbaru</CardTitle>
          <CardDescription>
            26 pelanggan baru mendaftar hari ini.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8">
          {customers.map((customer, index) => (
            <div key={index} className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src={`https://placehold.co/40x40.png?text=${customer.name.charAt(0)}`} alt="Avatar" data-ai-hint="avatar" />
                <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">{customer.name}</p>
                <p className="text-sm text-muted-foreground">{customer.email}</p>
              </div>
              <div className="ml-auto flex flex-col items-end gap-1">
                 <div className="text-sm font-medium">{customer.outlet}</div>
                 <div className="flex gap-1">
                    {customer.interests.map(interest => (
                        <Badge key={interest} variant="outline">{interest}</Badge>
                    ))}
                 </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }