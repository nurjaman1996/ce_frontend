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
    idsupplier: "SUP001",
    name: "Supplier-1",
    address: "Ki. Nanas No. 46, Padangpanjang 96925, Papua",
  },
]

export default function PurchaseOrder() {
  return (
    <main className="">
      <div className="flex flex-nowrap mt-4">
        <div className="font-bold text-4xl">
          Purchase Order
        </div>
      </div>

      <div className='flex flex-row mt-4 gap-8'>
        <div className='basis-1/2 bg-white border-2 border-black-500 h-[125px]'>
          <div className='text-xl font-semibold py-4 px-5'>
            Total Purchase Orders
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-1/2 text-4xl font-semibold'>
              12
            </div>
            <div className=' basis-1/2 flex justify-end'>
              <Icon.ShoppingCart size={45} color="#ACB0B4" />
            </div>
          </div>
        </div>
        <div className='basis-1/2 bg-white border-2 border-black-500 h-[125px]'>
          <div className='text-xl font-semibold py-4 px-5'>
            Capital Amount
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-1/2 text-4xl font-semibold'>
              Rp 268.400.000
            </div>
            <div className=' basis-1/2 flex justify-end'>
              <Icon.ShoppingCart size={45} color="#ACB0B4" />
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
          <Button className='bg-blue-500 shadow-md'>INI DATE RANGE</Button>
        </div>
      </div>

      <div className="mt-5 shadow-md">
        <Table className='border border-black-500 bg-white'>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No</TableHead>
              <TableHead className="w-[450px]">Name</TableHead>
              <TableHead className="w-[70px] text-left">ACT</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-left">Address</TableHead>
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
              <TableCell className="text-right">USER : ADMIN</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table className='bg-white text-xs'>
          <TableBody className='h-[20px]'>
            {datapurchaseorder.map((dataisi) => (
              <TableRow key={dataisi.name}>
                <TableCell className="text-center border w-[50px]">1</TableCell>
                <TableCell className="border text-left w-[450px]">{dataisi.idsupplier}</TableCell>
                <TableCell className="border text-center w-[70px]"><Icon.FileEdit color="#00b3ff" /></TableCell>
                <TableCell className="text-left border">{dataisi.address}</TableCell>
                <TableCell className="text-center border"><Icon.FileEdit color="#00b3ff" /></TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </div >
    </main >
  )
}
