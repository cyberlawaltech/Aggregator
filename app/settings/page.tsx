"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  User,
  Bell,
  Shield,
  Key,
  Code,
  Wallet,
  HelpCircle,
  Play,
  ExternalLink,
  Copy,
  Eye,
  Lock,
} from "lucide-react"
import { FirstTimeUserExperience } from "@/components/settings/first-time-user-experience"
import { RegularUserWorkflows } from "@/components/settings/regular-user-workflows"
import { AdvancedUserFeatures } from "@/components/settings/advanced-user-features"

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("user-experience")
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <Tabs orientation="vertical" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-col h-auto justify-start bg-transparent p-0">
              <TabsTrigger
                value="user-experience"
                className="justify-start px-3 py-2 data-[state=active]:bg-gray-800 data-[state=active]:shadow-none"
              >
                <User className="mr-2 h-4 w-4" />
                User Experience
              </TabsTrigger>
              <TabsTrigger
                value="account"
                className="justify-start px-3 py-2 data-[state=active]:bg-gray-800 data-[state=active]:shadow-none"
              >
                <Settings className="mr-2 h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="justify-start px-3 py-2 data-[state=active]:bg-gray-800 data-[state=active]:shadow-none"
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="justify-start px-3 py-2 data-[state=active]:bg-gray-800 data-[state=active]:shadow-none"
              >
                <Shield className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger
                value="api"
                className="justify-start px-3 py-2 data-[state=active]:bg-gray-800 data-[state=active]:shadow-none"
              >
                <Code className="mr-2 h-4 w-4" />
                API Access
              </TabsTrigger>
              <TabsTrigger
                value="wallets"
                className="justify-start px-3 py-2 data-[state=active]:bg-gray-800 data-[state=active]:shadow-none"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connected Wallets
              </TabsTrigger>
              <TabsTrigger
                value="help"
                className="justify-start px-3 py-2 data-[state=active]:bg-gray-800 data-[state=active]:shadow-none"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </aside>
        <div className="flex-1 lg:max-w-3xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="user-experience" className="space-y-6">
              <Card className="border-gray-800">
                <CardHeader>
                  <CardTitle>User Experience</CardTitle>
                  <CardDescription>
                    Customize your experience based on your familiarity with the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="first-time-user">First-Time User Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable guided tutorials and simplified interface for new users
                      </p>
                    </div>
                    <Switch id="first-time-user" checked={isFirstTimeUser} onCheckedChange={setIsFirstTimeUser} />
                  </div>

                  {isFirstTimeUser ? (
                    <FirstTimeUserExperience />
                  ) : (
                    <div className="space-y-6">
                      <RegularUserWorkflows />
                      <AdvancedUserFeatures />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <Card className="border-gray-800">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Display Name</Label>
                      <Input id="name" defaultValue="Crypto Trader" className="bg-dark-100 border-gray-800" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" defaultValue="user@example.com" className="bg-dark-100 border-gray-800" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <select
                        id="timezone"
                        className="w-full h-10 px-3 py-2 bg-dark-100 border border-gray-800 rounded-md"
                      >
                        <option>UTC (Coordinated Universal Time)</option>
                        <option>EST (Eastern Standard Time)</option>
                        <option>PST (Pacific Standard Time)</option>
                        <option>GMT (Greenwich Mean Time)</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">Always use dark mode for the interface</p>
                      </div>
                      <Switch id="dark-mode" defaultChecked />
                    </div>
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card className="border-gray-800">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Price Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified about significant price changes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Security Alerts</Label>
                        <p className="text-sm text-muted-foreground">Receive alerts about security events</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Marketing Updates</Label>
                        <p className="text-sm text-muted-foreground">Receive news and promotional content</p>
                      </div>
                      <Switch />
                    </div>
                    <Button>Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card className="border-gray-800">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and authentication methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline" className="border-gray-800">
                        <Shield className="mr-2 h-4 w-4" />
                        Enable 2FA
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Password</Label>
                        <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                      </div>
                      <Button variant="outline" className="border-gray-800">
                        <Key className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Session Management</Label>
                        <p className="text-sm text-muted-foreground">Manage your active sessions</p>
                      </div>
                      <Button variant="outline" className="border-gray-800">
                        <Lock className="mr-2 h-4 w-4" />
                        View Sessions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-6">
              <Card className="border-gray-800">
                <CardHeader>
                  <CardTitle>API Access</CardTitle>
                  <CardDescription>Manage API keys for programmatic access to the platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>API Keys</Label>
                        <p className="text-sm text-muted-foreground">Create and manage your API keys</p>
                      </div>
                      <Button>
                        <Key className="mr-2 h-4 w-4" />
                        Create New Key
                      </Button>
                    </div>

                    <div className="rounded-md border border-gray-800">
                      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Trading API Key</h4>
                          <p className="text-sm text-gray-400">Created 15 days ago</p>
                        </div>
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>
                      </div>
                      <div className="p-4 flex items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="bg-gray-800 px-3 py-1 rounded font-mono text-sm">
                              ••••••••••••••••••••••••••
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-gray-800">
                          Revoke
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>API Documentation</Label>
                        <p className="text-sm text-muted-foreground">View the API documentation to get started</p>
                      </div>
                      <Button variant="outline" className="border-gray-800">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Docs
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wallets" className="space-y-6">
              <Card className="border-gray-800">
                <CardHeader>
                  <CardTitle>Connected Wallets</CardTitle>
                  <CardDescription>Manage your connected blockchain wallets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Connect New Wallet</Label>
                        <p className="text-sm text-muted-foreground">Add a new wallet to your account</p>
                      </div>
                      <Button>
                        <Wallet className="mr-2 h-4 w-4" />
                        Connect Wallet
                      </Button>
                    </div>

                    <div className="rounded-md border border-gray-800">
                      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">🦊</div>
                          <div>
                            <h4 className="font-medium">MetaMask</h4>
                            <p className="text-sm text-gray-400">0x1a2b...3c4d</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Connected</Badge>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div className="text-sm text-gray-400">Connected 7 days ago</div>
                        <Button variant="outline" size="sm" className="border-gray-800">
                          Disconnect
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-md border border-gray-800">
                      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">🔒</div>
                          <div>
                            <h4 className="font-medium">Ledger</h4>
                            <p className="text-sm text-gray-400">0x5e6f...7g8h</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Connected</Badge>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div className="text-sm text-gray-400">Connected 3 days ago</div>
                        <Button variant="outline" size="sm" className="border-gray-800">
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="help" className="space-y-6">
              <Card className="border-gray-800">
                <CardHeader>
                  <CardTitle>Help & Support</CardTitle>
                  <CardDescription>Get help with using the platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="rounded-md border border-gray-800 p-4">
                      <h3 className="font-medium mb-2">Documentation</h3>
                      <p className="text-sm text-gray-400 mb-4">
                        Comprehensive guides and documentation for using the platform
                      </p>
                      <Button variant="outline" className="border-gray-800">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Documentation
                      </Button>
                    </div>

                    <div className="rounded-md border border-gray-800 p-4">
                      <h3 className="font-medium mb-2">Video Tutorials</h3>
                      <p className="text-sm text-gray-400 mb-4">Step-by-step video guides for common tasks</p>
                      <Button variant="outline" className="border-gray-800">
                        <Play className="mr-2 h-4 w-4" />
                        Watch Tutorials
                      </Button>
                    </div>

                    <div className="rounded-md border border-gray-800 p-4">
                      <h3 className="font-medium mb-2">Contact Support</h3>
                      <p className="text-sm text-gray-400 mb-4">Get help from our support team</p>
                      <Button>
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Contact Support
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
