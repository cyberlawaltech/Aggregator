"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface DataVisualizationProps {
  data: any[]
  type: "bar" | "line" | "pie"
}

export function DataVisualization({ data, type }: DataVisualizationProps) {
  const [dimensions, setDimensions] = useState({
    xAxis: Object.keys(data[0])[0],
    yAxis: Object.keys(data[0]).find((key) => typeof data[0][key] === "number") || Object.keys(data[0])[1],
  })

  const [chartColors, setChartColors] = useState<string[]>([])

  useEffect(() => {
    // Generate colors based on data length
    const colors = [
      "#0ea5e9", // primary
      "#8b5cf6", // secondary
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#6366f1",
      "#ec4899",
      "#14b8a6",
    ]

    const generatedColors = data.map((_, i) => colors[i % colors.length])
    setChartColors(generatedColors)
  }, [data])

  const numericColumns = Object.keys(data[0]).filter((key) => typeof data[0][key] === "number")
  const categoricalColumns = Object.keys(data[0]).filter((key) => typeof data[0][key] !== "number")

  const handleXAxisChange = (value: string) => {
    setDimensions((prev) => ({ ...prev, xAxis: value }))
  }

  const handleYAxisChange = (value: string) => {
    setDimensions((prev) => ({ ...prev, yAxis: value }))
  }

  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey={dimensions.xAxis}
                angle={-45}
                textAnchor="end"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
                height={70}
              />
              <YAxis
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#ffffff" }}
              />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
              <Bar dataKey={dimensions.yAxis} fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        )
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey={dimensions.xAxis}
                angle={-45}
                textAnchor="end"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
                height={70}
              />
              <YAxis
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#ffffff" }}
              />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
              <Line type="monotone" dataKey={dimensions.yAxis} stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        )
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <Pie
                data={data}
                dataKey={dimensions.yAxis}
                nameKey={dimensions.xAxis}
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label={(entry) => entry.name}
                labelLine={{ stroke: "rgba(255,255,255,0.5)", strokeWidth: 1 }}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#ffffff" }}
              />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
            </PieChart>
          </ResponsiveContainer>
        )
      default:
        return <div>Select a visualization type</div>
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="x-axis">X-Axis</Label>
          <Select value={dimensions.xAxis} onValueChange={handleXAxisChange}>
            <SelectTrigger id="x-axis" className="bg-dark-100 border-gray-800">
              <SelectValue placeholder="Select X-Axis" />
            </SelectTrigger>
            <SelectContent>
              {categoricalColumns.map((column) => (
                <SelectItem key={column} value={column}>
                  {column}
                </SelectItem>
              ))}
              {numericColumns.map((column) => (
                <SelectItem key={column} value={column}>
                  {column}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="y-axis">Y-Axis</Label>
          <Select value={dimensions.yAxis} onValueChange={handleYAxisChange}>
            <SelectTrigger id="y-axis" className="bg-dark-100 border-gray-800">
              <SelectValue placeholder="Select Y-Axis" />
            </SelectTrigger>
            <SelectContent>
              {numericColumns.map((column) => (
                <SelectItem key={column} value={column}>
                  {column}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-gray-800">
        <CardContent className="p-4">{renderChart()}</CardContent>
      </Card>
    </div>
  )
}
