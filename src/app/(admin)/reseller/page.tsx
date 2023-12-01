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
    no: "1",
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
    no: "2",
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
    no: "3",
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
    no: "4",
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
    no: "5",
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
      <div className="font-bold text-4xl text-red-500">
        Reseller
      </div>
      <div className="flex flex-nowrap mt-4">
        {/*  */}
        <div className="font-bold text-4xl">
          <Input type="text" className='w-[400px] shadow-md' placeholder="Search Reseller.." />
        </div>
        <div className="absolute right-5">
          <Button className='bg-blue-400 font-bold shadow-md'>Add New</Button>
        </div>
      </div>

      <div className="mt-5 shadow-md">
        <Table className='border'>
          <TableHeader className='bg-red-400 '>
            <TableRow>
              <TableHead className="border w-[50px] text-center font-bold text-white">No</TableHead>
              <TableHead className="border w-[120px] text-center font-bold text-white">ID Reseller</TableHead>
              <TableHead className="border w-[300px] text-left font-bold text-white">Name</TableHead>
              <TableHead className="border text-center font-bold text-white">HP</TableHead>
              <TableHead className="border text-center font-bold text-white">Address</TableHead>
              <TableHead className="border text-center font-bold text-white">Kel</TableHead>
              <TableHead className="border text-center font-bold text-white">Kec</TableHead>
              <TableHead className="border text-center font-bold text-white">Kota</TableHead>
              <TableHead className="border text-center font-bold text-white">Kode Pos</TableHead>
              <TableHead className="border w-[50px] text-center font-bold text-white">Act</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='bg-white'>
            {datareseller.map((dataisi) => (
              <TableRow key={dataisi.name}>
                <TableCell className="border w-[50px] text-center font-bold">{dataisi.no}</TableCell>
                <TableCell className="border w-[120px] text-center font-medium">{dataisi.idsupplier}</TableCell>
                <TableCell className="border font-medium text-left">{dataisi.name}</TableCell>
                <TableCell className="border text-center">{dataisi.hp}</TableCell>
                <TableCell className="border text-center">{dataisi.address}</TableCell>
                <TableCell className="border text-center">{dataisi.kel}</TableCell>
                <TableCell className="border text-center">{dataisi.kec}</TableCell>
                <TableCell className="border text-center">{dataisi.kota}</TableCell>
                <TableCell className="border text-center">{dataisi.kodepos}</TableCell>
                <TableCell className="border w-[50px]"><Icon.FileEdit color="#00b3ff" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
