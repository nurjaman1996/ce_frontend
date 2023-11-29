"use client"
import React from 'react'
import * as Icon from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
    const params = usePathname()


    return (
        <div className='w-[280px] h-full overflow-x-hidden overflow-y-auto py-3 px-2 text-sm'>
            <div className='flex flex-col gap-1.5 px-3'>

                <div className='font-medium text-gray-500'>Overview</div>

                <Link href="/dashboard" className={`${params === '/dashboard' ? `bg-[#F3F4F3]` : `hover:bg-[#fbfbfb]`} flex gap-2 py-2 rounded-sm px-3 cursor-pointer items-center`}>
                    <Icon.Laptop2 size={20} />
                    <div>Dashboard</div>
                </Link>

                <Link href="/order" className={`${params === '/order' ? `bg-[#F3F4F3]` : `hover:bg-[#fbfbfb]`} flex gap-2 py-2 rounded-sm px-3 cursor-pointer items-center`}>
                    <Icon.ShoppingBag size={20} />
                    <div>Order</div>
                </Link>

                <Link href="/products" className={`${params === '/products' ? `bg-[#F3F4F3]` : `hover:bg-[#fbfbfb]`} flex gap-2 py-2 rounded-sm px-3 cursor-pointer items-center`}>
                    <Icon.Archive size={20} />
                    <div>Products</div>
                </Link>

                <div className='font-medium text-gray-500'>Purchasing</div>

                <Link href="/purchaseorder" className={`${params === '/purchaseorder' ? `bg-[#F3F4F3]` : `hover:bg-[#fbfbfb]`} flex gap-2 py-2 rounded-sm px-3 cursor-pointer items-center`}>
                    <Icon.ClipboardList size={20} />
                    <div>Purchase Order</div>
                </Link>

                <Link href="/purchasinghistory" className={`${params === '/purchasinghistory' ? `bg-[#F3F4F3]` : `hover:bg-[#fbfbfb]`} flex gap-2 py-2 rounded-sm px-3 cursor-pointer items-center`}>
                    <Icon.FileClock size={20} />
                    <div>Purchasing History</div>
                </Link>

                <div className='font-medium text-gray-500'>Reporting</div>

                <Link href="/neraca" className={`${params === '/neraca' ? `bg-[#F3F4F3]` : `hover:bg-[#fbfbfb]`} flex gap-2 py-2 rounded-sm px-3 cursor-pointer items-center`}>
                    <Icon.FileBarChart size={20} />
                    <div>Neraca</div>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar