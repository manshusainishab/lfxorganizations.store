import type { JSX } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import type { HeaderProps } from '../types/index'

export function Header({ title = "LFX Organizations" }: HeaderProps): JSX.Element {
  const { theme, setTheme } = useTheme()

  const toggleTheme = (): void => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="px-6 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">LFX</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
        </div>

        <button
          onClick={toggleTheme}
          className="rounded-lg hover:bg-muted"
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </div>
    </header>
  )
}
