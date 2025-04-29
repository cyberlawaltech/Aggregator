"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileCode, Upload, Check } from "lucide-react"

export function ContractVerifier() {
  return (
    <Card className="border-gray-800">
      <CardHeader>
        <CardTitle>Contract Verification</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="contract-address" className="text-sm font-medium">
                Contract Address
              </label>
              <Input id="contract-address" placeholder="0x..." className="bg-dark-100 border-gray-800" />
            </div>

            <div className="grid gap-2">
              <label htmlFor="contract-name" className="text-sm font-medium">
                Contract Name
              </label>
              <Input id="contract-name" placeholder="MyToken" className="bg-dark-100 border-gray-800" />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Compiler Version</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <select className="w-full h-10 px-3 py-2 bg-dark-100 border border-gray-800 rounded-md">
                    <option>Solidity</option>
                    <option>Vyper</option>
                  </select>
                </div>
                <div>
                  <select className="w-full h-10 px-3 py-2 bg-dark-100 border border-gray-800 rounded-md">
                    <option>v0.8.17</option>
                    <option>v0.8.16</option>
                    <option>v0.8.15</option>
                    <option>v0.8.14</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="contract-code" className="text-sm font-medium">
                Contract Source Code
              </label>
              <Textarea
                id="contract-code"
                placeholder="// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MyToken {
    // Paste your contract code here
}"
                className="min-h-[300px] bg-dark-100 border-gray-800 font-mono"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Or Upload Source Files</label>
              <div className="border-2 border-dashed border-gray-800 rounded-md p-6 flex flex-col items-center justify-center">
                <FileCode className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-400 mb-2">Drag and drop your source files here, or click to browse</p>
                <Button variant="outline" className="border-gray-800">
                  <Upload className="mr-2 h-4 w-4" />
                  Browse Files
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button>
                <Check className="mr-2 h-4 w-4" />
                Verify Contract
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
