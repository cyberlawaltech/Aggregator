"use client"

import { useState, useEffect } from "react"
import { Filter, Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { AnalyticsTemplates } from "@/components/analytics/analytics-templates"
import { AnalyticsCommunity } from "@/components/analytics/analytics-community"

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboards")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Advanced Analytics Hub</h1>
        <p className="text-muted-foreground">Create, explore, and share blockchain analytics dashboards.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="dashboards">My Dashboards</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Input
                type="search"
                placeholder="Search dashboards..."
                className="bg-dark-100 border-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="border-gray-800">
              <Filter className="h-4 w-4" />
            </Button>
            <div className="border border-gray-800 rounded-md p-1 flex">
              <Button
                size="sm"
                variant={viewMode === "grid" ? "default" : "ghost"}
                className="h-8 w-8 p-0"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === "list" ? "default" : "ghost"}
                className="h-8 w-8 p-0"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <TabsContent value="dashboards">
            <AnalyticsDashboard viewMode={viewMode} searchQuery={searchQuery} />
          </TabsContent>
          <TabsContent value="templates">
            <AnalyticsTemplates viewMode={viewMode} searchQuery={searchQuery} />
          </TabsContent>
          <TabsContent value="community">
            <AnalyticsCommunity viewMode={viewMode} searchQuery={searchQuery} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
