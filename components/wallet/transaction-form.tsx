"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TokenSelector } from "@/components/token-selector"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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

interface GasOption {
  name: string
  speed: string
  price: string
  time: string
  cost: string
}

const gasOptions: GasOption[] = [
  {
    name: "Economy",
    speed: "Slow",
    price: "12 Gwei",
    time: "~10 min",
    cost: "$2.15",
  },
  {
    name: "Standard",
    speed: "Average",
    price: "15 Gwei",
    time: "~3 min",
    cost: "$2.85",
  },
  {
    name: "Fast",
    speed: "Fast",
    price: "18 Gwei",
    time: "~1 min",
    cost: "$3.45",
  },
]

export function TransactionForm() {
  const [selectedToken, setSelectedToken] = useState("eth")
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [gasOption, setGasOption] = useState(1) // Standard by default
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("send")
  const { toast } = useToast()

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipient(e.target.value)
  }

  const handleMaxClick = () => {
    const token = tokens.find((t) => t.id === selectedToken)
    if (token) {
      setAmount(token.balance)
    }
  }

  const handleSubmit = () => {
    setIsConfirmOpen(true)
  }

  const handleConfirm = () => {
    setIsSubmitting(true)

    // Simulate transaction submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsConfirmOpen(false)

      toast({
        title: "Transaction Submitted",
        description: "Your transaction has been submitted to the network",
      })

      // Reset form
      setAmount("")
      setRecipient("")
    }, 2000)
  }

  const getSelectedToken = () => {
    return tokens.find((t) => t.id === selectedToken) || tokens[0]
  }

  const calculateUsdValue = () => {
    const token = getSelectedToken()
    if (!amount || isNaN(Number(amount))) return "$0.00"

    const value = Number(amount) * token.price
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Send Transaction</CardTitle>
          <CardDescription>Transfer tokens to another address</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="send">Send</TabsTrigger>
              <TabsTrigger value="request">Request</TabsTrigger>
            </TabsList>
            <TabsContent value="send" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="token">Token</Label>
                  <TokenSelector value={selectedToken} onValueChange={setSelectedToken} tokens={tokens} />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="amount">Amount</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleMaxClick}
                      className="h-auto py-1 px-2 text-xs text-primary"
                    >
                      MAX
                    </Button>
                  </div>
                  <div className="relative mt-1.5">
                    <Input
                      id="amount"
                      type="text"
                      placeholder="0.0"
                      value={amount}
                      onChange={handleAmountChange}
                      className="pr-20"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-400">
                      {getSelectedToken().symbol}
                    </div>
                  </div>
                  <div className="mt-1 text-right text-sm text-gray-400">{calculateUsdValue()}</div>
                </div>
                <div>
                  <Label htmlFor="recipient">Recipient Address</Label>
                  <Input id="recipient" placeholder="0x..." value={recipient} onChange={handleRecipientChange} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Gas Fee</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Gas fees are paid to miners to include your transaction in the blockchain</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {gasOptions.map((option, index) => (
                      <div
                        key={option.name}
                        className={`cursor-pointer rounded-md border p-3 transition-colors ${
                          gasOption === index ? "border-primary bg-primary/10" : "border-gray-800 hover:border-gray-700"
                        }`}
                        onClick={() => setGasOption(index)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{option.name}</span>
                          <span className="text-xs text-gray-400">{option.speed}</span>
                        </div>
                        <div className="mt-1 text-sm">{option.price}</div>
                        <div className="mt-1 flex items-center justify-between text-xs text-gray-400">
                          <span>{option.time}</span>
                          <span>{option.cost}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="request" className="pt-4">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="text-4xl mb-4">📩</div>
                <h3 className="text-lg font-medium mb-2">Request Payment</h3>
                <p className="text-gray-400 mb-4">Generate a payment request link to share with others</p>
                <Button disabled>Coming Soon</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={!amount || !recipient} className="w-full">
            Send Transaction
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Transaction</DialogTitle>
            <DialogDescription>Please review the transaction details before confirming</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-center justify-center gap-2 py-4">
              <div className="text-2xl font-semibold">
                {amount} {getSelectedToken().symbol}
              </div>
              <div className="text-gray-400">{calculateUsdValue()}</div>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-8 w-8 rounded-full bg-gray-800" />
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="h-8 w-8 rounded-full bg-gray-800" />
              </div>
              <div className="mt-1 text-sm font-mono">{recipient}</div>
            </div>
            <div className="space-y-2 rounded-md border border-gray-800 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Network Fee</span>
                <span>{gasOptions[gasOption].cost}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Gas Price</span>
                <span>{gasOptions[gasOption].price}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Estimated Time</span>
                <span>{gasOptions[gasOption].time}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Confirming...
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
