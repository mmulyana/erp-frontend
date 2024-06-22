export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className='absolute w-[480px] max-w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4'>
        <div className='p-4 border border-gray-200 rounded-2xl bg-[#F7F7F8] shadow-xl shadow-gray-600/10'>
          {children}
        </div>
      </div>
      <div className="absolute -z-10 w-full h-full bg-white"></div>
    </>
  )
}
