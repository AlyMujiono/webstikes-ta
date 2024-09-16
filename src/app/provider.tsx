'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' forcedTheme='dark'   enableSystem>
      <NextUIProvider>
      <div className="text-black bg-white" >
        <div></div>
          {children}
        </div>
      </NextUIProvider>
    </ThemeProvider>
  )
}