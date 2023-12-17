"use client"
import React from 'react'
import * as Icon from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
    const params = usePathname()


    return (
        <div className='w-[280px] h-full overflow-x-hidden overflow-y-auto py-3 px-2 text-sm bg-white'>
            <div className='flex flex-col gap-1.5 px-3'>

                <div className='font-bold text-[#2A3647]'>Overview</div>

                <Link href="/dashboard" className={`${params === '/dashboard' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                    <Icon.Laptop2 size={20} />
                    <div>Dashboard</div>
                </Link>

                <Link href="/order" className={`${params === '/order' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                    <Icon.CopyPlus size={20} />
                    <div>Add Order</div>
                </Link>

                <Link href="/orderreport" className={`${params === '/orderreport' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                    <Icon.ShoppingBag size={20} />
                    <div>List Orders</div>
                </Link>


                <Link href="/products" className={`${params === '/products' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                    <Icon.Archive size={20} />
                    <div>Products</div>
                </Link>

                <div className='font-bold text-[#2A3647]'>Master</div>

                <Link href="/warehouse" className={`${params === '/warehouse' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                    <Icon.User size={20} />
                    <div>Warehouse</div>
                </Link>

                <Link href="/supplier" className={`${params === '/supplier' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                    <Icon.User size={20} />
                    <div>Supplier</div>
                </Link>

                <Link href="/customer" className={`${params === '/customer' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                    <Icon.Users size={20} />
                    <div>Customer</div>
                </Link>

                <div className='font-bold text-[#2A3647]'>Purchasing</div>

                <Link href="/batch" className={`${params === '/batch' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                    <Icon.FileClock size={20} />
                    <div>Batch</div>
                </Link>

                <Link href="/purchaseorder" className={`${params === '/purchaseorder' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                    <Icon.ClipboardList size={20} />
                    <div>Purchase Order</div>
                </Link>

                <Link href="/purchasinghistory" className={`${params === '/purchasinghistory' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                    <Icon.FileClock size={20} />
                    <div>Purchasing History</div>
                </Link>



                <div className='font-bold text-[#2A3647]'>Reporting</div>

                <Link href="/neraca" className={`${params === '/neraca' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                    <Icon.FileBarChart size={20} />
                    <div>Neraca</div>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar