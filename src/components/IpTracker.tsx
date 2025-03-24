"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RefreshCw, Trash2 } from "lucide-react"
import { IpInfo } from "@/app/actions/ip"

interface IpEntry {
  ip: string
  date: string
  source?: string
}

export function IpTracker({ ipInfo }: { ipInfo: IpInfo }) {
  const [ipHistory, setIpHistory] = useState<IpEntry[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Load IP history from localStorage on mount
  useEffect(() => {
    const storedHistory = localStorage.getItem("ipHistory")
    if (storedHistory) {
      const parsedHistory: IpEntry[] = JSON.parse(storedHistory)
      setIpHistory(parsedHistory)

      // Ensure the IP check happens only after history is loaded
      if (parsedHistory.length === 0 || parsedHistory[0].ip !== ipInfo.ip) {
        addNewIpEntry(ipInfo.ip, ipInfo.source, parsedHistory)
      }
    } else {
      // If no history exists, create a new entry
      addNewIpEntry(ipInfo.ip, ipInfo.source, [])
    }
  }, [ipInfo])

  // Save IP history to localStorage whenever it changes
  useEffect(() => {
    if (ipHistory.length > 0) {
      localStorage.setItem("ipHistory", JSON.stringify(ipHistory))
    }
  }, [ipHistory])

  const addNewIpEntry = (ip: string, source: string, history: IpEntry[]) => {
    const newEntry: IpEntry = { 
      ip, 
      date: new Date().toLocaleString(),
      source 
    }
    setIpHistory([newEntry, ...history])
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)

    try {
      const response = await fetch(window.location.href, {
        cache: "no-store",
      })

      if (response.ok) {
        window.location.reload()
      }
    } catch (error) {
      console.error("Failed to refresh:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const clearHistory = () => {
    // Keep only the current IP
    const currentEntry = ipHistory.length > 0 ? [ipHistory[0]] : []
    setIpHistory(currentEntry)
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your IP History</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={clearHistory}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear History
          </Button>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Current IP: <span className="font-medium text-foreground">{ipInfo.ip}</span>
            {ipInfo.source && (
              <span className="text-xs ml-2 text-muted-foreground">(Source: {ipInfo.source})</span>
            )}
          </p>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Date</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead className="w-[120px]">Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ipHistory.length > 0 ? (
                ipHistory.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>{entry.ip}</TableCell>
                    <TableCell>{entry.source || "unknown"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                    No IP history found. Refresh the page when your IP changes.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
