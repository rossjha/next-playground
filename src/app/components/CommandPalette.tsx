'use client'
import { useState, useEffect, Fragment } from 'react'
import { Dialog, Combobox, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Model = {
  id: number
  title: string
  type: string
}

type CommandPaletteProps = {
  models: Array<Model>
}

type Query = {
  type: string
  value: string
}

const data = {
  model: [
    {
      id: '1',
      title: 'All Equity',
      type: 'Security',
    },
    {
      id: '2',
      title: 'Blue Chip Equally Weighted',
      type: 'Security',
    },
    ,
    {
      id: '3',
      title: 'Consumer Growth',
      type: 'Security',
    },
    {
      id: '4',
      title: 'Consumer Staples',
      type: 'Security',
    },
    {
      id: '5',
      title: 'Dividend Growth',
      type: 'Security',
    },
    {
      id: '6',
      title: 'Equity - RF',
      type: 'Security',
    },
  ],
  security: [
    {
      id: '1',
      title: 'A1 CAP YM ML DR (TRY)',
      ticker: 'A1CAP.E',
      type: 'Common stock',
    },
    {
      id: '2',
      title: 'A2B AUST (AUD)',
      ticker: 'A2B',
      type: 'Common stock',
    },
    ,
    {
      id: '3',
      title: 'A2Z INFRA ENGIN (INR)',
      ticker: 'BEA2ZINFRA',
      type: 'Common stock',
    },
    {
      id: '4',
      title: 'A2Z SMART TECH (USD)',
      ticker: 'AZ',
      type: 'Common stock',
    },
    {
      id: '5',
      title: 'A2ZCRYPTOCAP (CAD)',
      ticker: 'AZC.P',
      type: 'Common stock',
    },
    {
      id: '6',
      title: 'A8 NEW MEDIA (HKD)',
      ticker: '800',
      type: 'Common stock',
    },
    {
      id: '7',
      title: 'A10 NETWORKS (USD)',
      ticker: 'ATEN',
      type: 'Common stock',
    },
    {
      id: '8',
      title: 'A B C INDIA (INR)',
      ticker: '520123',
      type: 'Common stock',
    },
    {
      id: '9',
      title: 'A&A MATERIAL (JPY)',
      ticker: '5391',
      type: 'Common stock',
    },
  ],
  portfolio: [
    {
      id: '1',
      title: 'Aaron Smith',
      type: 'Account',
    },
    {
      id: '2',
      title: 'Aaron Smith IRA Account',
      type: 'Account',
    },
    ,
    {
      id: '3',
      title: 'AB Individual',
      type: 'Account',
    },
    {
      id: '4',
      title: 'Adam Smith IRA',
      type: 'Account',
    },
    {
      id: '5',
      title: 'Andrea IRA',
      type: 'Account',
    },
    {
      id: '6',
      title: 'A. Servaas Individual (WR9431)',
      type: 'Account',
    },
    {
      id: '7',
      title: 'Balanced',
      type: 'Account',
    },
    {
      id: '8',
      title: 'Galilei Trust',
      type: 'Account',
    },
    {
      id: '9',
      title: 'IRA Account - RJ',
      type: 'Account',
    },
    {
      id: '10',
      title: 'Paul Balanced Equity (RF-0934)',
      type: 'Account',
    },
    {
      id: '11',
      title: 'Raj Clifford IRA (KF9304)',
      type: 'Account',
    },
    {
      id: '12',
      title: 'Schwab Equity',
      type: 'Account',
    },
    {
      id: '13',
      title: 'US Equity - Fidelity FBS',
      type: 'Account',
    },
  ],
  action: [
    {
      id: '1',
      title: 'Run an import',
      type: 'Settings',
    },
    {
      id: '2',
      title: 'Rebalance, closed positions',
      type: 'Rebalance',
    },
    ,
    {
      id: '3',
      title: 'Rebalance, open positions',
      type: 'Rebalance',
    },
    {
      id: '4',
      title: 'Some trade',
      type: 'Trade',
    },
  ],
}

const recentPages = [
  {
    label: 'Portfolios',
    href: '',
  },
  {
    label: 'Securities',
    href: '',
  },
]

const recentActions = [
  {
    title: 'Some trade',
    type: 'Trade',
  },
]

export default function CommandPalette() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState<Query>({ type: '', value: '' })

  useEffect(() => {
    function onKeydown(event: KeyboardEvent) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        setIsOpen((value) => !value)
      }
    }
    window.addEventListener('keydown', onKeydown)
    return () => window.removeEventListener('keydown', onKeydown)
  }, [isOpen])

  const { type, value } = query

  const filteredResults = value && data[type]
  ? data[type].filter((item) => item.title && typeof item.title === 'string' && item.title.toLowerCase().includes(value))
  : []

  const handleInputChange = (event: any) => {
    const str = event.target?.value

    if (!str) {
      setQuery({ type: '', value: '' })
    }

    if (str.startsWith('/')) {
      const index = str.indexOf(' ')

      const types = ['portfolio', 'model', 'security']

      if (index !== -1) {
        const initial = str.slice(1, index)
        const type = types.find((t) => t.startsWith(initial)) || ''
        const value = str.slice(index + 1).toLowerCase()
        setQuery({ type, value })
      }
    }

    if (str.startsWith('>')) {
      const type = 'action'
      const value = str.slice(1).toLowerCase()
      setQuery({ type, value })
    }
  }

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      afterLeave={() => setQuery({ type: '', value: '' })}
    >
      <Dialog
        onClose={setIsOpen}
        className="dark fixed inset-0 overflow-y-auto p-4 pt-[25vh]"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="transform opacity-100"
          leaveTo="transform opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-slate-500/50" />
        </Transition.Child>
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="transform opacity-0 translate-y-2"
          enterTo="transform opacity-100 translate-y-0"
          leave="duration-200 ease-in"
          leaveFrom="transform opacity-100 translate-y-0"
          leaveTo="transform opacity-0 translate-y-2"
        >

          <Combobox
            onChange={(model: Model) => {
              setIsOpen(false)
              router.push(`/models/${model.id}`)
            }}
            as="div"
            className="relative mx-auto w-[740px] border border-gray-300 overflow-hidden rounded-md bg-white shadow-xl ring-black/5 dark:divide-slate-700 dark:bg-slate-900"
          >
            <div className="flex items-center px-6 pt-2 border-b border-b-gray-300 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <Combobox.Input
                onChange={handleInputChange}
                className="h-12 w-full border-0 bg-transparent pl-2 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-0 dark:text-slate-200"
                placeholder="Search"
                autoComplete="off"
                autoCorrect="off"
              />
            </div>

            {filteredResults.length > 0 && (
              <Combobox.Options
                static
                className="max-h-96 overflow-y-auto py-4 text-sm"
              >
                {filteredResults.map((item) => (
                  <Combobox.Option key={item.id} value={item}>
                    {({ active }) => (
                      <div
                        className={`mx-6 px-2 text-gray-800 flex py-3 text-sm dark:border-b-gray-500 cursor-pointer rounded-md ${
                          active ? 'bg-forest-100' : 'bg-white dark:bg-slate-900'
                        }`}
                      >
                        <span
                          className={`mr-1 font-medium ${
                            active
                              ? 'text-gray-800'
                              : 'text-gray-900 dark:text-slate-200'
                          }`}
                        >
                          {item.title}
                        </span>
                        <span
                          className={`text-xs ${
                            active ? 'text-teal-500' : 'text-slate-400'
                          }`}
                        >
                          {item.type}
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {query.value && filteredResults.length === 0 && (
              <p className="p-4 text-sm text-gray-500 dark:text-slate-200">
                No results found
              </p>
            )}

            {filteredResults.length === 0 && (
              <div className="py-6">
                <div className="flex justify-between px-6">
                  <h2 className="mb-4 text-xs font-normal uppercase tracking-wider text-gray-800 dark:text-slate-300">
                    Pinned portfolios
                  </h2>
                  {/* <div>
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
                        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </div> */}
                </div>
                <ul className="no-scrollbar flex overflow-x-auto px-6">
                  <li className="py-2 mr-2 flex focus:ring-2 ring-forest-100 hover:bg-forest-100 rounded cursor-pointer">
                    <div className="mr-3 flex h-14 w-14 items-center justify-center text-xl text-gray-700 font-semibold dark:border-slate-400 dark:bg-slate-500">
                      GT
                    </div>
                    <div>
                      <div className="line-clamp-2 inline-block justify-center bg-gray-200 px-2 py-1 text-[0.7rem] font-normal uppercase leading-tight text-gray-800">
                        Account
                      </div>
                      <div className="w-[150px] dark:text-slate-200 text-gray-700">
                        Galilei Trust
                      </div>
                    </div>
                  </li>
                  <li className="py-2 mr-2 flex focus:ring-2 ring-forest-100 hover:bg-forest-100 rounded cursor-pointer">
                    <div className="mr-3 flex h-14 w-14 items-center justify-center text-xl text-gray-700 font-semibold dark:border-slate-400 dark:bg-slate-500">
                      BF
                    </div>
                    <div>
                      <div className="line-clamp-2 inline-block justify-center rounded bg-gray-200 px-2 py-1 text-[0.7rem] font-normal uppercase leading-tight text-gray-800">
                        Household
                      </div>
                      <div className="w-[150px] dark:text-slate-200 text-gray-700">
                        Baker Family
                      </div>
                    </div>
                  </li>
                  <li className="py-2 mr-2 flex focus:ring-2 ring-forest-100 hover:bg-forest-100 rounded cursor-pointer">
                    <div className="mr-3 flex h-14 w-14 items-center justify-center text-xl text-gray-700 font-semibold dark:border-slate-400 dark:bg-slate-500">
                      AT
                    </div>
                    <div>
                      <div className="line-clamp-2 inline-block justify-center rounded bg-gray-200 px-2 py-1 text-[0.7rem] font-normal uppercase leading-tight text-gray-800">
                        Account
                      </div>
                      <div className="w-[150px] dark:text-slate-200 text-gray-700">
                        Akkerlof Trust
                      </div>
                    </div>
                  </li>
                  <li className="py-2 mr-2 flex focus:ring-2 ring-forest-100 hover:bg-forest-100 rounded cursor-pointer">
                    <Link href="" className="flex">
                      <div className="mr-3 flex h-14 w-14 items-center justify-center text-xl text-gray-700 font-semibold dark:border-slate-400 dark:bg-slate-500">
                        AS
                      </div>
                      <div>
                        <div className="line-clamp-2 inline-block justify-center rounded bg-gray-200 px-2 py-1 text-[0.7rem] font-normal uppercase leading-tight text-gray-800">
                          Account
                        </div>
                        <div className="w-[150px] dark:text-slate-200 text-gray-700">
                          Ask Trust
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            {filteredResults.length !== 0 && (
              <div className="py-6 px-6 border-t border-t-gray-400">
                 <h2 className="mb-4 text-xs font-normal uppercase tracking-wider text-gray-800 dark:text-slate-300">
                    Jump to
                  </h2>

                <ul>
                  <li className="mb-2 text-sm dark:text-slate-300">
                    <Link href="">Models</Link>
                  </li>
                  <li className="mb-2 text-sm dark:text-slate-300">
                    <Link href="">Trade settings</Link>
                  </li>
                  <li className="text-sm dark:text-slate-300">
                    <Link href="">Securities</Link>
                  </li>
                </ul>
              </div>
            )}

            {filteredResults.length === 0 && (
              <section className="no-scrollbar h-[260px] overflow-y-auto">
                <div className="py-6">
                   <h2 className="mb-4 px-6 text-xs font-normal uppercase tracking-wider text-gray-800 dark:text-slate-300">
                    Today's latest runs
                  </h2>

                  <ul className="px-4">
                    <li className="px-2 flex border-b border-b-gray-100 py-3 text-sm dark:border-b-gray-500 hover:bg-forest-100 cursor-pointer rounded-t-md">
                      <Link
                        href=""
                        className="mr-3 text-forest-green dark:text-teal-500"
                      >
                        Run 130 on 10-23-2023
                      </Link>
                      <div className="mr-3 flex items-center justify-center rounded bg-forest-100 px-2 text-[0.7rem] font-medium uppercase text-forest-green">
                        Complete
                      </div>
                      <div className="mr-6 dark:text-slate-200 text-gray-700">
                        Partially released
                      </div>
                      <div className="mr-6 dark:text-slate-200 text-gray-700">
                        Updated at 11:04 am CDT
                      </div>
                    </li>
                    <li className="px-2 flex border-b border-b-gray-100 py-3 text-sm dark:border-b-gray-500 hover:bg-forest-100 cursor-pointer">
                      <Link
                        href=""
                        className="mr-3 text-forest-green dark:text-teal-500"
                      >
                        Run 130 on 10-23-2023
                      </Link>
                      <div className="mr-3 flex items-center justify-center rounded bg-forest-100 px-2 text-[0.7rem] font-medium uppercase text-forest-green">
                        Complete
                      </div>
                      <div className="mr-6 dark:text-slate-200 text-gray-700">
                        Released
                      </div>
                      <div className="mr-6 dark:text-slate-200 text-gray-700">
                        Updated at 11:04 am CDT
                      </div>
                    </li>
                    <li className="px-2 flex py-3 text-sm dark:border-b-gray-500 hover:bg-forest-100 cursor-pointer rounded-b-md">
                      <Link
                        href=""
                        className="mr-3 text-forest-green dark:text-teal-500"
                      >
                        Run 130 on 10-23-2023
                      </Link>
                      <div className="mr-3 flex items-center justify-center rounded bg-forest-100 px-2 text-[0.7rem] font-medium uppercase text-forest-green">
                        Complete
                      </div>
                      <div className="mr-6 dark:text-slate-200 text-gray-700">
                        Not released
                      </div>
                      <div className="mr-6 dark:text-slate-200 text-gray-700">
                        Updated at 11:04 am CDT
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="py-6">
                  <h2 className="mb-4 px-6 text-xs font-normal uppercase tracking-wider text-gray-800 dark:text-slate-300">
                    Pending orders
                  </h2>

                  <ul className="px-4">
                    <li className="px-2 flex border-b border-b-gray-100 py-3 text-sm dark:border-b-gray-500 hover:bg-forest-100 cursor-pointer rounded-t-md">
                      <Link
                        href=""
                        className="mr-3 text-forest-green dark:text-teal-500"
                      >
                        Run 130 on 10-23-2023
                      </Link>
                      <div className="mr-3 flex items-center justify-center rounded bg-forest-100 px-2 text-[0.7rem] font-medium uppercase text-forest-green">
                        Complete
                      </div>
                      <div className="mr-6 dark:text-slate-200 text-gray-700">
                        Partially released
                      </div>
                      <div className="mr-6 dark:text-slate-200 text-gray-700">
                        Updated at 11:04 am CDT
                      </div>
                    </li>
                    <li className="px-2 flex border-b border-b-gray-100 py-3 text-sm dark:border-b-gray-500 hover:bg-forest-100 cursor-pointer">
                      <Link
                        href=""
                        className="mr-3 text-forest-green dark:text-teal-500"
                      >
                        Run 130 on 10-23-2023
                      </Link>
                      <div className="mr-3 flex items-center justify-center rounded bg-forest-100 px-2 text-[0.7rem] font-medium uppercase text-forest-green">
                        Complete
                      </div>
                      <div className="mr-6 dark:text-slate-200 text-gray-700">
                        Released
                      </div>
                      <div className="mr-6 dark:text-slate-200 text-gray-700">
                        Updated at 11:04 am CDT
                      </div>
                    </li>
                    <li className="px-2 flex py-3 text-sm dark:border-b-gray-500 hover:bg-forest-100 cursor-pointer rounded-b-md">
                      <Link
                        href=""
                        className="mr-3 text-forest-green dark:text-teal-500"
                      >
                        Run 130 on 10-23-2023
                      </Link>
                      <div className="mr-3 flex items-center justify-center rounded bg-forest-100 px-2 text-[0.7rem] font-medium uppercase text-forest-green">
                        Complete
                      </div>
                      <div className="mr-6 dark:text-slate-200 text-gray-700">
                        Not released
                      </div>
                      <div className="mr-6 dark:text-slate-200 text-gray-700">
                        Updated at 11:04 am CDT
                      </div>
                    </li>
                  </ul>
                </div>
              </section>
            )}

            <div className="flex items-center px-6 py-4 border-t border-gray-300 text-sm text-gray-600 dark:text-slate-400">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="mr-4 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg> */}
              <span className="mr-1 font-medium ">/m [search]</span> to access
              models,{' '}
              <span className="ml-2 mr-1 font-medium">/s [search]</span> to
              access securities
            </div>
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}
