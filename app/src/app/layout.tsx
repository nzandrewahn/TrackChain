import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './components/NavBar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TrackChain app',
  description: 'Track your items on the blockchain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{
        <div>
          <NavBar/>
          {children}
        </div>
      }</body>
    </html>
  )
}
