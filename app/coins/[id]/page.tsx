"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Globe,
  Twitter,
  MessageCircle,
  Star,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Code,
  Share,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { CoinPriceChart } from "@/components/coins/coin-price-chart"
import { CoinStats } from "@/components/coins/coin-stats"
import { CoinMarkets } from "@/components/coins/coin-markets"
import { mockCoinsData, mockCoinHistoricalData, mockCoinMarkets } from "@/lib/mock-data"

export default function CoinDetailPage() {
  const params = useParams()
  const coinId = params.id as string
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [coin, setCoin] = useState<any>(null)
  const [timeRange, setTimeRange] = useState("7d")
  const [chartData, setChartData] = useState<any[]>([])
  const [markets, setMarkets] = useState<any[]>([])
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Simulate API loading
    const timer = setTimeout(() => {
      const foundCoin = mockCoinsData.find((c) => c.id === coinId)
      setCoin(foundCoin)
      setChartData(mockCoinHistoricalData)
      setMarkets(mockCoinMarkets)
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [coinId])

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // In a real app, you would save this to user preferences
  }

  if (!mounted) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/coins">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Coins
          </Link>
        </Button>
      </div>

      {isLoading || !coin ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-[200px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
          <Skeleton className="h-[400px] w-full" />
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
                <span className="text-2xl">{coin.symbol.charAt(0)}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{coin.name}</h1>
                  <Badge variant="outline" className="border-gray-700">
                    {coin.symbol.toUpperCase()}
                  </Badge>
                  <Badge variant={coin.category === "defi" ? "secondary" : "default"} className="capitalize">
                    {coin.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>Rank #{coin.market_cap_rank}</span>
                  <span>•</span>
                  <span>On {coin.watchlist_count.toLocaleString()} watchlists</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={isFavorite ? "default" : "outline"}
                size="sm"
                onClick={toggleFavorite}
                className={!isFavorite ? "border-gray-800" : ""}
              >
                <Star className={`mr-1 h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                {isFavorite ? "Favorited" : "Add to Favorites"}
              </Button>
              <Button variant="outline" size="icon" className="border-gray-800">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="grid gap-6 md:grid-cols-3"
          >
            <Card className="border-gray-800 md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-2xl font-bold">${Number(coin.current_price).toLocaleString()}</CardTitle>
                  <CardDescription
                    className={`flex items-center ${
                      Number(coin.price_change_percentage_24h) >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {Number(coin.price_change_percentage_24h) >= 0 ? (
                      <ChevronUp className="mr-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="mr-1 h-4 w-4" />
                    )}
                    {Math.abs(Number(coin.price_change_percentage_24h)).toFixed(2)}% (24h)
                  </CardDescription>
                </div>
                <Tabs value={timeRange} onValueChange={setTimeRange} className="hidden sm:block">
                  <TabsList className="grid grid-cols-6 h-8">
                    <TabsTrigger value="24h" className="text-xs">
                      24H
                    </TabsTrigger>
                    <TabsTrigger value="7d" className="text-xs">
                      7D
                    </TabsTrigger>
                    <TabsTrigger value="30d" className="text-xs">
                      30D
                    </TabsTrigger>
                    <TabsTrigger value="90d" className="text-xs">
                      90D
                    </TabsTrigger>
                    <TabsTrigger value="1y" className="text-xs">
                      1Y
                    </TabsTrigger>
                    <TabsTrigger value="max" className="text-xs">
                      MAX
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <Tabs value={timeRange} onValueChange={setTimeRange} className="block sm:hidden mb-4">
                  <TabsList className="grid grid-cols-6 h-8">
                    <TabsTrigger value="24h" className="text-xs">
                      24H
                    </TabsTrigger>
                    <TabsTrigger value="7d" className="text-xs">
                      7D
                    </TabsTrigger>
                    <TabsTrigger value="30d" className="text-xs">
                      30D
                    </TabsTrigger>
                    <TabsTrigger value="90d" className="text-xs">
                      90D
                    </TabsTrigger>
                    <TabsTrigger value="1y" className="text-xs">
                      1Y
                    </TabsTrigger>
                    <TabsTrigger value="max" className="text-xs">
                      MAX
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="h-[350px]">
                  <CoinPriceChart data={chartData} timeRange={timeRange} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800">
              <CardHeader>
                <CardTitle>Market Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CoinStats coin={coin} />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="border-gray-800">
              <CardHeader>
                <CardTitle>About {coin.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-invert max-w-none">
                  <p>
                    {coin.description ||
                      `${coin.name} is a cryptocurrency that aims to provide a decentralized solution for ${coin.category} applications. It was created to address challenges in the existing blockchain ecosystem and offers unique features that set it apart from other cryptocurrencies.`}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <Button variant="outline" size="sm" className="border-gray-800">
                    <Globe className="mr-2 h-4 w-4" />
                    Website
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-800">
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-800">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Community
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-800">
                    <Code className="mr-2 h-4 w-4" />
                    Source Code
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="border-gray-800">
              <CardHeader>
                <CardTitle>Markets</CardTitle>
                <CardDescription>Where to buy and sell {coin.symbol.toUpperCase()}</CardDescription>
              </CardHeader>
              <CardContent>
                <CoinMarkets markets={markets} coinSymbol={coin.symbol.toUpperCase()} />
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </div>
  )
}
