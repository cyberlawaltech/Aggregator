"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, ChevronDown, ChevronUp, BarChart3, Eye, ShoppingCart, Heart, Share } from "lucide-react"
import { SocialContentIntegration } from "@/components/contracts/social-content-integration"

interface NFTMarketplaceAggregatorProps {
  viewMode: "grid" | "list"
  searchQuery: string
}

interface NFTCollection {
  id: string
  name: string
  image: string
  floorPrice: {
    opensea: number
    blur: number
    x2y2: number
    looksrare: number
  }
  volume24h: number
  volumeChange: number
  items: number
  owners: number
  marketplaces: string[]
  verified: boolean
}

const mockCollections: NFTCollection[] = [
  {
    id: "bayc",
    name: "Bored Ape Yacht Club",
    image: "/placeholder.svg?height=300&width=300",
    floorPrice: {
      opensea: 18.5,
      blur: 18.4,
      x2y2: 18.6,
      looksrare: 18.7,
    },
    volume24h: 450.25,
    volumeChange: 5.2,
    items: 10000,
    owners: 6750,
    marketplaces: ["opensea", "blur", "x2y2", "looksrare"],
    verified: true,
  },
  {
    id: "azuki",
    name: "Azuki",
    image: "/placeholder.svg?height=300&width=300",
    floorPrice: {
      opensea: 10.2,
      blur: 10.1,
      x2y2: 10.3,
      looksrare: 10.4,
    },
    volume24h: 320.8,
    volumeChange: -2.5,
    items: 10000,
    owners: 5120,
    marketplaces: ["opensea", "blur", "x2y2"],
    verified: true,
  },
  {
    id: "doodles",
    name: "Doodles",
    image: "/placeholder.svg?height=300&width=300",
    floorPrice: {
      opensea: 3.8,
      blur: 3.75,
      x2y2: 3.85,
      looksrare: 3.9,
    },
    volume24h: 98.5,
    volumeChange: 12.8,
    items: 10000,
    owners: 4980,
    marketplaces: ["opensea", "blur", "looksrare"],
    verified: true,
  },
  {
    id: "cryptopunks",
    name: "CryptoPunks",
    image: "/placeholder.svg?height=300&width=300",
    floorPrice: {
      opensea: 62.5,
      blur: 62.2,
      x2y2: 62.8,
      looksrare: 63.0,
    },
    volume24h: 580.2,
    volumeChange: 8.7,
    items: 10000,
    owners: 3560,
    marketplaces: ["opensea", "blur", "x2y2", "looksrare"],
    verified: true,
  },
  {
    id: "moonbirds",
    name: "Moonbirds",
    image: "/placeholder.svg?height=300&width=300",
    floorPrice: {
      opensea: 4.2,
      blur: 4.15,
      x2y2: 4.25,
      looksrare: 4.3,
    },
    volume24h: 112.4,
    volumeChange: -4.3,
    items: 10000,
    owners: 6250,
    marketplaces: ["opensea", "blur", "x2y2"],
    verified: true,
  },
  {
    id: "clonex",
    name: "CloneX",
    image: "/placeholder.svg?height=300&width=300",
    floorPrice: {
      opensea: 5.8,
      blur: 5.75,
      x2y2: 5.85,
      looksrare: 5.9,
    },
    volume24h: 145.6,
    volumeChange: 3.2,
    items: 20000,
    owners: 8750,
    marketplaces: ["opensea", "blur", "x2y2", "looksrare"],
    verified: true,
  },
]

export function NFTMarketplaceAggregator({ viewMode, searchQuery }: NFTMarketplaceAggregatorProps) {
  const [sortBy, setSortBy] = useState("volume24h")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [activeTab, setActiveTab] = useState("collections")
  const [selectedMarketplaces, setSelectedMarketplaces] = useState<string[]>(["opensea", "blur", "x2y2", "looksrare"])

  const filteredCollections = mockCollections
    .filter(
      (collection) =>
        collection.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        collection.marketplaces.some((marketplace) => selectedMarketplaces.includes(marketplace)),
    )
    .sort((a, b) => {
      let valueA, valueB

      if (sortBy === "floorPrice") {
        // Get the lowest floor price across marketplaces
        valueA = Math.min(...Object.values(a.floorPrice))
        valueB = Math.min(...Object.values(b.floorPrice))
      } else {
        valueA = a[sortBy as keyof NFTCollection]
        valueB = b[sortBy as keyof NFTCollection]
      }

      return sortDirection === "asc" ? (valueA as number) - (valueB as number) : (valueB as number) - (valueA as number)
    })

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("desc")
    }
  }

  const toggleMarketplace = (marketplace: string) => {
    if (selectedMarketplaces.includes(marketplace)) {
      setSelectedMarketplaces(selectedMarketplaces.filter((m) => m !== marketplace))
    } else {
      setSelectedMarketplaces([...selectedMarketplaces, marketplace])
    }
  }

  const getBestMarketplace = (floorPrices: Record<string, number>) => {
    const entries = Object.entries(floorPrices)
    const [bestMarketplace] = entries.reduce((best, current) => {
      return current[1] < best[1] ? current : best
    }, entries[0])

    return bestMarketplace
  }

  return (
    <div className="space-y-6">
      <Card className="border-gray-800">
        <CardHeader>
          <CardTitle>NFT Marketplace Aggregator</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="collections">Collections</TabsTrigger>
              <TabsTrigger value="rarity">Rarity Tools</TabsTrigger>
              <TabsTrigger value="trading">Trading</TabsTrigger>
              <TabsTrigger value="social">Social Content</TabsTrigger>
            </TabsList>

            <TabsContent value="collections" className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedMarketplaces.includes("opensea") ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleMarketplace("opensea")}
                  className={!selectedMarketplaces.includes("opensea") ? "border-gray-800" : ""}
                >
                  OpenSea
                </Button>
                <Button
                  variant={selectedMarketplaces.includes("blur") ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleMarketplace("blur")}
                  className={!selectedMarketplaces.includes("blur") ? "border-gray-800" : ""}
                >
                  Blur
                </Button>
                <Button
                  variant={selectedMarketplaces.includes("x2y2") ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleMarketplace("x2y2")}
                  className={!selectedMarketplaces.includes("x2y2") ? "border-gray-800" : ""}
                >
                  X2Y2
                </Button>
                <Button
                  variant={selectedMarketplaces.includes("looksrare") ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleMarketplace("looksrare")}
                  className={!selectedMarketplaces.includes("looksrare") ? "border-gray-800" : ""}
                >
                  LooksRare
                </Button>
              </div>

              {viewMode === "list" ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left font-medium py-3 px-4">Collection</th>
                        <th
                          className="cursor-pointer whitespace-nowrap px-4 py-3 text-right font-medium"
                          onClick={() => handleSort("floorPrice")}
                        >
                          <div className="flex items-center justify-end">
                            <span>Floor Price</span>
                            {sortBy === "floorPrice" ? (
                              sortDirection === "asc" ? (
                                <ChevronUp className="ml-2 h-4 w-4" />
                              ) : (
                                <ChevronDown className="ml-2 h-4 w-4" />
                              )
                            ) : (
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th
                          className="cursor-pointer whitespace-nowrap px-4 py-3 text-right font-medium"
                          onClick={() => handleSort("volume24h")}
                        >
                          <div className="flex items-center justify-end">
                            <span>Volume (24h)</span>
                            {sortBy === "volume24h" ? (
                              sortDirection === "asc" ? (
                                <ChevronUp className="ml-2 h-4 w-4" />
                              ) : (
                                <ChevronDown className="ml-2 h-4 w-4" />
                              )
                            ) : (
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th
                          className="cursor-pointer whitespace-nowrap px-4 py-3 text-right font-medium"
                          onClick={() => handleSort("volumeChange")}
                        >
                          <div className="flex items-center justify-end">
                            <span>24h %</span>
                            {sortBy === "volumeChange" ? (
                              sortDirection === "asc" ? (
                                <ChevronUp className="ml-2 h-4 w-4" />
                              ) : (
                                <ChevronDown className="ml-2 h-4 w-4" />
                              )
                            ) : (
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th className="text-right font-medium py-3 px-4">Best Marketplace</th>
                        <th className="text-right font-medium py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCollections.map((collection) => {
                        const bestMarketplace = getBestMarketplace(collection.floorPrice)
                        const bestPrice = collection.floorPrice[bestMarketplace as keyof typeof collection.floorPrice]

                        return (
                          <tr key={collection.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-800">
                                  <img
                                    src={collection.image || "/placeholder.svg"}
                                    alt={collection.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium flex items-center">
                                    {collection.name}
                                    {collection.verified && (
                                      <Badge className="ml-2 bg-blue-500/20 text-blue-500 border-blue-500/20">
                                        Verified
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {collection.items.toLocaleString()} items • {collection.owners.toLocaleString()}{" "}
                                    owners
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-right font-medium">
                              <div className="flex flex-col items-end">
                                <div>{bestPrice} ETH</div>
                                <div className="text-xs text-gray-400">
                                  on {bestMarketplace.charAt(0).toUpperCase() + bestMarketplace.slice(1)}
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-right font-medium">{collection.volume24h} ETH</td>
                            <td
                              className={`py-4 px-4 text-right font-medium ${
                                collection.volumeChange >= 0 ? "text-green-500" : "text-red-500"
                              }`}
                            >
                              <div className="flex items-center justify-end">
                                {collection.volumeChange >= 0 ? (
                                  <ChevronUp className="mr-1 h-4 w-4" />
                                ) : (
                                  <ChevronDown className="mr-1 h-4 w-4" />
                                )}
                                {Math.abs(collection.volumeChange)}%
                              </div>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <Badge variant="outline" className="bg-gray-800 border-gray-700">
                                {bestMarketplace.charAt(0).toUpperCase() + bestMarketplace.slice(1)}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="outline" size="sm" className="border-gray-800">
                                  <Eye className="mr-2 h-3 w-3" />
                                  View
                                </Button>
                                <Button size="sm">
                                  <ShoppingCart className="mr-2 h-3 w-3" />
                                  Buy
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCollections.map((collection, index) => {
                    const bestMarketplace = getBestMarketplace(collection.floorPrice)
                    const bestPrice = collection.floorPrice[bestMarketplace as keyof typeof collection.floorPrice]

                    return (
                      <motion.div
                        key={collection.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="border-gray-800 overflow-hidden h-full flex flex-col">
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={collection.image || "/placeholder.svg"}
                              alt={collection.name}
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute top-2 right-2 flex gap-1">
                              {collection.verified && (
                                <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/20">Verified</Badge>
                              )}
                            </div>
                          </div>
                          <CardContent className="p-4 flex-1">
                            <div className="flex items-start justify-between">
                              <h3 className="font-medium">{collection.name}</h3>
                              <Badge variant="outline" className="bg-gray-800 border-gray-700">
                                {bestMarketplace.charAt(0).toUpperCase() + bestMarketplace.slice(1)}
                              </Badge>
                            </div>
                            <div className="mt-2 grid grid-cols-2 gap-2">
                              <div>
                                <div className="text-xs text-gray-400">Floor Price</div>
                                <div className="font-medium">{bestPrice} ETH</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-400">Volume (24h)</div>
                                <div className="font-medium">{collection.volume24h} ETH</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-400">Items</div>
                                <div>{collection.items.toLocaleString()}</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-400">Owners</div>
                                <div>{collection.owners.toLocaleString()}</div>
                              </div>
                            </div>
                            <div className="mt-2 flex items-center">
                              <div className="text-xs text-gray-400 mr-1">24h</div>
                              <div
                                className={`text-sm flex items-center ${
                                  collection.volumeChange >= 0 ? "text-green-500" : "text-red-500"
                                }`}
                              >
                                {collection.volumeChange >= 0 ? (
                                  <ChevronUp className="mr-1 h-3 w-3" />
                                ) : (
                                  <ChevronDown className="mr-1 h-3 w-3" />
                                )}
                                {Math.abs(collection.volumeChange)}%
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0 flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Heart className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Share className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" className="border-gray-800">
                                <Eye className="mr-2 h-3 w-3" />
                                View
                              </Button>
                              <Button size="sm">
                                <ShoppingCart className="mr-2 h-3 w-3" />
                                Buy
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="rarity" className="space-y-6">
              <Card className="border-gray-800">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 mb-4">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Rarity Analysis Tools</h3>
                    <p className="text-gray-400 mb-4 max-w-md">
                      Analyze NFT attributes and rarity scores across collections to find hidden gems and make informed
                      decisions.
                    </p>
                    <div className="flex gap-2">
                      <Button>Select Collection</Button>
                      <Button variant="outline" className="border-gray-800">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trading" className="space-y-6">
              <Card className="border-gray-800">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 mb-4">
                      <ShoppingCart className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Integrated Trading</h3>
                    <p className="text-gray-400 mb-4 max-w-md">
                      Buy, sell, or place bids directly through our aggregator interface for the best prices across
                      marketplaces.
                    </p>
                    <div className="flex gap-2">
                      <Button>Connect Wallet</Button>
                      <Button variant="outline" className="border-gray-800">
                        View Listings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="space-y-6">
              <SocialContentIntegration />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
