type Props = {
  name: string
  color: string
}
export default function Label({ name, color }: Props) {
  return (
    <div className='py-0.5 pb-1 px-2.5 text-sm w-fit relative'>
      <p className='z-[1] text-nowrap' style={{ color, opacity: '100' }}>
        {name}
      </p>
      <div
        className='absolute w-full h-full rounded-full top-0 left-0'
        style={{ background: color, opacity: '0.2' }}
      ></div>
    </div>
  )
}
