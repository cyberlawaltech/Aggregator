"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BarChart3, Coins, TrendingUp, Wallet } from "lucide-react"
import { DataCard } from "@/components/data-card"
import { ChartWidget } from "@/components/chart-widget"
import { TokenSelectionColumn } from "@/components/token-selection-column"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

// Sample token data
const tokens = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    logo: "/placeholder.svg?height=32&width=32",
    price: 65000,
    change24h: 2.5,
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    logo: "/placeholder.svg?height=32&width=32",
    price: 3500,
    change24h: 3.2,
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    logo: "/placeholder.svg?height=32&width=32",
    price: 103.24,
    change24h: 12.5,
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    logo: "/placeholder.svg?height=32&width=32",
    price: 0.45,
    change24h: -1.3,
  },
  {
    id: "binancecoin",
    symbol: "BNB",
    name: "Binance Coin",
    logo: "/placeholder.svg?height=32&width=32",
    price: 570,
    change24h: 0.8,
  },
  {
    id: "ripple",
    symbol: "XRP",
    name: "XRP",
    logo: "/placeholder.svg?height=32&width=32",
    price: 0.52,
    change24h: -0.5,
  },
  {
    id: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    logo: "/placeholder.svg?height=32&width=32",
    price: 7.56,
    change24h: 6.1,
  },
  {
    id: "dogecoin",
    symbol: "DOGE",
    name: "Dogecoin",
    logo: "/placeholder.svg?height=32&width=32",
    price: 0.082,
    change24h: -5.3,
  },
  {
    id: "avalanche",
    symbol: "AVAX",
    name: "Avalanche",
    logo: "/placeholder.svg?height=32&width=32",
    price: 35.78,
    change24h: 8.2,
  },
  {
    id: "chainlink",
    symbol: "LINK",
    name: "Chainlink",
    logo: "/placeholder.svg?height=32&width=32",
    price: 14.75,
    change24h: -2.8,
  },
]

// Sample chart data for different tokens
const tokenChartData = {
  bitcoin: {
    price: [
      { name: "Jan", value: 29400 },
      { name: "Feb", value: 31200 },
      { name: "Mar", value: 33100 },
      { name: "Apr", value: 34500 },
      { name: "May", value: 38200 },
      { name: "Jun", value: 42100 },
      { name: "Jul", value: 46700 },
      { name: "Aug", value: 51300 },
      { name: "Sep", value: 57800 },
      { name: "Oct", value: 59200 },
      { name: "Nov", value: 62400 },
      { name: "Dec", value: 65000 },
    ],
    volume: [
      { name: "Jan", value: 12400 },
      { name: "Feb", value: 14100 },
      { name: "Mar", value: 15800 },
      { name: "Apr", value: 16200 },
      { name: "May", value: 18900 },
      { name: "Jun", value: 21500 },
      { name: "Jul", value: 25700 },
      { name: "Aug", value: 27300 },
      { name: "Sep", value: 30800 },
      { name: "Oct", value: 29200 },
      { name: "Nov", value: 32400 },
      { name: "Dec", value: 35000 },
    ],
  },
  ethereum: {
    price: [
      { name: "Jan", value: 1200 },
      { name: "Feb", value: 1500 },
      { name: "Mar", value: 1700 },
      { name: "Apr", value: 1900 },
      { name: "May", value: 2100 },
      { name: "Jun", value: 2300 },
      { name: "Jul", value: 2500 },
      { name: "Aug", value: 2700 },
      { name: "Sep", value: 2900 },
      { name: "Oct", value: 3100 },
      { name: "Nov", value: 3300 },
      { name: "Dec", value: 3500 },
    ],
    volume: [
      { name: "Jan", value: 8200 },
      { name: "Feb", value: 9100 },
      { name: "Mar", value: 10300 },
      { name: "Apr", value: 11200 },
      { name: "May", value: 12500 },
      { name: "Jun", value: 13800 },
      { name: "Jul", value: 15200 },
      { name: "Aug", value: 16700 },
      { name: "Sep", value: 18300 },
      { name: "Oct", value: 19900 },
      { name: "Nov", value: 21600 },
      { name: "Dec", value: 23400 },
    ],
  },
  solana: {
    price: [
      { name: "Jan", value: 35 },
      { name: "Feb", value: 42 },
      { name: "Mar", value: 48 },
      { name: "Apr", value: 55 },
      { name: "May", value: 62 },
      { name: "Jun", value: 68 },
      { name: "Jul", value: 75 },
      { name: "Aug", value: 82 },
      { name: "Sep", value: 88 },
      { name: "Oct", value: 95 },
      { name: "Nov", value: 102 },
      { name: "Dec", value: 108 },
    ],
    volume: [
      { name: "Jan", value: 3200 },
      { name: "Feb", value: 3800 },
      { name: "Mar", value: 4500 },
      { name: "Apr", value: 5300 },
      { name: "May", value: 6200 },
      { name: "Jun", value: 7100 },
      { name: "Jul", value: 8100 },
      { name: "Aug", value: 9200 },
      { name: "Sep", value: 10400 },
      { name: "Oct", value: 11700 },
      { name: "Nov", value: 13100 },
      { name: "Dec", value: 14600 },
    ],
  },
}

