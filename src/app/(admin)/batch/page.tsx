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

import { addDays, format, subDays, subWeeks, startOfWeek, lastDayOfWeek } from "date-fns"
import Datepicker from "react-tailwindcss-datepicker";

import { useEffect, useState } from 'react'
import axios from 'axios'

let Rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
});

let Numbering = new Intl.NumberFormat("id-ID");


export default function Batch() {
    const [isLoading, setisLoading]: any = useState(true)
    const [dataBatch, setdataBatch]: any = useState([])

    const [value, setValue]: any = useState({
        startDate: "2020-01-01",
        endDate: new Date()
    });

    const handleValueChange = (newValue: any) => {
        if (newValue.startDate != null && newValue.endDate != null) {
            setValue(newValue);
            lodaDashboard(newValue.startDate, newValue.endDate)
        }
    }

    async function lodaDashboard(start: any, end: any) {
        await axios({
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/getbatch`,
            data: {
                start: format(new Date(start), "yyyy-MM-dd"),
                end: format(new Date(end), "yyyy-MM-dd")
            }
        })
            .then(function (response) {
                setdataBatch(response.data)
                setisLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        lodaDashboard(value.startDate, value.endDate)
    }, [])

    if (isLoading) {
        return (
            <div>
                Loading Data...
            </div>
        )
    } else {

        return (
            <main className="">
                <div className="flex flex-nowrap mt-4">
                    <div className="font-bold text-4xl text-red-500">
                        Batch
                    </div>
                </div>

                {/* {JSON.stringify(dataBatch.result)} */}

                <div className='flex flex-row mt-4 gap-8  text-white'>
                    <div className='basis-1/2 border-2 border-black-500 h-[125px] bg-red-400'>
                        <div className='text-xl font-semibold py-4 px-5'>
                            Total Batch
                        </div>
                        <div className='flex flex-row text-left px-5'>
                            <div className='basis-1/2 text-4xl font-semibold'>
                                {Numbering.format(dataBatch.result.total_batch)}
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
                                {Rupiah.format(dataBatch.result.amount_batch)}
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
                    <div className="ml-auto basis-1/6">
                        <Datepicker
                            value={value}
                            onChange={handleValueChange}
                            showShortcuts={true}
                            separator={"s/d"}
                            showFooter={true}
                            popoverDirection="down"
                            configs={{
                                shortcuts: {
                                    today: "Hari Ini",
                                    yesterday: "Kemarin",
                                    mingguini: {
                                        text: "Minggu Ini",
                                        period: {
                                            start: format(startOfWeek(new Date()), "yyyy-MM-dd"),
                                            end: format(lastDayOfWeek(new Date()), "yyyy-MM-dd")
                                        },
                                    },
                                    minggukemarin: {
                                        text: "Minggu Kemarin",
                                        period: {
                                            start: format(subDays(startOfWeek(new Date()), 7), "yyyy-MM-dd"),
                                            end: format(subDays(lastDayOfWeek(new Date()), 7), "yyyy-MM-dd")
                                        },
                                    },
                                    currentMonth: "Bulan Ini",
                                    pastMonth: 'Bulan Kemarin',
                                    alltime: {
                                        text: "Semua",
                                        period: {
                                            start: "2023-01-01",
                                            end: format(new Date(), "yyyy-MM-dd")
                                        },
                                    },
                                }
                            }}
                        />
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
                            {dataBatch.result.data_batch.map((dataisi: any, index: number) => (
                                <TableRow key={dataisi.id}>
                                    <TableCell className="border text-center w-[3.5%] font-bold">{Numbering.format(index + 1)}</TableCell>
                                    <TableCell className="border text-center w-[10%]">{dataisi.tanggal_batch}</TableCell>
                                    <TableCell className="border w-[15%] text-center">{dataisi.id_batch}</TableCell>
                                    <TableCell className="border w-[10%] text-center">{dataisi.country}</TableCell>
                                    <TableCell className="border w-[10%] text-center ">{dataisi.city}</TableCell>
                                    <TableCell className="border w-[10%] text-center bg-orange-100">{Rupiah.format(dataisi.gross)}</TableCell>
                                    <TableCell className="border w-[10%] text-center  bg-orange-100">{Rupiah.format(dataisi.profit)}</TableCell>
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
}
