import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { modelsApi } from './services/modelsApi'
import { ordersApi } from './services/ordersApi'
import { portfoliosApi } from './services/portfoliosApi'
import { runsApi } from './services/runsApi'
import { securitiesApi } from './services/securitiesApi'

export const store = configureStore({
  reducer: {
    [modelsApi.reducerPath]: modelsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [portfoliosApi.reducerPath]: portfoliosApi.reducer,
    [runsApi.reducerPath]: runsApi.reducer,
    [securitiesApi.reducerPath]: securitiesApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // this removes the console errors about non-serializable values detected in state
      serializableCheck: false,
    })
      .concat(modelsApi.middleware)
      .concat(ordersApi.middleware)
      .concat(portfoliosApi.middleware)
      .concat(runsApi.middleware)
      .concat(securitiesApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
