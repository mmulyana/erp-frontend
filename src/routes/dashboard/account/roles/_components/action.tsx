import Edit from './edit'

type Props = {
  id?: number
}
export default function Action(props: Props) {
  return (
    <div className='flex gap-2 items-center justify-end'>
      <Edit id={props.id} />
    </div>
  )
}
