"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "../lib/queryClient" // senin oluşturduğun queryClient
import { TooltipProvider } from "./ui/tooltip"
import { Toaster } from "./ui/toaster"

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  )
}