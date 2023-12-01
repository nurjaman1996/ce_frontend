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

export default function PurchaseOrder() {
  return (
    <main className="">
      <div className="flex flex-nowrap mt-4">
        <div className="font-bold text-4xl text-red-500">
          Purchase Order
        </div>
      </div>

      <div className='flex flex-row mt-4 gap-8  text-white'>
        <div className='basis-1/2 border-2 border-black-500 h-[125px] bg-red-400'>
          <div className='text-xl font-semibold py-4 px-5'>
            Total Purchase Orders
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
        <div className='basis-1/2 border-2 border-black-500 h-[125px] bg-red-400'>
          <div className='text-xl font-semibold py-4 px-5'>
            Capital Amount
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-1/2 text-4xl font-semibold'>
              Rp 268.400.000
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
          <Input type="text" className='w-[400px] shadow-md' placeholder="Search Purchase Order.." />
        </div>
        <div className="absolute right-5">
          <Button className='bg-blue-400 font-bold shadow-md'>INI DATE RANGE</Button>
        </div>
      </div>

      <div className="mt-5 shadow-md">
        <Table className='border bg-white text-xs'>
          <TableHeader>
            <TableRow className='bg-red-400 font-bold'>
              <TableHead className="border w-[3%] text-center text-white">No</TableHead>
              <TableHead className="border w-[31.5%] text-left text-white">Name</TableHead>
              <TableHead className="border w-[5%] text-center text-white">Act</TableHead>
              <TableHead className="border w-[2.5%] text-center text-white">Weight</TableHead>
              <TableHead className="border w-[6%] text-center text-white">Kurs</TableHead>
              <TableHead className="border w-[5%] text-center text-white">Overhead</TableHead>
              <TableHead className="border w-[6%] text-center text-white">Margin</TableHead>
              <TableHead className="border w-[5%] text-center text-white">Qty</TableHead>
              <TableHead className="border w-[10%] text-center text-white">Selling Price</TableHead>
              <TableHead className="border w-[10%] text-center text-white">Cost</TableHead>
              <TableHead className="border w-[8%] text-center text-white">Total Cost</TableHead>
              <TableHead className="border w-[10%] text-center text-white">Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          </TableBody>
        </Table>

        <Table className='bg-white '>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">1) #2023-11-29 - 23110010</TableCell>
              <TableCell></TableCell>
              <TableCell ></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right font-medium">USER : ADMIN</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table className='bg-white text-xs '>
          <TableBody>
            {datapurchaseorder.map((dataisi) => (
              <TableRow key={dataisi.name}>
                <TableCell className="border text-center w-[3.5%] font-bold">{dataisi.no}</TableCell>
                <TableCell className="border text-left w-[40%]"><span className='capitalize'>{dataisi.produk}</span><br></br><span>{dataisi.idproduk}</span></TableCell>
                <TableCell className="border w-[5%]"><Icon.FileEdit color="#00b3ff" /><Icon.X color="#ff0000" /></TableCell>
                <TableCell className="border w-[5.5%] text-center">{dataisi.berat}Gr</TableCell>
                <TableCell className="border w-[3%] text-center ">Rp{dataisi.kurs}</TableCell>
                <TableCell className="border w-[5%] text-center ">Rp{dataisi.overhead}</TableCell>
                <TableCell className="border w-[6%] text-center font-bold text-red-600">{dataisi.margin}%</TableCell>
                <TableCell className="border w-[4%] text-center">{dataisi.qty}</TableCell>
                <TableCell className="border w-[10.5%] text-center ">Rp{dataisi.hargajual}</TableCell>
                <TableCell className="border w-[10%] text-center ">Rp{dataisi.modal}</TableCell>
                <TableCell className="border w-[10%] text-center ">Rp{dataisi.total_modal}</TableCell>
                <TableCell className="border w-[10%] text-center ">Rp{dataisi.profit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className='text-[14px]'>
              <TableCell colSpan={7} className='text-right bg-white'>Total :</TableCell>
              <TableCell className="text-center w-[5%] border bg-red-400 text-white font-bold">100</TableCell>
              <TableCell className="text-center w-[10] border bg-red-400 text-white font-bold">Rp842.000</TableCell>
              <TableCell className="text-center w-[10] border bg-red-400 text-white font-bold">Rp381.920</TableCell>
              <TableCell className="text-center w-[10] border bg-red-400 text-white font-bold">Rp561.120</TableCell>
              <TableCell className="text-center w-[10] border bg-red-400 text-white font-bold">Rp280.880</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div >
    </main >
  )
}
