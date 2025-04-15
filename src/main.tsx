import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './app'
import './globals.css'

import ToasterWrapper from './shared/utils/toaster-wrapper'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: true,
			retry: 1,
		},
	},
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<NuqsAdapter>
			<QueryClientProvider client={queryClient}>
				<ToasterWrapper>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</ToasterWrapper>
			</QueryClientProvider>
		</NuqsAdapter>
	</React.StrictMode>
)
