import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'CE Invoice Payment',
    description: 'Orders Invoice',
}

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {

    return (
        <div className='flex flex-1 justify-center items-center'>
            {children}
        </div>
    )
}