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


export default function Batch(Props: any): JSX.Element {

    const [datalogin, setdatalogin]: any = useState("")

    const [isLoading, setisLoading]: any = useState(true)
    const [dataBatch, setdataBatch]: any = useState([])
    const [dataDEtailsBatch, setdataDEtailsBatch]: any = useState([])

    const [value, setValue]: any = useState({
        startDate: "2020-01-01",
        endDate: new Date()
    });

    const handleValueChange = (newValue: any) => {
        if (newValue.startDate != null && newValue.endDate != null) {
            setValue(newValue);
            loadBatch(newValue.startDate, newValue.endDate)
        }
    }

    async function loadBatch(start: any, end: any) {
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
                setdataDEtailsBatch(response.data.result.data_batch)
                setisLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        setdatalogin(Props.params.datalogin)
        loadBatch("2020-01-01", new Date())
    }, [])

    const [searchBatch, setsearchBatch]: any = useState('');

    const filterBatch: any = dataDEtailsBatch.filter((data: any) => {
        return (
            data.id_batch.toLocaleLowerCase().includes(searchBatch.toLocaleLowerCase())
        );
    });

    const [openEdit, setopenEdit]: any = useState(false);
    const [e_id_batch, sete_id_batch]: any = useState('');
    const [e_country, sete_country]: any = useState('');
    const [e_city, sete_city]: any = useState('');

    async function editBatch() {
        // console.log(e_id_batch)
        // console.log(e_country)
        // console.log(e_city)

        await axios({
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/editbatch`,
            data: {
                id_batch: e_id_batch,
                country: e_country,
                city: e_city,
            }
        })
            .then(function (response) {
                loadBatch(value.startDate, value.endDate)
                setopenEdit(false)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    async function deleteBatch(id_batch: any) {
        // console.log(id_batch)

        await axios({
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/deletebatch`,
            data: {
                id_batch: id_batch
            }
        })
            .then(function (response) {
                loadBatch(value.startDate, value.endDate)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

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
                    <div className="font-bold text-2xl">
                        Batch
                    </div>
                </div>

                {/* {JSON.stringify(dataBatch.result)} */}

                <div className='flex flex-row mt-4 gap-8  text-black'>
                    <div className='basis-1/2 h-[110px] bg-white border border-gray-300 rounded-xl'>
                        <div className='text-lg font-semibold py-4 px-5'>
                            Total Batch
                        </div>
                        <div className='flex flex-row text-left px-5'>
                            <div className='basis-1/2 text-2xl font-semibold'>
                                {Numbering.format(dataBatch.result.total_batch)}
                            </div>
                            <div className=' basis-1/2 flex justify-end -mt-2'>
                                <Icon.Layers3 size={45} color="#000000" />
                            </div>
                        </div>
                    </div>
                    <div className='basis-1/2 h-[110px] bg-white border border-gray-300 rounded-xl'>
                        <div className='text-lg font-semibold py-4 px-5'>
                            Capital Amount Batch
                        </div>
                        <div className='flex flex-row text-left px-5'>
                            <div className='basis-1/2 text-2xl font-semibold'>
                                {Rupiah.format(dataBatch.result.amount_batch)}
                            </div>
                            <div className=' basis-1/2 flex justify-end -mt-2'>
                                <Icon.DollarSign size={45} color="#000000" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-nowrap mt-4">
                    {/*  */}
                    <div className="font-bold text-4xl">
                        <Input type="text" className='w-[400px] shadow-md' placeholder="Search Batch.." value={searchBatch} onChange={(e) => { setsearchBatch(e.currentTarget.value) }} />
                    </div>
                    <div className="ml-auto basis-1/6 border font-medium">
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
                            <TableRow className='bg-gray-900 font-bold'>
                                <TableHead className="bg-gray-900 border  text-white w-[3%] text-center">No</TableHead>
                                <TableHead className="bg-gray-900 border  text-white w-[10%] text-center">Date</TableHead>
                                <TableHead className="bg-gray-900 border  text-white w-[15%] text-center">Batch</TableHead>
                                <TableHead className="bg-gray-900 border  text-white w-[10%] text-center">Country</TableHead>
                                <TableHead className="bg-gray-900 border  text-white w-[10% text-center">City</TableHead>
                                <TableHead className="bg-gray-900 border  text-white w-[10%] text-center">Gross Sales</TableHead>
                                <TableHead className="bg-gray-900 border  text-white w-[10%] text-center">Profit</TableHead>
                                {datalogin.datarole === "SUPER_ADMIN" ?
                                    <>
                                        <TableHead className="bg-gray-900 border  text-white w-[10%] text-center">ACT</TableHead>
                                    </>
                                    : null}
                            </TableRow>
                        </TableHeader>
                        <TableBody className='bg-white'>
                            {filterBatch.map((dataisi: any, index: number) => (
                                <TableRow key={dataisi.id}>
                                    <TableCell className="border text-center w-[3.5%] font-bold">{Numbering.format(index + 1)}</TableCell>
                                    <TableCell className="border text-center w-[10%]">{dataisi.tanggal_batch}</TableCell>
                                    <TableCell className="border w-[15%] text-center">{dataisi.id_batch}</TableCell>
                                    <TableCell className="border w-[10%] text-center">{dataisi.country}</TableCell>
                                    <TableCell className="border w-[10%] text-center ">{dataisi.city}</TableCell>
                                    <TableCell className="border w-[10%] text-center bg-orange-100">{Rupiah.format(dataisi.gross)}</TableCell>
                                    <TableCell className="border w-[10%] text-center  bg-orange-100">{Rupiah.format(dataisi.profit)}</TableCell>
                                    {datalogin.datarole === "SUPER_ADMIN" ?
                                        <>
                                            <TableCell className="border text-center w-[10%]">

                                                <AlertDialog open={openEdit} onOpenChange={setopenEdit}>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="link" className=' text-white font-bold hover:bg-gray-200'
                                                            onClick={() => {
                                                                setopenEdit(true)
                                                                sete_id_batch(dataisi.id_batch)
                                                                sete_country(dataisi.country)
                                                                sete_city(dataisi.city)
                                                            }}>
                                                            <Icon.FileEdit color="#000000" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent className='w-[600px]'>
                                                        <AlertDialogHeader className='border-b pb-4'>
                                                            <AlertDialogTitle >Edit Batch</AlertDialogTitle>
                                                        </AlertDialogHeader>
                                                        <div className='flex flex-row text-center mt-2 items-center'>
                                                            <div className='basis-1/4 font-bold text-left'>
                                                                Country :
                                                            </div>
                                                            <div className='basis-3/4'>
                                                                <Input type="text" value={e_country} onChange={(e) => { sete_country(e.currentTarget.value) }} placeholder="Country.." />
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-row text-center mt-2 items-center'>
                                                            <div className='basis-1/4 font-bold text-left'>
                                                                City :
                                                            </div>
                                                            <div className='basis-3/4'>
                                                                <Input type="text" value={e_city} onChange={(e) => { sete_city(e.currentTarget.value) }} placeholder="City.." />
                                                            </div>
                                                        </div>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel className='bg-red-400'>Cancel</AlertDialogCancel>
                                                            <Button onClick={() => {
                                                                editBatch()
                                                            }}>Update</Button>
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
                                                            <AlertDialogDescription>Semua Data dari {dataisi.id_batch}, seperti Produk, History belanja dan lainnya akan dihapus?</AlertDialogDescription>
                                                        </AlertDialogHeader>

                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel >Cancel</AlertDialogCancel>
                                                            <Button className='bg-red-400 font-bold' onClick={() => { deleteBatch(dataisi.id_batch) }}>Delete</Button>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </>
                                        : null}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div >
            </main >
        )
    }
}
