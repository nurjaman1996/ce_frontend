"use client"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import * as Icon from "lucide-react"
import { Input } from "@/components/ui/input"
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

import { Check, ChevronsUpDown } from "lucide-react"

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


let Rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

let Numbering = new Intl.NumberFormat("id-ID");

const salesreport = [
  {
    id: "id",
    tanggal: "2023-12-6",
    id_invoice: "232132151",
    id_batch: "BATCH-0001",
    id_po: "id_po",
    id_produk: "OHAYO2131",
    id_cust: "CUS-0001",
    produk: "Celana Jogger",
    variasi: "HITAM",
    ukuran: "L",
    qty: "3",
    berat: "250",
    total_modal: "195131",
    harga_jual: "312515",
    sub_total: "937545",
    status_pesanan: "PAID",
    resi: "CHINA TO INDONESIA",
    jasa_kirim: "CARGO",
  },
  {
    id: "id",
    tanggal: "2023-12-6",
    id_invoice: "232132151",
    id_batch: "BATCH-0001",
    id_po: "id_po",
    id_produk: "OHAYO2131",
    id_cust: "CUS-0001",
    produk: "Jacket Winter",
    variasi: "HITAM",
    ukuran: "L",
    qty: "3",
    berat: "250",
    total_modal: "195131",
    harga_jual: "312515",
    sub_total: "937545",
    status_pesanan: "PAID",
    resi: "CHINA TO INDONESIA",
    jasa_kirim: "CARGO",
  },
  {
    id: "id",
    tanggal: "2023-12-6",
    id_invoice: "232132151",
    id_batch: "BATCH-0001",
    id_po: "id_po",
    id_produk: "OHAYO2131",
    id_cust: "CUS-0001",
    produk: "Shoes Docmart",
    variasi: "HITAM",
    ukuran: "L",
    qty: "3",
    berat: "250",
    total_modal: "195131",
    harga_jual: "312515",
    sub_total: "937545",
    status_pesanan: "PAID",
    resi: "CHINA TO INDONESIA",
    jasa_kirim: "CARGO",
  }
]

export default function PurchaseOrder() {

  return (
    <main className="">
      <div className="flex flex-nowrap mt-4">
        <div className="font-bold text-4xl text-red-500">
          Sales Report
        </div>
      </div>

      <div className="flex flex-nowrap mt-4">
        {/*  */}
        <div className="font-bold text-4xl">
          <Input type="text" className='w-[400px] shadow-md' placeholder="Search Sales.." />
        </div>
        <div className="ml-auto">
          <Button className='bg-blue-400'>INI DATE RANGE</Button>
        </div>
      </div>

      <div className="mt-5 shadow-md">
        <Table className='border bg-white text-xs'>
          <TableHeader>
            <TableRow className='bg-red-400 font-bold'>
              <TableHead className="border w-[3%] text-center text-white">No</TableHead>
              <TableHead className="border w-[21.5%] text-left text-white">NAME</TableHead>
              <TableHead className="border w-[6%] text-center text-white">VARIATION</TableHead>
              <TableHead className="border w-[5%] text-center text-white">SIZE</TableHead>
              <TableHead className="border w-[6%] text-center text-white">WEIGHT</TableHead>
              <TableHead className="border w-[6%] text-center text-white">QTY</TableHead>
              <TableHead className="border w-[5%] text-center text-white">PRICE</TableHead>
              <TableHead className="border w-[10%] text-center text-white">SUB TOTAL</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <Table className='text-xs'>
          <TableHeader>
            <TableRow>
              <TableCell colSpan={3} className='text-lg font-bold p-0 '>
                <span className='ml-4'>1) #2023-11-29 - 232132151</span>
                <span>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="link" className=' text-white font-bold hover:bg-gray-200'> <Icon.Printer size={18} color="#00b3ff" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='w-[600px]'>
                      <AlertDialogHeader className='border-b pb-4'>
                        <AlertDialogTitle >Edit Purchase Order</AlertDialogTitle>
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
                      <Button variant="link" className=' text-white font-bold hover:bg-gray-200'> <Icon.XCircle size={18} color="#ff0000" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='w-[600px]'>
                      <AlertDialogHeader className='border-b pb-4'>
                        <AlertDialogTitle >Delete Sales</AlertDialogTitle>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel >Cancel</AlertDialogCancel>
                        <Button className='bg-red-400 font-bold'>Delete</Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </span><br></br>
                <span className='text-sm ml-8'>DADANG NURJAMAN</span>
                {/* <span className='text-xs text-red-600 ml-4'>ADMIN : ADMIN</span><br></br> */}
              </TableCell>
              <TableCell className="text-right text-md font-bold">

                <Button className='bg-blue-500 mx-2 font-bold my-2 text-xs rounded-2xl'>RETURN SIZE</Button>
                <Button className='bg-red-600 font-bold text-xs rounded-2xl'>REFUND</Button>
              </TableCell>
            </TableRow>
          </TableHeader>
        </Table>

        <Table className='bg-white text-xs '>
          <TableBody>
            {salesreport.map((dataisi: any, index: number) => (
              <TableRow key={dataisi.id}>

                <TableCell className="border w-[3%] text-center font-bold">{Numbering.format(index + 1)}</TableCell>
                <TableCell className="border w-[21.5%] text-left">
                  <span className='text-lg'>{dataisi.produk}</span><br></br>
                  <span className='text-xs text-red-700'>{dataisi.id_produk}</span>&nbsp;/&nbsp;
                  {dataisi.id_batch}
                </TableCell>
                <TableCell className="border w-[6%] text-center">{dataisi.variasi}</TableCell>
                <TableCell className="border w-[5%] text-center">{dataisi.ukuran}</TableCell>
                <TableCell className="border w-[6%] text-center">{dataisi.berat}</TableCell>
                <TableCell className="border w-[6%] text-center">{dataisi.qty}</TableCell>
                <TableCell className="border w-[5%] text-center">{Rupiah.format(dataisi.harga_jual)}</TableCell>
                <TableCell className="border w-[10%] text-center">{Rupiah.format(dataisi.sub_total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className='text-right font-bold'>TOTAL :</TableCell>
              <TableCell className="text-center bg-white border font-bold">250</TableCell>
              <TableCell className="text-center bg-white border font-bold">3</TableCell>
              <TableCell className="text-center bg-white border font-bold">Rp312.515</TableCell>
              <TableCell className="text-center bg-white border font-bold">Rp937.545</TableCell>
            </TableRow>
          </TableFooter>

        </Table>
        <Table>
          <TableFooter>
            <TableRow>
              <TableCell className="text-left font-bold">
                <div className='-mt-7'>ADMIN : RICO</div>
              </TableCell>
              <TableCell className="text-right font-bold">
              </TableCell>
              <TableCell className="text-right font-bold">
              </TableCell>
              <TableCell className="text-right font-bold">
              </TableCell>
              <TableCell colSpan={4} className="text-right font-bold">
                <div className='flex flex-row'>
                  <div className='basis-1/2'>
                    <span className='text-red-600'>ORDER STATUS :</span><br></br>
                    <span>NO RECEIPT :</span><br></br>
                    <span>DELIVERY SERVICE :</span>
                  </div>
                  <div className='basis-1/2'>
                    <span className='text-red-600'>UNPAID</span><br></br>
                    <span>SPX54532523432</span><br></br>
                    <span>JNE REG</span>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div >
    </main >
  )
}
