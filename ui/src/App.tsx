
import { useState, useMemo, useCallback, useEffect } from "react"
import { Header } from "../components/header"
import { Sidebar } from "../components/sidebar"
import { SearchBar } from "../components/search-bar"
import { OrganizationGrid } from "../components/organization-grid"
import { OrganizationModal } from "../components/organization-modal"
import type { Organization } from "../types/index"
import axios from "axios"

function App() {

  async function fetchOrganizations(){
    console.log("Fetching organizations...")
    const response = await axios.get('http://localhost:3000/orgs')
    console.log(response.data)
    setOrganizations(response.data.sort((a: Organization, b: Organization) => a.name.localeCompare(b.name)))

  }
  useEffect(()=>{
    fetchOrganizations()
  },[])

  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedYears, setSelectedYears] = useState<number[]>([])
  const [selectedTerms, setSelectedTerms] = useState<(1 | 2 | 3)[]>([])
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)

  const filteredOrganizations = useMemo<Organization[]>(() => {
    return organizations.filter((org) => {
      const matchesSearch =
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesYear = selectedYears.length === 0 || org.years.some((year) => selectedYears.includes(year))

      const matchesTerm = selectedTerms.length === 0 || selectedTerms.includes(org.term)

      return matchesSearch && matchesYear && matchesTerm
    })
  }, [searchQuery, selectedYears, selectedTerms, organizations])

  const handleSelectOrg = useCallback((org: Organization): void => {
    setSelectedOrg(org)
  }, [])

  const handleCloseModal = useCallback((): void => {
    setSelectedOrg(null)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header title="LFX Organizations" />
      <div className="flex">
        <Sidebar
          selectedYears={selectedYears}
          setSelectedYears={setSelectedYears}
          selectedTerms={selectedTerms}
          setSelectedTerms={setSelectedTerms}
        />
        <main className="flex-1">
          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">LFX Organizations</h1>
              <p className="text-muted-foreground text-lg">
                Discover and explore organizations participating in LFX programs
              </p>
            </div>

            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <div className="mt-8">
              <div className="text-sm text-muted-foreground mb-4">
                {filteredOrganizations.length} organization
                {filteredOrganizations.length !== 1 ? "s" : ""} found
              </div>
              <OrganizationGrid organizations={filteredOrganizations} onSelectOrg={handleSelectOrg} />
            </div>
          </div>
        </main>
      </div>

      {selectedOrg && <OrganizationModal organization={selectedOrg} onClose={handleCloseModal} />}
    </div>
  )
}

export default App
