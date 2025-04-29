"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Code, Wallet } from "lucide-react"

export function ContractInteraction() {
  const [contractAddress, setContractAddress] = useState("")
  const [activeTab, setActiveTab] = useState("read")

  return (
    <Card className="border-gray-800">
      <CardHeader>
        <CardTitle>Contract Interaction</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="contract-address" className="text-sm font-medium mb-2 block">
                Contract Address
              </label>
              <Input
                id="contract-address"
                placeholder="0x..."
                className="bg-dark-100 border-gray-800"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Network</label>
              <select className="w-full h-10 px-3 py-2 bg-dark-100 border border-gray-800 rounded-md">
                <option>Ethereum</option>
                <option>Polygon</option>
                <option>Arbitrum</option>
                <option>Optimism</option>
                <option>BSC</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button>Load Contract</Button>
            </div>
          </div>

          {contractAddress && (
            <div className="border border-gray-800 rounded-md p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">ERC-721 Token</h3>
                  <div className="text-sm text-gray-400">MyNFT</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Verified</Badge>
                  <Button variant="outline" size="sm" className="border-gray-800">
                    <Code className="mr-2 h-4 w-4" />
                    View Source
                  </Button>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="read">Read Contract</TabsTrigger>
                  <TabsTrigger value="write">Write Contract</TabsTrigger>
                </TabsList>
                <TabsContent value="read" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-md">
                      <div>
                        <div className="font-medium">name()</div>
                        <div className="text-xs text-gray-400">returns (string)</div>
                      </div>
                      <Button size="sm">Query</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-md">
                      <div>
                        <div className="font-medium">symbol()</div>
                        <div className="text-xs text-gray-400">returns (string)</div>
                      </div>
                      <Button size="sm">Query</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-md">
                      <div>
                        <div className="font-medium">totalSupply()</div>
                        <div className="text-xs text-gray-400">returns (uint256)</div>
                      </div>
                      <Button size="sm">Query</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-md">
                      <div>
                        <div className="font-medium">balanceOf(address owner)</div>
                        <div className="text-xs text-gray-400">returns (uint256)</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input placeholder="address" className="h-8 w-48 bg-dark-100 border-gray-800" />
                        <Button size="sm">Query</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="write" className="space-y-4 mt-4">
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-md mb-4">
                    <div className="flex items-center gap-2 text-yellow-500">
                      <Wallet className="h-5 w-5" />
                      <span className="font-medium">Connect your wallet to interact with this contract</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-md">
                      <div>
                        <div className="font-medium">transferFrom(address from, address to, uint256 tokenId)</div>
                        <div className="text-xs text-gray-400">returns (bool)</div>
                      </div>
                      <Button size="sm" disabled>
                        Write
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-md">
                      <div>
                        <div className="font-medium">approve(address to, uint256 tokenId)</div>
                        <div className="text-xs text-gray-400">returns (bool)</div>
                      </div>
                      <Button size="sm" disabled>
                        Write
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {!contractAddress && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 mb-4">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Enter a Contract Address</h3>
              <p className="text-gray-400 mb-4 max-w-md">
                Enter a smart contract address to interact with its functions and view its data.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
