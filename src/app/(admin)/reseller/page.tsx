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

const datareseller = [
  {
    idsupplier: "SUP001",
    name: "Supplier-1",
    hp: "08594646834",
    address: "Ki. Nanas No. 46, Padangpanjang 96925, Papua",
    kel: "Garuda",
    kec: "Andir",
    kota: "Bandung",
    kodepos: "40124",
  },
  {
    idsupplier: "SUP002",
    name: "Supplier-1",
    hp: "08594646834",
    address: "Ki. Nanas No. 46, Padangpanjang 96925, Papua",
    kel: "Garuda",
    kec: "Andir",
    kota: "Bandung",
    kodepos: "40124",
  },
  {
    idsupplier: "SUP003",
    name: "Supplier-1",
    hp: "08594646834",
    address: "Ki. Nanas No. 46, Padangpanjang 96925, Papua",
    kel: "Garuda",
    kec: "Andir",
    kota: "Bandung",
    kodepos: "40124",
  },
  {
    idsupplier: "SUP004",
    name: "Supplier-1",
    hp: "08594646834",
    address: "Ki. Nanas No. 46, Padangpanjang 96925, Papua",
    kel: "Garuda",
    kec: "Andir",
    kota: "Bandung",
    kodepos: "40124",
  },
  {
    idsupplier: "SUP005",
    name: "Supplier-1",
    hp: "08594646834",
    address: "Ki. Nanas No. 46, Padangpanjang 96925, Papua",
    kel: "Garuda",
    kec: "Andir",
    kota: "Bandung",
    kodepos: "40124",
  },
]

export default function Reseller() {
  return (
    <div>
      <div className="font-bold text-4xl">
        Reseller
      </div>
      <div className="flex flex-nowrap mt-4">
        {/*  */}
        <div className="font-bold text-4xl">
          <Input type="text" className='w-[400px] shadow-md' placeholder="Search Reseller.." />
        </div>
        <div className="absolute right-5">
          <Button className='bg-blue-500 shadow-md'>Add New</Button>
        </div>
      </div>

      <div className="mt-5 shadow-md">
        <Table className='border border-black-500 bg-white'>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">ID Reseller</TableHead>
              <TableHead className="text-left">Name</TableHead>
              <TableHead className="text-center">HP</TableHead>
              <TableHead className="text-center">Address</TableHead>
              <TableHead className="text-center">Kel</TableHead>
              <TableHead className="text-center">Kec</TableHead>
              <TableHead className="text-center">Kota</TableHead>
              <TableHead className="text-center">Kode Pos</TableHead>
              <TableHead className="w-[80px] text-left">ACT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datareseller.map((dataisi) => (
              <TableRow key={dataisi.name}>
                <TableCell className="font-medium">{dataisi.idsupplier}</TableCell>
                <TableCell className="font-medium text-left">{dataisi.name}</TableCell>
                <TableCell className="text-center">{dataisi.hp}</TableCell>
                <TableCell className="text-center">{dataisi.address}</TableCell>
                <TableCell className="text-center">{dataisi.kel}</TableCell>
                <TableCell className="text-center">{dataisi.kec}</TableCell>
                <TableCell className="text-center">{dataisi.kota}</TableCell>
                <TableCell className="text-center">{dataisi.kodepos}</TableCell>
                <TableCell className="text-center"><Icon.FileEdit color="#00b3ff" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
