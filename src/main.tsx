import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './app'
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
					<App />
				</BrowserRouter>
			</NotificationWrapper>
		</QueryClientProvider>
	</React.StrictMode>
)
