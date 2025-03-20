"use client"

import { useState } from "react"
import { AdvocateSearch } from "@/features/advocates/advocate-search"
import { AdvocateGrid } from "@/features/advocates/advocateGrid"
import { AdvocateList } from "@/features/advocates/advocateList"
import { PageHeader } from "@/features/ui/page-header"
import { useAdvocates } from "@/features/advocates/advocateHooks/useAdvocates"
import { ViewToggle } from "@/features/advocates/view-toggle"
import { AnimatePresence, motion } from "framer-motion"
import { type ReactElement } from "react"
import { type ViewMode, type Advocate } from "@/features/advocates/types/advocate.types"

export function AdvocatesDirectory(): ReactElement {
  const { advocates, isLoading, error } = useAdvocates()
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("grid")

  const filteredAdvocates = advocates?.filter((advocate: Advocate) => {
    const matchesSearch =
      searchTerm === "" ||
      advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advocate.yearsOfExperience.toString().includes(searchTerm)

    const matchesSpecialty =
      !selectedSpecialty || advocate.specialties.some((s: string) => s.toLowerCase() === selectedSpecialty.toLowerCase())

    const matchesCity = !selectedCity || advocate.city.toLowerCase() === selectedCity.toLowerCase()

    return matchesSearch && matchesSpecialty && matchesCity
  }) || []

  const allSpecialties: string[] = Array.from(
    new Set(advocates?.flatMap((advocate: Advocate) => advocate.specialties) || [])
  ).sort() as string[]

  const allCities: string[] = Array.from(
    new Set(advocates?.map((advocate: Advocate) => advocate.city) || [])
  ).sort() as string[]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <PageHeader title="Solace Advocates" description="Find the right advocate for your needs" />

      <AdvocateSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        specialties={allSpecialties}
        selectedSpecialty={selectedSpecialty}
        onSpecialtyChange={setSelectedSpecialty}
        cities={allCities}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
      />

      <div className="flex justify-end mb-4">
        <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${viewMode}-${searchTerm}-${selectedSpecialty}-${selectedCity}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {viewMode === "grid" ? (
            <AdvocateGrid advocates={filteredAdvocates} isLoading={isLoading} error={error} />
          ) : (
            <AdvocateList advocates={filteredAdvocates} isLoading={isLoading} error={error} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