const recentTransactions = [
  {
    id: "0x1a2b3c",
    type: "Swap",
    from: "ETH",
    to: "USDC",
    amount: "1.5 ETH",
    value: "$2,745.00",
    time: "2 mins ago",
  },
  {
    id: "0x4d5e6f",
    type: "Transfer",
    from: "0x1a2...3b4c",
    to: "0x5e6...7f8g",
    amount: "25,000 USDC",
    value: "$25,000.00",
    time: "15 mins ago",
  },
  {
    id: "0x7g8h9i",
    type: "Liquidity",
    from: "ETH/USDC",
    to: "Pool",
    amount: "0.5 ETH + 915 USDC",
    value: "$1,830.00",
    time: "1 hour ago",
  },
  {
    id: "0xj0k1l",
    type: "NFT Purchase",
    from: "0x9a8...7b6c",
    to: "0x3d4...5e6f",
    amount: "CryptoPunk #7804",
    value: "$125,000.00",
    time: "3 hours ago",
  },
]

const topGainers = [
  { name: "SOL", price: "$103.24", change: 12.5 },
  { name: "AVAX", price: "$35.78", change: 8.2 },
  { name: "MATIC", price: "$0.98", change: 7.4 },
  { name: "DOT", price: "$7.56", change: 6.1 },
]

const topLosers = [
  { name: "DOGE", price: "$0.082", change: -5.3 },
  { name: "SHIB", price: "$0.00002", change: -4.7 },
  { name: "UNI", price: "$5.23", change: -3.9 },
  { name: "LINK", price: "$14.75", change: -2.8 },
]

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [selectedTokenId, setSelectedTokenId] = useState("bitcoin")
  const [priceData, setPriceData] = useState(tokenChartData.bitcoin.price)
  const [volumeData, setVolumeData] = useState(tokenChartData.bitcoin.volume)
  const [selectedToken, setSelectedToken] = useState(tokens.find((t) => t.id === "bitcoin"))

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Update chart data when token changes
    const tokenData = tokenChartData[selectedTokenId as keyof typeof tokenChartData]
    if (tokenData) {
      setPriceData(tokenData.price)
      setVolumeData(tokenData.volume)
    }

    // Update selected token
    const token = tokens.find((t) => t.id === selectedTokenId)
    if (token) {
      setSelectedToken(token)
    }
  }, [selectedTokenId])

  const handleSelectToken = (tokenId: string) => {
    setSelectedTokenId(tokenId)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight truncate">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your Web3 Data Aggregator dashboard.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <DataCard title="Total Market Cap" value="$2.45T" change={3.2} icon={<TrendingUp className="h-4 w-4" />} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <DataCard title="24h Volume" value="$78.2B" change={-1.8} icon={<BarChart3 className="h-4 w-4" />} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <DataCard title="BTC Dominance" value="48.2%" change={0.5} icon={<Coins className="h-4 w-4" />} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <DataCard
            title="Portfolio Value"
            value={`$${selectedToken ? (Number(selectedToken.price) * 0.376).toLocaleString(undefined, { maximumFractionDigits: 2 }) : "0.00"}`}
            change={selectedToken ? selectedToken.change24h : 0}
            icon={<Wallet className="h-4 w-4" />}
          />
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="md:col-span-3"
        >
          <ChartWidget
            title={`${selectedToken ? selectedToken.name : "Bitcoin"} Price`}
            data={priceData}
            dataKey="value"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="md:col-span-1"
        >
          <TokenSelectionColumn tokens={tokens} selectedTokenId={selectedTokenId} onSelectToken={handleSelectToken} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="md:col-span-3"
        >
          <ChartWidget
            title={`${selectedToken ? selectedToken.name : "Bitcoin"} Trading Volume`}
            data={volumeData}
            dataKey="value"
            color="#8b5cf6"
          />
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg truncate">Recent Transactions</CardTitle>
              <CardDescription>Latest activity across all chains</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left font-medium py-3 px-4">Type</th>
                      <th className="text-left font-medium py-3 px-4">From</th>
                      <th className="text-left font-medium py-3 px-4">To</th>
                      <th className="text-left font-medium py-3 px-4">Amount</th>
                      <th className="text-right font-medium py-3 px-4">Value</th>
                      <th className="text-right font-medium py-3 px-4">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                        <td className="py-3 px-4">{tx.type}</td>
                        <td className="py-3 px-4 font-mono text-xs">{tx.from}</td>
                        <td className="py-3 px-4 font-mono text-xs">{tx.to}</td>
                        <td className="py-3 px-4">{tx.amount}</td>
                        <td className="py-3 px-4 text-right">{tx.value}</td>
                        <td className="py-3 px-4 text-right text-gray-400">{tx.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" size="sm">
                  View All Transactions
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.9 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg truncate">Top Gainers & Losers</CardTitle>
              <CardDescription>24h price movement</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <Tabs defaultValue="gainers">
                <TabsList className="grid grid-cols-2 mx-6">
                  <TabsTrigger value="gainers">Gainers</TabsTrigger>
                  <TabsTrigger value="losers">Losers</TabsTrigger>
                </TabsList>
                <TabsContent value="gainers" className="pt-4">
                  <div className="space-y-1">
                    {topGainers.map((coin) => (
                      <div key={coin.name} className="flex items-center justify-between px-6 py-2 hover:bg-gray-800/50">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center">
                            {coin.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{coin.name}</div>
                            <div className="text-sm text-gray-400">{coin.price}</div>
                          </div>
                        </div>
                        <div className="text-green-500">+{coin.change}%</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="losers" className="pt-4">
                  <div className="space-y-1">
                    {topLosers.map((coin) => (
                      <div key={coin.name} className="flex items-center justify-between px-6 py-2 hover:bg-gray-800/50">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center">
                            {coin.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{coin.name}</div>
                            <div className="text-sm text-gray-400">{coin.price}</div>
                          </div>
                        </div>
                        <div className="text-red-500">{coin.change}%</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
