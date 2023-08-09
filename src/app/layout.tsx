import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

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
      <body className={`${inter.className} bg-slate-200`}>
        <nav className="flex bg-slate-900 p-4 text-slate-100">
          <ul className="flex">
            <li className="mr-4">
              <Link href={'/'}>Home</Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}
