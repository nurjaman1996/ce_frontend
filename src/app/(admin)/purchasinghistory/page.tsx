"use client"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import * as Icon from "lucide-react"
import { Input } from "@/components/ui/input"
import { BeakerIcon, ClipboardDocumentIcon } from '@heroicons/react/24/solid'

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

import Datepicker from "react-tailwindcss-datepicker";
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { addDays, format, subDays, subWeeks, startOfWeek, lastDayOfWeek } from "date-fns"

import { useEffect, useState } from 'react'

import axios from 'axios'

let Rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

let Numbering = new Intl.NumberFormat("id-ID");

export default function PurchasingHistory(Props: any): JSX.Element {
  const [datalogin, setdatalogin]: any = useState("")

  const [open, setOpen] = useState(false)
  const [dataBatch, setdataBatch]: any = useState([])
  const [valueBatch, setValueBatch]: any = useState("")

  const [value, setValue]: any = useState({
    startDate: "2020-01-01",
    endDate: new Date()
  });

  const handleValueChange = (newValue: any) => {
    if (newValue.startDate != null && newValue.endDate != null) {
      setValue(newValue);
      lodaDashboard(newValue.startDate, newValue.endDate, valueBatch)
    }
  }

  const [isLoading, setisLoading]: any = useState(true)
  const [dataPurchasing, setdataPurchasing]: any = useState([])
  const [dataDEtailsPurchasing, setdataDEtailsPurchasing]: any = useState([])

  async function lodaDashboard(start: any, end: any, batch: any) {
    await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/getpurchasing`,
      data: {
        id_batch: batch,
        start: format(new Date(start), "yyyy-MM-dd"),
        end: format(new Date(end), "yyyy-MM-dd")
      }
    })
      .then(function (response) {
        setdataPurchasing(response.data)
        setdataDEtailsPurchasing(response.data.result.data_purchasing)
        setisLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  async function loadDataBatch() {
    await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_HOST}/purchaseorder/getbatch`,
    })
      .then(function (response) {
        if (valueBatch === "") {
          setdataBatch(response.data.data)
          setValueBatch(response.data.data[0].id_batch)
          lodaDashboard(value.startDate, value.endDate, response.data.data[0].id_batch)
        } else {
          lodaDashboard(value.startDate, value.endDate, valueBatch)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    setdatalogin(Props.params.datalogin)
    loadDataBatch()
  }, [])

  const [searchPurchasing, setsearchPurchasing]: any = useState('');

  const filterPurchasing: any = dataDEtailsPurchasing.filter((data: any) => {
    return (
      data.produk != null ? data.produk.toLocaleLowerCase().includes(searchPurchasing.toLocaleLowerCase()) : data
    );
  });

  const [openEdit, setopenEdit]: any = useState(false);
  const [e_id_purchasing, sete_id_purchasing]: any = useState('');
  const [e_id_po, sete_id_po]: any = useState('');
  const [e_id_batch, sete_id_batch]: any = useState('');
  const [e_id_produk, sete_id_produk]: any = useState('');
  const [e_warna, sete_warna]: any = useState('');
  const [e_ukuran, sete_ukuran]: any = useState('');
  const [e_qty_baru, sete_qty_baru]: any = useState(1);

  async function editPurchasing() {
    if (e_qty_baru < 1) {
      alert("Qty tidak boleh 0")
    } else {
      // console.log(e_id_purchasing)
      // console.log(e_id_po)
      // console.log(e_id_batch)
      // console.log(e_id_produk)
      // console.log(e_warna)
      // console.log(e_ukuran)
      // console.log(e_qty_baru)

      await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/editpurchase`,
        data: {
          id_purchasing: e_id_purchasing,
          id_po: e_id_po,
          id_batch: e_id_batch,
          id_produk: e_id_produk,
          warna: e_warna,
          ukuran: e_ukuran,
          qty_baru: e_qty_baru
        }
      })
        .then(function (response) {
          lodaDashboard(value.startDate, value.endDate, valueBatch)
          setopenEdit(false)
        })
        .catch(function (error) {
          console.log(error);
        })
    }

  }

  async function deletePurchasing(id_purchasing: any, id_po: any, id_batch: any, id_produk: any, warna: any, ukuran: any) {
    // console.log(id_purchasing)
    // console.log(id_po)
    // console.log(id_batch)
    // console.log(id_produk)
    // console.log(warna)
    // console.log(ukuran)

    await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_HOST}/dekstop/deletepurchase`,
      data: {
        id_purchasing: id_purchasing,
        id_po: id_po,
        id_batch: id_batch,
        id_produk: id_produk,
        warna: warna,
        ukuran: ukuran
      }
    })
      .then(function (response) {
        lodaDashboard(value.startDate, value.endDate, valueBatch)
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
            Purchasing History
          </div>
        </div>

        <div className='flex flex-row mt-4 gap-4  text-black'>

          <div className='basis-1/4 bg-white border border-gray-300 h-[100px] rounded-lg shadow-md'>
            <div className='text-md font-semibold py-4 px-5'>
              Total Transaction History
            </div>
            <div className='flex flex-row text-left'>
              <div className='basis-full text-lg font-semibold py-0 px-5'>
                {Numbering.format(dataPurchasing.result.total_transaksi)}
              </div>
              <div className=' basis-auto mt-1 mx-5'>
                <Icon.BarChart4 className="h-6 w-6 text-black text-right" />
              </div>
            </div>
          </div>

          <div className='basis-1/4 bg-white border border-gray-300 h-[100px] rounded-lg shadow-md'>
            <div className='text-md font-semibold py-4 px-5'>
              Article
            </div>
            <div className='flex flex-row text-left'>
              <div className='basis-full text-lg font-semibold py-0 px-5'>
                {Numbering.format(dataPurchasing.result.total_artikel)}
              </div>
              <div className=' basis-auto mt-1 mx-5'>
                <Icon.BarChart4 className="h-6 w-6 text-black text-right" />
              </div>
            </div>
          </div>

          <div className='basis-1/4 bg-white border border-gray-300 h-[100px] rounded-lg shadow-md'>
            <div className='text-md font-semibold py-4 px-5'>
              Total Qty
            </div>
            <div className='flex flex-row text-left'>
              <div className='basis-full text-lg font-semibold py-0 px-5'>
                {Numbering.format(dataPurchasing.result.total_qty)}
              </div>
              <div className=' basis-auto mt-1 mx-5'>
                <Icon.BarChart4 className="h-6 w-6 text-black text-right" />
              </div>
            </div>
          </div>

          <div className='basis-1/4 bg-white border border-gray-300 h-[100px] rounded-lg shadow-md'>
            <div className='text-md font-semibold py-4 px-5'>
              Capital Amount
            </div>
            <div className='flex flex-row text-left'>
              <div className='basis-full text-lg font-semibold py-0 px-5'>
                {Rupiah.format(dataPurchasing.result.capital_amount)}
              </div>
              <div className=' basis-auto mt-1 mx-5'>
                <Icon.BarChart4 className="h-6 w-6 text-black text-right" />
              </div>
            </div>
          </div>

        </div>

        {/* {JSON.stringify(dataPurchasing)} */}

        <div className="flex flex-nowrap mt-4">
          {/*  */}
          <div className="font-bold text-4xl">
            <Input type="text" className='w-[400px] shadow-md' placeholder="Search Purchasing History.." value={searchPurchasing} onChange={(e) => { setsearchPurchasing(e.currentTarget.value) }} />
          </div>
          <div className="ml-auto w-auto mr-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {valueBatch
                    ? dataBatch.find((batch: any) => batch.id_batch == valueBatch)?.id_batch
                    : "SELECT BATCH..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search batch..." />
                  <CommandEmpty>No batch found.</CommandEmpty>
                  <CommandGroup>
                    {dataBatch.map((batch: any) => (

                      <CommandItem
                        key={batch.id}
                        value={batch.id_batch}
                        onSelect={(currentValue) => {
                          lodaDashboard(value.startDate, value.endDate, currentValue.toUpperCase())
                          setValueBatch(currentValue.toUpperCase() === valueBatch ? "" : currentValue.toUpperCase())
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            valueBatch === batch.id_batch ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {batch.id_batch}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="basis-1/6 border font-medium">
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
                <TableHead className="bg-gray-900 border text-white w-[3%] text-center">No</TableHead>
                <TableHead className="bg-gray-900 border text-white w-[9%] text-center">Date Purchasing</TableHead>
                <TableHead className="bg-gray-900 border text-white w-[9%] text-center">ID Purchasing</TableHead>
                <TableHead className="bg-gray-900 border text-white w-[9%] text-center">Batch</TableHead>
                <TableHead className="bg-gray-900 border text-white w-[7%] text-center">ID PO</TableHead>
                <TableHead className="bg-gray-900 border text-white w-[10% text-center">ID Product</TableHead>
                <TableHead className="bg-gray-900 border text-white w-[10% text-center">Product</TableHead>
                <TableHead className="bg-gray-900 border text-white w-[10%] text-center">Supplier</TableHead>
                <TableHead className="bg-gray-900 border text-white w-[10%] text-center">Warna</TableHead>
                <TableHead className="bg-gray-900 border text-white w-[10%] text-center">Ukuran</TableHead>
                <TableHead className="bg-gray-900 border text-white w-[3%] text-center">Qty</TableHead>
                <TableHead className="bg-gray-900 border text-white w-[10%] text-center">Sub Total</TableHead>
                {datalogin.datarole === "SUPER_ADMIN" ?
                  <>
                    <TableHead className="bg-gray-900 border text-white w-[10%] text-center">ACT</TableHead>
                  </>
                  : null}
              </TableRow>
            </TableHeader>
            <TableBody className='bg-white'>
              {filterPurchasing.map((dataisi: any, index: number) => (
                <TableRow key={dataisi.id}>
                  <TableCell className="border text-center w-[3%] font-bold">{Numbering.format(index + 1)}</TableCell>
                  <TableCell className="border text-center w-[9%]">{dataisi.tanggal_purchasing}</TableCell>
                  <TableCell className="border text-center w-[9%]">{dataisi.id_purchasing}</TableCell>
                  <TableCell className="border w-[9%] text-center">{dataisi.id_batch}</TableCell>
                  <TableCell className="border w-[7%] text-center">{dataisi.id_po}</TableCell>
                  <TableCell className="border w-[10%] text-center ">{dataisi.id_produk}</TableCell>
                  <TableCell className="border w-[10%] text-center ">{dataisi.produk}</TableCell>
                  <TableCell className="border w-[10%] text-center">{dataisi.supplier}</TableCell>
                  <TableCell className="border w-[10%] text-center">{dataisi.warna}</TableCell>
                  <TableCell className="border w-[10%] text-center">{dataisi.ukuran}</TableCell>
                  <TableCell className="border w-[3%] text-center">{Numbering.format(dataisi.qty)}</TableCell>
                  <TableCell className="border w-[10%] text-center">{Rupiah.format(dataisi.sub_total)}</TableCell>
                  {datalogin.datarole === "SUPER_ADMIN" ?
                    <>
                      <TableCell className="border text-center w-[10%]">

                        <AlertDialog open={openEdit} onOpenChange={setopenEdit}>
                          <AlertDialogTrigger asChild>
                            <Button variant="link" className=' text-white font-bold hover:bg-gray-200'
                              onClick={() => {
                                setopenEdit(true)
                                sete_id_purchasing(dataisi.id_purchasing)
                                sete_id_po(dataisi.id_po)
                                sete_id_batch(dataisi.id_batch)
                                sete_id_produk(dataisi.id_produk)
                                sete_warna(dataisi.warna)
                                sete_ukuran(dataisi.ukuran)
                              }}>
                              <Icon.FileEdit color="#000000" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className='w-[600px]'>
                            <AlertDialogHeader className='border-b pb-4'>
                              <AlertDialogTitle >Edit History</AlertDialogTitle>
                            </AlertDialogHeader>
                            <div className='flex flex-row text-center mt-2 items-center'>
                              <div className='basis-1/4 font-bold text-left'>
                                Produk :
                              </div>
                              <div className='basis-3/4'>
                                <Input type="text" readOnly={true} value={dataisi.produk} />
                              </div>
                            </div>
                            <div className='flex flex-row text-center mt-2 items-center'>
                              <div className='basis-1/4 font-bold text-left'>
                                Warna :
                              </div>
                              <div className='basis-3/4'>
                                <Input type="text" readOnly={true} value={dataisi.warna} />
                              </div>
                            </div>
                            <div className='flex flex-row text-center mt-2 items-center'>
                              <div className='basis-1/4 font-bold text-left'>
                                Ukuran :
                              </div>
                              <div className='basis-3/4'>
                                <Input type="text" readOnly={true} value={dataisi.ukuran} />
                              </div>
                            </div>
                            <div className='flex flex-row text-center mt-2 items-center'>
                              <div className='basis-1/4 font-bold text-left'>
                                Qty Lama :
                              </div>
                              <div className='basis-3/4'>
                                <Input type="text" readOnly={true} value={dataisi.qty} />
                              </div>
                            </div>
                            <div className='flex flex-row text-center mt-2 items-center'>
                              <div className='basis-1/4 font-bold text-left'>
                                Qty Baru :
                              </div>
                              <div className='basis-3/4'>
                                <Input type="number" min={1} value={e_qty_baru} onChange={(e) => { sete_qty_baru(e.currentTarget.value) }} />
                              </div>
                            </div>
                            <AlertDialogFooter>
                              <AlertDialogCancel className='bg-red-400'>Cancel</AlertDialogCancel>
                              <Button onClick={() => {
                                editPurchasing()
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
                              <AlertDialogTitle >Delete History</AlertDialogTitle>
                              <AlertDialogDescription>Data Purchasing {dataisi.id_purchasing} akan dihapus?</AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel >Cancel</AlertDialogCancel>
                              <Button className='bg-red-400 font-bold'
                                onClick={() => {
                                  deletePurchasing(dataisi.id_purchasing, dataisi.id_po, dataisi.id_batch, dataisi.id_produk, dataisi.warna, dataisi.ukuran)
                                }}
                              >Delete</Button>
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
