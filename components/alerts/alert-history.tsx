"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AlertHistoryProps {
  searchQuery: string
}

interface AlertEvent {
  id: string
  alertName: string
  blockchain: string
  contractAddress: string
  eventName: string
  timestamp: string
  status: "triggered" | "acknowledged" | "resolved"
  transactionHash: string
  details: string
}

const mockAlertHistory: AlertEvent[] = [
  {
    id: "event-1",
    alertName: "Large ETH Transfer Alert",
    blockchain: "ethereum",
    contractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    eventName: "Transfer",
    timestamp: "2023-04-12 15:32:45",
    status: "resolved",
    transactionHash: "0x8a35c3ab19a2ffb4db18e92f95f07f94e1a0a5b5b598435a3a9f8b2a77b8e8c1",
    details: "Transfer of 150 ETH detected from 0x1a2b... to 0x3c4d...",
  },
  {
    id: "event-2",
    alertName: "Uniswap V3 Swap Monitor",
    blockchain: "ethereum",
    contractAddress: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    eventName: "Swap",
    timestamp: "2023-04-12 09:15:22",
    status: "acknowledged",
    transactionHash: "0x7b9c4e3d2a1f0b8c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2",
    details: "Swap of 75,000 USDC for 41.25 ETH",
  },
  {
    id: "event-3",
    alertName: "NFT Sale Tracker",
    blockchain: "ethereum",
    contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    eventName: "Transfer",
    timestamp: "2023-04-05 18:45:12",
    status: "triggered",
    transactionHash: "0x2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4",
    details: "BAYC #8352 sold for 80 ETH",
  },
  {
    id: "event-4",
    alertName: "Governance Proposal Alert",
    blockchain: "ethereum",
    contractAddress: "0x408ED6354d4973f66138C91495F2f2FCbd8724C3",
    eventName: "ProposalCreated",
    timestamp: "2023-04-11 12:30:18",
    status: "acknowledged",
    transactionHash: "0x5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3",
    details: "New governance proposal #45: 'Adjust protocol fees'",
  },
]

export function AlertHistory({ searchQuery }: AlertHistoryProps) {
  const [alertEvents] = useState<AlertEvent[]>(mockAlertHistory)

  const filteredEvents = alertEvents.filter(
    (event) =>
      event.alertName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.blockchain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.contractAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.details.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "triggered":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "acknowledged":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "resolved":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const formatTxHash = (hash: string) => {
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`
  }

  return (
    <div className="space-y-4">
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 mb-4">
            <Clock className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium mb-2">No alert history found</h3>
          <p className="text-gray-400">Try a different search term</p>
        </div>
      ) : (
        filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <Card className="border-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{event.alertName}</h3>
                      <Badge variant="outline" className={getBlockchainColor(event.blockchain)}>
                        {event.blockchain}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="mr-1 h-4 w-4" />
                      {event.timestamp}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center text-sm">
                      <span className="text-gray-400 mr-1 w-24">Contract:</span>
                      <span className="font-mono">{formatAddress(event.contractAddress)}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-400 mr-1 w-24">Transaction:</span>
                      <span className="font-mono">{formatTxHash(event.transactionHash)}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-400 mr-1 w-24">Event:</span>
                      <span>{event.eventName}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-400 mr-1 w-24">Details:</span>
                      <span>{event.details}</span>
                    </div>
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
