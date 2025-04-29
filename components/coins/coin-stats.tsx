import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CoinStatsProps {
  coin: any
}

export function CoinStats({ coin }: CoinStatsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-400">Market Cap</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-xs">Market Cap = Current Price x Circulating Supply</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <span className="font-medium">${Number(coin.market_cap).toLocaleString()}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-400">24h Trading Vol</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-xs">
                  A measure of how much of a cryptocurrency was traded in the last 24 hours.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <span className="font-medium">${Number(coin.total_volume).toLocaleString()}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-400">Circulating Supply</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-xs">
                  The amount of coins that are circulating in the market and are tradeable by the public.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <span className="font-medium">
          {Number(coin.circulating_supply).toLocaleString()} {coin.symbol.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-400">Total Supply</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-xs">
                  The amount of coins that have been already created, minus any coins that have been burned.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <span className="font-medium">
          {Number(coin.total_supply).toLocaleString()} {coin.symbol.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-400">Max Supply</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-xs">
                  The maximum amount of coins that will ever exist in the lifetime of the cryptocurrency.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <span className="font-medium">
          {coin.max_supply ? `${Number(coin.max_supply).toLocaleString()} ${coin.symbol.toUpperCase()}` : "∞"}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-400">All-Time High</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-xs">
                  The highest price paid for this asset since it was launched or listed.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="text-right">
          <div className="font-medium">${Number(coin.ath).toLocaleString()}</div>
          <div className="text-xs text-gray-400">
            {new Date(coin.ath_date).toLocaleDateString([], {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
