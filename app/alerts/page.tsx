"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Filter, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AlertForm } from "@/components/alert-form"
import { AlertList } from "@/components/alerts/alert-list"
import { AlertHistory } from "@/components/alerts/alert-history"
import { AlertTemplates } from "@/components/alerts/alert-templates"

export default function AlertsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("active")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewAlertForm, setShowNewAlertForm] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Real-Time Monitoring & Alerts</h1>
        <p className="text-muted-foreground">Set up custom alerts for blockchain events and transactions.</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="w-full sm:w-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:w-auto">
              <TabsTrigger value="active" className="relative">
                Active
                <Badge className="ml-1 bg-primary text-primary-foreground">12</Badge>
              </TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search alerts..."
              className="pl-9 bg-dark-100 border-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="border-gray-800">
            <Filter className="h-4 w-4" />
          </Button>
          <Button onClick={() => setShowNewAlertForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Alert
          </Button>
        </div>
      </div>

      {showNewAlertForm && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Create New Alert</CardTitle>
                <CardDescription>Set up a custom alert for blockchain events</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowNewAlertForm(false)}>
                Cancel
              </Button>
            </CardHeader>
            <CardContent>
              <AlertForm onComplete={() => setShowNewAlertForm(false)} />
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Wrap all TabsContent components in a single Tabs component */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="active" className="m-0 space-y-6">
          <AlertList searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="history" className="m-0 space-y-6">
          <AlertHistory searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="templates" className="m-0 space-y-6">
          <AlertTemplates searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
