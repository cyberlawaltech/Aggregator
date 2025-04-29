"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, Save, BarChart, LineChart, PieChart, Share, Code, History } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { SqlEditor } from "@/components/sql-editor"
import { DataTable } from "@/components/explorer/data-table"
import { DataVisualization } from "@/components/explorer/data-visualization"
import { QueryTemplates } from "@/components/explorer/query-templates"
import { QueryHistory } from "@/components/explorer/query-history"

export default function DataExplorerPage() {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("query")
  const [queryResults, setQueryResults] = useState<any[] | null>(null)
  const [visualizationType, setVisualizationType] = useState<"table" | "bar" | "line" | "pie">("table")
  const [currentQuery, setCurrentQuery] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleExecuteQuery = (query: string) => {
    setIsLoading(true)
    setCurrentQuery(query)

    // Simulate API call to execute query
    setTimeout(() => {
      // Generate mock data based on the query
      const mockData = generateMockData(query)
      setQueryResults(mockData)
      setIsLoading(false)
    }, 1500)
  }

  const generateMockData = (query: string) => {
    // Simple mock data generator based on query content
    if (query.toLowerCase().includes("token_symbol") && query.toLowerCase().includes("total_volume")) {
      return [
        { token_symbol: "ETH", total_volume: 2500000000, avg_price: 3450.75 },
        { token_symbol: "BTC", total_volume: 8500000000, avg_price: 65420.1 },
        { token_symbol: "SOL", total_volume: 950000000, avg_price: 145.2 },
        { token_symbol: "LINK", total_volume: 320000000, avg_price: 14.75 },
        { token_symbol: "UNI", total_volume: 180000000, avg_price: 10.85 },
        { token_symbol: "AAVE", total_volume: 120000000, avg_price: 92.3 },
        { token_symbol: "MATIC", total_volume: 450000000, avg_price: 0.98 },
        { token_symbol: "AVAX", total_volume: 380000000, avg_price: 35.78 },
      ]
    } else if (query.toLowerCase().includes("unique_wallets")) {
      return [
        { day: "2023-04-01", unique_wallets: 125000, transactions: 850000 },
        { day: "2023-04-02", unique_wallets: 132000, transactions: 890000 },
        { day: "2023-04-03", unique_wallets: 128000, transactions: 870000 },
        { day: "2023-04-04", unique_wallets: 145000, transactions: 950000 },
        { day: "2023-04-05", unique_wallets: 160000, transactions: 1050000 },
        { day: "2023-04-06", unique_wallets: 155000, transactions: 980000 },
        { day: "2023-04-07", unique_wallets: 170000, transactions: 1100000 },
      ]
    } else if (query.toLowerCase().includes("nft") || query.toLowerCase().includes("collection_name")) {
      return [
        { collection_name: "Bored Ape Yacht Club", sales: 125, volume: 2850000 },
        { collection_name: "CryptoPunks", sales: 98, volume: 2350000 },
        { collection_name: "Azuki", sales: 215, volume: 1950000 },
        { collection_name: "Doodles", sales: 178, volume: 890000 },
        { collection_name: "CloneX", sales: 145, volume: 1250000 },
        { collection_name: "Moonbirds", sales: 132, volume: 1050000 },
      ]
    } else {
      // Default data
      return [
        { metric: "Total Transactions", value: 15250000, change: 5.2 },
        { metric: "Unique Addresses", value: 2450000, change: 3.8 },
        { metric: "Gas Used", value: 45000000000, change: -2.1 },
        { metric: "Average Gas Price", value: 25, change: -8.5 },
        { metric: "Active DApps", value: 1250, change: 12.3 },
      ]
    }
  }

  const handleSaveQuery = () => {
    // In a real app, this would save to a database
    alert("Query saved successfully!")
  }

  const handleExportResults = () => {
    // In a real app, this would export to CSV/JSON
    alert("Results exported successfully!")
  }

  if (!mounted) return null

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Data Explorer</h1>
        <p className="text-muted-foreground">Query and visualize blockchain data with SQL-like syntax.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-3"
        >
          <Card className="border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Query Editor</CardTitle>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="border-gray-800" onClick={() => setActiveTab("history")}>
                  <History className="mr-2 h-4 w-4" />
                  History
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-800"
                  onClick={() => setActiveTab("templates")}
                >
                  <Code className="mr-2 h-4 w-4" />
                  Templates
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="query" className="m-0">
                  <SqlEditor onExecute={handleExecuteQuery} isLoading={isLoading} />
                </TabsContent>
                <TabsContent value="templates" className="m-0">
                  <QueryTemplates
                    onSelectTemplate={(query) => {
                      setCurrentQuery(query)
                      setActiveTab("query")
                    }}
                  />
                </TabsContent>
                <TabsContent value="history" className="m-0">
                  <QueryHistory
                    onSelectQuery={(query) => {
                      setCurrentQuery(query)
                      setActiveTab("query")
                    }}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="md:col-span-1"
        >
          <Card className="border-gray-800 h-full">
            <CardHeader>
              <CardTitle>Query Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Execution Time</h3>
                  <p className="text-sm">{isLoading ? "Running..." : queryResults ? "1.2 seconds" : "Not executed"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Rows Returned</h3>
                  <p className="text-sm">{queryResults ? queryResults.length : "0"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Data Size</h3>
                  <p className="text-sm">{queryResults ? "2.4 KB" : "0 KB"}</p>
                </div>
                <div className="pt-4">
                  <Button className="w-full" disabled={!queryResults} onClick={handleSaveQuery}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Query
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {queryResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Query Results</CardTitle>
              <div className="flex items-center gap-2">
                <div className="border border-gray-800 rounded-md p-1 flex">
                  <Button
                    size="sm"
                    variant={visualizationType === "table" ? "default" : "ghost"}
                    className="h-8 px-2"
                    onClick={() => setVisualizationType("table")}
                  >
                    Table
                  </Button>
                  <Button
                    size="sm"
                    variant={visualizationType === "bar" ? "default" : "ghost"}
                    className="h-8 px-2"
                    onClick={() => setVisualizationType("bar")}
                  >
                    <BarChart className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={visualizationType === "line" ? "default" : "ghost"}
                    className="h-8 px-2"
                    onClick={() => setVisualizationType("line")}
                  >
                    <LineChart className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={visualizationType === "pie" ? "default" : "ghost"}
                    className="h-8 px-2"
                    onClick={() => setVisualizationType("pie")}
                  >
                    <PieChart className="h-4 w-4" />
                  </Button>
                </div>
                <Button size="sm" variant="outline" className="border-gray-800" onClick={handleExportResults}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button size="sm" variant="outline" className="border-gray-800">
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {visualizationType === "table" ? (
                <DataTable data={queryResults} />
              ) : (
                <DataVisualization data={queryResults} type={visualizationType} />
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
