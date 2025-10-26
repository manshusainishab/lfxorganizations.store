import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import type { OrganizationCardProps } from "../types/index"
import type { JSX } from "react"

export function OrganizationCard({
  organization,
  onClick,
}: OrganizationCardProps): JSX.Element {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    e.currentTarget.src = "/generic-organization-logo.png"
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="relative flex flex-col justify-between h-full w-full rounded-2xl border border-border bg-card/70 p-5 text-left shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label={`View details for ${organization.name}`}
    >
      {/* Top Section */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-border/50 bg-muted flex items-center justify-center">
            <img
              src={
                organization.logoUrl ||
                "/placeholder.svg?height=56&width=56&query=organization"
              }
              alt={`${organization.name} logo`}
              onError={handleImageError}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
              {organization.name}
            </h3>
           
          </div>
        </div>

        <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-border/50" />

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
        {organization.description || "No description available."}
      </p>

      {/* Bottom Section */}
      <div className="flex items-center justify-between mt-auto">
        {/* Project Count */}
        <div className="flex items-center gap-1 text-sm font-medium">
          <span className="text-foreground">
            {organization.totalProjects ?? 0}
          </span>
          <span className="text-muted-foreground">
            project{organization.totalProjects !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Year Tags */}
        <div className="flex flex-wrap gap-1">
          {organization.years.slice(0, 3).map((year) => (
            <span
              key={year}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
            >
              {year}
            </span>
          ))}
          {organization.years.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border">
              +{organization.years.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Background Accent */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        layoutId={`bg-${organization.id}`}
      />
    </motion.button>
  )
}
