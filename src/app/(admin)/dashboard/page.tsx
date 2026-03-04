"use client"

import { motion } from "framer-motion"
import {
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  BookOpen,
  Calendar
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const stats = [
  {
    title: "Total Users",
    value: "2,543",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    title: "Revenue",
    value: "$45,231",
    change: "+23.1%",
    trend: "up",
    icon: DollarSign,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    title: "Growth",
    value: "18.2%",
    change: "-1.3%",
    trend: "down",
    icon: TrendingUp,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
]

const recentActivity = [
  { id: 1, type: "order", user: "John Doe", item: "The Great Gatsby", time: "2 mins ago" },
  { id: 2, type: "user", user: "Sarah Smith", action: "joined as Premium Member", time: "15 mins ago" },
  { id: 3, type: "book", user: "Admin", action: "added 5 new books to Sci-Fi", time: "1 hour ago" },
  { id: 4, type: "review", user: "Mike Ross", rating: 5, book: "1984", time: "3 hours ago" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
}

export default function AdminDashboard() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="space-y-10 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Calendar size={14} />
            <span className="text-xs font-medium uppercase tracking-wider">{currentDate}</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Welcome Back, <span className="text-accent underline decoration-accent/20 underline-offset-8">Admin</span>
          </h1>
          <p className="text-muted-foreground text-lg">Here's what's happening on your platform today.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3"
        >
          <Button variant="outline" className="rounded-xl border-accent/20 text-accent hover:bg-accent/5 font-bold h-11 px-6">
            Generate Report
          </Button>
          <Button className="rounded-xl font-bold h-11 px-6 gap-2 shadow-lg shadow-primary/20">
            <Plus size={18} /> Add New Entry
          </Button>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <Card className="group relative overflow-hidden border-none bg-card/40 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-500">
                <stat.icon size={120} />
              </div>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black tracking-tighter text-foreground mb-1">{stat.value}</div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`border-none px-0 font-black flex items-center gap-0.5 ${stat.trend === 'up' ? 'text-emerald-500' : 'text-orange-500'}`}
                  >
                    {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {stat.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-medium">vs last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Layout: Activity & Quick Actions */}
      <div className="grid gap-10 lg:grid-cols-3">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <TrendingUp className="text-accent" />
              Recent Activity
            </h2>
            <Button variant="link" className="text-accent font-bold uppercase tracking-widest text-[10px]">View Everything</Button>
          </div>

          <Card className="border-none bg-card/20 backdrop-blur-md shadow-xl divide-y divide-border/20">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-6 flex items-start justify-between group hover:bg-accent/5 transition-colors">
                <div className="flex gap-4">
                  <div className="mt-1 h-10 w-10 rounded-xl bg-background border border-border/50 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    {activity.type === 'order' && <ShoppingCart size={18} />}
                    {activity.type === 'user' && <Users size={18} />}
                    {activity.type === 'book' && <BookOpen size={18} />}
                    {activity.type === 'review' && <TrendingUp size={18} />}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">
                      {activity.user}{" "}
                      <span className="font-medium text-muted-foreground">
                        {activity.type === 'order' ? `purchased ${activity.item}` : activity.action ?? `reviewed ${activity.book}`}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Calendar size={10} /> {activity.time}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="rounded-lg h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={14} />
                </Button>
              </div>
            ))}
          </Card>
        </motion.div>

        {/* System Health / Quick Tools */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-black">System Status</h2>
          <Card className="p-8 border-none bg-primary text-primary-foreground shadow-2xl relative overflow-hidden group">
            <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <TrendingUp size={160} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-black uppercase tracking-widest opacity-80">All Systems Operational</span>
              </div>
              <p className="text-4xl font-black mb-2">99.9%</p>
              <p className="text-sm opacity-60">Uptime recorded this week. Server response time is optimal (124ms).</p>

              <Button variant="outline" className="mt-8 w-full border-white/20 hover:bg-white/10 text-white font-bold h-12 rounded-xl">
                Platform Diagnostics
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-none bg-accent/5 backdrop-blur-xl border border-accent/10">
            <h3 className="text-sm font-black uppercase tracking-widest text-accent mb-4">Quick Tip</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Did you know? You can now export your monthly revenue data directly as a formatted PDF from the Analytics tab.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
