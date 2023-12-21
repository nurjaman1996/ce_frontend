import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'CE Print',
    description: 'Print',
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