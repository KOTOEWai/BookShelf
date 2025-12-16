import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ShoppingCart, DollarSign, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      change: "+12.5%",
      icon: Users,
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      icon: ShoppingCart,
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+23.1%",
      icon: DollarSign,
    },
    {
      title: "Growth",
      value: "18.2%",
      change: "+4.3%",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your admin panel.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
