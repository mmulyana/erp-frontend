import Edit from './edit'
import Delete from './delete'

type Props = {
  id?: number
}
export default function Action(props: Props) {
  return (
    <div className='flex gap-2 items-center justify-end'>
      <Delete id={props.id} />
      <Edit id={props.id} />
    </div>
  )
}
