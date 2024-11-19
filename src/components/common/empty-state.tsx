import { cn } from '@/utils/cn'

import EmptyImg from '/public/icons/empty-box.png'

type Props = {
  className?: string
  textStyle?: string
  text?: string
}
export default function EmptyState({
  className,
  textStyle,
  text = 'Masih kosong',
}: Props) {
  return (
    <div
      className={cn(
        'w-full h-fit pb-4 bg-gray-50/50 flex justify-center items-center flex-col',
        className
      )}
    >
      <img src={EmptyImg} className='w-20 aspect-square' />
      <p className={cn('text-dark/50 font-medium text-sm mt-4', textStyle)}>
        {text}
      </p>
    </div>
  )
}
