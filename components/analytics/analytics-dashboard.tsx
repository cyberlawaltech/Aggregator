"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share, Star, StarOff, BarChart3, PieChart, LineChart, Plus, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface AnalyticsDashboardProps {
  viewMode: "grid" | "list"
  searchQuery: string
}

interface Dashboard {
  id: string
  title: string
  description: string
  lastUpdated: string
  charts: number
  views: number
  starred: boolean
  thumbnail: string
  chartTypes: Array<"bar" | "line" | "pie">
}

const mockDashboards: Dashboard[] = [
  {
    id: "defi-overview",
    title: "DeFi Market Overview",
    description: "Key metrics and trends in decentralized finance",
    lastUpdated: "2023-04-10",
    charts: 8,
    views: 1250,
    starred: true,
    thumbnail: "defi",
    chartTypes: ["bar", "line", "pie"],
  },
  {
    id: "eth-gas",
    title: "Ethereum Gas Analysis",
    description: "Gas price trends and usage patterns",
    lastUpdated: "2023-04-08",
    charts: 5,
    views: 980,
    starred: true,
    thumbnail: "gas",
    chartTypes: ["line", "bar"],
  },
  {
    id: "nft-market",
    title: "NFT Market Insights",
    description: "Sales volume and collection performance",
    lastUpdated: "2023-04-05",
    charts: 6,
    views: 750,
    starred: false,
    thumbnail: "nft",
    chartTypes: ["bar", "pie"],
  },
  {
    id: "wallet-activity",
    title: "Wallet Activity Tracker",
    description: "User engagement and transaction patterns",
    lastUpdated: "2023-04-01",
    charts: 4,
    views: 520,
    starred: false,
    thumbnail: "wallet",
    chartTypes: ["line", "bar"],
  },
]

export function AnalyticsDashboard({ viewMode, searchQuery }: AnalyticsDashboardProps) {
  const [dashboards, setDashboards] = useState<Dashboard[]>(mockDashboards)

  const filteredDashboards = dashboards.filter(
    (dashboard) =>
      dashboard.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dashboard.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleStar = (id: string) => {
    setDashboards(
      dashboards.map((dashboard) => (dashboard.id === id ? { ...dashboard, starred: !dashboard.starred } : dashboard)),
    )
  }

  const getChartIcons = (types: Array<"bar" | "line" | "pie">) => {
    return (
      <div className="flex gap-1">
        {types.includes("bar") && <BarChart3 className="h-3 w-3 text-gray-400" />}
        {types.includes("line") && <LineChart className="h-3 w-3 text-gray-400" />}
        {types.includes("pie") && <PieChart className="h-3 w-3 text-gray-400" />}
      </div>
    )
  }

  const getThumbnailGradient = (type: string) => {
    switch (type) {
      case "defi":
        return "from-blue-500/20 to-purple-500/20"
      case "gas":
        return "from-green-500/20 to-blue-500/20"
      case "nft":
        return "from-pink-500/20 to-purple-500/20"
      case "wallet":
        return "from-orange-500/20 to-red-500/20"
      default:
        return "from-gray-500/20 to-gray-700/20"
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">My Dashboards</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Dashboard
        </Button>
      </div>

      {filteredDashboards.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 mb-4">
            <BarChart3 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium mb-2">No dashboards found</h3>
          <p className="text-gray-400 mb-4">Create your first dashboard or try a different search term</p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Dashboard
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDashboards.map((dashboard, index) => (
            <motion.div
              key={dashboard.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-gray-800 overflow-hidden h-full flex flex-col">
                <Link href={`/analytics/${dashboard.id}`} className="flex-1">
                  <div
                    className={`h-32 bg-gradient-to-br ${getThumbnailGradient(
                      dashboard.thumbnail,
                    )} flex items-center justify-center`}
                  >
                    <div className="flex gap-3">
                      {dashboard.chartTypes.map((type, i) => (
                        <div key={i} className="h-16 w-16 bg-gray-800/50 rounded-md flex items-center justify-center">
                          {type === "bar" && <BarChart3 className="h-8 w-8 text-white/70" />}
                          {type === "line" && <LineChart className="h-8 w-8 text-white/70" />}
                          {type === "pie" && <PieChart className="h-8 w-8 text-white/70" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
                <CardContent className="p-4 flex-1">
                  <div className="flex items-start justify-between">
                    <Link href={`/analytics/${dashboard.id}`} className="hover:underline">
                      <h3 className="font-medium">{dashboard.title}</h3>
                    </Link>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleStar(dashboard.id)}>
                      {dashboard.starred ? (
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ) : (
                        <StarOff className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{dashboard.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-400">
                    <span>{dashboard.charts} charts</span>
                    <span className="mx-2">•</span>
                    <span>{dashboard.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Share className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Export</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDashboards.map((dashboard, index) => (
            <motion.div
              key={dashboard.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Card className="border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-16 w-16 bg-gradient-to-br ${getThumbnailGradient(
                        dashboard.thumbnail,
                      )} rounded-md flex items-center justify-center`}
                    >
                      {getChartIcons(dashboard.chartTypes)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Link href={`/analytics/${dashboard.id}`} className="hover:underline">
                          <h3 className="font-medium">{dashboard.title}</h3>
                        </Link>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleStar(dashboard.id)}
                          >
                            {dashboard.starred ? (
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff className="h-4 w-4" />
                            )}
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Share className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem>Export</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{dashboard.description}</p>
                      <div className="flex items-center text-xs text-gray-400 mt-2">
                        <span>Last updated: {dashboard.lastUpdated}</span>
                        <span className="mx-2">•</span>
                        <span>{dashboard.charts} charts</span>
                        <span className="mx-2">•</span>
                        <span>{dashboard.views} views</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
