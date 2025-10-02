"use client"

import { useState, useEffect } from "react"
import { ControllerRenderProps } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { AddressSuggestion, fetchAddressSuggestions } from "@/lib/geolocationService"
import { Loader2 } from "lucide-react"

interface AutocompleteInputProps {
  field: ControllerRenderProps<any, any>   // from react-hook-form Controller
  placeholder?: string
  label?: string
}

export default function AutocompleteInput({ field, placeholder }: AutocompleteInputProps) {
  const [query, setQuery] = useState(field.value || "")
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [loading, setLoading] = useState(false)

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (query.length >= 3) {
        try {
          setLoading(true)
          const results = await fetchAddressSuggestions(query)
          setSuggestions(results)
        } catch (err) {
          console.error("Address fetch error:", err)
          setSuggestions([])
        } finally {
          setLoading(false)
        }
      } else {
        setSuggestions([])
      }
    }, 400)

    return () => clearTimeout(handler)
  }, [query])

  const handleSelect = (suggestion: AddressSuggestion) => {
    setQuery(suggestion.label)
    field.onChange(suggestion.label) // update react-hook-form value
    setSuggestions([])
  }

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          field.onChange(e.target.value) // keep RHF synced
        }}
        placeholder={placeholder || "Search address..."}
      />

      {/* Suggestions Dropdown */}
      {(loading || suggestions.length > 0) && (
        <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
          {loading && (
            <div className="p-2 text-sm text-gray-500 flex items-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Searching...
            </div>
          )}

          {!loading &&
            suggestions.map((s, index) => (
              <div
                key={index}
                className="p-2 text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(s)}
              >
                {s.label}
              </div>
            ))}

          {!loading && suggestions.length === 0 && query.length >= 3 && (
            <div className="p-2 text-sm text-gray-500">No suggestions found.</div>
          )}
        </div>
      )}
    </div>
  )
}
