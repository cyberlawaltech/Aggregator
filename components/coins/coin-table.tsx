"use client"

import Link from "next/link"
import { ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface CoinTableProps {
  coins: any[]
  sortBy: string
  sortDirection: "asc" | "desc"
  onSort: (column: string) => void
}

export function CoinTable({ coins, sortBy, sortDirection, onSort }: CoinTableProps) {
  const getSortIcon = (column: string) => {
    if (sortBy !== column) return <ArrowUpDown className="ml-2 h-4 w-4" />
    return sortDirection === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            <th
              className="cursor-pointer whitespace-nowrap px-4 py-3 text-left font-medium"
              onClick={() => onSort("market_cap_rank")}
            >
              <div className="flex items-center">
                <span>#</span>
                {getSortIcon("market_cap_rank")}
              </div>
            </th>
            <th
              className="cursor-pointer whitespace-nowrap px-4 py-3 text-left font-medium"
              onClick={() => onSort("name")}
            >
              <div className="flex items-center">
                <span>Name</span>
                {getSortIcon("name")}
              </div>
            </th>
            <th
              className="cursor-pointer whitespace-nowrap px-4 py-3 text-right font-medium"
              onClick={() => onSort("current_price")}
            >
              <div className="flex items-center justify-end">
                <span>Price</span>
                {getSortIcon("current_price")}
              </div>
            </th>
            <th
              className="cursor-pointer whitespace-nowrap px-4 py-3 text-right font-medium"
              onClick={() => onSort("price_change_percentage_24h")}
            >
              <div className="flex items-center justify-end">
                <span>24h %</span>
                {getSortIcon("price_change_percentage_24h")}
              </div>
            </th>
            <th
              className="cursor-pointer whitespace-nowrap px-4 py-3 text-right font-medium"
              onClick={() => onSort("market_cap")}
            >
              <div className="flex items-center justify-end">
                <span>Market Cap</span>
                {getSortIcon("market_cap")}
              </div>
            </th>
            <th
              className="cursor-pointer whitespace-nowrap px-4 py-3 text-right font-medium"
              onClick={() => onSort("total_volume")}
            >
              <div className="flex items-center justify-end">
                <span>Volume (24h)</span>
                {getSortIcon("total_volume")}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id} className="border-b border-gray-800 hover:bg-gray-800/50">
              <td className="whitespace-nowrap px-4 py-4 text-left">{coin.market_cap_rank}</td>
              <td className="whitespace-nowrap px-4 py-4 text-left">
                <Link href={`/coins/${coin.id}`} className="flex items-center gap-2 hover:text-primary">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800">
                    <span>{coin.symbol.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-medium">{coin.name}</div>
                    <div className="text-xs text-gray-400">{coin.symbol.toUpperCase()}</div>
                  </div>
                </Link>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-right font-medium">
                ${Number(coin.current_price).toLocaleString()}
              </td>
              <td
                className={cn(
                  "whitespace-nowrap px-4 py-4 text-right",
                  Number(coin.price_change_percentage_24h) >= 0 ? "text-green-500" : "text-red-500",
                )}
              >
                <div className="flex items-center justify-end">
                  {Number(coin.price_change_percentage_24h) >= 0 ? (
                    <ChevronUp className="mr-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="mr-1 h-4 w-4" />
                  )}
                  {Math.abs(Number(coin.price_change_percentage_24h)).toFixed(2)}%
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-right">${Number(coin.market_cap).toLocaleString()}</td>
              <td className="whitespace-nowrap px-4 py-4 text-right">${Number(coin.total_volume).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
