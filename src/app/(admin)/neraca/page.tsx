"use client";
import Image from 'next/image'
import * as React from "react"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import * as Icon from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const combobox = [
  {
    value: "Gudang A",
    label: "Gudang A",
  },
  {
    value: "Gudang B",
    label: "Gudang B",
  },
]

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
const datapurchaseorder = [
  {
    no: "1",
    idproduk: "PO001",
    produk: "image.jpeg",
    name: "Supplier-1",
    berat: "400",
    qty: "50",
    varian: "5",
    kurs: "2.170",
    overhead: "89.600",
    margin: "50",
    hargajual: "421.000 ",
    modal: "190.960",
    total_modal: "280.560",
    profit: "140.440",
  },
  {
    no: "2",
    idproduk: "PO002",
    produk: "image.jpeg",
    name: "Supplier-1",
    berat: "400",
    qty: "50",
    varian: "5",
    kurs: "2.170",
    overhead: "89.600",
    margin: "50",
    hargajual: "421.000 ",
    modal: "190.960",
    total_modal: "280.560",
    profit: "140.440",
  },
]

export default function Neraca() {


  return (
    <main className="">
      <div className="flex flex-nowrap mt-4">
        <div className="font-bold text-4xl text-gray-500">
          Neraca
        </div>
        <div className="absolute right-5">
          <Button className='bg-amber-200 shadow-md text-black font-bold'>INI DATE RANGE&nbsp;<Icon.RefreshCcw color="#000000" /></Button>
        </div>
      </div>

      <div className='flex flex-row mt-4 gap-4 '>
        <div className='basis-1/4 bg-white-50 border-2 border-black-500 h-[125px]  bg-gray-400 text-white'>
          <div className='text-xl font-semibold py-5 px-5'>
            Sales
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-1/2 text-2xl font-semibold'>
              12
            </div>
            <div className=' basis-1/2 flex justify-end'>
              <Icon.ShoppingCart size={45} color="#ffffff" />
            </div>
          </div>
        </div>

        <div className='basis-1/4 bg-white-50 border-2 border-black-500 h-[125px] bg-gray-400 text-white'>
          <div className='text-xl font-semibold py-5 px-5'>
            Gross Sales
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-4/6 text-2xl font-semibold'>
              2.320.321.564
            </div>
            <div className=' basis-1/3 flex justify-end'>
              <Icon.TrendingUp size={45} color="#ffffff" />
            </div>
          </div>
        </div>

        <div className='basis-1/4 bg-white-50 border-2 border-black-500 h-[125px] bg-gray-400 text-white'>
          <div className='text-xl font-semibold py-5 px-5'>
            Costs
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-4/6 text-2xl font-semibold'>
              1.320.321.564
            </div>
            <div className=' basis-1/3 flex justify-end'>
              <Icon.DollarSign size={45} color="#ffffff" />
            </div>
          </div>
        </div>

        <div className='basis-1/4 bg-white-50 border-2 border-black-500 h-[125px] bg-gray-400 text-white'>
          <div className='text-xl font-semibold py-5 px-5'>
            Margin
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-4/6 text-2xl font-semibold'>
              1.320.321.564
            </div>
            <div className=' basis-1/3 flex justify-end'>
              <Icon.FishSymbol size={45} color="#ffffff" />
            </div>
          </div>
        </div>

      </div>

      <div className='flex flex-row mt-4 gap-4 '>
        <div className='basis-1/3 bg-white-50 border-2 border-black-500 h-[125px]  bg-red-400 text-white'>
          <div className='text-xl font-semibold py-5 px-5'>
            Pending Revenue
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-1/2 text-2xl font-semibold'>
              435.535.123
            </div>
            <div className=' basis-1/2 flex justify-end'>
              <Icon.CircleDashedIcon size={45} color="#ffffff" />
            </div>
          </div>
        </div>
        <div className='basis-1/3 bg-white-50 border-2 border-black-500 h-[125px]  bg-blue-400 text-white'>
          <div className='text-xl font-semibold py-5 px-5'>
            Paid Revenue
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-1/2 text-2xl font-semibold'>
              135.535.123
            </div>
            <div className=' basis-1/2 flex justify-end'>
              <Icon.CheckSquare size={45} color="#ffffff" />
            </div>
          </div>
        </div>
        <div className='basis-1/3 bg-white-50 border-2 border-black-500 h-[125px]  bg-green-400 text-white'>
          <div className='text-xl font-semibold py-5 px-5'>
            Profit
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-1/2 text-2xl font-semibold'>
              135.535.123
            </div>
            <div className=' basis-1/2 flex justify-end'>
              <Icon.DollarSignIcon size={45} color="#ffffff" />
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-row mt-4 gap-4 '>
        <div className='basis-1/2 bg-white-50 border-2 border-black-500 h-[300px] bg-gray-200 text-black'>
          <div className='text-xl font-semibold py-5 px-5'>
            Revenue VS Costs
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-4/6 text-2xl font-semibold'>
              Chart
            </div>
            <div className=' basis-1/3 flex justify-end'>
              <Icon.DollarSign size={45} color="#000000" />
            </div>
          </div>
        </div>
        <div className='basis-1/2 bg-white-50 border-2 border-black-500 h-[300px] bg-gray-200 text-black'>
          <div className='text-xl font-semibold py-5 px-5'>
            Pending & Paid
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-4/6 text-2xl font-semibold'>
              Chart
            </div>
            <div className=' basis-1/3 flex justify-end'>
              <Icon.DollarSign size={45} color="#000000" />
            </div>
          </div>
        </div>

        <div className='basis-1/2 bg-white-50 border-2 border-black-500 h-[300px] bg-gray-200 text-black'>
          <div className='text-xl font-semibold py-5 px-5'>
            Batch
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-4/6 text-2xl font-semibold'>
              1.320.321.564
            </div>
            <div className=' basis-1/3 flex justify-end'>
              <Icon.DollarSign size={45} color="#000000" />
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-row mt-4 gap-4 '>
        <div className='basis-1/2 bg-white-50 border-2 border-black-500 h-[300px] bg-gray-200 text-black'>
          <div className='text-xl font-semibold py-5 px-5'>
            Products Top Sales
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-4/6 text-xl font-semibold'>
              Celana Jogger
            </div>
            <div className=' basis-1/3 flex justify-end text-xl'>
              654.241.121
            </div>
          </div>
        </div>

        <div className='basis-1/2 bg-white-50 border-2 border-black-500 h-[300px] bg-gray-200 text-black'>
          <div className='text-xl font-semibold py-5 px-5'>
            Customer Top Sales
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-4/6 text-xl font-semibold'>
              Tatang Sutarman
            </div>
            <div className=' basis-1/3 flex  justify-end text-xl'>
              21.656.121
            </div>
          </div>
        </div>
      </div>
    </main >
  )
}
