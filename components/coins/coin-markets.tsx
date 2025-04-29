import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CoinMarketsProps {
  markets: any[]
  coinSymbol: string
}

export function CoinMarkets({ markets, coinSymbol }: CoinMarketsProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium">#</th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Exchange</th>
            <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Pair</th>
            <th className="whitespace-nowrap px-4 py-3 text-right font-medium">Price</th>
            <th className="whitespace-nowrap px-4 py-3 text-right font-medium">Volume (24h)</th>
            <th className="whitespace-nowrap px-4 py-3 text-right font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {markets.map((market, index) => (
            <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
              <td className="whitespace-nowrap px-4 py-4 text-left">{index + 1}</td>
              <td className="whitespace-nowrap px-4 py-4 text-left">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800">
                    <span>{market.exchange.charAt(0)}</span>
                  </div>
                  <span>{market.exchange}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-left font-mono text-sm">{market.pair}</td>
              <td className="whitespace-nowrap px-4 py-4 text-right font-medium">
                ${Number(market.price).toLocaleString()}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-right">${Number(market.volume).toLocaleString()}</td>
              <td className="whitespace-nowrap px-4 py-4 text-right">
                <Button variant="outline" size="sm" className="border-gray-800">
                  Trade
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
