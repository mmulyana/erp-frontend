export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-background'>
			<div className='flex flex-col items-center max-w-md text-center'>
				<h1 className='text-4xl font-bold tracking-tight mb-2'>
					Page not found
				</h1>

				<p className='text-muted-foreground mb-8'>
					Sorry, we couldn't find the page you're looking for. It might have
					been moved or deleted.
				</p>
			</div>
		</div>
	)
}
