"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react"

interface DataTableProps {
  data: any[]
}

export function DataTable({ data }: DataTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  if (!data || data.length === 0) {
    return <div className="text-center py-8 text-gray-400">No data available</div>
  }

  const columns = Object.keys(data[0])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return <ArrowUpDown className="ml-2 h-4 w-4" />
    return sortDirection === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            {columns.map((column) => (
              <th
                key={column}
                className="cursor-pointer whitespace-nowrap px-4 py-3 text-left font-medium"
                onClick={() => handleSort(column)}
              >
                <div className="flex items-center">
                  <span>{column}</span>
                  {getSortIcon(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-800 hover:bg-gray-800/50">
              {columns.map((column) => (
                <td key={`${rowIndex}-${column}`} className="whitespace-nowrap px-4 py-4">
                  {typeof row[column] === "number" ? formatNumber(row[column]) : row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + "B"
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + "K"
  }
  return num.toString()
}
