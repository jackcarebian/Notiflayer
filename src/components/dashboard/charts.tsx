"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const customerChartData = [
  { date: "2025-06-21", newCustomers: 12 },
  { date: "2025-06-22", newCustomers: 15 },
  { date: "2025-06-23", newCustomers: 22 },
  { date: "2025-06-24", newCustomers: 18 },
  { date: "2025-06-25", newCustomers: 25 },
  { date: "2025-06-26", newCustomers: 20 },
  { date: "2025-06-27", newCustomers: 26 },
]

const outletChartData = [
    { outlet: "Cafe Inyong", customers: 850, fill: "var(--color-chart-1)" },
]

const chartConfig = {
  customers: {
    label: "Customers",
  },
  newCustomers: {
    label: "Pelanggan Baru",
    color: "hsl(var(--primary))",
  },
  "Cafe Inyong": {
    label: "Cafe Inyong",
    color: "hsl(var(--chart-1))",
  },
}

export function CustomerCharts() {
  return (
     <Card>
      <CardHeader>
        <CardTitle>Analitik Pelanggan</CardTitle>
        <CardDescription>Grafik Pelanggan Baru per Hari dan Distribusi per Outlet</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-2 text-center">Pelanggan Baru</h3>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={customerChartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    />
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar dataKey="newCustomers" fill="var(--color-newCustomers)" radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
        <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2 text-center">Pelanggan per Outlet</h3>
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square h-[200px]"
                >
                <PieChart>
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                    data={outletChartData}
                    dataKey="customers"
                    nameKey="outlet"
                    innerRadius={60}
                    strokeWidth={5}
                    />
                    <Legend content={({ payload }) => {
                        return (
                            <ul className="flex flex-wrap gap-x-4 justify-center mt-4 text-sm">
                            {payload?.map((entry, index) => (
                                <li key={`item-${index}`} className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                {entry.value}
                                </li>
                            ))}
                            </ul>
                        )
                    }} />
                </PieChart>
            </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tren naik 5.2% bulan ini <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Menampilkan data pendaftaran pelanggan baru dan distribusinya.
        </div>
      </CardFooter>
    </Card>
  )
}
