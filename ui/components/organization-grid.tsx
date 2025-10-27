import type { JSX } from "react"
import { OrganizationCard } from "./organization-card"
import type { OrganizationGridProps } from '../types/index'
import { Link } from "react-router-dom"


export function OrganizationGrid({
  organizations,
  onSelectOrg,
  isLoading = false,
}: OrganizationGridProps): JSX.Element {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6 animate-pulse">
            <div className="h-12 w-12 rounded-lg bg-muted mb-4" />
            <div className="h-6 bg-muted rounded mb-2" />
            <div className="h-4 bg-muted rounded mb-4 w-3/4" />
            <div className="h-4 bg-muted rounded mb-4" />
            <div className="flex gap-2">
              <div className="h-6 w-12 bg-muted rounded-full" />
              <div className="h-6 w-12 bg-muted rounded-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (organizations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No organizations found matching your filters.</p>
        <p className="text-muted-foreground text-sm mt-2">Try adjusting your search or filter criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {organizations.map((org) => (
        <Link key={org.id} to={`/${org.id}/details`} className="block">
          <OrganizationCard organization={org} onClick={()=>null}/>
        </Link>
      ))}
    </div>
  )
}
