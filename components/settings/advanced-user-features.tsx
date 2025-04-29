import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Code, Download, Zap, Cog } from "lucide-react"

export function AdvancedUserFeatures() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Advanced User Features</h3>

      {/* API Access */}
      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">API Access</CardTitle>
            <Code className="h-4 w-4 text-purple-400" />
          </div>
          <CardDescription>Programmatic access to platform data and functionality</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="api-key"
                  value="••••••••••••••••••••••••••"
                  readOnly
                  className="font-mono bg-gray-800 border-gray-700"
                />
                <Button variant="outline" className="shrink-0 border-gray-700">
                  Regenerate
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Use this key to authenticate API requests from your applications
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Rate Limiting</Label>
                <p className="text-xs text-muted-foreground">Current limit: 100 requests/minute</p>
              </div>
              <Button variant="outline" size="sm" className="border-gray-700">
                Upgrade
              </Button>
            </div>
            <Button variant="secondary" className="w-full">
              <Code className="mr-2 h-4 w-4" />
              View API Documentation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Custom Triggers */}
      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Custom Triggers</CardTitle>
            <Zap className="h-4 w-4 text-yellow-400" />
          </div>
          <CardDescription>Create advanced conditional triggers for alerts and actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md bg-gray-800 p-3 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">Price Crossover Trigger</span>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Active</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">Triggers when BTC crosses above the 200-day moving average</p>
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  Edit
                </Button>
              </div>
            </div>

            <div className="rounded-md bg-gray-800 p-3 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">Volume Alert</span>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Active</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">Triggers when ETH 24h volume exceeds $1B</p>
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  Edit
                </Button>
              </div>
            </div>

            <Button className="w-full">
              <Zap className="mr-2 h-4 w-4" />
              Create New Trigger
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Strategy Automation */}
      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Strategy Automation</CardTitle>
            <Cog className="h-4 w-4 text-blue-400" />
          </div>
          <CardDescription>Automate trading strategies and portfolio management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Strategy Automation</Label>
                <p className="text-xs text-muted-foreground">Enable automated execution of your strategies</p>
              </div>
              <Switch id="strategy-automation" />
            </div>

            <div className="rounded-md bg-gray-800 p-3 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">DCA Strategy</span>
                <span className="text-xs bg-gray-600 text-gray-300 px-2 py-0.5 rounded-full">Inactive</span>
              </div>
              <p className="text-xs text-gray-400">Dollar-cost averaging into BTC, ETH weekly</p>
            </div>

            <div className="rounded-md bg-gray-800 p-3 border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">Rebalancing</span>
                <span className="text-xs bg-gray-600 text-gray-300 px-2 py-0.5 rounded-full">Inactive</span>
              </div>
              <p className="text-xs text-gray-400">Monthly portfolio rebalancing to target allocations</p>
            </div>

            <Button variant="secondary" className="w-full">
              <Cog className="mr-2 h-4 w-4" />
              Configure Strategies
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Data Export</CardTitle>
            <Download className="h-4 w-4 text-green-400" />
          </div>
          <CardDescription>Export your data for external analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="border-gray-700">
                <Download className="mr-2 h-4 w-4" />
                Portfolio CSV
              </Button>
              <Button variant="outline" className="border-gray-700">
                <Download className="mr-2 h-4 w-4" />
                Transaction History
              </Button>
              <Button variant="outline" className="border-gray-700">
                <Download className="mr-2 h-4 w-4" />
                Tax Report
              </Button>
              <Button variant="outline" className="border-gray-700">
                <Download className="mr-2 h-4 w-4" />
                Performance Data
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Scheduled Exports</Label>
                <p className="text-xs text-muted-foreground">Automatically export data on a schedule</p>
              </div>
              <Switch id="scheduled-exports" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
