import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Routers from './routes'
import './globals.css'
import NotificationWrapper from './utils/notification'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NotificationWrapper>
        <BrowserRouter>
          <Routers />  
        </BrowserRouter>
      </NotificationWrapper>
    </QueryClientProvider>
  </React.StrictMode>
)
