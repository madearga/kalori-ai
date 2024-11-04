import Link from 'next/link'
import { GitHubLogoIcon, VercelLogoIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { IconMaux , IconSeparator } from '@/components/ui/icons'

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-[#121212/10] backdrop-blur-xl">
    
        <div className="flex items-center ">
          <IconMaux className="size-5 ml-4 mr-2" />
          <span className="font-semibold md:text-base text-sm hidden md:inline">Calorie Analyzer</span>
          <IconSeparator className="size-5" />
          <span className="font-semibold md:text-base text-sm">Vercel AI SDK</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="icon"
            asChild
            className="md:hidden font-semibold"
          >
            <Link
              href="https://github.com/mauxxxx/calories"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubLogoIcon className="h-5 w-5" />
              <span className="sr-only">View on GitHub</span>
            </Link>
          </Button>

          <Button
            variant="default"
            size="icon"
            asChild
            className="md:hidden"
          >
            <Link
              href="https://sdk.vercel.ai/"
              target="_blank"
              rel="noopener noreferrer font-semibold"
            >
              <VercelLogoIcon className="h-5 w-5" />
              <span className="sr-only">AI SDK</span>
            </Link>
          </Button>

          <Button
            variant="default"
            asChild
            className="hidden md:flex gap-2 items-center"
          >
            <Link
              href="https://github.com/mauxxxx/calories"
              target="_blank"
              rel="noopener noreferrer font-semibold"
            >
              <GitHubLogoIcon className="h-5 w-5" />
              <span>View on GitHub</span>
            </Link>
          </Button>

          <Button
            variant="default"
            asChild
            className="hidden md:flex gap-2 items-center"
          >
            <Link
              href="https://sdk.vercel.ai/"
              target="_blank"
              rel="noopener noreferrer font-semibold"
            >
              <VercelLogoIcon className="h-5 w-5" />
              <span>Vercel AI SDK</span>
            </Link>
          </Button>
        </div>
  
    </header>
  )
} 