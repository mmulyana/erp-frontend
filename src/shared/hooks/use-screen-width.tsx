import { useState, useEffect } from 'react'

const useScreenWidth = (): number => {
  const [width, setWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )

  useEffect(() => {
    const handleResize = (): void => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width
}

export default useScreenWidth
