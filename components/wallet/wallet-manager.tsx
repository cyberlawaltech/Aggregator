"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, ExternalLink, Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletConnectModal } from "@/components/wallet/wallet-connect-modal"
import { useToast } from "@/components/ui/use-toast"

interface ConnectedWallet {
  id: string
  name: string
  icon: string
  address: string
  network: string
  balance: string
  tokens: {
    symbol: string
    name: string
    balance: string
    value: string
    icon: string
  }[]
}

interface Transaction {
  id: string
  type: string
  status: "confirmed" | "pending" | "failed"
  from: string
  to: string
  amount: string
  value: string
  time: string
  network: string
}

const sampleWallets: ConnectedWallet[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "🦊",
    address: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    network: "ethereum",
    balance: "1.45 ETH",
    tokens: [
      { symbol: "ETH", name: "Ethereum", balance: "1.45", value: "$2,654.75", icon: "🔷" },
      { symbol: "USDC", name: "USD Coin", balance: "2,500.00", value: "$2,500.00", icon: "🔵" },
      { symbol: "LINK", name: "Chainlink", balance: "75.5", value: "$1,113.63", icon: "🔗" },
    ],
  },
  {
    id: "ledger",
    name: "Ledger",
    icon: "🔒",
    address: "0x9s8r7q6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a",
    network: "ethereum",
    balance: "0.75 ETH",
    tokens: [
      { symbol: "ETH", name: "Ethereum", balance: "0.75", value: "$1,373.25", icon: "🔷" },
      { symbol: "WBTC", name: "Wrapped Bitcoin", balance: "0.12", value: "$7,850.40", icon: "🟠" },
    ],
  },
]

const sampleTransactions: Transaction[] = [
  {
    id: "0x1a2b3c",
    type: "Swap",
    status: "confirmed",
    from: "ETH",
    to: "USDC",
    amount: "1.5 ETH",
    value: "$2,745.00",
    time: "2 mins ago",
    network: "ethereum",
  },
  {
    id: "0x4d5e6f",
    type: "Transfer",
    status: "pending",
    from: "0x1a2...3b4c",
    to: "0x5e6...7f8g",
    amount: "25,000 USDC",
    value: "$25,000.00",
    time: "15 mins ago",
    network: "ethereum",
  },
  {
    id: "0x7g8h9i",
    type: "Liquidity",
    status: "confirmed",
    from: "ETH/USDC",
    to: "Pool",
    amount: "0.5 ETH + 915 USDC",
    value: "$1,830.00",
    time: "1 hour ago",
    network: "polygon",
  },
  {
    id: "0xj0k1l",
    type: "NFT Purchase",
    status: "failed",
    from: "0x9a8...7b6c",
    to: "0x3d4...5e6f",
    amount: "CryptoPunk #7804",
    value: "$125,000.00",
    time: "3 hours ago",
    network: "ethereum",
  },
]

