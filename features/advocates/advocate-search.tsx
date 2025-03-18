"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { type FC } from "react"
import { type AdvocateSearchProps } from "@/features/advocates/types/advocate.types"

export const AdvocateSearch: FC<AdvocateSearchProps> = ({
  searchTerm,
  onSearchChange,
  specialties,
  selectedSpecialty,
  onSpecialtyChange,
  cities,
  selectedCity,
  onCityChange,
}) => {
  const handleReset = (): void => {
    onSearchChange("")
    onSpecialtyChange(null)
    onCityChange(null)
  }

  const hasActiveFilters = searchTerm || selectedSpecialty || selectedCity

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="overflow-hidden shadow">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="search" className="text-lg font-medium">
                Search Advocates
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, degree, or experience..."
                  className="pl-10 py-6 text-base"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-3 h-5 w-5 text-muted-foreground hover:text-foreground"
                    onClick={() => onSearchChange("")}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear search</span>
                  </Button>
                )}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="specialty" className="text-base font-medium">
                  Specialty
                </Label>
                <Select
                  value={selectedSpecialty || ""}
                  onValueChange={(value) => onSpecialtyChange(value === "all" ? null : value)}
                >
                  <SelectTrigger id="specialty">
                    <SelectValue placeholder="All specialties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All specialties</SelectItem>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-base font-medium">
                  City
                </Label>
                <Select
                  value={selectedCity || ""}
                  onValueChange={(value) => onCityChange(value === "all" ? null : value)}
                >
                  <SelectTrigger id="city">
                    <SelectValue placeholder="All cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All cities</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2 pt-2"
              >
                <div className="text-sm font-medium mr-2 flex items-center">Active filters:</div>

                {searchTerm && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Search: {searchTerm}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:text-foreground"
                      onClick={() => onSearchChange("")}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove search filter</span>
                    </Button>
                  </Badge>
                )}

                {selectedSpecialty && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Specialty: {selectedSpecialty}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:text-foreground"
                      onClick={() => onSpecialtyChange(null)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove specialty filter</span>
                    </Button>
                  </Badge>
                )}

                {selectedCity && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    City: {selectedCity}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:text-foreground"
                      onClick={() => onCityChange(null)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove city filter</span>
                    </Button>
                  </Badge>
                )}
              </motion.div>
            )}

            <div className="flex justify-end">
              <Button variant="outline" onClick={handleReset} disabled={!hasActiveFilters}>
                Reset All Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

