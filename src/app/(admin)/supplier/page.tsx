import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
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
import * as Icon from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const datasupplier = [
  {
    no: "1",
    idsupplier: "SUP001",
    name: "Supplier-1",
    address: "Ki. Nanas No. 46, Padangpanjang 96925, Papua",
  },
  {
    no: "2",
    idsupplier: "SUP002",
    name: "Supplier-2",
    address: "Kpg. R.M. Said No. 568, Prabumulih 71434, Papua",
  },
  {
    no: "3",
    idsupplier: "SUP003",
    name: "Supplier-3",
    address: "Ds. Reksoninten No. 663, Tanjungbalai 99494, NTT",
  },
  {
    no: "4",
    idsupplier: "SUP004",
    name: "Supplier-4",
    address: "Ds. Bacang No. 908, Banjar 24812, Aceh",
  },
  {
    no: "5",
    idsupplier: "SUP005",
    name: "Supplier-5",
    address: "Dk. Ekonomi No. 858, Binjai 97966, KalTim",
  },
  {
    no: "6",
    idsupplier: "SUP006",
    name: "Supplier-6",
    address: "Ds. Pahlawan No. 577, Bekasi 76407, Papua",
  },
  {
    no: "7",
    idsupplier: "SUP007",
    name: "Supplier-7",
    address: "Jr. Bagis Utama No. 465, Administrasi Jakarta Timur 90395, DIY",
  },
]

export default function Supplier() {
  return (
    <div>
      <div className="font-bold text-4xl">
        Supplier
      </div>
      <div className="flex flex-nowrap mt-4">
        {/*  */}
        <div className="font-bold text-4xl">
          <Input type="text" className='w-[400px] shadow-md' placeholder="Search Supplier.." />
        </div>
        <div className="absolute right-5">
          <Dialog>
            <DialogTrigger asChild>
              <Button className=' font-bold text-white'>Add New</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1000px]">
              <DialogHeader>
                <DialogTitle>Add New Supplier</DialogTitle>
                <DialogDescription>
                  Create new supplier here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" value="Supplier-1" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Address
                  </Label>
                  <Input id="username" value="Kpg. R.M. Said No. 568, Prabumulih 71434, Papua" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save data</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-5 shadow-md">
        <Table className='border border-black-500'>
          <TableHeader className='bg-gray-700'>
            <TableRow>
              <TableHead className="border text-center font-bold text-white w-[50px]">No</TableHead>
              <TableHead className="border text-center font-bold text-white w-[150px]">ID Supplier</TableHead>
              <TableHead className='border text-left font-bold text-white'>Name</TableHead>
              <TableHead className="border text-left font-bold text-white text-left">Address</TableHead>
              <TableHead className="border text-center w-[100px] font-bold text-white text-center">Act</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='bg-white'>
            {datasupplier.map((dataisi) => (
              <TableRow key={dataisi.name}>
                <TableCell className="border text-center font-medium w-[50px] font-bold">{dataisi.no}</TableCell>
                <TableCell className="border text-center font-medium w-[150px]">{dataisi.idsupplier}</TableCell>
                <TableCell className="border font-medium">{dataisi.name}</TableCell>
                <TableCell className="border text-left">{dataisi.address}</TableCell>
                <TableCell className="border text-center w-[100px]">
                  <div className='flex flex-row justify-center'>
                    <div className='basis-1-2'>
                      <Icon.FileEdit color="#00b3ff" />
                    </div>
                    <div className='basis-1-2 ml-2'>
                      <Icon.XCircle color="#ff0000" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div >
    </div >
  )
}
