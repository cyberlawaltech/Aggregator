"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WalletManager } from "@/components/wallet/wallet-manager"
import { TransactionForm } from "@/components/wallet/transaction-form"

export default function WalletPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Wallet Management</h1>
        <p className="text-muted-foreground">Manage your wallets and transactions across multiple chains.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="md:col-span-2"
        >
          <WalletManager />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <TransactionForm />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Cross-Chain Bridge</CardTitle>
            <CardDescription>Transfer assets between different blockchain networks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-2xl">🔷</div>
                <ArrowRight className="h-6 w-6 text-gray-400" />
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-2xl">🟣</div>
              </div>
              <h3 className="mt-4 text-lg font-medium">Bridge Your Assets</h3>
              <p className="mt-2 text-gray-400 max-w-md">
                Seamlessly transfer your tokens between Ethereum, Polygon, BSC, and other supported networks
              </p>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Start Bridge Transfer
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
