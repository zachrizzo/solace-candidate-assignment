"use client"

import { AdvocateCard } from "@/features/advocates/advocateCard"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import { type FC } from "react"
import { type AdvocateGridProps, type Advocate } from "@/features/types"

export const AdvocateGrid: FC<AdvocateGridProps> = ({ advocates, isLoading, error }) => {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load advocates. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[250px] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (advocates.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16 px-4 border-2 border-dashed border-purple-200 dark:border-purple-800 rounded-lg"
      >
        <h3 className="text-xl font-medium text-purple-700 dark:text-purple-400">No advocates found</h3>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Try adjusting your search or filter criteria to find the right advocate for your needs
        </p>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {advocates.map((advocate, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <AdvocateCard advocate={advocate} />
        </motion.div>
      ))}
    </div>
  )
}

