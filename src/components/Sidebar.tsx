"use client"
import React from 'react'
import * as Icon from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = (data: any) => {
    const params = usePathname()
    return (
        <div className='w-[280px] h-full overflow-x-hidden overflow-y-auto py-3 px-2 text-sm bg-white'>
            <div className='flex flex-col gap-1.5 px-3'>
                {/* {JSON.stringify(data)} */}

                {data.data.datarole === "SUPER_ADMIN" ?
                    <>
                        <div className='font-bold text-[#2A3647]'>Overview </div>

                        <a href="/dashboard" className={`${params === '/dashboard' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.Laptop2 size={20} />
                            <div>Dashboard</div>
                        </a>

                        <a href="/order" className={`${params === '/order' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.CopyPlus size={20} />
                            <div>Add Order</div>
                        </a>

                        <a href="/orderreport" className={`${params === '/orderreport' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.ShoppingBag size={20} />
                            <div>List Orders</div>
                        </a>


                        <a href="/products" className={`${params === '/products' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.Archive size={20} />
                            <div>Products</div>
                        </a>

                        <div className='font-bold text-[#2A3647]'>Master</div>

                        <a href="/warehouse" className={`${params === '/warehouse' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.Warehouse size={20} />
                            <div>Warehouse</div>
                        </a>

                        <a href="/account" className={`${params === '/account' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.UserCog size={20} />
                            <div>Account</div>
                        </a>

                        <a href="/supplier" className={`${params === '/supplier' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.User size={20} />
                            <div>Supplier</div>
                        </a>

                        <a href="/customer" className={`${params === '/customer' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.Users size={20} />
                            <div>Customer</div>
                        </a>

                        <div className='font-bold text-[#2A3647]'>Purchasing</div>

                        <a href="/batch" className={`${params === '/batch' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.FileClock size={20} />
                            <div>Batch</div>
                        </a>

                        <a href="/purchaseorder" className={`${params === '/purchaseorder' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.ClipboardList size={20} />
                            <div>Purchase Order</div>
                        </a>

                        <a href="/purchasinghistory" className={`${params === '/purchasinghistory' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.FileClock size={20} />
                            <div>Purchasing History</div>
                        </a>


                        <div className='font-bold text-[#2A3647]'>Reporting</div>

                        <a href="/neraca" className={`${params === '/neraca' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.FileBarChart size={20} />
                            <div>Neraca</div>
                        </a>
                    </>
                    : null}

                {data.data.datarole === "FINANCE" ?
                    <>
                        <div className='font-bold text-[#2A3647]'>Overview </div>

                        <a href="/dashboard" className={`${params === '/dashboard' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.Laptop2 size={20} />
                            <div>Dashboard</div>
                        </a>

                        {/* <a href="/order" className={`${params === '/order' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.CopyPlus size={20} />
                            <div>Add Order</div>
                        </a> */}

                        <a href="/orderreport" className={`${params === '/orderreport' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.ShoppingBag size={20} />
                            <div>List Orders</div>
                        </a>


                        <a href="/products" className={`${params === '/products' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.Archive size={20} />
                            <div>Products</div>
                        </a>
                        {/* 
                        <div className='font-bold text-[#2A3647]'>Master</div>

                        <a href="/warehouse" className={`${params === '/warehouse' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.Warehouse size={20} />
                            <div>Warehouse</div>
                        </a>

                        <a href="/account" className={`${params === '/account' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.UserCog size={20} />
                            <div>Account</div>
                        </a>

                        <a href="/supplier" className={`${params === '/supplier' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.User size={20} />
                            <div>Supplier</div>
                        </a>

                        <a href="/customer" className={`${params === '/customer' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.Users size={20} />
                            <div>Customer</div>
                        </a> */}

                        <div className='font-bold text-[#2A3647]'>Purchasing</div>

                        <a href="/batch" className={`${params === '/batch' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.FileClock size={20} />
                            <div>Batch</div>
                        </a>

                        <a href="/purchaseorder" className={`${params === '/purchaseorder' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.ClipboardList size={20} />
                            <div>Purchase Order</div>
                        </a>

                        <a href="/purchasinghistory" className={`${params === '/purchasinghistory' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.FileClock size={20} />
                            <div>Purchasing History</div>
                        </a>

                        <div className='font-bold text-[#2A3647]'>Reporting</div>

                        <a href="/neraca" className={`${params === '/neraca' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.FileBarChart size={20} />
                            <div>Neraca</div>
                        </a>
                    </>
                    : null}

                {data.data.datarole === "HEAD_WAREHOUSE" ?
                    <>
                        <div className='font-bold text-[#2A3647]'>Overview </div>

                        <a href="/dashboard" className={`${params === '/dashboard' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.Laptop2 size={20} />
                            <div>Dashboard</div>
                        </a>

                        {/* <a href="/order" className={`${params === '/order' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.CopyPlus size={20} />
                            <div>Add Order</div>
                        </a> */}

                        {/* <a href="/orderreport" className={`${params === '/orderreport' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.ShoppingBag size={20} />
                            <div>List Orders</div>
                        </a> */}


                        <a href="/products" className={`${params === '/products' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.Archive size={20} />
                            <div>Products</div>
                        </a>

                        <div className='font-bold text-[#2A3647]'>Master</div>

                        <a href="/warehouse" className={`${params === '/warehouse' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.Warehouse size={20} />
                            <div>Warehouse</div>
                        </a>

                        {/* <a href="/account" className={`${params === '/account' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.UserCog size={20} />
                            <div>Account</div>
                        </a> */}

                        <a href="/supplier" className={`${params === '/supplier' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.User size={20} />
                            <div>Supplier</div>
                        </a>

                        {/* <a href="/customer" className={`${params === '/customer' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.Users size={20} />
                            <div>Customer</div>
                        </a> */}

                        <div className='font-bold text-[#2A3647]'>Purchasing</div>

                        <a href="/batch" className={`${params === '/batch' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.FileClock size={20} />
                            <div>Batch</div>
                        </a>

                        <a href="/purchaseorder" className={`${params === '/purchaseorder' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.ClipboardList size={20} />
                            <div>Purchase Order</div>
                        </a>

                        <a href="/purchasinghistory" className={`${params === '/purchasinghistory' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.FileClock size={20} />
                            <div>Purchasing History</div>
                        </a>


                        {/* <div className='font-bold text-[#2A3647]'>Reporting</div>

                        <a href="/neraca" className={`${params === '/neraca' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.FileBarChart size={20} />
                            <div>Neraca</div>
                        </a> */}
                    </>
                    : null}

                {data.data.datarole === "ADMIN_CUSTOMER" ?
                    <>
                        <div className='font-bold text-[#2A3647]'>Overview </div>

                        <a href="/dashboard" className={`${params === '/dashboard' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.Laptop2 size={20} />
                            <div>Dashboard</div>
                        </a>

                        <a href="/order" className={`${params === '/order' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.CopyPlus size={20} />
                            <div>Add Order</div>
                        </a>

                        <a href="/orderreport" className={`${params === '/orderreport' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.ShoppingBag size={20} />
                            <div>List Orders</div>
                        </a>


                        <a href="/products" className={`${params === '/products' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.Archive size={20} />
                            <div>Products</div>
                        </a>

                        <div className='font-bold text-[#2A3647]'>Master</div>

                        <a href="/customer" className={`${params === '/customer' ? `bg-gray-100` : `hover:bg-gray-100`} flex gap-2 py-2 rounded-xl px-3 cursor-pointer items-center font-medium text-[#2A3647]`}>
                            <Icon.Users size={20} />
                            <div>Customer</div>
                        </a>
                    </>
                    : null}


            </div>
        </div>
    )
}

export default Sidebar