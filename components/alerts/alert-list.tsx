"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Bell, MoreHorizontal, ExternalLink, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AlertListProps {
  searchQuery: string
}

interface Alert {
  id: string
  name: string
  blockchain: string
  contractAddress: string
  eventName: string
  conditions: string
  status: "active" | "paused"
  lastTriggered: string | null
  createdAt: string
  notificationCount: number
}

const mockAlerts: Alert[] = [
  {
    id: "alert-1",
    name: "Large ETH Transfer Alert",
    blockchain: "ethereum",
    contractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    eventName: "Transfer",
    conditions: "amount > 100 ETH",
    status: "active",
    lastTriggered: "2023-04-10 15:32:45",
    createdAt: "2023-03-15",
    notificationCount: 8,
  },
  {
    id: "alert-2",
    name: "Uniswap V3 Swap Monitor",
    blockchain: "ethereum",
    contractAddress: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    eventName: "Swap",
    conditions: "amountUSD > 50000",
    status: "active",
    lastTriggered: "2023-04-12 09:15:22",
    createdAt: "2023-03-20",
    notificationCount: 15,
  },
  {
    id: "alert-3",
    name: "NFT Sale Tracker",
    blockchain: "ethereum",
    contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    eventName: "Transfer",
    conditions: "collection = 'Bored Ape Yacht Club'",
    status: "paused",
    lastTriggered: "2023-04-05 18:45:12",
    createdAt: "2023-03-25",
    notificationCount: 6,
  },
  {
    id: "alert-4",
    name: "Stablecoin Depeg Monitor",
    blockchain: "ethereum",
    contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    eventName: "PriceUpdate",
    conditions: "price < 0.95 OR price > 1.05",
    status: "active",
    lastTriggered: null,
    createdAt: "2023-04-01",
    notificationCount: 0,
  },
  {
    id: "alert-5",
    name: "Governance Proposal Alert",
    blockchain: "ethereum",
    contractAddress: "0x408ED6354d4973f66138C91495F2f2FCbd8724C3",
    eventName: "ProposalCreated",
    conditions: "",
    status: "active",
    lastTriggered: "2023-04-11 12:30:18",
    createdAt: "2023-04-02",
    notificationCount: 2,
  },
]

export function AlertList({ searchQuery }: AlertListProps) {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)

  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.blockchain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.contractAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.conditions.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleAlertStatus = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, status: alert.status === "active" ? "paused" : "active" } : alert,
      ),
    )
  }

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const getBlockchainColor = (blockchain: string) => {
    switch (blockchain.toLowerCase()) {
      case "ethereum":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "polygon":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "bsc":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "arbitrum":
        return "bg-blue-400/10 text-blue-400 border-blue-400/20"
      case "optimism":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <div className="space-y-4">
      {filteredAlerts.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 mb-4">
            <Bell className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium mb-2">No alerts found</h3>
          <p className="text-gray-400 mb-4">Create your first alert or try a different search term</p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Alert
          </Button>
        </div>
      ) : (
        filteredAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <Card className="border-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{alert.name}</h3>
                      <Badge variant="outline" className={getBlockchainColor(alert.blockchain)}>
                        {alert.blockchain}
                      </Badge>
                      {alert.notificationCount > 0 && (
                        <Badge className="bg-primary text-primary-foreground">
                          {alert.notificationCount} notifications
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="font-mono">{formatAddress(alert.contractAddress)}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-1">Event:</span>
                        <span>{alert.eventName}</span>
                      </div>
                      {alert.conditions && (
                        <div className="flex items-center">
                          <span className="text-gray-400 mr-1">Conditions:</span>
                          <span className="font-mono text-xs bg-gray-800 px-2 py-1 rounded">{alert.conditions}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-1">Created:</span>
                        <span>{alert.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Switch checked={alert.status === "active"} onCheckedChange={() => toggleAlertStatus(alert.id)} />
                      <span className="text-sm">{alert.status === "active" ? "Active" : "Paused"}</span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500" onClick={() => deleteAlert(alert.id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))
      )}
    </div>
  )
}
