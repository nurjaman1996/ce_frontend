"use client"
import React from 'react'
import axios from "axios"
axios.defaults.withCredentials = true
import * as Icon from "lucide-react"
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const Navbar = (data: any) => {

    async function LogOut() {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/auth/logout`)
            // router.refresh()
            window.location.href = "/";
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex h-14 items-center shadow-sm bg-white border-b border-slate-200'>

            <div className='h-full flex items-center w-[280px] gap-3 justify-start ml-4'>
                <Image
                    className='aspect-square h-7 w-auto'
                    src="/logo.png"
                    width={300}
                    height={300}
                    alt="Picture of the author"
                />

                <span className='font-medium text-lg text-black'>CE Corp Apps</span>
            </div>

            <div className='h-full flex items-center grow px-5'>
                <div className='ml-auto flex items-center'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-2 cursor-pointer px-3 justify-start">
                                <Avatar className='h-9 w-9'>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>

                                <div className='flex flex-col items-start justify-center gap-1'>
                                    {/* <small className="text-xs font-medium leading-none">{data.data.dataname}</small>
                                    <span className="text-xs text-muted-foreground leading-none capitalize">{data.data.datarole.toLowerCase()}</span> */}
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="text-xs" align='start'>
                            <DropdownMenuLabel>
                                <span className='text-xs'>My Account</span>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className='cursor-pointer flex hover:bg-gray-100 w-full h-full px-2 py-1 rounded-sm items-center my-1'>
                                <Icon.Settings className='mr-2 h-4 w-4' />
                                Settings
                            </div>
                            <div className='cursor-pointer flex hover:bg-gray-100 w-full h-full px-2 py-1 rounded-sm items-center mb-1' onClick={LogOut}>
                                <Icon.LogOut className='mr-2 h-4 w-4' />
                                Logout
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

        </div>
    )
}

export default Navbar