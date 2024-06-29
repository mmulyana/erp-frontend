import { userAtom } from '@/atom/auth'
import { useUserAccount } from '@/utils/api/use-account'
import { PATH } from '@/utils/constant/_paths'
import { useAtomValue } from 'jotai'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const user = useAtomValue(userAtom)
  const { data } = useUserAccount(user?.id)

  return (
    <>
      <p>Dashboard</p>
      <Link to={PATH.ACCOUNT}>users</Link>
    </>
  )
}
