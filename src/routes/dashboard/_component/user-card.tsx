import { ChevronsUpDown } from "lucide-react";

export default function UserCard() {
  return (
    <div className='p-2 rounded-[8px] bg-[#F6F7F9] flex justify-between items-center h-12 shadow-[0_2px_2px_-1px_rgba(130,152,173,0.3)] cursor-pointer mb-2'>
      <div className='flex gap-3 items-center'>
        <div className='h-8 w-8 rounded-[5px] bg-gray-600'></div>
        <div className='flex flex-col'>
          <span className='text-sm font-medium text-[#3D556B]'>Mulyana</span>
          <span className='text-xs text-[#BCC7D3]'>Admin</span>
        </div>
      </div>

      <ChevronsUpDown className='w-4 h-4 text-[#BCC7D3]' />
    </div>
  )
}
