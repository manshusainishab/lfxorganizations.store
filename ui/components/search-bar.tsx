import type { JSX } from "react"
import { Search } from "lucide-react"
import type { SearchBarProps } from '../types/index'

export function SearchBar({ value, onChange, placeholder = "Search organizations..." }: SearchBarProps): JSX.Element {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-11 bg-card border-border rounded-lg focus:ring-2 focus:ring-primary/50 transition-all"
        aria-label="Search organizations"
      />
    </div>
  )
}
