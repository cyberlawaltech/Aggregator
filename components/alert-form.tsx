"use client"

import type React from "react"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Update the component to accept an onComplete prop
export function AlertForm({ onComplete }: { onComplete?: () => void } = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [blockchain, setBlockchain] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
        if (onComplete) {
          onComplete()
        }
      }, 3000)
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Alert</CardTitle>
        <CardDescription>Set up real-time alerts for blockchain events</CardDescription>
      </CardHeader>
      <CardContent>
        {isSuccess && (
          <Alert className="mb-6 bg-green-500/10 text-green-500 border-green-500/20">
            <Check className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your alert has been created successfully.</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Alert Name</Label>
              <Input id="name" placeholder="e.g., Large ETH Transfer Alert" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="blockchain">Blockchain</Label>
              <Select value={blockchain} onValueChange={setBlockchain} required>
                <SelectTrigger id="blockchain">
                  <SelectValue placeholder="Select blockchain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                  <SelectItem value="arbitrum">Arbitrum</SelectItem>
                  <SelectItem value="optimism">Optimism</SelectItem>
                  <SelectItem value="avalanche">Avalanche</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="contract">Contract Address</Label>
              <Input id="contract" placeholder="0x..." required />
              <p className="text-xs text-gray-500">Enter the smart contract address you want to monitor</p>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="event">Event Name</Label>
              <Input id="event" placeholder="e.g., Transfer, Swap" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="conditions">Conditions (Optional)</Label>
              <Textarea id="conditions" placeholder="e.g., amount > 100 ETH" className="min-h-[100px]" />
              <p className="text-xs text-gray-500">
                Define conditions to filter events. Leave empty to capture all events.
              </p>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="webhook">Webhook URL (Optional)</Label>
              <Input id="webhook" placeholder="https://..." />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Alert"}
        </Button>
      </CardFooter>
    </Card>
  )
}
