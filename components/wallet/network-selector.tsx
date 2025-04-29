"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Network {
  id: string
  name: string
  icon: string
  color: string
}

const networks: Network[] = [
  { id: "ethereum", name: "Ethereum", icon: "🔷", color: "#627EEA" },
  { id: "polygon", name: "Polygon", icon: "🟣", color: "#8247E5" },
  { id: "bsc", name: "BNB Chain", icon: "🟡", color: "#F0B90B" },
  { id: "arbitrum", name: "Arbitrum", icon: "🔵", color: "#28A0F0" },
  { id: "optimism", name: "Optimism", icon: "🔴", color: "#FF0420" },
  { id: "avalanche", name: "Avalanche", icon: "❄️", color: "#E84142" },
  { id: "solana", name: "Solana", icon: "🟪", color: "#9945FF" },
]

export function NetworkSelector() {
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(networks[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-gray-800 bg-dark-100 hover:bg-dark-200">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: selectedNetwork.color }} />
            <span className="hidden sm:inline">{selectedNetwork.name}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Select Network</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {networks.map((network) => (
          <DropdownMenuItem
            key={network.id}
            onClick={() => setSelectedNetwork(network)}
            className="flex items-center gap-2"
          >
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full"
              style={{ backgroundColor: network.color }}
            >
              <span className="text-xs">{network.icon}</span>
            </div>
            <span>{network.name}</span>
            {selectedNetwork.id === network.id && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
