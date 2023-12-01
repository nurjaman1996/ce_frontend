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
    produk: "celana jeans",
    name: "Supplier-1",
    berat: "400",
    qty: "50",
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
    produk: "Sweater Ohayo",
    name: "Supplier-1",
    berat: "400",
    qty: "50",
    kurs: "2.170",
    overhead: "89.600",
    margin: "50",
    hargajual: "421.000 ",
    modal: "190.960",
    total_modal: "280.560",
    profit: "140.440",
  },
]

export default function Products() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <main className="">
      <div className="flex flex-nowrap mt-4">
        <div className="font-bold text-4xl text-red-500">
          Products
        </div>
        <div className="absolute right-5">
          <Button className='bg-amber-200 shadow-md text-black font-bold'>STOCK OPNAME&nbsp;<Icon.RefreshCcw color="#000000" /></Button>
        </div>
      </div>

      <div className='flex flex-row mt-4 gap-8 '>
        <div className='basis-1/2 bg-white-50 border-2 border-black-500 h-[125px]  bg-red-400 text-white'>
          <div className='text-xl font-semibold py-4 px-5'>
            Items
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-1/2 text-4xl font-semibold'>
              12
            </div>
            <div className=' basis-1/2 flex justify-end'>
              <Icon.ShoppingCart size={45} color="#ffffff" />
            </div>
          </div>
        </div>
        <div className='basis-1/2 bg-white-50 border-2 border-black-500 h-[125px] bg-red-400 text-white'>
          <div className='text-xl font-semibold py-4 px-5'>
            Qty
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-1/2 text-4xl font-semibold'>
              102 PCS
            </div>
            <div className=' basis-1/2 flex justify-end'>
              <Icon.DollarSign size={45} color="#ffffff" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-nowrap mt-4">
        {/*  */}
        <div className="font-bold text-4xl">
          <Input type="text" className='w-[400px] shadow-md text-black' placeholder="Search Products.." />
        </div>
        <div className="absolute right-5">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[300px] justify-between bg-blue-400 font-bold text-white"
              >
                {value
                  ? combobox.find((framework) => framework.value === value)?.label
                  : "Select Warehouse..."}
                <Icon.Accessibility className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search framework..." className="h-9" />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {combobox.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      {framework.label}
                      <Icon.Accessibility
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === framework.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mt-5 shadow-md">
        <Table className='border text-xs'>
          <TableHeader>
            <TableRow className='bg-red-400 font-bold'>
              <TableHead className="border  text-white w-[3%] text-center">No</TableHead>
              <TableHead className="border  text-white w-[31.5%] text-left">Name</TableHead>
              <TableHead className="border  text-white w-[2.5%] text-center">Weight</TableHead>
              <TableHead className="border  text-white w-[6%] text-center">Kurs</TableHead>
              <TableHead className="border  text-white w-[5%] text-center">Overhead</TableHead>
              <TableHead className="border  text-white w-[6%] text-center">Margin</TableHead>
              <TableHead className="border  text-white w-[5%] text-center">Qty</TableHead>
              <TableHead className="border  text-white w-[10%] text-center">Selling Price</TableHead>
              <TableHead className="border  text-white w-[10%] text-center">Cost</TableHead>
              <TableHead className="border  text-white w-[8%] text-center">Total Cost</TableHead>
              <TableHead className="border  text-white w-[10%] text-center">Profit</TableHead>
              <TableHead className="border  text-white w-[5%] text-center">ACT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='bg-white'>
            {datapurchaseorder.map((dataisi) => (
              <TableRow key={dataisi.name}>
                <TableCell className="border text-center w-[3.5%] font-bold">{dataisi.no}</TableCell>
                <TableCell className="border text-left w-[40%]"><span className='capitalize'>{dataisi.produk}</span><br></br><span>{dataisi.idproduk}</span></TableCell>
                <TableCell className="border w-[5.5%] text-center">{dataisi.berat}Gr</TableCell>
                <TableCell className="border w-[3%] text-center ">Rp{dataisi.kurs}</TableCell>
                <TableCell className="border w-[5%] text-center ">Rp{dataisi.overhead}</TableCell>
                <TableCell className="border w-[6%] text-center font-bold text-red-600">{dataisi.margin}%</TableCell>
                <TableCell className="border w-[4%] text-center">{dataisi.qty}</TableCell>
                <TableCell className="border w-[10.5%] text-center ">Rp{dataisi.hargajual}</TableCell>
                <TableCell className="border w-[10%] text-center ">Rp{dataisi.modal}</TableCell>
                <TableCell className="border w-[10%] text-center ">Rp{dataisi.total_modal}</TableCell>
                <TableCell className="border w-[10%] text-center ">Rp{dataisi.profit}</TableCell>
                <TableCell className="border w-[5%]"><Icon.FileEdit color="#00b3ff" /><Icon.X color="#ff0000" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div >
    </main >
  )
}
