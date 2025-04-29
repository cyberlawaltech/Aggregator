"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowDown, Settings, Info } from "lucide-react"
import { TokenSelector } from "@/components/token-selector"
import { DexRouteVisualization } from "@/components/dex-route-visualization"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample token data
const tokens = [
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    logo: "/placeholder.svg?height=32&width=32",
    balance: "1.45",
    price: 1830.42,
  },
  {
    id: "usdc",
    symbol: "USDC",
    name: "USD Coin",
    logo: "/placeholder.svg?height=32&width=32",
    balance: "2,500.00",
    price: 1.0,
  },
  {
    id: "wbtc",
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    logo: "/placeholder.svg?height=32&width=32",
    balance: "0.12",
    price: 65420.1,
  },
  {
    id: "uni",
    symbol: "UNI",
    name: "Uniswap",
    logo: "/placeholder.svg?height=32&width=32",
    balance: "150.75",
    price: 5.23,
  },
  {
    id: "link",
    symbol: "LINK",
    name: "Chainlink",
    logo: "/placeholder.svg?height=32&width=32",
    balance: "75.5",
    price: 14.75,
  },
]

// Sample route data
const routeSteps = [
  { protocol: "Uniswap V3", percentage: 45, color: "#FF007A" },
  { protocol: "SushiSwap", percentage: 30, color: "#0993EC" },
  { protocol: "Curve", percentage: 25, color: "#FF5CAA" },
]

export default function DexPage() {
  const [fromToken, setFromToken] = useState("eth")
  const [toToken, setToToken] = useState("usdc")
  const [fromAmount, setFromAmount] = useState("1")
  const [toAmount, setToAmount] = useState("1830.42")
  const [slippage, setSlippage] = useState([0.5])
  const [network, setNetwork] = useState("ethereum")
  const [activeTab, setActiveTab] = useState("swap")

  const handleSwitch = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFromAmount(value)

    // Simple calculation for demo purposes
    const fromTokenObj = tokens.find((t) => t.id === fromToken)
    const toTokenObj = tokens.find((t) => t.id === toToken)

    if (fromTokenObj && toTokenObj && value) {
      const calculatedAmount = ((Number.parseFloat(value) * fromTokenObj.price) / toTokenObj.price).toFixed(6)
      setToAmount(calculatedAmount)
    }
  }

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setToAmount(value)

    // Simple calculation for demo purposes
    const fromTokenObj = tokens.find((t) => t.id === fromToken)
    const toTokenObj = tokens.find((t) => t.id === toToken)

    if (fromTokenObj && toTokenObj && value) {
      const calculatedAmount = ((Number.parseFloat(value) * toTokenObj.price) / fromTokenObj.price).toFixed(6)
      setFromAmount(calculatedAmount)
    }
  }

  const getFromTokenSymbol = () => {
    const token = tokens.find((t) => t.id === fromToken)
    return token ? token.symbol : ""
  }

  const getToTokenSymbol = () => {
    const token = tokens.find((t) => t.id === toToken)
    return token ? token.symbol : ""
  }

  const calculatePriceImpact = () => {
    // Simplified calculation for demo
    return "0.05%"
  }

  const calculateMinimumReceived = () => {
    const amount = Number.parseFloat(toAmount)
    const slippageValue = slippage[0]
    return (amount * (1 - slippageValue / 100)).toFixed(6)
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">DEX Aggregator</h1>
        <p className="text-gray-400">Swap tokens at the best rates across multiple exchanges</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Swap</CardTitle>
              <CardDescription>Trade tokens across multiple DEXs</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={network} onValueChange={setNetwork}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                  <SelectItem value="bsc">BSC</SelectItem>
                  <SelectItem value="arbitrum">Arbitrum</SelectItem>
                  <SelectItem value="optimism">Optimism</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="swap">Swap</TabsTrigger>
                <TabsTrigger value="limit">Limit</TabsTrigger>
                <TabsTrigger value="pool">Pool</TabsTrigger>
              </TabsList>
              <TabsContent value="swap" className="space-y-4">
                <div className="rounded-lg border border-gray-800 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">From</span>
                    <span className="text-sm text-gray-400">
                      Balance: {tokens.find((t) => t.id === fromToken)?.balance || "0"} {getFromTokenSymbol()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        value={fromAmount}
                        onChange={handleFromAmountChange}
                        className="pr-16 h-14 text-lg bg-dark-100 border-gray-800"
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center">
                        <Button variant="ghost" size="sm" className="h-auto py-1 px-2 text-xs text-primary">
                          MAX
                        </Button>
                      </div>
                    </div>
                    <TokenSelector value={fromToken} onValueChange={setFromToken} tokens={tokens} />
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSwitch}
                    className="h-10 w-10 rounded-full border border-gray-800 bg-dark-100 hover:bg-dark-200"
                  >
                    <ArrowDown className="h-5 w-5" />
                  </Button>
                </div>

                <div className="rounded-lg border border-gray-800 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">To</span>
                    <span className="text-sm text-gray-400">
                      Balance: {tokens.find((t) => t.id === toToken)?.balance || "0"} {getToTokenSymbol()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        value={toAmount}
                        onChange={handleToAmountChange}
                        className="pr-16 h-14 text-lg bg-dark-100 border-gray-800"
                      />
                    </div>
                    <TokenSelector value={toToken} onValueChange={setToToken} tokens={tokens} />
                  </div>
                </div>

                <div className="space-y-4 rounded-lg border border-gray-800 p-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">Slippage Tolerance</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-[200px] text-xs">
                                Your transaction will revert if the price changes unfavorably by more than this
                                percentage.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <span className="text-sm font-medium">{slippage[0]}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={slippage}
                        onValueChange={setSlippage}
                        min={0.1}
                        max={5}
                        step={0.1}
                        className="flex-1"
                      />
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`h-7 px-2 ${slippage[0] === 0.5 ? "bg-primary/20 border-primary" : "border-gray-800"}`}
                          onClick={() => setSlippage([0.5])}
                        >
                          0.5%
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`h-7 px-2 ${slippage[0] === 1 ? "bg-primary/20 border-primary" : "border-gray-800"}`}
                          onClick={() => setSlippage([1])}
                        >
                          1%
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gray-800">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Price</span>
                      <span className="text-sm">
                        1 {getFromTokenSymbol()} ={" "}
                        {(tokens.find((t) => t.id === fromToken)?.price || 0) /
                          (tokens.find((t) => t.id === toToken)?.price || 1)}{" "}
                        {getToTokenSymbol()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Price Impact</span>
                      <span className="text-sm">{calculatePriceImpact()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Minimum Received</span>
                      <span className="text-sm">
                        {calculateMinimumReceived()} {getToTokenSymbol()}
                      </span>
                    </div>
                  </div>
                </div>

                <Button className="w-full h-14 text-lg">Swap</Button>

                <DexRouteVisualization
                  steps={routeSteps}
                  fromToken={getFromTokenSymbol()}
                  toToken={getToTokenSymbol()}
                />
              </TabsContent>
              <TabsContent value="limit" className="pt-2">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-lg font-medium mb-2">Limit Orders</h3>
                  <p className="text-gray-400 mb-4">
                    Set a price to buy or sell automatically when market conditions are met
                  </p>
                  <Button disabled>Coming Soon</Button>
                </div>
              </TabsContent>
              <TabsContent value="pool" className="pt-2">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="text-4xl mb-4">💧</div>
                  <h3 className="text-lg font-medium mb-2">Liquidity Pools</h3>
                  <p className="text-gray-400 mb-4">Provide liquidity to earn fees from trades</p>
                  <Button disabled>Coming Soon</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
