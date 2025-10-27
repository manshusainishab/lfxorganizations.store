import { useEffect, useState } from "react"
import { ExternalLink, Github, Zap, Code2, TrendingUp, Calendar, Award } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useParams } from "react-router-dom"
import axios from "axios"

const OrganizationDetailsPage = () => {
  type YearWiseTerm = { year: number; term: number; projects: any[] }
  type OrgDetails = {
    yearWiseTerms: YearWiseTerm[]
    logoUrl?: string
    name?: string
    description?: string
  }

  const [orgDetails, setOrgDetails] = useState<OrgDetails>({ yearWiseTerms: [] })
  const [activeYear, setActiveYear] = useState<number | null>(null)
  const orgId = useParams().orgId

  useEffect(() => {
    if (orgId) {
      getOrgDetails(Number.parseInt(orgId)).catch((err) => {
        console.error("Error fetching organization details:", err)
      })
    }
  }, [orgId])

  const getOrgDetails = async (id: number) => {
    const response = await axios.get(`http://localhost:3000/api/v1/${id}/details`)
    if (response.status !== 200) {
      throw new Error("Failed to fetch organization details")
    }
    setOrgDetails(response.data)
    if (response.data.yearWiseTerms.length > 0) {
      setActiveYear(response.data.yearWiseTerms[0].year)
    }
  }

  const years = [...new Set(orgDetails.yearWiseTerms.map((item) => item.year))].sort((a, b) => b - a)

  const chartData = years.map((year) => {
    const yearData: any = { year: year.toString() }
    ;[1, 2, 3].forEach((term) => {
      const termData = orgDetails.yearWiseTerms.find((item) => item.year === year && item.term === term)
      yearData[`Term ${term}`] = termData ? termData.projects.length : 0
    })
    return yearData
  }).reverse()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-xl p-4 shadow-2xl">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-slate-300">{entry.name}:</span>
              <span className="text-white font-semibold">{entry.value} projects</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  const ProjectCard = ({ project }: { project: any }) => (
    
    <article className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors flex-1 pr-2">
            {project.title}
          </h3>
          <Award className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" size={20} />
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-xs rounded-lg font-semibold border border-blue-500/30 hover:border-blue-400/50 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 backdrop-blur-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-700/50">
          <a
            href={project.lfxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all duration-300 text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105"
          >
            <ExternalLink size={16} />
            <span>View Project</span>
          </a>
          <a
            href={project.upstreamIssue}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-3 bg-slate-700/50 text-white rounded-xl hover:bg-slate-600/50 transition-all duration-300 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500 hover:scale-105"
            aria-label="View on GitHub"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </article>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Hero Section */}
      <header className="relative border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-xl sticky top-0 z-40 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="relative max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-start gap-8">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-4 flex items-center justify-center flex-shrink-0 shadow-2xl hover:scale-105 transition-transform duration-300">
              <img
                src={orgDetails.logoUrl || "/placeholder.svg"}
                alt={orgDetails.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                {orgDetails.name}
              </h1>
              <p className="text-slate-400 leading-relaxed max-w-3xl text-lg">{orgDetails.description}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Statistics Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="group relative bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <Zap size={24} className="text-blue-400" />
                  </div>
                  <p className="text-sm font-bold text-blue-300 uppercase tracking-wider">Total Projects</p>
                </div>
                <p className="text-5xl font-bold text-white mb-1">
                  {orgDetails.yearWiseTerms.reduce((sum, item) => sum + item.projects.length, 0)}
                </p>
                <p className="text-blue-300/60 text-sm">Across all terms</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <Calendar size={24} className="text-purple-400" />
                  </div>
                  <p className="text-sm font-bold text-purple-300 uppercase tracking-wider">Active Years</p>
                </div>
                <p className="text-5xl font-bold text-white mb-1">{years.length}</p>
                <p className="text-purple-300/60 text-sm">Years of mentorship</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-pink-500/10 to-pink-600/10 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-8 hover:border-pink-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-pink-500/20 rounded-xl">
                    <TrendingUp size={24} className="text-pink-400" />
                  </div>
                  <p className="text-sm font-bold text-pink-300 uppercase tracking-wider">Terms Offered</p>
                </div>
                <p className="text-5xl font-bold text-white mb-1">
                  {new Set(orgDetails.yearWiseTerms.map((item) => item.term)).size}
                </p>
                <p className="text-pink-300/60 text-sm">Unique terms</p>
              </div>
            </div>
          </div>
        </section>

        {/* Chart Section */}
        <section className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 mb-12 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                <Code2 size={24} className="text-blue-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Projects Distribution</h2>
                <p className="text-slate-400 text-sm mt-1">Year-wise project allocation across terms</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorTerm1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  </linearGradient>
                  <linearGradient id="colorTerm2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                  </linearGradient>
                  <linearGradient id="colorTerm3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis 
                  dataKey="year" 
                  stroke="#94a3b8" 
                  tick={{ fill: '#94a3b8', fontSize: 14, fontWeight: 600 }}
                  tickLine={{ stroke: '#475569' }}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  tick={{ fill: '#94a3b8', fontSize: 14, fontWeight: 600 }}
                  tickLine={{ stroke: '#475569' }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                  formatter={(value) => <span className="text-slate-300 font-semibold">{value}</span>}
                />
                <Bar dataKey="Term 1" fill="url(#colorTerm1)" radius={[12, 12, 0, 0]} />
                <Bar dataKey="Term 2" fill="url(#colorTerm2)" radius={[12, 12, 0, 0]} />
                <Bar dataKey="Term 3" fill="url(#colorTerm3)" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Year Tabs and Projects */}
        <section>
          <div className="flex gap-3 mb-10 overflow-x-auto pb-3 scrollbar-hide">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-8 py-3.5 rounded-xl font-bold transition-all duration-300 whitespace-nowrap ${
                  activeYear === year
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/30 scale-105"
                    : "bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:border-blue-500/50 hover:text-white backdrop-blur-sm"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="space-y-10">
            {[1, 2, 3].map((term) => {
              const termData = orgDetails.yearWiseTerms.find((item) => item.year === activeYear && item.term === term)

              return termData ? (
                <section key={term} className="scroll-mt-20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 text-lg">
                      Term {term}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      <p className="text-slate-400 font-semibold">
                        {`${termData.projects.length} project${termData.projects.length !== 1 ? "s" : ""}`}
                      </p>
                    </div>
                  </div>

                  {termData.projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {termData.projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-slate-800/30 border border-dashed border-slate-700/50 rounded-2xl backdrop-blur-sm">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
                        <Code2 className="text-slate-500" size={32} />
                      </div>
                      <p className="text-slate-400 text-lg font-semibold">No projects available for this term</p>
                    </div>
                  )}
                </section>
              ) : null
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

export default OrganizationDetailsPage