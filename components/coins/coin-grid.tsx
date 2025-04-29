import Link from "next/link"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CoinGridProps {
  coins: any[]
}

export function CoinGrid({ coins }: CoinGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {coins.map((coin) => (
        <Link key={coin.id} href={`/coins/${coin.id}`} className="block">
          <Card className="border-gray-800 transition-colors hover:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800">
                    <span>{coin.symbol.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-medium">{coin.name}</div>
                    <div className="text-xs text-gray-400">{coin.symbol.toUpperCase()}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">#{coin.market_cap_rank}</div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="font-medium">${Number(coin.current_price).toLocaleString()}</div>
                <div
                  className={cn(
                    "flex items-center text-sm",
                    Number(coin.price_change_percentage_24h) >= 0 ? "text-green-500" : "text-red-500",
                  )}
                >
                  {Number(coin.price_change_percentage_24h) >= 0 ? (
                    <ChevronUp className="mr-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="mr-1 h-4 w-4" />
                  )}
                  {Math.abs(Number(coin.price_change_percentage_24h)).toFixed(2)}%
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400">Market Cap: ${Number(coin.market_cap).toLocaleString()}</div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
