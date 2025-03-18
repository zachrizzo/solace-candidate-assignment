"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Mail, ChevronRight, ArrowUpDown, Filter } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { type FC } from "react"
import { type AdvocateListProps, type SortField, type SortDirection, type Advocate } from "@/features/advocates/types/advocate.types"

export const AdvocateList: FC<AdvocateListProps> = ({ advocates, isLoading, error }) => {
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [specialtyFilter, setSpecialtyFilter] = useState<string | null>(null)

  // Get unique specialties for filter buttons
  const allSpecialties = Array.from(new Set(advocates.flatMap((a) => a.specialties))).sort()

  // Sort and filter advocates
  const sortedAdvocates = [...advocates]
    .filter((advocate) => !specialtyFilter || advocate.specialties.includes(specialtyFilter))
    .sort((a, b) => {
      if (sortField === "name") {
        const nameA = `${a.firstName} ${a.lastName}`
        const nameB = `${b.firstName} ${b.lastName}`
        return sortDirection === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA)
      } else if (sortField === "experience") {
        return sortDirection === "asc" ? a.yearsOfExperience - b.yearsOfExperience : b.yearsOfExperience - a.yearsOfExperience
      } else if (sortField === "city") {
        return sortDirection === "asc" ? a.city.localeCompare(b.city) : b.city.localeCompare(a.city)
      }
      return 0
    })

  const toggleSort = (field: SortField): void => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

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
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (sortedAdvocates.length === 0) {
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
    <div className="space-y-4">
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

      <Card className="border-purple-100 dark:border-purple-900">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("name")}
                  className="flex items-center gap-1 font-medium p-0 h-auto text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100"
                >
                  Advocate
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">Specialties</TableHead>
              <TableHead className="hidden md:table-cell">
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("experience")}
                  className="flex items-center gap-1 font-medium p-0 h-auto text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100"
                >
                  Experience
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("city")}
                  className="flex items-center gap-1 font-medium p-0 h-auto text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100"
                >
                  Location
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAdvocates.map((advocate, index) => {
              const initials = `${advocate.firstName.charAt(0)}${advocate.lastName.charAt(0)}`

              return (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-purple-700 text-white">{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {advocate.firstName} {advocate.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">{advocate.phoneNumber}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {advocate.specialties.map((specialty, i) => (
                        <Badge
                          key={i}
                          variant={specialty === specialtyFilter ? "default" : "outline"}
                          className={`text-xs cursor-pointer ${specialty === specialtyFilter ? "bg-purple-700 hover:bg-purple-800" : "bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/40 dark:text-purple-300 dark:hover:bg-purple-900/60 border-purple-200 dark:border-purple-800"}`}
                          onClick={() => setSpecialtyFilter(specialty === specialtyFilter ? null : specialty)}
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{advocate.yearsOfExperience} years</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2 text-sm">{advocate.city}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Contact</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

