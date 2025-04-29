"use client"

import { useState } from "react"
import { Check, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Token {
  id: string
  symbol: string
  name: string
  logo: string
  price: number
  change24h: number
}

interface TokenSelectionColumnProps {
  tokens: Token[]
  selectedTokenId: string
  onSelectToken: (tokenId: string) => void
}

export function TokenSelectionColumn({ tokens, selectedTokenId, onSelectToken }: TokenSelectionColumnProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Select Token</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="mb-3">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tokens..."
              className="pl-8 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-1 max-h-[240px] overflow-y-auto pr-1 token-scroll">
          {filteredTokens.map((token) => (
            <div
              key={token.id}
              className={cn(
                "flex items-center justify-between p-2 rounded-md cursor-pointer",
                selectedTokenId === token.id ? "bg-primary/10 text-primary" : "hover:bg-gray-800/50",
              )}
              onClick={() => onSelectToken(token.id)}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                  <img
                    src={token.logo || `/placeholder.svg?height=32&width=32`}
                    alt={token.name}
                    className="h-6 w-6"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = `/placeholder.svg?height=24&width=24`
                    }}
                  />
                </div>
                <div>
                  <div className="font-medium">{token.symbol}</div>
                  <div className="text-xs text-gray-400 truncate max-w-[100px]">{token.name}</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-sm">${token.price.toLocaleString()}</div>
                <div className={cn("text-xs", token.change24h >= 0 ? "text-green-500" : "text-red-500")}>
                  {token.change24h >= 0 ? "+" : ""}
                  {token.change24h.toFixed(2)}%
                </div>
              </div>
              {selectedTokenId === token.id && <Check className="ml-2 h-4 w-4 text-primary" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
