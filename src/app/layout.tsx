'use client';
import './globals.css'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.png" />
      </head>

      <body className='h-screen w-screen'>
        {children}
        <ProgressBar
          height="3px"
          color="#62001F"
          options={{ showSpinner: false, easing: 'ease', speed: 500 }}
          shallowRouting
        />
      </body>
    </html>
  )
}
