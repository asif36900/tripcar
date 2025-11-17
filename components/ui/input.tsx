import * as React from 'react'
import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base Styling & Theming
        'flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',

        // --- File Input Styling (text-foreground property will be set below) ---
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',

        // --- Light Mode (Default) ---
        'bg-white border-gray-300 text-black placeholder:text-gray-500',
        'selection:bg-amber-400 selection:text-black',
        'file:text-black', // File text color in Light Mode

        // --- Dark Mode (dark:) ---
        'dark:bg-black dark:border-gray-700 dark:text-white dark:placeholder:text-gray-400',
        'dark:selection:bg-amber-400 dark:selection:text-black',
        'dark:file:text-white', // File text color in Dark Mode

        // Focus/Ring Styles (Kept largely the same, optimized for contrast)
        'focus-visible:border-amber-500 focus-visible:ring-amber-500/50 focus-visible:ring-[3px]',

        // Error (aria-invalid) Styles (Kept largely the same)
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',

        className,
      )}
      {...props}
    />
  )
}

export { Input }