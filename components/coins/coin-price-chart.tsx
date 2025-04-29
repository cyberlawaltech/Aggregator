"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { Card } from "@/components/ui/card"

interface CoinPriceChartProps {
  data: any[]
  timeRange: string
}

export function CoinPriceChart({ data, timeRange }: CoinPriceChartProps) {
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null)

  // Filter data based on time range
  const filteredData = data.filter((item) => {
    if (timeRange === "24h") return item.timestamp >= Date.now() - 24 * 60 * 60 * 1000
    if (timeRange === "7d") return item.timestamp >= Date.now() - 7 * 24 * 60 * 60 * 1000
    if (timeRange === "30d") return item.timestamp >= Date.now() - 30 * 24 * 60 * 60 * 1000
    if (timeRange === "90d") return item.timestamp >= Date.now() - 90 * 24 * 60 * 60 * 1000
    if (timeRange === "1y") return item.timestamp >= Date.now() - 365 * 24 * 60 * 60 * 1000
    return true // "max" or any other value
  })

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    if (timeRange === "24h") {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
    if (timeRange === "7d" || timeRange === "30d") {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
    return date.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" })
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const price = payload[0].value
      setHoveredPrice(price)
      return (
        <Card className="border-gray-800 bg-dark-100 p-3">
          <div className="text-sm font-medium">${price.toLocaleString()}</div>
          <div className="text-xs text-gray-400">{formatDate(payload[0].payload.timestamp)}</div>
        </Card>
      )
    }
    return null
  }

  const priceMin = Math.min(...filteredData.map((d) => d.price)) * 0.995
  const priceMax = Math.max(...filteredData.map((d) => d.price)) * 1.005
  const lastPrice = filteredData[filteredData.length - 1]?.price

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={filteredData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
        <XAxis
          dataKey="timestamp"
          tickFormatter={formatDate}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9ca3af", fontSize: 12 }}
          dy={10}
        />
        <YAxis
          domain={[priceMin, priceMax]}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9ca3af", fontSize: 12 }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          width={80}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={lastPrice} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#0ea5e9"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: "#0ea5e9", strokeWidth: 0 }}
          fillOpacity={1}
          fill="url(#colorPrice)"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
