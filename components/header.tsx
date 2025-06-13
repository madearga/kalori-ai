import { IconMaux, IconSeparator } from '@/components/ui/icons'

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-center sm:justify-between w-full h-16 px-2 sm:px-4 border-b shrink-0 bg-[#121212/10] backdrop-blur-xl">
    
        <div className="flex items-center ">
          <IconMaux className="size-5 ml-2 sm:ml-4 mr-2" />
          <span className="font-semibold md:text-base text-sm hidden md:inline">Kalori-AI</span>
          <IconSeparator className="size-5 hidden sm:inline" />
          {/* Removed Vercel AI SDK reference */}
        </div>
        <div className="hidden sm:flex items-center gap-2">
          {/* Removed View on GitHub button for mobile */}

          {/* Removed Vercel AI SDK button for mobile */}

          {/* Removed View on GitHub button for desktop */}

          {/* Removed Vercel AI SDK button for desktop */}
        </div>
  
    </header>
  )
}
