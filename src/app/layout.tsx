import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import CommandPalettePrototype from './components/CommandPalettePrototype'
import CommandPalette from './components/CommandPalette/CommandPalette'
// import Image from 'next/image'
import { Providers } from '@/redux/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js Starter',
  description: 'Starter template for Next.js projects.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} no-scrollbar`}>
        {/* <Image
          alt="temp"
          src="/bg.png"
          width={1919}
          height={1872}
          quality={100}
        /> */}
        <nav className="flex bg-slate-900 p-4 text-slate-100">
          <ul className="flex">
            <li className="mr-4">
              <Link href={'/'}>Home</Link>
            </li>
            <li className="mr-4">
              <Link href={'/models'}>Models</Link>
            </li>
            <li className="mr-4">
              <Link href={'/portfolios'}>Portfolios</Link>
            </li>
            <li className="mr-4">
              <Link href={'/securities'}>Securities</Link>
            </li>
          </ul>
        </nav>
        <Providers>
          <CommandPalettePrototype />
          <CommandPalette />
          {children}
        </Providers>
      </body>
    </html>
  )
}
