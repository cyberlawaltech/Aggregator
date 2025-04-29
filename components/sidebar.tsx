"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  Coins,
  FileCode,
  Home,
  LineChart,
  Menu,
  Search,
  Settings,
  Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleMobileSidebar = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    {
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      href: "/dashboard",
    },
    {
      title: "Coins",
      icon: <Coins className="h-5 w-5" />,
      href: "/coins",
    },
    {
      title: "DEX",
      icon: <LineChart className="h-5 w-5" />,
      href: "/dex",
    },
    {
      title: "Wallet",
      icon: <Wallet className="h-5 w-5" />,
      href: "/wallet",
    },
    {
      title: "Explorer",
      icon: <Search className="h-5 w-5" />,
      href: "/explorer",
    },
    {
      title: "Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      href: "/analytics",
    },
    {
      title: "Alerts",
      icon: <Bell className="h-5 w-5" />,
      href: "/alerts",
    },
    {
      title: "Smart Contracts",
      icon: <FileCode className="h-5 w-5" />,
      href: "/contracts",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings",
    },
  ]

  return (
    <>
      {/* Mobile sidebar toggle */}
      <Button variant="ghost" size="icon" className="fixed left-4 top-4 z-50 md:hidden" onClick={toggleMobileSidebar}>
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile sidebar overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={toggleMobileSidebar} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-gray-800 bg-[#0a0c10] transition-all duration-300 md:relative md:z-0",
          isCollapsed ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className,
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            {!isCollapsed && (
              <Link href="/dashboard" className="flex items-center gap-2">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-foz7U7LrEo6bpkXDr7jd5Mj8iwqWua.png"
                  alt="Web3 Logo"
                  className="h-8 w-8"
                />
                <span className="text-lg font-semibold text-primary">Web3 Agg</span>
              </Link>
            )}
            {isCollapsed && (
              <Link href="/dashboard">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-foz7U7LrEo6bpkXDr7jd5Mj8iwqWua.png"
                  alt="Web3 Logo"
                  className="h-8 w-8"
                />
              </Link>
            )}
          </div>
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={toggleSidebar}>
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileSidebar}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white",
                  pathname === item.href && "bg-gray-800 text-white",
                )}
              >
                {item.icon}
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Logged in as</span>
                <span className="font-medium">Demo User</span>
              </div>
            )}
            <Button variant="ghost" size="icon" className="rounded-full">
              <img src="/placeholder.svg?height=32&width=32" alt="User" className="h-8 w-8 rounded-full" />
              <span className="sr-only">User menu</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
