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

const datareseller = [
  {
    no: "1",
    idsupplier: "CUS001",
    name: "Customer-1",
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
        Customer
      </div>
      <div className="flex flex-nowrap mt-4">
        {/*  */}
        <div className="font-bold text-4xl">
          <Input type="text" className='w-[400px] shadow-md' placeholder="Search Customer.." />
        </div>
        <div className="absolute right-5">
          <AlertDialog >
            <AlertDialogTrigger asChild>
              <Button variant="outline" className='bg-black text-white font-bold hover:bg-gray-200'>Add New</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='w-[600px]'>
              <AlertDialogHeader className='border-b pb-4'>
                <AlertDialogTitle >Add New Customer</AlertDialogTitle>
              </AlertDialogHeader>
              <div className='flex flex-row text-center mt-2 items-center'>
                <div className='basis-1/4 font-bold text-left'>
                  Customer :
                </div>
                <div className='basis-3/4'>
                  <Input type="text" placeholder="Supplier.." />
                </div>
              </div>
              <div className='flex flex-row text-center mt-2 items-center'>
                <div className='basis-1/4 font-bold text-left'>
                  Contact :
                </div>
                <div className='basis-3/4'>
                  <Input type="text" placeholder="Contact.." />
                </div>
              </div>
              <div className='flex flex-row text-center mt-2 items-top'>
                <div className='basis-1/4 font-bold text-left'>
                  Address :
                </div>
                <div className='basis-3/4'>
                  <Textarea className='border w-full' placeholder="Address.." />
                </div>
              </div>
              <div className='flex flex-row text-center mt-2 items-center'>
                <div className='basis-1/4 font-bold text-left'>
                  Kelurahan :
                </div>
                <div className='basis-3/4'>
                  <Input type="text" placeholder="Kelurahan.." />
                </div>
              </div>
              <div className='flex flex-row text-center mt-2 items-center'>
                <div className='basis-1/4 font-bold text-left'>
                  Kecamatan :
                </div>
                <div className='basis-3/4'>
                  <Input type="text" placeholder="Kecamatan.." />
                </div>
              </div>
              <div className='flex flex-row text-center mt-2 items-center'>
                <div className='basis-1/4 font-bold text-left'>
                  Kota :
                </div>
                <div className='basis-3/4'>
                  <Input type="text" placeholder="Kota.." />
                </div>
              </div>
              <div className='flex flex-row text-center mt-2 items-center'>
                <div className='basis-1/4 font-bold text-left'>
                  Kode Pos :
                </div>
                <div className='basis-3/4'>
                  <Input type="number" placeholder="Kode Pos.." />
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel className='bg-red-400 font-bold text-white'>Cancel</AlertDialogCancel>
                <Button>Save</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
              <TableHead className="border w-[100px] text-center font-bold text-white">Act</TableHead>
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
                <TableCell className="border w-[100px]">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="link" className=' text-white font-bold hover:bg-gray-200'> <Icon.FileEdit color="#00b3ff" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='w-[600px]'>
                      <AlertDialogHeader className='border-b pb-4'>
                        <AlertDialogTitle >Edit Customer</AlertDialogTitle>
                      </AlertDialogHeader>
                      <div className='flex flex-row text-center mt-2 items-center'>
                        <div className='basis-1/4 font-bold text-left'>
                          Customer :
                        </div>
                        <div className='basis-3/4'>
                          <Input type="text" placeholder="Supplier.." />
                        </div>
                      </div>
                      <div className='flex flex-row text-center mt-2 items-center'>
                        <div className='basis-1/4 font-bold text-left'>
                          Contact :
                        </div>
                        <div className='basis-3/4'>
                          <Input type="text" placeholder="Contact.." />
                        </div>
                      </div>
                      <div className='flex flex-row text-center mt-2 items-top'>
                        <div className='basis-1/4 font-bold text-left'>
                          Address :
                        </div>
                        <div className='basis-3/4'>
                          <Textarea className='border w-full' placeholder="Address.." />
                        </div>
                      </div>
                      <div className='flex flex-row text-center mt-2 items-center'>
                        <div className='basis-1/4 font-bold text-left'>
                          Kelurahan :
                        </div>
                        <div className='basis-3/4'>
                          <Input type="text" placeholder="Kelurahan.." />
                        </div>
                      </div>
                      <div className='flex flex-row text-center mt-2 items-center'>
                        <div className='basis-1/4 font-bold text-left'>
                          Kecamatan :
                        </div>
                        <div className='basis-3/4'>
                          <Input type="text" placeholder="Kecamatan.." />
                        </div>
                      </div>
                      <div className='flex flex-row text-center mt-2 items-center'>
                        <div className='basis-1/4 font-bold text-left'>
                          Kota :
                        </div>
                        <div className='basis-3/4'>
                          <Input type="text" placeholder="Kota.." />
                        </div>
                      </div>
                      <div className='flex flex-row text-center mt-2 items-center'>
                        <div className='basis-1/4 font-bold text-left'>
                          Kode Pos :
                        </div>
                        <div className='basis-3/4'>
                          <Input type="number" placeholder="Kode Pos.." />
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
                        <AlertDialogTitle >Delete Customer</AlertDialogTitle>
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
      </div>
    </div>
  )
}