export function WalletManager() {
  const [wallets, setWallets] = useState<ConnectedWallet[]>(sampleWallets)
  const [transactions] = useState<Transaction[]>(sampleTransactions)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("wallets")
  const { toast } = useToast()

  const handleConnect = (walletId: string) => {
    // Simulate adding a new wallet
    const newWallet: ConnectedWallet = {
      id: walletId,
      name: getWalletName(walletId),
      icon: getWalletIcon(walletId),
      address: "0x" + Math.random().toString(16).substring(2, 42),
      network: "ethereum",
      balance: "0.5 ETH",
      tokens: [{ symbol: "ETH", name: "Ethereum", balance: "0.5", value: "$915.50", icon: "🔷" }],
    }

    setWallets([...wallets, newWallet])
    setIsModalOpen(false)

    toast({
      title: "Wallet Connected",
      description: `Successfully connected to ${newWallet.name}`,
    })
  }

  const handleDisconnect = (index: number) => {
    const newWallets = [...wallets]
    const removed = newWallets.splice(index, 1)
    setWallets(newWallets)

    toast({
      title: "Wallet Disconnected",
      description: `${removed[0].name} has been disconnected`,
    })
  }

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)

    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    })
  }

  const getWalletName = (id: string): string => {
    const walletNames: Record<string, string> = {
      metamask: "MetaMask",
      coinbase: "Coinbase Wallet",
      trust: "Trust Wallet",
      phantom: "Phantom",
      ledger: "Ledger",
      trezor: "Trezor",
      gnosis: "Gnosis Safe",
    }

    return walletNames[id] || "Wallet"
  }

  const getWalletIcon = (id: string): string => {
    const walletIcons: Record<string, string> = {
      metamask: "🦊",
      coinbase: "🔵",
      trust: "🛡️",
      phantom: "👻",
      ledger: "🔒",
      trezor: "🛡️",
      gnosis: "🔐",
    }

    return walletIcons[id] || "💼"
  }

  const formatAddress = (address: string): string => {
    if (!address) return ""
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "confirmed":
        return "text-green-500"
      case "pending":
        return "text-yellow-500"
      case "failed":
        return "text-red-500"
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Wallet Management</CardTitle>
            <CardDescription>Manage your connected wallets</CardDescription>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Wallet
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="wallets">Connected Wallets</TabsTrigger>
            <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          </TabsList>
          <TabsContent value="wallets" className="space-y-4 pt-4">
            {wallets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-lg font-medium mb-2">No Wallets Connected</h3>
                <p className="text-gray-400 mb-4">Connect a wallet to manage your assets</p>
                <Button onClick={() => setIsModalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              </div>
            ) : (
              wallets.map((wallet, index) => (
                <motion.div
                  key={wallet.address}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <Card className="border-gray-800">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-lg">
                            {wallet.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{wallet.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <span>{formatAddress(wallet.address)}</span>
                              <button
                                onClick={() => handleCopyAddress(wallet.address)}
                                className="text-gray-400 hover:text-white"
                              >
                                <Copy className="h-3 w-3" />
                              </button>
                              <a href="#" className="text-gray-400 hover:text-white">
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDisconnect(index)}
                          className="text-red-500 hover:bg-red-500/10 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Network</span>
                          <span className="capitalize">{wallet.network}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Balance</span>
                          <span>{wallet.balance}</span>
                        </div>
                        <div className="pt-2">
                          <h4 className="text-sm font-medium mb-2">Tokens</h4>
                          <div className="space-y-2">
                            {wallet.tokens.map((token) => (
                              <div
                                key={token.symbol}
                                className="flex items-center justify-between rounded-md bg-gray-800 p-2"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-700">
                                    {token.icon}
                                  </div>
                                  <div>
                                    <div className="font-medium">{token.symbol}</div>
                                    <div className="text-xs text-gray-400">{token.name}</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div>{token.balance}</div>
                                  <div className="text-xs text-gray-400">{token.value}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>
          <TabsContent value="transactions" className="pt-4">
            <div className="rounded-md border border-gray-800">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left font-medium py-3 px-4">Type</th>
                      <th className="text-left font-medium py-3 px-4">From</th>
                      <th className="text-left font-medium py-3 px-4">To</th>
                      <th className="text-left font-medium py-3 px-4">Amount</th>
                      <th className="text-right font-medium py-3 px-4">Value</th>
                      <th className="text-right font-medium py-3 px-4">Status</th>
                      <th className="text-right font-medium py-3 px-4">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                        <td className="py-3 px-4">{tx.type}</td>
                        <td className="py-3 px-4 font-mono text-xs">{tx.from}</td>
                        <td className="py-3 px-4 font-mono text-xs">{tx.to}</td>
                        <td className="py-3 px-4">{tx.amount}</td>
                        <td className="py-3 px-4 text-right">{tx.value}</td>
                        <td className={`py-3 px-4 text-right ${getStatusColor(tx.status)}`}>
                          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-400">{tx.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <WalletConnectModal open={isModalOpen} onOpenChange={setIsModalOpen} onConnect={handleConnect} />
    </Card>
  )
}
