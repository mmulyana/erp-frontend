import type { Step } from 'react-joyride'

import { TEST_ID } from '@/utils/constant/_testId'
import Tour, { TourProps } from '@/components/common/tour'

type Props = Omit<TourProps, 'steps'>

const steps: Step[] = [
  {
    content: (
      <div className='text-center'>
        <p className='font-medium text-dark text-xl'>
          Selamat Datang di Dashboard
        </p>
        <p className='text-dark/50'>Pantau semua informasi dalam satu tempat</p>
      </div>
    ),
    target: 'body',
    placement: 'center',
  },
  {
    content: (
      <>
        <p className='font-medium'>Total pegawai aktif saat ini</p>
      </>
    ),
    placement: 'bottom',
    target: '#' + TEST_ID.TOTAL_EMPLOYEE_OVERVIEW,
  },
  {
    content: (
      <>
        <p className='font-medium'>Total proyek aktif saat ini</p>
      </>
    ),
    placement: 'bottom',
    target: '#' + TEST_ID.TOTAL_PROJECT_OVERVIEW,
  },
  {
    content: (
      <>
        <p className='font-medium'>Daftar proyek aktif</p>
      </>
    ),
    placementBeacon: 'top',
    target: '#' + TEST_ID.PROJECT_LIST_OVERVIEW,
  },
  {
    content: (
      <>
        <p className='font-medium'>Pantau Sertifikasi Pegawai</p>
        <p className='text-dark/60'>
          Sistem akan memberitahu sebulan sebelum sertifikasi bakal kadaluwarsa
        </p>
      </>
    ),
    placement: 'bottom',
    target: '#' + TEST_ID.CARD_CERTIF_LIST,
  },
  {
    content: (
      <>
        <p className='font-medium'>Pantau Safety Induction Pegawai</p>
        <p className='text-dark/60'>
          Sistem akan memberitahu sebulan sebelum 'safety induction' bakal
          kadaluwarsa
        </p>
      </>
    ),
    placement: 'top',
    target: '#' + TEST_ID.CARD_SAFETY_LIST,
  },
]

export default function TourOverview({ start, onTourEnd }: Props) {
  return <Tour start={start} onTourEnd={onTourEnd} steps={steps} />
}
