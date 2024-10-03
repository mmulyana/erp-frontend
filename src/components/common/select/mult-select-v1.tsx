import React, { useState, useRef, useEffect } from 'react'

interface Option {
  value: string
  label: string
}

interface MultiSelectProps {
  onChange?: (selectedValues: string[]) => void
  placeholder?: string
  options: Option[]
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  onChange,
  placeholder = 'Select options...',
  options,
}) => {
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
      <div
        className='border border-gray-300 rounded-md p-2 flex flex-wrap items-center cursor-text'
        onClick={() => setIsOpen(true)}
      >
        {selectedOptions.map((option) => (
          <span
            key={option.value}
            className='bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded'
          >
            {option.label}
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeOption(option)
              }}
              className='ml-1 text-blue-800 font-bold'
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={searchRef}
          type='text'
          placeholder={selectedOptions.length === 0 ? placeholder : ''}
          className='outline-none flex-grow'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
      </div>
      {isOpen && (
        <ul className='absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md max-h-60 overflow-auto'>
          {filteredOptions.length === 0 ? (
            <li className='px-4 py-2 text-gray-500'>No options found</li>
          ) : (
            filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  toggleOption(option)
                  searchRef.current?.focus()
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  selectedOptions.some((item) => item.value === option.value)
                    ? 'bg-blue-50'
                    : ''
                }`}
                aria-label='options'
              >
                {option.label}
                <input
                  type='checkbox'
                  checked={selectedOptions.some(
                    (item) => item.value === option.value
                  )}
                  onChange={() => {}}
                  className='mr-2'
                />
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}

export default MultiSelect
