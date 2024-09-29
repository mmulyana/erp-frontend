import ButtonLink from './button-link'

export default function CardHighlight() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 rounded-[8px] border border-[#EFF0F2] h-fit'>
      <div className='py-4 px-6 w-full h-full'>
        <div className='h-8 w-8 rounded-[8px] bg-[#19A14A]/20'></div>
        <div className='mt-2.5 flex flex-col gap-3.5'>
          <p className='text-base text-[#313951]/50'>Peminjaman Alat</p>
          <div className='w-full flex justify-between items-center'>
            <p className='text-[22px] font-medium text-[#313951]'>20</p>
            <ButtonLink />
          </div>
        </div>
      </div>

      <div className='py-4 px-6 w-full h-full relative'>
        <div className='absolute h-[80%] w-[1px] bg-[#EFF0F2] top-1/2 -translate-y-1/2 left-0'></div>
        <div className='h-8 w-8 rounded-[8px] bg-[#CBDA5A]/20'></div>
        <div className='mt-2.5 flex flex-col gap-3.5'>
          <p className='text-base text-[#313951]/50'>Persediaan Menipis</p>
          <div className='w-full flex justify-between items-center'>
            <p className='text-[22px] font-medium text-[#313951]'>20</p>
            <ButtonLink />
          </div>
        </div>
      </div>

      <div className='py-4 px-6 w-full h-full relative'>
        <div className='absolute h-[80%] w-[1px] bg-[#EFF0F2] top-1/2 -translate-y-1/2 left-0'></div>
        <div className='h-8 w-8 rounded-[8px] bg-[#E62A2A]/20'></div>
        <div className='mt-2.5 flex flex-col gap-3.5'>
          <p className='text-base text-[#313951]/50'>Persediaan Habis</p>
          <div className='w-full flex justify-between items-center'>
            <p className='text-[22px] font-medium text-[#313951]'>20</p>
            <ButtonLink />
          </div>
        </div>
      </div>
    </div>
  )
}
