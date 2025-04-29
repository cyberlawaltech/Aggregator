"use client"

import { useState } from "react"
import { Search, Bell, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { WalletButton } from "@/components/wallet/wallet-button"
import Link from "next/link"

export function Header() {
  const [searchFocused, setSearchFocused] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Placeholder for auth state

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-800 bg-[#0a0c10]/80 px-4 backdrop-blur-md">
      <div className="flex items-center gap-4 lg:gap-6">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-foz7U7LrEo6bpkXDr7jd5Mj8iwqWua.png"
            alt="Web3 Logo"
            className="h-8 w-8"
          />
          <span className="font-bold text-xl hidden md:inline">Coin-List Data Aggregator</span>
        </Link>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className={`w-[200px] sm:w-[300px] pl-9 bg-dark-100 border-gray-800 ${
              searchFocused ? "border-primary" : ""
            }`}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>
        <WalletButton />
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-medium">JD</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>API Keys</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/landing">
            <Button variant="outline" className="border-gray-800">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}
