"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Clock, ArrowUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"

interface QueryHistoryProps {
  onSelectQuery: (query: string) => void
}

interface HistoryItem {
  id: string
  query: string
  timestamp: string
  executionTime: string
  rowsReturned: number
}

// Mock history data
const mockHistory: HistoryItem[] = [
  {
    id: "1",
    query: `SELECT token_symbol, SUM(amount) as total_volume
FROM dex.trades
WHERE block_time > now() - interval '24 hours'
GROUP BY token_symbol
ORDER BY total_volume DESC
LIMIT 10;`,
    timestamp: "2023-04-12 14:32:15",
    executionTime: "1.2s",
    rowsReturned: 10,
  },
  {
    id: "2",
    query: `SELECT date_trunc('day', block_time) as day, COUNT(DISTINCT from_address) as unique_wallets
FROM ethereum.transactions
WHERE block_time > now() - interval '30 days'
GROUP BY 1
ORDER BY 1;`,
    timestamp: "2023-04-12 11:15:42",
    executionTime: "2.5s",
    rowsReturned: 30,
  },
  {
    id: "3",
    query: `SELECT collection_name, COUNT(*) as sales, SUM(price_usd) as volume
FROM nft.trades
WHERE block_time > now() - interval '7 days'
GROUP BY collection_name
ORDER BY volume DESC
LIMIT 10;`,
    timestamp: "2023-04-11 16:45:22",
    executionTime: "0.8s",
    rowsReturned: 10,
  },
  {
    id: "4",
    query: `SELECT 
  contract_address,
  COUNT(*) as interaction_count,
  COUNT(DISTINCT user_address) as unique_users
FROM dapp.interactions
WHERE block_time > now() - interval '7 days'
GROUP BY contract_address
ORDER BY interaction_count DESC
LIMIT 20;`,
    timestamp: "2023-04-10 09:22:18",
    executionTime: "3.1s",
    rowsReturned: 20,
  },
]

export function QueryHistory({ onSelectQuery }: QueryHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredHistory = mockHistory.filter((item) => item.query.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="p-4 space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Search query history..."
          className="pl-9 bg-dark-100 border-gray-800"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredHistory.map((item) => (
          <Card key={item.id} className="border-gray-800 hover:border-gray-700 transition-colors">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-400">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>{item.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-400">{item.executionTime}</span>
                    <span className="text-gray-400">{item.rowsReturned} rows</span>
                  </div>
                </div>
                <pre className="text-xs bg-dark-100 p-2 rounded-md overflow-x-auto max-h-24 overflow-y-auto">
                  {item.query}
                </pre>
                <div className="flex justify-end">
                  <Button size="sm" variant="ghost" onClick={() => onSelectQuery(item.query)}>
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    Use Query
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredHistory.length === 0 && (
          <div className="text-center py-8 text-gray-400">No query history found matching your search</div>
        )}
      </div>
    </div>
  )
}
