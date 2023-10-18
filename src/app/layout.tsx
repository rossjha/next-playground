import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import CommandPalette from './components/CommandPalette'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js Starter',
  description: 'Starter template for Next.js projects.',
}

const projects = [
  {
    id: 1,
    title: 'GraphQL API',
    initials: 'GA',
    team: 'Engineering',
    members: [
      {
        name: 'John Doe',
        email: 'john@domain.com',
      },
    ],
  },
  {
    id: 2,
    title: 'New Benefits Plan',
    initials: 'NB',
    team: 'Human Resources',
    members: [
      {
        name: 'Jane Doe',
        email: 'jane@domain.com',
      },
    ],
  },
  {
    id: 3,
    title: 'Onboarding Emails',
    initials: 'OE',
    team: 'Customer Success',
    members: [
      {
        name: 'John Doe',
        email: 'john@domain.com',
      },
    ],
  },
  {
    id: 4,
    title: 'iOS App',
    initials: 'IA',
    team: 'Engineering',
    members: [
      {
        name: 'Jane Doe',
        email: 'jane@domain.com',
      },
    ],
  },
  {
    id: 5,
    title: 'Marketing Site Redesign',
    initials: 'MS',
    team: 'Engineering',
    members: [
      {
        name: 'John Doe',
        email: 'john@domain.com',
      },
    ],
  },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-200`}>
        <CommandPalette projects={projects} />
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
