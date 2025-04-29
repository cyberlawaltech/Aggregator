"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, BarChart3, PieChart, LineChart, Copy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface AnalyticsTemplatesProps {
  viewMode: "grid" | "list"
  searchQuery: string
}

interface Template {
  id: string
  title: string
  description: string
  category: string
  charts: number
  downloads: number
  thumbnail: string
  chartTypes: Array<"bar" | "line" | "pie">
  difficulty: "beginner" | "intermediate" | "advanced"
}

const mockTemplates: Template[] = [
  {
    id: "defi-dashboard",
    title: "DeFi Protocol Dashboard",
    description: "Complete overview of DeFi protocol metrics",
    category: "DeFi",
    charts: 10,
    downloads: 2450,
    thumbnail: "defi",
    chartTypes: ["bar", "line", "pie"],
    difficulty: "intermediate",
  },
  {
    id: "nft-tracker",
    title: "NFT Collection Tracker",
    description: "Track floor prices, volume, and sales for NFT collections",
    category: "NFTs",
    charts: 8,
    downloads: 1850,
    thumbnail: "nft",
    chartTypes: ["line", "bar"],
    difficulty: "beginner",
  },
  {
    id: "token-analytics",
    title: "Token Analytics Suite",
    description: "Comprehensive token metrics and market analysis",
    category: "Tokens",
    charts: 12,
    downloads: 3200,
    thumbnail: "token",
    chartTypes: ["bar", "line", "pie"],
    difficulty: "advanced",
  },
  {
    id: "dao-governance",
    title: "DAO Governance Tracker",
    description: "Monitor proposals, votes, and governance activity",
    category: "Governance",
    charts: 6,
    downloads: 980,
    thumbnail: "dao",
    chartTypes: ["bar", "pie"],
    difficulty: "intermediate",
  },
  {
    id: "dex-metrics",
    title: "DEX Trading Metrics",
    description: "Track volume, liquidity, and trading activity on DEXes",
    category: "DeFi",
    charts: 9,
    downloads: 2100,
    thumbnail: "dex",
    chartTypes: ["line", "bar"],
    difficulty: "intermediate",
  },
  {
    id: "wallet-profiler",
    title: "Wallet Profiler",
    description: "Analyze wallet activity and portfolio composition",
    category: "Wallets",
    charts: 7,
    downloads: 1650,
    thumbnail: "wallet",
    chartTypes: ["pie", "bar"],
    difficulty: "beginner",
  },
]

export function AnalyticsTemplates({ viewMode, searchQuery }: AnalyticsTemplatesProps) {
  const filteredTemplates = mockTemplates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
      case "nft":
        return "from-pink-500/20 to-purple-500/20"
      case "token":
        return "from-green-500/20 to-blue-500/20"
      case "dao":
        return "from-yellow-500/20 to-orange-500/20"
      case "dex":
        return "from-cyan-500/20 to-blue-500/20"
      case "wallet":
        return "from-orange-500/20 to-red-500/20"
      default:
        return "from-gray-500/20 to-gray-700/20"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "intermediate":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "advanced":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Dashboard Templates</h2>
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 mb-4">
            <BarChart3 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium mb-2">No templates found</h3>
          <p className="text-gray-400">Try a different search term</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-gray-800 overflow-hidden h-full flex flex-col">
                <Link href={`/analytics/templates/${template.id}`} className="flex-1">
                  <div
                    className={`h-32 bg-gradient-to-br ${getThumbnailGradient(
                      template.thumbnail,
                    )} flex items-center justify-center`}
                  >
                    <div className="flex gap-3">
                      {template.chartTypes.map((type, i) => (
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
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                          {template.category}
                        </Badge>
                        <Badge variant="outline" className={`capitalize ${getDifficultyColor(template.difficulty)}`}>
                          {template.difficulty}
                        </Badge>
                      </div>
                      <Link href={`/analytics/templates/${template.id}`} className="hover:underline">
                        <h3 className="font-medium mt-2">{template.title}</h3>
                      </Link>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-400">
                    <span>{template.charts} charts</span>
                    <span className="mx-2">•</span>
                    <span>{template.downloads} downloads</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" className="border-gray-800">
                      <Copy className="mr-2 h-3 w-3" />
                      Use Template
                    </Button>
                    <Button variant="default" size="sm">
                      <Download className="mr-2 h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Card className="border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-16 w-16 bg-gradient-to-br ${getThumbnailGradient(
                        template.thumbnail,
                      )} rounded-md flex items-center justify-center`}
                    >
                      {getChartIcons(template.chartTypes)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                          {template.category}
                        </Badge>
                        <Badge variant="outline" className={`capitalize ${getDifficultyColor(template.difficulty)}`}>
                          {template.difficulty}
                        </Badge>
                      </div>
                      <Link href={`/analytics/templates/${template.id}`} className="hover:underline">
                        <h3 className="font-medium">{template.title}</h3>
                      </Link>
                      <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-xs text-gray-400">
                          <span>{template.charts} charts</span>
                          <span className="mx-2">•</span>
                          <span>{template.downloads} downloads</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="border-gray-800">
                            <Copy className="mr-2 h-3 w-3" />
                            Use Template
                          </Button>
                          <Button variant="default" size="sm">
                            <Download className="mr-2 h-3 w-3" />
                            Download
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
