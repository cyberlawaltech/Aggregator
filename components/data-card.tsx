import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"

interface DataCardProps {
  title: string
  value: string
  change?: number
  icon?: React.ReactNode
  className?: string
}

export function DataCard({ title, value, change, icon, className }: DataCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-400">{title}</p>
          {icon && <div className="text-gray-400">{icon}</div>}
        </div>
        <div className="mt-2 flex items-baseline">
          <p className="text-2xl font-semibold">{value}</p>
          {change !== undefined && (
            <span className={cn("ml-2 text-sm font-medium", change >= 0 ? "text-green-500" : "text-red-500")}>
              <span className="flex items-center">
                {change >= 0 ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                {Math.abs(change).toFixed(2)}%
              </span>
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
