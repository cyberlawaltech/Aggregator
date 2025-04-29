"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SqlEditorProps {
  onExecute?: (query: string) => void
  defaultQuery?: string
  isLoading?: boolean
}

export function SqlEditor({
  onExecute,
  defaultQuery = "SELECT token_symbol, SUM(amount) as total_volume\nFROM dex.trades\nWHERE block_time > now() - interval '24 hours'\nGROUP BY token_symbol\nORDER BY total_volume DESC\nLIMIT 10;",
  isLoading = false,
}: SqlEditorProps) {
  const [query, setQuery] = useState(defaultQuery)
  const [activeTab, setActiveTab] = useState("editor")

  const handleExecute = () => {
    if (onExecute) {
      onExecute(query)
    }
  }

  const templates = [
    {
      name: "Top Tokens by Volume",
      query:
        "SELECT token_symbol, SUM(amount) as total_volume\nFROM dex.trades\nWHERE block_time > now() - interval '24 hours'\nGROUP BY token_symbol\nORDER BY total_volume DESC\nLIMIT 10;",
    },
    {
      name: "Wallet Activity",
      query:
        "SELECT date_trunc('day', block_time) as day, COUNT(DISTINCT from_address) as unique_wallets\nFROM ethereum.transactions\nWHERE block_time > now() - interval '30 days'\nGROUP BY 1\nORDER BY 1;",
    },
    {
      name: "NFT Sales",
      query:
        "SELECT collection_name, COUNT(*) as sales, SUM(price_usd) as volume\nFROM nft.trades\nWHERE block_time > now() - interval '7 days'\nGROUP BY collection_name\nORDER BY volume DESC\nLIMIT 10;",
    },
  ]

  return (
    <Card className="border border-gray-800">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2">
          <TabsList className="bg-transparent">
            <TabsTrigger value="editor" className="data-[state=active]:bg-gray-800">
              Query Editor
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-gray-800">
              Templates
            </TabsTrigger>
          </TabsList>
          <Button onClick={handleExecute} disabled={isLoading} className="bg-primary hover:bg-primary/90">
            <Play className="mr-2 h-4 w-4" />
            {isLoading ? "Running..." : "Run Query"}
          </Button>
        </div>
        <TabsContent value="editor" className="m-0">
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="font-mono text-sm w-full h-64 p-4 bg-dark-100 border-0 focus:ring-0 resize-none"
              spellCheck="false"
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
              Press Run Query or Ctrl+Enter to execute
            </div>
          </div>
        </TabsContent>
        <TabsContent value="templates" className="m-0 p-0">
          <div className="grid gap-2 p-4">
            {templates.map((template, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto p-4 border-gray-800"
                onClick={() => {
                  setQuery(template.query)
                  setActiveTab("editor")
                }}
              >
                <div className="text-left">
                  <h3 className="font-medium mb-1">{template.name}</h3>
                  <pre className="text-xs text-gray-400 font-mono whitespace-pre-wrap">
                    {template.query.length > 100 ? template.query.substring(0, 100) + "..." : template.query}
                  </pre>
                </div>
              </Button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
