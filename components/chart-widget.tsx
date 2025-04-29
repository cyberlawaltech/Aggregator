"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, type TooltipProps } from "recharts"
import type { AxisDomain } from "recharts/types/util/types"

interface ChartWidgetProps {
  title: string
  data: any[]
  dataKey: string
  timeRanges?: string[]
  color?: string
  height?: number
  yAxisDomain?: AxisDomain
  formatYAxis?: (value: number) => string
  formatTooltip?: (value: number) => string
}

export function ChartWidget({
  title,
  data,
  dataKey,
  timeRanges = ["1D", "1W", "1M", "3M", "1Y", "ALL"],
  color = "#0ea5e9",
  height = 300,
  yAxisDomain = ["auto", "auto"],
  formatYAxis = (value) => `$${value.toLocaleString()}`,
  formatTooltip = (value) => `$${value.toLocaleString()}`,
}: ChartWidgetProps) {
  const [activeRange, setActiveRange] = useState(timeRanges[2])

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-100 border border-gray-800 p-3 rounded-lg shadow-lg">
          <p className="text-gray-400 text-xs">{label}</p>
          <p className="font-medium text-sm">{formatTooltip(payload[0].value as number)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <Tabs defaultValue={activeRange} onValueChange={setActiveRange}>
          <TabsList className="grid grid-cols-6 h-7">
            {timeRanges.map((range) => (
              <TabsTrigger key={range} value={range} className="text-xs">
                {range}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                domain={yAxisDomain}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickFormatter={formatYAxis}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: color, strokeWidth: 0 }}
                fillOpacity={1}
                fill={`url(#gradient-${dataKey})`}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
