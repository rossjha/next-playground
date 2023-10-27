'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { Dialog, Combobox, Transition } from '@headlessui/react'
import { Model, Portfolio, Security } from '@/app/api/types'
import useDebounce from '@/app/hooks/useDebounce'
import CommandPaletteResultsProvider from '@/app/components/CommandPalette/CommandPaletteResultsProvider'
import CommandPaletteResultOption from '@/app/components/CommandPalette/CommandPaletteResultOption'
import CommandPaletteStarredPortfolios from '@/app/components/CommandPalette/CommandPaletteStarredPortfolios'
import CommandPaletteLatestRuns from '@/app/components/CommandPalette/CommandPaletteLatestRuns'
import CommandPalettePendingOrders from '@/app/components/CommandPalette/CommandPalettePendingOrders'

export default function CommandPalette() {
  // Command Palette dialog ----------------------------------------------------
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

  // Search --------------------------------------------------------------------
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

  // Starred portfolios --------------------------------------------------------
  const [starredPortfolios, setStarredPortfolios] = useState<Portfolio[]>([])

  useEffect(() => {
    const starredPortfolios = getStarredPortfolios()
    setStarredPortfolios(starredPortfolios)
  }, [])

  const getStarredPortfolios = () => {
    const appData = localStorage.getItem('appData') || ''
    const { portfolios } = JSON.parse(appData)
    return portfolios || []
  }

  const toggleStarredPortfolio = (
    portfolio: Portfolio,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const portfolios = getStarredPortfolios()

    const portfolioIsStarred = portfolios.find(
      (p: Portfolio) => p.id === portfolio.id,
    )

    let updatedPortfolios

    if (portfolioIsStarred) {
      updatedPortfolios = portfolios.filter(
        (p: Portfolio) => p.id !== portfolio.id,
      )
    } else {
      updatedPortfolios = [portfolio, ...portfolios]
    }

    setStarredPortfolios(updatedPortfolios)
    localStorage.setItem(
      'appData',
      JSON.stringify({ portfolios: updatedPortfolios }),
    )
  }

  const isPortfolioStarred = (id: string) => {
    return starredPortfolios.find((p: Portfolio) => p.id === id)
  }

  return (
    <Transition.Root show={isOpen} as={Fragment} afterLeave={handleAfterLeave}>
      <Dialog
        onClose={setIsOpen}
        className="fixed inset-0 overflow-y-auto p-4 pt-[25vh]"
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
            {/* Scrollable section (actions / results) --------------------- */}
            <CommandPaletteResultsProvider
              searchType={searchType}
              searchTerm={debouncedSearchTerm}
            >
              {({ data: results, isError, isFetching, isLoading, hasData }) => (
                <>
                  <section
                    className={`no-scrollbar overflow-y-auto ${
                      inputValue || hasData ? 'h-max[400px]' : 'h-[400px]'
                    }`}
                  >
                    {/* Search results --------------------------------------- */}
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
                                  <div className="flex w-full justify-between">
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

                                    <button
                                      onClick={(evt) =>
                                        toggleStarredPortfolio(portfolio, evt)
                                      }
                                      className="rounded"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className={`h-6 w-6 ${
                                          isPortfolioStarred(portfolio.id)
                                            ? 'fill-yellow-500 text-yellow-500'
                                            : 'text-slate-500'
                                        }`}
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                        />
                                      </svg>
                                    </button>
                                  </div>
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

                    {/* Starred portfolios ----------------------------------- */}
                    {!inputValue &&
                      !results.length &&
                      starredPortfolios.length > 0 && (
                        <CommandPaletteStarredPortfolios
                          starredPortfolios={starredPortfolios}
                        />
                      )}

                    {/* Latest runs ------------------------------------------ */}
                    {!inputValue && !results.length && (
                      <CommandPaletteLatestRuns />
                    )}

                    {/* Pending orders --------------------------------------- */}
                    {!inputValue && !results.length && (
                      <CommandPalettePendingOrders />
                    )}
                  </section>
                </>
              )}
            </CommandPaletteResultsProvider>
            {/* Footer ----------------------------------------------- */}
            <div className="flex items-center px-6 py-4 text-sm text-gray-500 dark:text-slate-400">
              <span className="mr-1 font-semibold">/m [search]</span> to access
              models,{' '}
              <span className="ml-2 mr-1 font-semibold">/s [search]</span> to
              access securities
            </div>
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}
