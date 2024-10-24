import { Button } from '@/components/ui/button'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  id: number
}

export default function StatusEmployee({ open, setOpen, id }: Props) {
  if (!open) return null

  return (
    <div className='w-full h-screen absolute top-0 left-0 bg-white/50 backdrop-blur-md z-10 flex items-center justify-center px-8'>
      <div className='w-[240px] max-w-full flex flex-col justify-center'>
        <p className='text-lg text-center font-medium text-dark'>
          Hapus pegawai
        </p>
        <p>Pegawai ini akan dihapus dari sistem</p>
        <div className='flex gap-3 items-center justify-center mt-4'>
          <Button
            variant='secondary'
            onClick={() => {
              setOpen(false)
            }}
          >
            Batal
          </Button>
          <Button
            variant='default'
            onClick={() => {
              setOpen(false)
            }}
          >
            Hapus
          </Button>
        </div>
      </div>
    </div>
  )
}
