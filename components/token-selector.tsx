"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface Token {
  id: string
  symbol: string
  name: string
  logo: string
  balance?: string
  price?: number
}

interface TokenSelectorProps {
  value: string
  onValueChange: (value: string) => void
  tokens: Token[]
  label?: string
}

export function TokenSelector({ value, onValueChange, tokens, label = "Select token" }: TokenSelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)

  useEffect(() => {
    const token = tokens.find((token) => token.id === value)
    if (token) {
      setSelectedToken(token)
    }
  }, [value, tokens])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between h-14 bg-dark-100 border-gray-800 hover:bg-dark-200"
        >
          {selectedToken ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                <img
                  src={selectedToken.logo || "/placeholder.svg"}
                  alt={selectedToken.name}
                  className="w-6 h-6"
                  onError={(e) => {
                    // Fallback for broken images
                    ;(e.target as HTMLImageElement).src = `/placeholder.svg?height=24&width=24`
                  }}
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-medium">{selectedToken.symbol}</span>
                {selectedToken.balance && (
                  <span className="text-xs text-gray-400">Balance: {selectedToken.balance}</span>
                )}
              </div>
            </div>
          ) : (
            <span>{label}</span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 max-h-[300px]">
        <Command>
          <CommandInput placeholder="Search token..." className="h-9" icon={Search} />
          <CommandList>
            <CommandEmpty>No token found.</CommandEmpty>
            <CommandGroup>
              {tokens.map((token) => (
                <CommandItem
                  key={token.id}
                  value={token.id}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue)
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                      <img
                        src={token.logo || "/placeholder.svg"}
                        alt={token.name}
                        className="w-6 h-6"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = `/placeholder.svg?height=24&width=24`
                        }}
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{token.symbol}</span>
                      <span className="text-xs text-gray-400">{token.name}</span>
                      {token.balance && <span className="text-xs text-gray-400">Balance: {token.balance}</span>}
                    </div>
                    {token.price && <span className="ml-auto text-sm">${token.price.toFixed(2)}</span>}
                    <Check className={cn("ml-auto h-4 w-4", value === token.id ? "opacity-100" : "opacity-0")} />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
