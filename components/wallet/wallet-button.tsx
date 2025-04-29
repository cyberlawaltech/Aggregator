"use client"

import { useState } from "react"
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WalletConnectModal } from "@/components/wallet/wallet-connect-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NetworkSelector } from "@/components/wallet/network-selector"
import { useToast } from "@/components/ui/use-toast"

interface ConnectedWallet {
  id: string
  name: string
  icon: string
  address: string
  network: string
  balance: string
}

// Wallet icons mapping
const walletIcons: Record<string, string> = {
  metamask: "🦊",
  coinbase: "🔵",
  trust: "🛡️",
  phantom: "👻",
  ledger: "🔒",
  trezor: "🛡️",
  gnosis: "🔐",
  rainbow: "🌈",
  argent: "🔷",
  exodus: "🚪",
  brave: "🦁",
  tokenpocket: "📱",
  oneinch: "1️⃣",
  zengo: "🔑",
  zerion: "⚡",
  okx: "🟢",
  bitget: "🔵",
  huobi: "🔶",
}

export function WalletButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<ConnectedWallet | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  const handleConnect = (walletId: string) => {
    setIsConnecting(true)

    // Simulate connection
    setTimeout(() => {
      const walletData = {
        id: walletId,
        name: getWalletName(walletId),
        icon: getWalletIcon(walletId),
        address: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
        network: "ethereum",
        balance: "1.45 ETH",
      }

      setConnectedWallet(walletData)
      setIsConnecting(false)
      setIsModalOpen(false)

      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${walletData.name}`,
      })
    }, 1000)
  }

  const handleDisconnect = () => {
    setConnectedWallet(null)

    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  const handleCopyAddress = () => {
    if (connectedWallet) {
      navigator.clipboard.writeText(connectedWallet.address)

      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
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
      rainbow: "Rainbow",
      argent: "Argent",
      exodus: "Exodus",
      brave: "Brave Wallet",
      tokenpocket: "TokenPocket",
      oneinch: "1inch Wallet",
      zengo: "ZenGo",
      zerion: "Zerion",
      okx: "OKX Wallet",
      bitget: "Bitget Wallet",
      huobi: "Huobi Wallet",
    }

    return walletNames[id] || "Wallet"
  }

  const getWalletIcon = (id: string): string => {
    return walletIcons[id] || "💼"
  }

  const formatAddress = (address: string): string => {
    if (!address) return ""
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <>
      {connectedWallet ? (
        <div className="flex items-center gap-2">
          <NetworkSelector />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-green-500/20 bg-green-500/10 text-green-500 hover:bg-green-500/20"
              >
                <span className="mr-2">{connectedWallet.icon}</span>
                <span>{formatAddress(connectedWallet.address)}</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-lg">
                    {connectedWallet.icon}
                  </div>
                  <div>
                    <p className="font-medium">{connectedWallet.name}</p>
                    <p className="text-xs text-gray-400">{formatAddress(connectedWallet.address)}</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-2">
                <div className="rounded-md bg-gray-800 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Balance</span>
                    <span className="font-medium">{connectedWallet.balance}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-400">Network</span>
                    <span className="font-medium capitalize">{connectedWallet.network}</span>
                  </div>
                </div>
              </div>
              <DropdownMenuItem onClick={handleCopyAddress}>
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy Address</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                <span>View on Explorer</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDisconnect} className="text-red-500 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Disconnect</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Button
          variant="default"
          onClick={() => setIsModalOpen(true)}
          disabled={isConnecting}
          className="bg-primary hover:bg-primary/90"
        >
          {isConnecting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </>
          )}
        </Button>
      )}

      <WalletConnectModal open={isModalOpen} onOpenChange={setIsModalOpen} onConnect={handleConnect} />
    </>
  )
}
