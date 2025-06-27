import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { QrCode } from "lucide-react"

export default function RedeemPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-headline">Redeem Promo</CardTitle>
        <CardDescription>
          Scan QR code promo pelanggan untuk validasi.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-6">
        <div className="p-8 bg-primary/10 rounded-full">
            <QrCode className="h-20 w-20 text-primary" />
        </div>
        <Button size="lg" className="w-full">
          Scan QR Code
        </Button>
      </CardContent>
    </Card>
  )
}
