"use client"

import { useState } from "react"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface WalletOption {
  id: string
  name: string
  icon: string
  popular?: boolean
}

export function WalletButton() {
  const [connected, setConnected] = useState(false)
  const [open, setOpen] = useState(false)

  const walletOptions: WalletOption[] = [
    { id: "metamask", name: "MetaMask", icon: "🦊", popular: true },
    { id: "coinbase", name: "Coinbase Wallet", icon: "🔵", popular: true },
    { id: "walletconnect", name: "WalletConnect", icon: "🔗", popular: true },
    { id: "phantom", name: "Phantom", icon: "👻" },
    { id: "trust", name: "Trust Wallet", icon: "🛡️" },
    { id: "brave", name: "Brave Wallet", icon: "🦁" },
  ]

  const handleConnect = (walletId: string) => {
    // Simulate connection
    setTimeout(() => {
      setConnected(true)
      setOpen(false)
    }, 500)
  }

  const handleDisconnect = () => {
    setConnected(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={connected ? "outline" : "default"}
          className={connected ? "border-green-500 text-green-500" : ""}
        >
          <Wallet className="mr-2 h-4 w-4" />
          {connected ? "0x1a2...3b4c" : "Connect Wallet"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>Connect your wallet to access all features</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-3">
            {walletOptions.map((wallet) => (
              <Button
                key={wallet.id}
                variant="outline"
                className="justify-start h-14 px-4 relative"
                onClick={() => handleConnect(wallet.id)}
              >
                <span className="text-xl mr-3">{wallet.icon}</span>
                <span>{wallet.name}</span>
                {wallet.popular && (
                  <span className="absolute right-4 bg-primary/10 text-primary text-xs py-0.5 px-2 rounded-full">
                    Popular
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex justify-center text-xs text-gray-500">
          <p>
            By connecting your wallet, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
