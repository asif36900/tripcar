// "use client"

// import { useState, useEffect } from "react"
// import { ControllerRenderProps } from "react-hook-form"
// import { Input } from "@/components/ui/input"
// import { AddressSuggestion, fetchAddressSuggestions } from "@/lib/geolocationService"
// import { Loader2 } from "lucide-react"

// interface AutocompleteInputProps {
//   field: ControllerRenderProps<any, any>   // from react-hook-form Controller
//   placeholder?: string
//   label?: string
// }

// export default function AutocompleteInput({ field, placeholder }: AutocompleteInputProps) {
//   const [query, setQuery] = useState(field.value || "")
//   const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
//   const [loading, setLoading] = useState(false)

//   // Debounced search
//   useEffect(() => {
//     const handler = setTimeout(async () => {
//       if (query.length >= 3) {
//         try {
//           setLoading(true)
//           const results = await fetchAddressSuggestions(query)
//           setSuggestions(results)
//         } catch (err) {
//           console.error("Address fetch error:", err)
//           setSuggestions([])
//         } finally {
//           setLoading(false)
//         }
//       } else {
//         setSuggestions([])
//       }
//     }, 400)

//     return () => clearTimeout(handler)
//   }, [query])

//   const handleSelect = (suggestion: AddressSuggestion) => {
//     setQuery(suggestion.label)
//     field.onChange(suggestion.label) // update react-hook-form value
//     setSuggestions([])
//   }

//   return (
//     <div className="relative">
//       <Input
//         value={query}
//         onChange={(e) => {
//           setQuery(e.target.value)
//           field.onChange(e.target.value) // keep RHF synced
//         }}
//         placeholder={placeholder || "Search address..."}
//       />

//       {/* Suggestions Dropdown */}
//       {(loading || suggestions.length > 0) && (
//         <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
//           {loading && (
//             <div className="p-2 text-sm text-gray-500 flex items-center">
//               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//               Searching...
//             </div>
//           )}

//           {!loading &&
//             suggestions.map((s, index) => (
//               <div
//                 key={index}
//                 className="p-2 text-sm cursor-pointer hover:bg-gray-100"
//                 onClick={() => handleSelect(s)}
//               >
//                 {s.label}
//               </div>
//             ))}

//           {!loading && suggestions.length === 0 && query.length >= 3 && (
//             <div className="p-2 text-sm text-gray-500">No suggestions found.</div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import { useState, useEffect, useRef } from "react"
import { ControllerRenderProps } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { AddressSuggestion, fetchAddressSuggestions } from "@/lib/geolocationService"
import { Loader2, Search } from "lucide-react"

interface AutocompleteInputProps {
  field: ControllerRenderProps<any, any> // from react-hook-form Controller
  placeholder?: string
  label?: string
}

export default function AutocompleteInput({ field, placeholder }: AutocompleteInputProps) {
  const [query, setQuery] = useState(field.value || "")
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [lastSelected, setLastSelected] = useState<string | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // 🧭 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // 🔍 Debounced search logic
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (query.trim() === lastSelected?.trim()) return

      if (query.length >= 3) {
        try {
          setLoading(true)
          const results = await fetchAddressSuggestions(query)
          setSuggestions(results)
          setShowDropdown(true)
        } catch (err) {
          console.error("Address fetch error:", err)
          setSuggestions([])
          setShowDropdown(true)
        } finally {
          setLoading(false)
        }
      } else {
        setSuggestions([])
        setShowDropdown(false)
      }
    }, 400)

    return () => clearTimeout(handler)
  }, [query])

  // ✅ When user selects a suggestion
  const handleSelect = (suggestion: AddressSuggestion) => {
    setQuery(suggestion.label)
    field.onChange(suggestion.label)
    setLastSelected(suggestion.label)
    setShowDropdown(false)
    setSuggestions([])
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <Input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          field.onChange(e.target.value)
        }}
        placeholder={placeholder || "Search address..."}
        onFocus={() => {
          if (suggestions.length > 0) setShowDropdown(true)
        }}
      />

      {/* Suggestions Dropdown */}
      {showDropdown && (loading || suggestions.length > 0 || query.length >= 3) && (
        <div className="relative" ref={wrapperRef}>
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              field.onChange(e.target.value)
            }}
            placeholder={placeholder || "Search address..."}
            onFocus={() => {
              if (suggestions.length > 0) setShowDropdown(true)
            }}
            className="bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
          />

          {/* Suggestions Dropdown */}
          {showDropdown && (loading || suggestions.length > 0 || query.length >= 3) && (
            <div className="absolute z-10 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">

              {/* 🔍 Always show search header */}
              {query.length >= 3 && (
                <div className="p-2 text-sm text-gray-600 dark:text-gray-300 flex items-center border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <Search className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-300" />
                  Searching for: <span className="ml-1 font-medium text-gray-800 dark:text-gray-200">"{query}"</span>
                </div>
              )}

              {loading && (
                <div className="p-2 text-sm text-gray-500 dark:text-gray-300 flex items-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Fetching suggestions...
                </div>
              )}

              {!loading &&
                suggestions.map((s, index) => (
                  <div
                    key={index}
                    className="p-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white"
                    onClick={() => handleSelect(s)}
                  >
                    {s.label}
                  </div>
                ))}

              {!loading && suggestions.length === 0 && query.length >= 3 && (
                <div className="p-2 text-sm text-gray-500 dark:text-gray-300">
                  No suggestions found.
                </div>
              )}
            </div>
          )}
        </div>

      )}
    </div>
  )
}
