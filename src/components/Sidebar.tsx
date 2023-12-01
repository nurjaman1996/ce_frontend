"use client"
import React from 'react'
import * as Icon from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
    const params = usePathname()


    return (
        <div className='w-[280px] h-full overflow-x-hidden overflow-y-auto py-3 px-2 text-sm bg-[#ae4f4f]'>
            <div className='flex flex-col gap-1.5 px-3'>

                <div className='font-bold text-white'>Overview</div>

                <Link href="/dashboard" className={`${params === '/dashboard' ? `bg-[#f87171]` : `hover:bg-[#f87171]`} flex gap-2 py-2 rounded-sm px-3 cursor-pointer items-center font-medium text-white`}>
                    <Icon.Laptop2 size={20} />
                    <div>Dashboard</div>
                </Link>

                <Link href="/order" className={`${params === '/order' ? `bg-[#f87171]` : `hover:bg-[#f87171]`} flex gap-2 py-2 rounded-sm px-3 cursor-pointer items-center font-medium text-white`}>
                    <Icon.ShoppingBag size={20} />
                    <div>Sales Order</div>
                </Link>

                <Link href="/products" className={`${params === '/products' ? `bg-[#f87171]` : `hover:bg-[#f87171]`} flex gap-2 py-2 rounded-sm px-3 cursor-pointer items-center font-medium text-white`}>
                    <Icon.Archive size={20} />
                    <div>Products</div>
                </Link>

                <div className='font-bold text-white'>Master</div>

                <Link href="/supplier" className={`${params === '/supplier' ? `bg-[#f87171]` : `hover:bg-[#f87171]`} flex gap-2 py-2 rounded-sm px-3 cursor-pointer items-center font-medium text-white`}>
                    <Icon.User size={20} />
                    <div>Supplier</div>
                </Link>

                <Link href="/reseller" className={`${params === '/reseller' ? `bg-[#f87171]` : `hover:bg-[#f87171]`} flex gap-2 py-2 rounded-sm px-3 cursor-pointer items-center font-medium text-white`}>
                    <Icon.Users size={20} />
                    <div>Reseller</div>
                </Link>

                <div className='font-bold text-white'>Purchasing</div>

                <Link href="/purchaseorder" className={`${params === '/purchaseorder' ? `bg-[#f87171]` : `hover:bg-[#f87171]`} flex gap-2 py-2 rounded-sm px-3 cursor-pointer items-center font-medium text-white`}>
                    <Icon.ClipboardList size={20} />
                    <div>Purchase Order</div>
                </Link>

                <Link href="/purchasinghistory" className={`${params === '/purchasinghistory' ? `bg-[#f87171]` : `hover:bg-[#f87171]`} flex gap-2 py-2 rounded-sm px-3 cursor-pointer items-center font-medium text-white`}>
                    <Icon.FileClock size={20} />
                    <div>Purchasing History</div>
                </Link>

                <div className='font-bold text-white'>Reporting</div>

                <Link href="/neraca" className={`${params === '/neraca' ? `bg-[#f87171]` : `hover:bg-[#f87171]`} flex gap-2 py-2 rounded-sm px-3 cursor-pointer items-center font-medium text-white`}>
                    <Icon.FileBarChart size={20} />
                    <div>Neraca</div>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar