"use client"

import { useState, useEffect } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { CoinTable } from "@/components/coins/coin-table"
import { CoinGrid } from "@/components/coins/coin-grid"
import { mockCoinsData } from "@/lib/mock-data"

export default function CoinsPage() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("market_cap_rank")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [filterCategory, setFilterCategory] = useState("all")
  const [viewMode, setViewMode] = useState("table")
  const [isLoading, setIsLoading] = useState(true)
  const [coinsData, setCoinsData] = useState(mockCoinsData)

  const itemsPerPage = 20
  const totalPages = Math.ceil(coinsData.length / itemsPerPage)

  useEffect(() => {
    setMounted(true)
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Filter and sort data
    let filteredData = [...mockCoinsData]

    // Apply search filter
    if (searchQuery) {
      filteredData = filteredData.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (filterCategory !== "all") {
      filteredData = filteredData.filter((coin) => coin.category === filterCategory)
    }

    // Apply sorting
    filteredData.sort((a, b) => {
      let aValue = a[sortBy as keyof typeof a]
      let bValue = b[sortBy as keyof typeof b]

      // Handle numeric values
      if (typeof aValue === "string" && !isNaN(Number(aValue))) {
        aValue = Number(aValue)
        bValue = Number(bValue as string)
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })

    setCoinsData(filteredData)
  }, [searchQuery, sortBy, sortDirection, filterCategory])

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("asc")
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const paginatedCoins = coinsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  if (!mounted) return null

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Cryptocurrencies</h1>
        <p className="text-muted-foreground">
          Track and analyze cryptocurrency prices, market cap, and trading volume.
        </p>
      </div>

      <Tabs value={viewMode} onValueChange={setViewMode}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search coins..."
              className="pl-9 bg-dark-100 border-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-800">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterCategory("all")}>All Categories</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory("layer1")}>Layer 1</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory("defi")}>DeFi</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory("exchange")}>Exchange</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory("stablecoin")}>Stablecoin</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <TabsList className="grid w-[180px] grid-cols-2">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="grid">Grid</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <Card className="border-gray-800">
          <TabsContent value="table" className="m-0">
            <CoinTable coins={paginatedCoins} sortBy={sortBy} sortDirection={sortDirection} onSort={handleSort} />
          </TabsContent>
          <TabsContent value="grid" className="m-0">
            <CoinGrid coins={paginatedCoins} />
          </TabsContent>
        </Card>
      </Tabs>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-[40px] w-full" />
          <Skeleton className="h-[400px] w-full" />
          <Skeleton className="h-[40px] w-full" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, coinsData.length)}{" "}
              of {coinsData.length} coins
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-gray-800"
              >
                Previous
              </Button>
              <div className="flex items-center">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum = i + 1
                  if (totalPages > 5 && currentPage > 3) {
                    pageNum = currentPage - 3 + i
                    if (pageNum > totalPages) pageNum = totalPages - (4 - i)
                  }
                  return (
                    <Button
                      key={i}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 ${currentPage !== pageNum && "border-gray-800"}`}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="mx-1">...</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(totalPages)}
                      className="w-9 border-gray-800"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-gray-800"
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
