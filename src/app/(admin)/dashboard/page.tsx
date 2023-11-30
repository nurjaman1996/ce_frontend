"use client"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { getToken } from "@/helpers/GetToken"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const [Token, setToken]: any = useState("")

  useEffect(() => {
    refreshToken()
  }, [])

  async function refreshToken() {
    const dataToken = await getToken()
    setToken(dataToken)
    // console.log(jwtDecode(dataToken.accessToken))
  }


  return (
    <div className="w-full">
      <div className="flex flex-nowrap mt-4">
        <div className="font-bold text-4xl">
          Dashboard
        </div>
        <div className="absolute right-5">
          <Button className='bg-blue-500 shadow-md'>INI DATE RANGE</Button>
        </div>
      </div>

      <div className='flex flex-row mt-4 gap-8'>
        <div className='basis-1/4 bg-white border-2 border-black-500 h-[110px] '>
          <div className='text-xl font-semibold py-3 px-5'>
            Users Total
          </div>
          <div className='flex flex-row text-center'>
            <div className='basis-1/2 text-4xl font-semibold py-0 px-5'>
              11.8M
            </div>
            <div className=' basis-1/2 pull-right mt-1 mx-5'>
              <Badge className='bg-gray-300 text-[#000000] text-md absolute right'>+2,5%</Badge>
            </div>
          </div>
        </div>
        <div className='basis-1/4 bg-white border-2 border-black-500 h-[110px] '>
          <div className='text-xl font-semibold py-3 px-5'>
            New Users
          </div>
          <div className='flex flex-row text-center'>
            <div className='basis-1/2 text-4xl font-semibold py-0 px-5'>
              8.236k
            </div>
            <div className=' basis-1/2 pull-right mt-1 mx-5'>
              <Badge className='bg-gray-400 text-white text-md absolute right'>-1,2%</Badge>
            </div>
          </div>
        </div>
        <div className='basis-1/4 bg-white border-2 border-black-500 h-[110px] '>
          <div className='text-xl font-semibold py-3 px-5'>
            Active Users
          </div>
          <div className='flex flex-row text-center'>
            <div className='basis-1/2 text-4xl font-semibold py-0 px-5'>
              2.352M
            </div>
            <div className=' basis-1/2 pull-right mt-1 mx-5'>
              <Badge className='bg-gray-300 text-[#000000] text-md absolute right'>+11%</Badge>
            </div>
          </div>
        </div>
        <div className='basis-1/4 bg-white border-2 border-black-500 h-[110px] '>
          <div className='text-xl font-semibold py-3 px-5'>
            New Users
          </div>
          <div className='flex flex-row text-center'>
            <div className='basis-1/2 text-4xl font-semibold py-0 px-5'>
              2.352M
            </div>
            <div className=' basis-1/2 pull-right mt-1 mx-5'>
              <Badge className='bg-gray-300 text-[#000000] text-md absolute right'>+11%</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-row mt-8 gap-8'>
        <div className='basis-1/2 bg-white border-2 border-black-500 h-[400px] '>
          <div className='text-xl font-bold py-3 px-5'>
            Top Orders Client
          </div>
          <div className='flex flex-row text-center'>
            <div className='basis-1/2 font-semibold text-left px-5'>
              Dadang
            </div>
            <div className=' basis-1/2 text-right mx-5'>
              4.5M
            </div>
          </div>
          <div className='flex flex-row text-center mt-4'>
            <div className='basis-1/2 font-semibold text-left px-5'>
              Suwarno
            </div>
            <div className=' basis-1/2 text-right mx-5'>
              4.5M
            </div>
          </div>
          <div className='flex flex-row text-center mt-4'>
            <div className='basis-1/2 font-semibold text-left px-5'>
              Agus Maulana
            </div>
            <div className=' basis-1/2 text-right mx-5'>
              4.5M
            </div>
          </div>
          <div className='flex flex-row text-center mt-4'>
            <div className='basis-1/2 font-semibold text-left px-5'>
              Fikri Moch
            </div>
            <div className=' basis-1/2 text-right mx-5'>
              4.5M
            </div>
          </div>
        </div>

        <div className='basis-1/2 bg-white border-2 border-black-500 h-[400px] '>
          <div className='text-xl font-bold py-3 px-5'>
            Progress Batch
          </div>
        </div>
      </div>
    </div>
  )
}
