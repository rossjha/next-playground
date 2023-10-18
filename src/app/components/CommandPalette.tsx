'use client'
import { useState, useEffect, Fragment } from 'react'
import { Dialog, Combobox, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'

type Project = {
  id: number
  title: string
  initials: string
  team: string
  members: Array<Object>
}

type CommandPaletteProps = {
  projects: Array<Project>
}

export default function CommandPalette({ projects }: CommandPaletteProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    function onKeydown(event: KeyboardEvent) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        setIsOpen((value) => !value)
      }
    }
    window.addEventListener('keydown', onKeydown)
    return () => window.removeEventListener('keydown', onKeydown)
  }, [isOpen])

  const filteredProjects = query
    ? projects.filter((project) =>
        project.title.toLowerCase().includes(query.toLowerCase()),
      )
    : []

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      afterLeave={() => setQuery('')}
    >
      <Dialog
        onClose={setIsOpen}
        className=" fixed inset-0 overflow-y-auto p-4 pt-[25vh]"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-slate-500/50" />
        </Transition.Child>
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            onChange={(project: Project) => {
              setIsOpen(false)
              router.push(`/projects/${project.id}`)
            }}
            as="div"
            className="relative mx-auto max-w-xl divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-black/5"
          >
            <div className="flex items-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <Combobox.Input
                onChange={(event) => {
                  setQuery(event.target.value)
                }}
                className="h-12 w-full border-0 bg-transparent pl-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0"
                placeholder="Search..."
              />
            </div>
            {filteredProjects.length > 0 && (
              <Combobox.Options
                static
                className="max-h-96 overflow-y-auto py-4 text-sm"
              >
                {filteredProjects.map((project) => (
                  <Combobox.Option key={project.id} value={project}>
                    {({ active }) => (
                      <div
                        className={`space-x-1 px-4 py-2 ${
                          active ? 'bg-indigo-600' : 'bg-white'
                        }`}
                      >
                        <span
                          className={`font-medium ${
                            active ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {project.title}
                        </span>
                        <span
                          className={
                            active ? 'text-indigo-200' : 'text-gray-400'
                          }
                        >
                          in {project.team}
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {query && filteredProjects.length === 0 && (
              <p className="p-4 text-sm text-gray-500">No results found</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}
