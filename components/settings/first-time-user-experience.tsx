import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Wallet, Settings, BarChart4 } from "lucide-react"

export function FirstTimeUserExperience() {
  return (
    <div className="space-y-6">
      {/* Onboarding Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Onboarding Progress</h3>
          <span className="text-xs text-muted-foreground">2/4 completed</span>
        </div>
        <Progress value={50} className="h-2 bg-gray-800" />
      </div>

      {/* Onboarding Tutorial */}
      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Onboarding Tutorial</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-400" />
          </div>
          <CardDescription>Learn the basics of the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                ✓
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Platform Overview</p>
                <p className="text-xs text-muted-foreground">Introduction to key features</p>
              </div>
              <Button variant="ghost" size="sm" className="h-7">
                Completed
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                ✓
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Market Data</p>
                <p className="text-xs text-muted-foreground">Understanding market information</p>
              </div>
              <Button variant="ghost" size="sm" className="h-7">
                Completed
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center">3</div>
              <div className="flex-1">
                <p className="text-sm font-medium">Trading Basics</p>
                <p className="text-xs text-muted-foreground">Learn how to execute trades</p>
              </div>
              <Button variant="outline" size="sm" className="h-7 border-gray-700">
                Start
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center">4</div>
              <div className="flex-1">
                <p className="text-sm font-medium">Advanced Features</p>
                <p className="text-xs text-muted-foreground">Explore analytics and alerts</p>
              </div>
              <Button variant="outline" size="sm" className="h-7 border-gray-700" disabled>
                Locked
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Dashboards */}
      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Sample Dashboards</CardTitle>
            <BarChart4 className="h-4 w-4 text-purple-400" />
          </div>
          <CardDescription>Explore pre-configured dashboards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="h-auto py-3 px-4 flex flex-col items-center justify-center gap-2 border-gray-700"
              >
                <BarChart4 className="h-5 w-5 text-blue-400" />
                <span className="text-xs">Portfolio Tracker</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-3 px-4 flex flex-col items-center justify-center gap-2 border-gray-700"
              >
                <BarChart4 className="h-5 w-5 text-green-400" />
                <span className="text-xs">Market Overview</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-3 px-4 flex flex-col items-center justify-center gap-2 border-gray-700"
              >
                <BarChart4 className="h-5 w-5 text-yellow-400" />
                <span className="text-xs">DeFi Monitor</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-3 px-4 flex flex-col items-center justify-center gap-2 border-gray-700"
              >
                <BarChart4 className="h-5 w-5 text-purple-400" />
                <span className="text-xs">NFT Gallery</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Connection */}
      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Wallet Connection</CardTitle>
            <Wallet className="h-4 w-4 text-yellow-400" />
          </div>
          <CardDescription>Connect your crypto wallets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Connect your wallets to track your portfolio and enable trading
            </p>
            <Button className="w-full">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preference Setting */}
      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Preference Setting</CardTitle>
            <Settings className="h-4 w-4 text-gray-400" />
          </div>
          <CardDescription>Customize your experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Set your preferences for a personalized experience</p>
            <Button variant="outline" className="w-full border-gray-700">
              <Settings className="mr-2 h-4 w-4" />
              Configure Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
