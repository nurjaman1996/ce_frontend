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
        <div className="font-bold text-4xl text-red-500">
          Dashboard
        </div>
        <div className="absolute right-5">
          <Button className='bg-blue-400 font-bold shadow-md'>INI DATE RANGE</Button>
        </div>
      </div>

      <div className='flex flex-row mt-4 gap-4 text-white'>
        <div className='basis-2/6 bg-red-400 border-2 border-black-500 h-[110px] rounded-lg shadow-md'>
          <div className='text-xl font-semibold py-4 px-5'>
            Ringkasan Penjualan
          </div>
          <div className='flex flex-row text-left'>
            <div className='basis-1/2 text-xl font-semibold py-0 px-5'>
              11.8M
            </div>
            <div className=' basis-1/2 pull-right mt-1 mx-5 text-right'>
              <Badge className='bg-yellow-100 text-[#000000] text-sm'>+2,5%</Badge>
            </div>
          </div>
        </div>
        <div className='basis-1/6 bg-red-400 border-2 border-black-500 h-[110px] rounded-lg shadow-md'>
          <div className='text-xl font-semibold py-4 px-5'>
            Total Product
          </div>
          <div className='flex flex-row text-center'>
            <div className='basis-1/2 text-xl font-semibold py-0 px-5'>
              8.236k
            </div>
            <div className=' basis-1/2 pull-right mt-1 mx-5'>
              <Badge className='bg-red-800 text-white text-sm'>-1,2%</Badge>
            </div>
          </div>
        </div>
        <div className='basis-1/6 bg-red-400 border-2 border-black-500 h-[110px] rounded-lg shadow-md'>
          <div className='text-xl font-semibold py-4 px-5'>
            Permintaan Stok
          </div>
          <div className='flex flex-row text-center'>
            <div className='basis-1/2 text-xl font-semibold py-0 px-5'>
              2.352M
            </div>
            <div className=' basis-1/2 pull-right mt-1 mx-5'>
              <Badge className='bg-yellow-100 text-[#000000] text-sm'>+11%</Badge>
            </div>
          </div>
        </div>
        <div className='basis-1/6 bg-red-400 border-2 border-black-500 h-[110px] rounded-lg shadow-md'>
          <div className='text-xl font-semibold py-4 px-5'>
            Stok Tersedia
          </div>
          <div className='flex flex-row text-center'>
            <div className='basis-1/2 text-xl font-semibold py-0 px-5'>
              2.352M
            </div>
            <div className=' basis-1/2 pull-right mt-1 mx-5'>
              <Badge className='bg-yellow-100 text-[#000000] text-sm'>+11%</Badge>
            </div>
          </div>
        </div>
        <div className='basis-1/6 bg-red-400 border-2 border-black-500 h-[110px] rounded-lg shadow-md'>
          <div className='text-xl font-semibold py-4 px-5'>
            Belum Terpenuhi
          </div>
          <div className='flex flex-row text-center'>
            <div className='basis-1/2 text-xl font-semibold py-0 px-5'>
              2.352M
            </div>
            <div className=' basis-1/2 pull-right mt-1 mx-5'>
              <Badge className='bg-yellow-100 text-[#000000] text-sm'>+11%</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-row mt-4  gap-4 text-white'>
        <div className='basis-3/4 bg-blue-400 border-2 border-black-500 h-[448px] rounded-lg shadow-md'>
          <div className='text-xl font-bold py-3 px-5 '>
            Chart Sales
          </div>

        </div>
        <div className='basis-1/4'>
          <div className='text-xl font-bold py-3 px-5  bg-blue-400 border-2 border-black-500 h-[100px] rounded-lg shadow-md'>
            Total Pesanan
          </div>

          <div className='text-xl font-bold py-3 px-5 mt-4 bg-blue-400 border-2 border-black-500 h-[100px] rounded-lg shadow-md'>
            Qty
          </div>

          <div className='text-xl font-bold py-3 px-5 mt-4 bg-blue-400 border-2 border-black-500 h-[100px] rounded-lg shadow-md'>
            Estimated Weight
          </div>

          <div className='text-xl font-bold py-3 px-5 mt-4 bg-blue-400 border-2 border-black-500 h-[100px] rounded-lg shadow-md'>
            Estimated Overhead
          </div>

        </div>
      </div>
    </div>
  )
}
