"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface WalletConnectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConnect: (walletId: string) => void
}

interface WalletOption {
  id: string
  name: string
  icon: string
  description: string
  popular?: boolean
}

export function WalletConnectModal({ open, onOpenChange, onConnect }: WalletConnectModalProps) {
  const popularWallets: WalletOption[] = [
    {
      id: "metamask",
      name: "MetaMask",
      icon: "🦊",
      description: "Connect to your MetaMask Wallet",
      popular: true,
    },
    {
      id: "coinbase",
      name: "Coinbase Wallet",
      icon: "🔵",
      description: "Connect to your Coinbase Wallet",
      popular: true,
    },
    {
      id: "trust",
      name: "Trust Wallet",
      icon: "🛡️",
      description: "Connect to your Trust Wallet",
      popular: true,
    },
    {
      id: "phantom",
      name: "Phantom",
      icon: "👻",
      description: "Connect to your Phantom Wallet",
      popular: true,
    },
  ]

  const otherWallets: WalletOption[] = [
    {
      id: "rainbow",
      name: "Rainbow",
      icon: "🌈",
      description: "Connect to your Rainbow Wallet",
    },
    {
      id: "argent",
      name: "Argent",
      icon: "🔷",
      description: "Connect to your Argent Wallet",
    },
    {
      id: "exodus",
      name: "Exodus",
      icon: "🚪",
      description: "Connect to your Exodus Wallet",
    },
    {
      id: "brave",
      name: "Brave Wallet",
      icon: "🦁",
      description: "Connect to your Brave Wallet",
    },
    {
      id: "tokenpocket",
      name: "TokenPocket",
      icon: "📱",
      description: "Connect to your TokenPocket Wallet",
    },
    {
      id: "oneinch",
      name: "1inch Wallet",
      icon: "1️⃣",
      description: "Connect to your 1inch Wallet",
    },
    {
      id: "ledger",
      name: "Ledger",
      icon: "🔒",
      description: "Connect to your Ledger Hardware Wallet",
    },
    {
      id: "trezor",
      name: "Trezor",
      icon: "🛡️",
      description: "Connect to your Trezor Hardware Wallet",
    },
    {
      id: "gnosis",
      name: "Gnosis Safe",
      icon: "🔐",
      description: "Connect to your Gnosis Safe",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-400">Popular Wallets</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {popularWallets.map((wallet) => (
                <button
                  key={wallet.id}
                  className="flex flex-col items-center justify-center rounded-lg border border-gray-800 bg-gray-900 p-3 text-center transition-colors hover:border-gray-700 hover:bg-gray-800"
                  onClick={() => onConnect(wallet.id)}
                >
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-2xl">
                    {wallet.icon}
                  </div>
                  <div className="text-sm font-medium">{wallet.name}</div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-400">Other Wallets</h3>
            <div className="grid max-h-[200px] gap-2 overflow-y-auto pr-1">
              {otherWallets.map((wallet) => (
                <button
                  key={wallet.id}
                  className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900 p-3 text-left transition-colors hover:border-gray-700 hover:bg-gray-800"
                  onClick={() => onConnect(wallet.id)}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-xl">
                    {wallet.icon}
                  </div>
                  <div>
                    <div className="font-medium">{wallet.name}</div>
                    <div className="text-xs text-gray-400">{wallet.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
