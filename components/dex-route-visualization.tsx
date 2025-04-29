"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface RouteStep {
  protocol: string
  percentage: number
  color: string
}

interface DexRouteVisualizationProps {
  steps: RouteStep[]
  fromToken: string
  toToken: string
}

export function DexRouteVisualization({ steps, fromToken, toToken }: DexRouteVisualizationProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-400">Routing</h4>
            <div className="flex items-center text-sm">
              <span className="font-medium">{fromToken}</span>
              <ArrowRight className="mx-2 h-3 w-3 text-gray-400" />
              <span className="font-medium">{toToken}</span>
            </div>
          </div>

          <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-800">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ width: 0 }}
                animate={{ width: `${step.percentage}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
                style={{ backgroundColor: step.color }}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="h-3 w-3 rounded-full mr-1.5" style={{ backgroundColor: step.color }} />
                <span className="text-sm">
                  {step.protocol} ({step.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
