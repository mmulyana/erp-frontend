import { userAtom } from '@/atom/auth'
import useAccount from '@/utils/api/use-account'
import { useAtomValue } from 'jotai'

export default function Dashboard() {
  const user = useAtomValue(userAtom)
  const { data } = useAccount(user?.id)

  console.log(data)

  return (
    <>
      <p>Dashboard</p>
    </>
  )
}
