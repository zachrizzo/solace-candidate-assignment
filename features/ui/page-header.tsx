"use client"

import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { type ReactElement } from "react"
import { type PageHeaderProps } from "@/shared/types/ui.types"

export function PageHeader({ title, description }: PageHeaderProps): ReactElement {
  return (
    <div className="space-y-2">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold tracking-tight text-purple-700 dark:text-purple-400">{title}</h1>
        <p className="text-muted-foreground text-lg mt-2">{description}</p>
      </motion.div>
      <Separator className="my-6 bg-purple-200 dark:bg-purple-800" />
    </div>
  )
}

