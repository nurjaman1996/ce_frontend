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

const databatch = [
    {
        no: "1",
        tanggal_batch: "PO001",
        id_batch: "image.jpeg",
        country: "Supplier-1",
        city: "400",
        gross_sale: "50",
        profit: "5",
    }
]

export default function Batch() {
    return (
        <main className="">
            <div className="flex flex-nowrap mt-4">
                <div className="font-bold text-4xl text-red-500">
                    Batch
                </div>
            </div>

            <div className='flex flex-row mt-4 gap-8  text-white'>
                <div className='basis-1/2 border-2 border-black-500 h-[125px] bg-red-400'>
                    <div className='text-xl font-semibold py-4 px-5'>
                        Total Batch
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
                        Capital Amount Batch
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
                    <Input type="text" className='w-[400px] shadow-md' placeholder="Search Batch.." />
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
                            <TableHead className="border  text-white w-[10%] text-center">Date</TableHead>
                            <TableHead className="border  text-white w-[15%] text-center">Batch</TableHead>
                            <TableHead className="border  text-white w-[10%] text-center">Country</TableHead>
                            <TableHead className="border  text-white w-[10% text-center">City</TableHead>
                            <TableHead className="border  text-white w-[10%] text-center">Gross Sales</TableHead>
                            <TableHead className="border  text-white w-[10%] text-center">Profit</TableHead>
                            <TableHead className="border  text-white w-[5%] text-center">ACT</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='bg-white'>
                        {databatch.map((dataisi) => (
                            <TableRow key={dataisi.no}>
                                <TableCell className="border text-center w-[3.5%] font-bold">{dataisi.no}</TableCell>
                                <TableCell className="border text-center w-[10%]">{dataisi.tanggal_batch}</TableCell>
                                <TableCell className="border w-[15%] text-center">{dataisi.id_batch}Gr</TableCell>
                                <TableCell className="border w-[10%] text-center">{dataisi.country}</TableCell>
                                <TableCell className="border w-[10%] text-center ">{dataisi.city}</TableCell>
                                <TableCell className="border w-[10%] text-center bg-orange-100">Rp{dataisi.gross_sale}</TableCell>
                                <TableCell className="border w-[10%] text-center  bg-orange-100">Rp{dataisi.profit}</TableCell>
                                <TableCell className="border w-[5%]">

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="link" className=' text-white font-bold hover:bg-gray-200'> <Icon.FileEdit color="#00b3ff" /></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className='w-[600px]'>
                                            <AlertDialogHeader className='border-b pb-4'>
                                                <AlertDialogTitle >Edit Batch</AlertDialogTitle>
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
                                                <AlertDialogTitle >Delete Batch</AlertDialogTitle>
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
