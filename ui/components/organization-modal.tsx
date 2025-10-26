"use client"

import type React from "react"
import type { JSX } from "react"
import { X } from "lucide-react"
// import { Button } from "@/components/ui/button"
import type { OrganizationModalProps } from '../types/index'

export function OrganizationModal({ organization, onClose }: OrganizationModalProps): JSX.Element {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    const img = e.currentTarget
    img.src = "/generic-organization-logo.png"
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card/95 backdrop-blur">
          <h2 className="text-2xl font-bold text-foreground">{organization.name}</h2>
          <button
            onClick={onClose}
            className="rounded-lg hover:bg-muted"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center overflow-hidden border border-border/50 shadow-md">
              <img
                src={organization.logoUrl || "/placeholder.svg?height=96&width=96&query=organization"}
                alt={`${organization.name} logo`}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2 text-foreground">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{organization.description}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-colors">
              <p className="text-sm text-muted-foreground mb-1">Total Projects</p>
              <p className="text-2xl font-bold text-foreground">{organization.totalProjects}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-colors">
              <p className="text-sm text-muted-foreground mb-1">Term</p>
              <p className="text-2xl font-bold text-foreground">Term {organization.term}</p>
            </div>
          </div>

          {/* Years */}
          <div>
            <h3 className="font-semibold mb-3 text-foreground">Participation Years</h3>
            <div className="flex flex-wrap gap-2">
              {organization.years.map((year) => (
                <span
                  key={year}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {year}
                </span>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <button onClick={onClose} className="w-full">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
