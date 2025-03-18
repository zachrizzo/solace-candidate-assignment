"use client"

import { useState } from "react"
import { AdvocateCard } from "@/features/advocates/advocateCard"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Filter } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { type FC } from "react"
import { type AdvocateGridProps, type Advocate } from "@/features/advocates/types/advocate.types"

export const AdvocateGrid: FC<AdvocateGridProps> = ({ advocates, isLoading, error }) => {
  const [specialtyFilter, setSpecialtyFilter] = useState<string | null>(null)

  // Get unique specialties for filter buttons
  const allSpecialties = Array.from(new Set(advocates.flatMap((a) => a.specialties))).sort()

  // Filter advocates by specialty
  const filteredAdvocates = [...advocates]
    .filter((advocate) => !specialtyFilter || advocate.specialties.includes(specialtyFilter))

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

  if (filteredAdvocates.length === 0) {
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
    <div className="space-y-6">
      <Card className="p-4 border-purple-100 dark:border-purple-900">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-purple-600" />
            <span className="font-medium">Filter by specialty:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={specialtyFilter === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSpecialtyFilter(null)}
              className={`text-xs h-8 ${specialtyFilter === null ? "bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700" : ""}`}
            >
              All
            </Button>

            {allSpecialties.slice(0, 5).map((specialty) => (
              <Button
                key={specialty}
                variant={specialtyFilter === specialty ? "default" : "outline"}
                size="sm"
                onClick={() => setSpecialtyFilter(specialty)}
                className={`text-xs h-8 ${specialtyFilter === specialty ? "bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700" : "text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 border-purple-200 dark:border-purple-800"}`}
              >
                {specialty}
              </Button>
            ))}

            {allSpecialties.length > 5 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 border-purple-200 dark:border-purple-800"
                  >
                    More...
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {allSpecialties.slice(5).map((specialty) => (
                    <DropdownMenuItem key={specialty} onClick={() => setSpecialtyFilter(specialty)}>
                      {specialty}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAdvocates.map((advocate, index) => (
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
    </div>
  )
}

