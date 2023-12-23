import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'CE Corp - Share Invoice Link',
    description: 'Share Invoice Link',
}

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {

    return (
        <div>
            {children}
        </div>
    )
}