"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RefreshCw, Trash2, Globe, Clock, Info } from "lucide-react"
import { IpInfo } from "@/app/actions/ip"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
      try {
        const parsedHistory: IpEntry[] = JSON.parse(storedHistory)
        
        // Migrate old entries that don't have source
        const migratedHistory = parsedHistory.map(entry => {
          if (!entry.source) {
            return { ...entry, source: "unknown" };
          }
          return entry;
        });
        
        setIpHistory(migratedHistory)

        // Ensure the IP check happens only after history is loaded
        if (migratedHistory.length === 0 || migratedHistory[0].ip !== ipInfo.ip) {
          addNewIpEntry(ipInfo.ip, ipInfo.source, migratedHistory)
        }
      } catch (error) {
        console.error("Error parsing IP history:", error)
        addNewIpEntry(ipInfo.ip, ipInfo.source, [])
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
      source: source || "unknown" // Ensure source is never undefined
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

  // Get source color based on the source type
  const getSourceColor = (source: string) => {
    switch(source.toLowerCase()) {
      case 'x-forwarded-for':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'x-real-ip':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cf-connecting-ip':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'ipify-api':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  }

  return (
    <Card className="w-full shadow-md border-t-4 border-t-blue-500 dark:border-t-blue-400">
      <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-t-lg">
        <div className="flex items-center">
          <Globe className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
          <CardTitle>Your IP History</CardTitle>
        </div>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={clearHistory} className="border-red-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900">
                  <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                  Clear
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear IP history except current</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh} 
                  disabled={isRefreshing}
                  className="border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 text-blue-500 ${isRefreshing ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh to check for IP changes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Current IP Address</h3>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{ipInfo.ip}</p>
              {ipInfo.source && (
                <Badge variant="outline" className={`mt-1 ${getSourceColor(ipInfo.source)}`}>
                  Source: {ipInfo.source}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="rounded-md border overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-gray-800">
              <TableRow>
                <TableHead className="w-[180px] font-semibold">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    Date
                  </div>
                </TableHead>
                <TableHead className="font-semibold">
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-gray-500" />
                    IP Address
                  </div>
                </TableHead>
                <TableHead className="w-[120px] font-semibold">
                  <div className="flex items-center">
                    <Info className="h-4 w-4 mr-2 text-gray-500" />
                    Source
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ipHistory.length > 0 ? (
                ipHistory.map((entry, index) => (
                  <TableRow key={index} className={index === 0 ? "bg-blue-50 dark:bg-blue-900/20" : ""}>
                    <TableCell className="font-medium">
                      {entry.date}
                    </TableCell>
                    <TableCell>
                      <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-blue-600 dark:text-blue-400 font-mono">
                        {entry.ip}
                      </code>
                    </TableCell>
                    <TableCell>
                      <Badge className={getSourceColor(entry.source || "unknown")}>
                        {entry.source || "unknown"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
                    <div className="flex flex-col items-center">
                      <Globe className="h-10 w-10 text-gray-300 dark:text-gray-600 mb-2" />
                      <p>No IP history found. Refresh the page when your IP changes.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {ipHistory.length > 1 && (
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
            Showing {ipHistory.length} IP address entries
          </div>
        )}
      </CardContent>
    </Card>
  )
}
