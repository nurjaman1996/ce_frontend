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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"

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
              <TableHead className="border  text-white w-[12%] text-center">Image</TableHead>
              <TableHead className="border  text-white w-[30%] text-left">Name</TableHead>
              <TableHead className="border  text-white w-[2.5%] text-center">Weight</TableHead>
              <TableHead className="border  text-white w-[2.5%] text-center">Stock</TableHead>
              <TableHead className="border  text-white w-[3%] text-center">Varian</TableHead>
              <TableHead className="border  text-white w-[6%] text-center">Kurs</TableHead>
              <TableHead className="border  text-white w-[5%] text-center">Overhead</TableHead>
              <TableHead className="border  text-white w-[6%] text-center">Margin</TableHead>
              <TableHead className="border  text-white w-[6%] text-center">Cost</TableHead>
              <TableHead className="border  text-white w-[15%] text-center">Selling Price</TableHead>
              <TableHead className="border  text-white w-[5%] text-center">ACT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='bg-white'>
            {datapurchaseorder.map((dataisi) => (
              <TableRow key={dataisi.name}>
                <TableCell className="border text-center w-[3.5%] font-bold">{dataisi.no}</TableCell>

                <TableCell className="border text-center w-[12%] font-bold">
                  <Image
                    className='aspect-square rounded-xl'
                    src={`/${dataisi.produk}`}
                    width={300}
                    height={300}
                    alt="Picture of the author"
                    style={{ height: 100, width: 100 }}
                  />
                </TableCell>

                <TableCell className="border text-left w-[30%]">
                  <span className='capitalize'>{dataisi.produk}</span><br></br>
                  <span>{dataisi.idproduk}</span>
                </TableCell>

                <TableCell className="border w-[5.5%] text-center">{dataisi.berat}Gr</TableCell>
                <TableCell className="border w-[5.5%] text-center">{dataisi.qty}</TableCell>
                <TableCell className="border w-[3%] text-center ">{dataisi.varian}</TableCell>
                <TableCell className="border w-[5%] text-center bg-orange-100">Rp{dataisi.kurs}</TableCell>
                <TableCell className="border w-[5%] text-center  bg-orange-100">Rp{dataisi.overhead}</TableCell>
                <TableCell className="border w-[6%] text-center font-bold text-red-600  bg-orange-100">{dataisi.margin}%</TableCell>
                <TableCell className="border w-[10%] text-center  bg-orange-100">Rp{dataisi.modal}</TableCell>
                <TableCell className="border w-[15%] text-center ">Rp{dataisi.hargajual}</TableCell>
                <TableCell className="border w-[5%]">

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="link" className=' text-white font-bold hover:bg-gray-200'> <Icon.FileEdit color="#00b3ff" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='w-[600px]'>
                      <AlertDialogHeader className='border-b pb-4'>
                        <AlertDialogTitle >Edit Product</AlertDialogTitle>
                      </AlertDialogHeader>
                      <div className='flex flex-row text-center mt-2 items-center'>
                        <div className='basis-1/4 font-bold text-left'>
                          Image :
                        </div>
                        <div className='basis-3/4'>
                          <Input type="text" />
                        </div>
                      </div>
                      <div className='flex flex-row text-center mt-2 items-center'>
                        <div className='basis-1/4 font-bold text-left'>
                          Product :
                        </div>
                        <div className='basis-3/4'>
                          <Input type="text" placeholder="Product.." />
                        </div>
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel className='bg-red-400'>Cancel</AlertDialogCancel>
                        <Button >Save</Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="link" className=' text-white font-bold hover:bg-gray-200'> <Icon.XCircle color="#ff0000" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='w-[600px]'>
                      <AlertDialogHeader className='border-b pb-4'>
                        <AlertDialogTitle >Delete Product</AlertDialogTitle>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel >Cancel</AlertDialogCancel>
                        <Button className='bg-red-400 font-bold'>Delete</Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div >
    </main >
  )
}
