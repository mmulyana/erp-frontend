import { cn } from '@/shared/utils/cn'
import { XIcon } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface Option {
  value: string
  label: string
}

interface MultiSelectProps {
  onChange?: (selectedValues: string[]) => void
  placeholder?: string
  options: Option[]
  label?: string
}

export default function MultiSelect({
  onChange,
  placeholder = 'Select options...',
  options,
  label,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleOption = (option: Option) => {
    setSelectedOptions((prev) => {
      const newSelection = prev.some((item) => item.value === option.value)
        ? prev.filter((item) => item.value !== option.value)
        : [...prev, option]
      onChange && onChange(newSelection.map((item) => item.value))
      return newSelection
    })
  }

  const removeOption = (option: Option) => {
    setSelectedOptions((prev) => {
      const newSelection = prev.filter((item) => item.value !== option.value)
      onChange && onChange(newSelection.map((item) => item.value))
      return newSelection
    })
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative w-full' ref={containerRef}>
      {label && <p className='text-sm text-dark/80 mb-1 font-medium'>{label}</p>}
      <div
        className='flex min-h-10 w-full rounded-xl border border-[#DEE0E3] bg-background px-1 py-1 text-sm flex-wrap gap-1'
        onClick={() => setIsOpen(true)}
      >
        {selectedOptions.map((option) => (
          <span
            key={option.value}
            className='border border-dark/10 text-sm font-semibold px-2.5 py-1 flex items-center h-full rounded-lg gap-1.5'
          >
            {option.label}
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeOption(option)
              }}
              className=' font-bold'
            >
              <XIcon className='w-4 h-4 text-dark stroke-2' />
            </button>
          </span>
        ))}
        <input
          ref={searchRef}
          type='text'
          placeholder={selectedOptions.length === 0 ? placeholder : ''}
          className={cn(
            'outline-none',
            !selectedOptions.length && 'ml-2.5'
          )}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
      </div>
      {isOpen && (
        <ul className='absolute z-10 w-full bg-white border border-dark/10 mt-1 rounded-xl max-h-60 overflow-auto p-2 space-y-1'>
          {filteredOptions.length === 0 ? (
            <li className='px-3 py-2 text-gray-500'>No options found</li>
          ) : (
            filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  toggleOption(option)
                  searchRef.current?.focus()
                }}
                className={cn(
                  'px-3 py-2 cursor-pointer hover:bg-gray-100 flex justify-between rounded-lg text-sm',
                  selectedOptions.some((item) => item.value === option.value) &&
                    'bg-blue-50'
                )}
                aria-label='input'
              >
                {option.label}
                <input
                  type='checkbox'
                  checked={selectedOptions.some(
                    (item) => item.value === option.value
                  )}
                  onChange={() => {}}
                  className={cn(!selectedOptions.length && 'ml-2.5')}
                />
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
