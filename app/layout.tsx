import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NoMeOcupan - La IA contra la okupación',
  description: 'Análisis avanzado de riesgo de okupación con inteligencia artificial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
