"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, Bell } from "lucide-react"

interface AlertTemplatesProps {
  searchQuery: string
}

interface AlertTemplate {
  id: string
  name: string
  description: string
  blockchain: string
  contractAddress: string
  eventName: string
  conditions: string
  category: string
  popularity: number
}

const mockTemplates: AlertTemplate[] = [
  {
    id: "template-1",
    name: "Large Token Transfer",
    description: "Monitor for large token transfers exceeding a specified threshold",
    blockchain: "ethereum",
    contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
    eventName: "Transfer",
    conditions: "amount > [threshold] tokens",
    category: "Transfers",
    popularity: 1250,
  },
  {
    id: "template-2",
    name: "Liquidity Pool Changes",
    description: "Track significant changes in liquidity pools",
    blockchain: "ethereum",
    contractAddress: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f", // Uniswap V2 Factory
    eventName: "PairCreated",
    conditions: "liquidity change > [percentage]%",
    category: "DeFi",
    popularity: 980,
  },
  {
    id: "template-3",
    name: "Whale Wallet Activity",
    description: "Monitor transactions from known whale wallets",
    blockchain: "ethereum",
    contractAddress: "N/A (Multiple)",
    eventName: "Multiple",
    conditions: "from_address IN [whale_addresses]",
    category: "Wallets",
    popularity: 1450,
  },
  {
    id: "template-4",
    name: "NFT Sales Tracker",
    description: "Track sales of NFTs above a certain price threshold",
    blockchain: "ethereum",
    contractAddress: "N/A (Collection specific)",
    eventName: "Transfer",
    conditions: "price > [threshold] ETH",
    category: "NFTs",
    popularity: 1120,
  },
  {
    id: "template-5",
    name: "Governance Proposal Monitor",
    description: "Get notified when new governance proposals are created",
    blockchain: "ethereum",
    contractAddress: "N/A (Protocol specific)",
    eventName: "ProposalCreated",
    conditions: "",
    category: "Governance",
    popularity: 750,
  },
  {
    id: "template-6",
    name: "Smart Contract Interaction",
    description: "Monitor specific function calls on smart contracts",
    blockchain: "ethereum",
    contractAddress: "Custom",
    eventName: "Custom",
    conditions: "function_signature = [signature]",
    category: "Smart Contracts",
    popularity: 850,
  },
]

export function AlertTemplates({ searchQuery }: AlertTemplatesProps) {
  const filteredTemplates = mockTemplates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.blockchain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.eventName.toLowerCase().includes(searchQuery.toLowerCase()),
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

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "transfers":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "defi":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "wallets":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "nfts":
        return "bg-pink-500/10 text-pink-500 border-pink-500/20"
      case "governance":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "smart contracts":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTemplates.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 mb-4">
            <Bell className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium mb-2">No templates found</h3>
          <p className="text-gray-400">Try a different search term</p>
        </div>
      ) : (
        filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="border-gray-800 h-full flex flex-col">
              <CardContent className="p-6 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className={getBlockchainColor(template.blockchain)}>
                    {template.blockchain}
                  </Badge>
                  <Badge variant="outline" className={getCategoryColor(template.category)}>
                    {template.category}
                  </Badge>
                </div>
                <h3 className="font-medium mb-2">{template.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{template.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="text-gray-400 mr-1 w-24">Contract:</span>
                    <span className="font-mono">{template.contractAddress}</span>
                    {template.contractAddress !== "Custom" &&
                      template.contractAddress !== "N/A (Multiple)" &&
                      template.contractAddress !== "N/A (Collection specific)" &&
                      template.contractAddress !== "N/A (Protocol specific)" && (
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-400 mr-1 w-24">Event:</span>
                    <span>{template.eventName}</span>
                  </div>
                  {template.conditions && (
                    <div className="flex items-center text-sm">
                      <span className="text-gray-400 mr-1 w-24">Conditions:</span>
                      <span className="font-mono text-xs bg-gray-800 px-2 py-1 rounded">{template.conditions}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex items-center justify-between">
                <div className="text-xs text-gray-400">{template.popularity} users</div>
                <Button>
                  <Copy className="mr-2 h-4 w-4" />
                  Use Template
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))
      )}
    </div>
  )
}
