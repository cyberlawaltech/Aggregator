"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Grid3X3, List } from "lucide-react"
import { NFTMarketplaceAggregator } from "@/components/contracts/nft-marketplace-aggregator"
import { ContractVerifier } from "@/components/contracts/contract-verifier"
import { ContractInteraction } from "@/components/contracts/contract-interaction"

export default function ContractsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("nft-marketplace")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Smart Contracts</h1>
        <p className="text-muted-foreground">
          Explore, verify, and interact with smart contracts across multiple blockchains.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="nft-marketplace">NFT Marketplace</TabsTrigger>
            <TabsTrigger value="contract-verifier">Contract Verifier</TabsTrigger>
            <TabsTrigger value="contract-interaction">Contract Interaction</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search contracts..."
              className="pl-9 bg-dark-100 border-gray-800"
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="nft-marketplace" className="m-0 space-y-6">
          <NFTMarketplaceAggregator viewMode={viewMode} searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="contract-verifier" className="m-0 space-y-6">
          <ContractVerifier />
        </TabsContent>
        <TabsContent value="contract-interaction" className="m-0 space-y-6">
          <ContractInteraction />
        </TabsContent>
      </Tabs>
    </div>
  )
}
