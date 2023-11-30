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

const datasupplier = [
  {
    idsupplier: "SUP001",
    name: "Supplier-1",
    address: "Ki. Nanas No. 46, Padangpanjang 96925, Papua",
  },
  {
    idsupplier: "SUP002",
    name: "Supplier-2",
    address: "Kpg. R.M. Said No. 568, Prabumulih 71434, Papua",
  },
  {
    idsupplier: "SUP003",
    name: "Supplier-3",
    address: "Ds. Reksoninten No. 663, Tanjungbalai 99494, NTT",
  },
  {
    idsupplier: "SUP004",
    name: "Supplier-4",
    address: "Ds. Bacang No. 908, Banjar 24812, Aceh",
  },
  {
    idsupplier: "SUP005",
    name: "Supplier-5",
    address: "Dk. Ekonomi No. 858, Binjai 97966, KalTim",
  },
  {
    idsupplier: "SUP006",
    name: "Supplier-6",
    address: "Ds. Pahlawan No. 577, Bekasi 76407, Papua",
  },
  {
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
          <Button className='bg-blue-500 shadow-md'>Add New</Button>
        </div>
      </div>

      <div className="mt-5 shadow-md">
        <Table className='border border-black-500 bg-white'>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">ID Supplier</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-left">Address</TableHead>
              <TableHead className="w-[80px] text-left">ACT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datasupplier.map((dataisi) => (
              <TableRow key={dataisi.name}>
                <TableCell className="font-medium">{dataisi.idsupplier}</TableCell>
                <TableCell className="font-medium">{dataisi.name}</TableCell>
                <TableCell className="text-left">{dataisi.address}</TableCell>
                <TableCell className="text-center"><Icon.FileEdit color="#00b3ff" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
