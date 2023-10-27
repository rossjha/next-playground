'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { Dialog, Combobox, Transition } from '@headlessui/react'
import { Model, Portfolio, Security } from '@/app/api/types'
import useDebounce from '@/app/hooks/useDebounce'
import CommandPaletteResultsProvider from '@/app/components/CommandPalette/CommandPaletteResultsProvider'
import CommandPaletteResultOption from '@/app/components/CommandPalette/CommandPaletteResultOption'

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function onKeydown(event: KeyboardEvent) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        setIsOpen((value) => !value)
      }
    }
    window.addEventListener('keydown', onKeydown)
    return () => window.removeEventListener('keydown', onKeydown)
  }, [isOpen])

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchType, setSearchType] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target?.value || ''
    const searchTypes = ['portfolio', 'model', 'security']
    let value = ''

    setInputValue(searchTerm)

    if (searchTerm.startsWith('/')) {
      const index = searchTerm.indexOf(' ')

      if (index !== -1) {
        const initial = searchTerm.slice(1, index)
        const searchType = searchTypes.find((t) => t.startsWith(initial)) || ''
        setSearchType(searchType)
        value = searchTerm.slice(index + 1).toLowerCase()
      }
    }

    setSearchTerm(value)
  }

  const handleAfterLeave = () => {
    setSearchTerm('')
    setSearchType('')
  }

  return (
    <Transition.Root show={isOpen} as={Fragment} afterLeave={handleAfterLeave}>
      <Dialog
        onClose={setIsOpen}
        className="dark fixed inset-0 overflow-y-auto p-4 pt-[25vh]"
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
            as="div"
            className="relative mx-auto w-[740px] divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-xl ring-1 ring-black/5 dark:divide-slate-700 dark:bg-slate-900"
          >
            <div className="flex items-center px-6">
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
                onChange={handleInputChange}
                className="h-12 w-full border-0 bg-transparent pl-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 dark:text-slate-200"
                placeholder="Type a command or search e.g. /p [search] for portfolios"
                autoComplete="off"
                autoCorrect="off"
                value={inputValue}
              />
            </div>
            <CommandPaletteResultsProvider
              searchType={searchType}
              searchTerm={debouncedSearchTerm}
            >
              {({ data: results, isError, isFetching, isLoading, hasData }) => (
                <>
                  {isError ? (
                    <div className="text-read-500">There was an error</div>
                  ) : isLoading || isFetching ? (
                    <></>
                  ) : results.length ? (
                    <Combobox.Options
                      static
                      className="max-h-96 overflow-y-auto py-4 text-sm"
                    >
                      {searchType === 'model' && (
                        <>
                          {results.map((model: Model) => (
                            <Combobox.Option
                              key={model.id}
                              value={model}
                              className="flex items-center"
                            >
                              {({ active }) => (
                                <Link
                                  href={`/models/${model.id}`}
                                  className="w-full outline-none"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <CommandPaletteResultOption
                                    text={model.title}
                                    subText={model.type}
                                    active={active}
                                  />
                                </Link>
                              )}
                            </Combobox.Option>
                          ))}
                        </>
                      )}
                      {searchType === 'portfolio' && (
                        <>
                          {results.map((portfolio: Portfolio) => (
                            <Combobox.Option
                              key={portfolio.id}
                              value={portfolio}
                              className="mb-4 flex items-center"
                            >
                              {({ active }) => (
                                <Link
                                  href={`/portfolios/${portfolio.id}`}
                                  className="w-full outline-none"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <CommandPaletteResultOption
                                    text={portfolio.title}
                                    subText={portfolio.type}
                                    active={active}
                                  />
                                </Link>
                              )}
                            </Combobox.Option>
                          ))}
                        </>
                      )}
                      {searchType === 'security' && (
                        <>
                          {results.map((security: Security) => (
                            <Combobox.Option
                              key={security.id}
                              value={security}
                              className="mb-4 flex items-center"
                              onClick={() => setIsOpen(false)}
                            >
                              {({ active }) => (
                                <Link
                                  href={`/securities/${security.id}`}
                                  className="w-full outline-none"
                                >
                                  <CommandPaletteResultOption
                                    text={security.title}
                                    subText={security.type}
                                    active={active}
                                  />
                                </Link>
                              )}
                            </Combobox.Option>
                          ))}
                        </>
                      )}
                    </Combobox.Options>
                  ) : null}
                </>
              )}
            </CommandPaletteResultsProvider>
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}
