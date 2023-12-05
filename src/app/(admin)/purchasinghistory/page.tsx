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

const datapurchasinghistory = [
  {
    id: 1,
    id_purchasing: "PURCH00010001-0001",
    tanggal_purchasing: "2023-12-05",
    id_batch: "BATCH-0001",
    id_po: "PO-0001",
    id_produk: "IVA00010001-0003",
    id_sup: "SUP-0001",
    warna: "BLUE",
    ukuran: "32",
    qty: 15,
  }
]

export default function PurchasingHistory() {
  return (
    <main className="">
      <div className="flex flex-nowrap mt-4">
        <div className="font-bold text-4xl text-red-500">
          Purchasing History
        </div>
      </div>

      <div className='flex flex-row mt-4 gap-8  text-white'>
        <div className='basis-1/2 border-2 border-black-500 h-[125px] bg-red-400'>
          <div className='text-xl font-semibold py-5 px-5'>
            Total Transaction History
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-1/2 text-xl font-semibold'>
              12
            </div>
            <div className=' basis-1/2 flex justify-end'>
              <Icon.ShoppingCart size={45} color="#ffffff" />
            </div>
          </div>
        </div>
        <div className='basis-1/2 border-2 border-black-500 h-[125px] bg-red-400'>
          <div className='text-xl font-semibold py-5 px-5'>
            Article
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-1/2 text-xl font-semibold'>
              51
            </div>
            <div className=' basis-1/2 flex justify-end'>
              <Icon.DollarSign size={45} color="#ffffff" />
            </div>
          </div>
        </div>
        <div className='basis-1/2 border-2 border-black-500 h-[125px] bg-red-400'>
          <div className='text-xl font-semibold py-5 px-5'>
            Total Qty
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-1/2 text-xl font-semibold'>
              321
            </div>
            <div className=' basis-1/2 flex justify-end'>
              <Icon.DollarSign size={45} color="#ffffff" />
            </div>
          </div>
        </div>
        <div className='basis-1/2 border-2 border-black-500 h-[125px] bg-red-400'>
          <div className='text-xl font-semibold py-5 px-5'>
            Capital Amount
          </div>
          <div className='flex flex-row text-left px-5'>
            <div className='basis-1/2 text-xl font-semibold'>
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
          <Input type="text" className='w-[400px] shadow-md' placeholder="Search Purchasing History.." />
        </div>
        <div className="absolute right-5">
          <Button className='bg-blue-400 font-bold shadow-md'>INI DATE RANGE</Button>
        </div>
      </div>

      <div className="mt-5 shadow-md">
        <Table className='border text-xs'>
          <TableHeader>
            <TableRow className='bg-red-400 font-bold'>
              <TableHead className="border  text-white w-[3%] text-center">No</TableHead>
              <TableHead className="border  text-white w-[10%] text-center">Date Purchasing</TableHead>
              <TableHead className="border  text-white w-[10%] text-center">Batch</TableHead>
              <TableHead className="border  text-white w-[10%] text-center">ID PO</TableHead>
              <TableHead className="border  text-white w-[10% text-center">ID Product</TableHead>
              <TableHead className="border  text-white w-[10%] text-center">ID Supplier</TableHead>
              <TableHead className="border  text-white w-[10%] text-center">Warna</TableHead>
              <TableHead className="border  text-white w-[10%] text-center">Ukuran</TableHead>
              <TableHead className="border  text-white w-[10%] text-center">Qty</TableHead>
              <TableHead className="border  text-white w-[5%] text-center">ACT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='bg-white'>
            {datapurchasinghistory.map((dataisi) => (
              <TableRow key={dataisi.id}>
                <TableCell className="border text-center w-[3%] font-bold">{dataisi.id}</TableCell>
                <TableCell className="border text-center w-[10%]">{dataisi.tanggal_purchasing}</TableCell>
                <TableCell className="border w-[10%] text-center">{dataisi.id_batch}</TableCell>
                <TableCell className="border w-[10%] text-center">{dataisi.id_po}</TableCell>
                <TableCell className="border w-[10%] text-center ">{dataisi.id_produk}</TableCell>
                <TableCell className="border w-[10%] text-center">{dataisi.id_sup}</TableCell>
                <TableCell className="border w-[10%] text-center">{dataisi.warna}</TableCell>
                <TableCell className="border w-[10%] text-center">{dataisi.ukuran}</TableCell>
                <TableCell className="border w-[10%] text-center">{dataisi.qty}</TableCell>
                <TableCell className="border w-[5%]">

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="link" className=' text-white font-bold hover:bg-gray-200'> <Icon.FileEdit color="#00b3ff" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='w-[600px]'>
                      <AlertDialogHeader className='border-b pb-4'>
                        <AlertDialogTitle >Edit History</AlertDialogTitle>
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
                        <AlertDialogTitle >Delete History</AlertDialogTitle>
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
