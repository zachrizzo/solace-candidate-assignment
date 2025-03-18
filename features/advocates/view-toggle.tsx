"use client"

import { LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ViewMode } from "@/features/advocates/advocatesDirectory"
import { type FC } from "react"

interface ViewToggleProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export const ViewToggle: FC<ViewToggleProps> = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex items-center space-x-2 bg-muted p-1 rounded-md">
      <Button
        variant={viewMode === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("grid")}
        className={`flex items-center gap-1 ${viewMode === "grid" ? "bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700" : ""}`}
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">Grid</span>
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("list")}
        className={`flex items-center gap-1 ${viewMode === "list" ? "bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700" : ""}`}
      >
        <List className="h-4 w-4" />
        <span className="hidden sm:inline">List</span>
      </Button>
    </div>
  )
}

