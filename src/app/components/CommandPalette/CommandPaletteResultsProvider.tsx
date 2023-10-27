import React, { useEffect, useState } from 'react'
import { useLazySearchModelsQuery } from '@/redux/services/modelsApi'
import { useLazySearchPortfoliosQuery } from '@/redux/services/portfoliosApi'
import { useLazySearchSecuritiesQuery } from '@/redux/services/securitiesApi'
import { Model, Portfolio, Security } from '@/app/api/types'

type QueryResults = {
  data: Model[] | Portfolio[] | Security[]
  isError: boolean
  isLoading: boolean
  isFetching: boolean
  hasData: boolean
}

type CommandPaletteResultsProviderProps = {
  children: (queryResults: QueryResults) => React.ReactNode
  searchType: string
  searchTerm: string
}

type SearchFnMap = {
  [key: string]: ({ query }: { query: string }) => void
}

export default function CommandPaletteResultsProvider({
  children,
  searchTerm,
  searchType,
}: CommandPaletteResultsProviderProps) {
  const [filteredSearchTerm, setFilteredSearchTerm] = useState(searchTerm)
  const [searchModels, modelResults] = useLazySearchModelsQuery()
  const [searchPortfolios, portfolioResults] = useLazySearchPortfoliosQuery()
  const [searchSecurities, securityResults] = useLazySearchSecuritiesQuery()

  useEffect(() => {
    if (searchTerm.length === 0 || searchTerm.length > 1) {
      setFilteredSearchTerm(searchTerm)

      const search: SearchFnMap = {
        model: searchModels,
        portfolio: searchPortfolios,
        security: searchSecurities,
      }

      search[searchType]?.({ query: searchTerm })
    }
  }, [searchTerm])

  if (searchType === 'model') {
    const { data, isError, isLoading, isFetching } = modelResults
    const models = data?.models ?? []

    return children({
      data: models,
      isError,
      isLoading,
      isFetching,
      hasData: !!models.length,
    })
  }

  if (searchType === 'portfolio') {
    const { data, isError, isLoading, isFetching } = portfolioResults
    const portfolios = data?.portfolios ?? []

    return children({
      data: portfolios,
      isError,
      isLoading,
      isFetching,
      hasData: !!portfolios.length,
    })
  }

  if (searchType === 'security') {
    const { data, isError, isLoading, isFetching } = securityResults
    const securities = data?.securities ?? []

    return children({
      data: securities,
      isError,
      isLoading,
      isFetching,
      hasData: !!securities.length,
    })
  }
}
