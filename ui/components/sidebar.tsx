import type { JSX } from "react"
import  { SidebarProps } from '../types/index'

const YEARS: number[] = [2025, 2024, 2023, 2022, 2021, 2020]
const TERMS: (1 | 2 | 3)[] = [1, 2, 3]

export function Sidebar({
  selectedYears,
  setSelectedYears,
  selectedTerms,
  setSelectedTerms,
}: SidebarProps): JSX.Element {
  const toggleYear = (year: number): void => {
    setSelectedYears(selectedYears.includes(year) ? selectedYears.filter((y) => y !== year) : [...selectedYears, year])
  }

  const toggleTerm = (term: 1 | 2 | 3): void => {
    setSelectedTerms(selectedTerms.includes(term) ? selectedTerms.filter((t) => t !== term) : [...selectedTerms, term])
  }

  return (
    <aside className="w-64 border-r border-border bg-card hidden md:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-6 space-y-8">
        {/* Years Filter */}
        <div>
          <h3 className="font-semibold mb-4 text-sm text-foreground">Years</h3>
          <div className="space-y-3">
            {YEARS.map((year) => (
              <div key={year} className="flex items-center space-x-2">
                {/* <Checkbox
                  id={`year-${year}`}
                  checked={selectedYears.includes(year)}
                  onCheckedChange={() => toggleYear(year)}
                  className="rounded"
                /> */}
                <label
                  htmlFor={`year-${year}`}
                  className="text-sm font-normal cursor-pointer text-foreground hover:text-primary transition-colors"
                >
                  {year}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Terms Filter */}
        <div>
          <h3 className="font-semibold mb-4 text-sm text-foreground">Terms</h3>
          <div className="space-y-3">
            {TERMS.map((term) => (
              <div key={term} className="flex items-center space-x-2">
                {/* <Checkbox
                  id={`term-${term}`}
                  checked={selectedTerms.includes(term)}
                  onCheckedChange={() => toggleTerm(term)}
                  className="rounded"
                /> */}
                <label
                  htmlFor={`term-${term}`}
                  className="text-sm font-normal cursor-pointer text-foreground hover:text-primary transition-colors"
                >
                  Term {term}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
