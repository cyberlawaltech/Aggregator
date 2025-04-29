"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface QueryTemplatesProps {
  onSelectTemplate: (query: string) => void
}

interface Template {
  id: string
  name: string
  description: string
  category: string
  query: string
}

const templates: Template[] = [
  {
    id: "token-volume",
    name: "Top Tokens by Volume",
    description: "Shows the top tokens by trading volume in the last 24 hours",
    category: "DeFi",
    query: `SELECT token_symbol, SUM(amount) as total_volume, AVG(price) as avg_price
FROM dex.trades
WHERE block_time > now() - interval '24 hours'
GROUP BY token_symbol
ORDER BY total_volume DESC
LIMIT 10;`,
  },
  {
    id: "wallet-activity",
    name: "Daily Wallet Activity",
    description: "Tracks unique active wallets and transaction count per day",
    category: "Wallets",
    query: `SELECT date_trunc('day', block_time) as day, 
       COUNT(DISTINCT from_address) as unique_wallets,
       COUNT(*) as transactions
FROM ethereum.transactions
WHERE block_time > now() - interval '7 days'
GROUP BY 1
ORDER BY 1;`,
  },
  {
    id: "nft-sales",
    name: "NFT Collection Sales",
    description: "Analyzes NFT collection sales volume and count",
    category: "NFTs",
    query: `SELECT collection_name, COUNT(*) as sales, SUM(price_usd) as volume
FROM nft.trades
WHERE block_time > now() - interval '7 days'
GROUP BY collection_name
ORDER BY volume DESC
LIMIT 10;`,
  },
  {
    id: "gas-usage",
    name: "Gas Usage Analysis",
    description: "Examines gas usage patterns across different contract interactions",
    category: "Network",
    query: `SELECT to_address as contract, 
       COUNT(*) as tx_count,
       AVG(gas_used) as avg_gas,
       SUM(gas_used) as total_gas
FROM ethereum.transactions
WHERE block_time > now() - interval '24 hours'
  AND to_address IS NOT NULL
GROUP BY to_address
ORDER BY total_gas DESC
LIMIT 15;`,
  },
  {
    id: "defi-tvl",
    name: "DeFi Protocol TVL",
    description: "Compares Total Value Locked across DeFi protocols",
    category: "DeFi",
    query: `SELECT protocol_name, 
       current_tvl_usd,
       previous_tvl_usd,
       ((current_tvl_usd - previous_tvl_usd) / previous_tvl_usd) * 100 as tvl_change_percent
FROM defi.tvl_daily
WHERE snapshot_date = CURRENT_DATE
ORDER BY current_tvl_usd DESC
LIMIT 20;`,
  },
]

export function QueryTemplates({ onSelectTemplate }: QueryTemplatesProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.query.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory ? template.category === selectedCategory : true

    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(templates.map((t) => t.category)))

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search templates..."
            className="pl-9 bg-dark-100 border-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className={selectedCategory !== null ? "border-gray-800" : ""}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory !== category ? "border-gray-800" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className="border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
            onClick={() => onSelectTemplate(template.query)}
          >
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{template.name}</h3>
                  <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">{template.category}</span>
                </div>
                <p className="text-sm text-gray-400">{template.description}</p>
                <pre className="text-xs bg-dark-100 p-2 rounded-md overflow-x-auto max-h-24 overflow-y-auto">
                  {template.query}
                </pre>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-8 text-gray-400">No templates found matching your search criteria</div>
      )}
    </div>
  )
}
