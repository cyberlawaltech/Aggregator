"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, StarOff, BarChart3, PieChart, LineChart, Copy, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface AnalyticsCommunityProps {
  viewMode: "grid" | "list"
  searchQuery: string
}

interface CommunityDashboard {
  id: string
  title: string
  description: string
  author: string
  authorAvatar: string
  category: string
  charts: number
  views: number
  likes: number
  starred: boolean
  thumbnail: string
  chartTypes: Array<"bar" | "line" | "pie">
  createdAt: string
}

const mockCommunityDashboards: CommunityDashboard[] = [
  {
    id: "eth-ecosystem",
    title: "Ethereum Ecosystem Overview",
    description: "Comprehensive analysis of the Ethereum ecosystem",
    author: "crypto_analyst",
    authorAvatar: "CA",
    category: "Ethereum",
    charts: 12,
    views: 8750,
    likes: 342,
    starred: false,
    thumbnail: "ethereum",
    chartTypes: ["bar", "line", "pie"],
    createdAt: "2023-04-05",
  },
  {
    id: "defi-summer-2023",
    title: "DeFi Summer 2023 Analysis",
    description: "Trends and insights from DeFi activity in Summer 2023",
    author: "defi_researcher",
    authorAvatar: "DR",
    category: "DeFi",
    charts: 9,
    views: 6250,
    likes: 285,
    starred: true,
    thumbnail: "defi",
    chartTypes: ["line", "bar"],
    createdAt: "2023-03-28",
  },
  {
    id: "nft-market-trends",
    title: "NFT Market Trends Q2 2023",
    description: "Analysis of NFT sales, floor prices, and market activity",
    author: "nft_watcher",
    authorAvatar: "NW",
    category: "NFTs",
    charts: 8,
    views: 5120,
    likes: 198,
    starred: false,
    thumbnail: "nft",
    chartTypes: ["bar", "line"],
    createdAt: "2023-03-15",
  },
  {
    id: "layer2-comparison",
    title: "Layer 2 Solutions Comparison",
    description: "Comparing performance and adoption of L2 scaling solutions",
    author: "scaling_expert",
    authorAvatar: "SE",
    category: "Layer 2",
    charts: 10,
    views: 7350,
    likes: 312,
    starred: false,
    thumbnail: "layer2",
    chartTypes: ["bar", "pie"],
    createdAt: "2023-03-10",
  },
  {
    id: "stablecoin-analysis",
    title: "Stablecoin Market Analysis",
    description: "Deep dive into stablecoin usage, flows, and market share",
    author: "stable_researcher",
    authorAvatar: "SR",
    category: "Stablecoins",
    charts: 7,
    views: 4850,
    likes: 176,
    starred: true,
    thumbnail: "stablecoin",
    chartTypes: ["pie", "line"],
    createdAt: "2023-03-05",
  },
]

export function AnalyticsCommunity({ viewMode, searchQuery }: AnalyticsCommunityProps) {
  const [dashboards, setDashboards] = useState<CommunityDashboard[]>(mockCommunityDashboards)

  const filteredDashboards = dashboards.filter(
    (dashboard) =>
      dashboard.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dashboard.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dashboard.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dashboard.author.toLowerCase().includes(searchQuery.toLowerCase()),
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
      case "ethereum":
        return "from-blue-500/20 to-purple-500/20"
      case "defi":
        return "from-green-500/20 to-blue-500/20"
      case "nft":
        return "from-pink-500/20 to-purple-500/20"
      case "layer2":
        return "from-cyan-500/20 to-blue-500/20"
      case "stablecoin":
        return "from-yellow-500/20 to-orange-500/20"
      default:
        return "from-gray-500/20 to-gray-700/20"
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Community Dashboards</h2>
      </div>

      {filteredDashboards.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 mb-4">
            <User className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium mb-2">No community dashboards found</h3>
          <p className="text-gray-400">Try a different search term</p>
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
                <Link href={`/analytics/community/${dashboard.id}`} className="flex-1">
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
                    <div>
                      <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                        {dashboard.category}
                      </Badge>
                      <Link href={`/analytics/community/${dashboard.id}`} className="hover:underline">
                        <h3 className="font-medium mt-2">{dashboard.title}</h3>
                      </Link>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleStar(dashboard.id)}>
                      {dashboard.starred ? (
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ) : (
                        <StarOff className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{dashboard.description}</p>
                  <div className="flex items-center mt-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-xs">
                      {dashboard.authorAvatar}
                    </div>
                    <span className="ml-2 text-sm">{dashboard.author}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-400">
                    <span>{dashboard.views} views</span>
                    <span className="mx-2">•</span>
                    <span>{dashboard.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" className="border-gray-800">
                      <Copy className="mr-2 h-3 w-3" />
                      Clone
                    </Button>
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
                        <div>
                          <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                            {dashboard.category}
                          </Badge>
                          <Link href={`/analytics/community/${dashboard.id}`} className="hover:underline">
                            <h3 className="font-medium mt-1">{dashboard.title}</h3>
                          </Link>
                        </div>
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
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{dashboard.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-xs">
                            {dashboard.authorAvatar}
                          </div>
                          <span className="ml-2 text-sm">{dashboard.author}</span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-xs text-gray-400">{dashboard.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-xs text-gray-400">
                            <span>{dashboard.views} views</span>
                            <span className="mx-2">•</span>
                            <span>{dashboard.likes} likes</span>
                          </div>
                          <Button variant="outline" size="sm" className="border-gray-800">
                            <Copy className="mr-2 h-3 w-3" />
                            Clone
                          </Button>
                        </div>
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
