export type Model = {
  id: string
  title: string
  type: string
}

export type Order = {
  id: string
  title: string
  status: string
  releaseStatus: string
  updatedAt: string
}

export type Portfolio = {
  id: string
  title: string
  type: string
}

export type Run = {
  id: string
  title: string
  status: string
  releaseStatus: string
  updatedAt: string
}

export type Security = {
  id: string
  title: string
  ticker?: string
  type: string
}
