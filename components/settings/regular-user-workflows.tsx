import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart4, TrendingUp, LineChart, Percent } from "lucide-react"

export function RegularUserWorkflows() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Regular User Workflows</h3>

      {/* Portfolio Monitoring */}
      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Portfolio Monitoring</CardTitle>
            <BarChart4 className="h-4 w-4 text-blue-400" />
          </div>
          <CardDescription>Track and analyze your crypto portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm">Total Balance</span>
              </div>
              <span className="font-medium">$24,567.89</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm">24h Change</span>
              </div>
              <span className="text-green-500">+2.34%</span>
            </div>
            <div className="h-24 bg-gray-800 rounded-md flex items-center justify-center">
              <span className="text-xs text-gray-400">Portfolio Chart</span>
            </div>
            <Button className="w-full">
              <BarChart4 className="mr-2 h-4 w-4" />
              View Full Portfolio
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Trading Execution */}
      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Trading Execution</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </div>
          <CardDescription>Execute trades across multiple platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Recent Trades</span>
              <Badge className="bg-gray-800 text-gray-300 hover:bg-gray-700">View All</Badge>
            </div>

            <div className="rounded-md bg-gray-800 p-3 border border-gray-700">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs">B</div>
                  <span className="font-medium text-sm">BTC/USDT</span>
                </div>
                <span className="text-green-500 text-sm">Buy</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>0.05 BTC @ $27,350</span>
                <span>2 hours ago</span>
              </div>
            </div>

            <div className="rounded-md bg-gray-800 p-3 border border-gray-700">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs">E</div>
                  <span className="font-medium text-sm">ETH/USDT</span>
                </div>
                <span className="text-red-500 text-sm">Sell</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>2.5 ETH @ $1,850</span>
                <span>1 day ago</span>
              </div>
            </div>

            <Button className="w-full">
              <TrendingUp className="mr-2 h-4 w-4" />
              New Trade
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Creation */}
      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Analytics Creation</CardTitle>
            <LineChart className="h-4 w-4 text-purple-400" />
          </div>
          <CardDescription>Create custom analytics and visualizations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Saved Analytics</span>
              <Badge className="bg-gray-800 text-gray-300 hover:bg-gray-700">View All</Badge>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md bg-gray-800 p-3 border border-gray-700">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">Market Correlation</span>
                </div>
                <div className="text-xs text-gray-400">Updated 3 hours ago</div>
              </div>

              <div className="rounded-md bg-gray-800 p-3 border border-gray-700">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">Volume Analysis</span>
                </div>
                <div className="text-xs text-gray-400">Updated 1 day ago</div>
              </div>
            </div>

            <Button className="w-full">
              <LineChart className="mr-2 h-4 w-4" />
              Create New Analysis
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Yield Strategy Management */}
      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Yield Strategy Management</CardTitle>
            <Percent className="h-4 w-4 text-yellow-400" />
          </div>
          <CardDescription>Manage and optimize your yield strategies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Active Strategies</span>
              <Badge className="bg-gray-800 text-gray-300 hover:bg-gray-700">View All</Badge>
            </div>

            <div className="rounded-md bg-gray-800 p-3 border border-gray-700">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">Stablecoin Yield</span>
                <span className="text-green-500 text-sm">8.2% APY</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>USDC on Compound</span>
                <span>$5,000 deployed</span>
              </div>
            </div>

            <div className="rounded-md bg-gray-800 p-3 border border-gray-700">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">ETH Staking</span>
                <span className="text-green-500 text-sm">4.5% APY</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Lido</span>
                <span>3.2 ETH deployed</span>
              </div>
            </div>

            <Button className="w-full">
              <Percent className="mr-2 h-4 w-4" />
              Explore Yield Options
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
